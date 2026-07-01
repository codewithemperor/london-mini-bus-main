#!/usr/bin/env python3
"""
Convert project images to WebP and reduce them toward a target file size.

Default behavior is safe:
  - scans ./public
  - writes sibling .webp files
  - keeps original PNG/JPG files
  - skips files that already have an up-to-date optimized WebP

Examples:
  python scripts/optimize_images.py
  python scripts/optimize_images.py --target-kb 100 --root public
  python scripts/optimize_images.py --dry-run
  python scripts/optimize_images.py --replace-originals
"""

from __future__ import annotations

import argparse
import sys
from dataclasses import dataclass
from io import BytesIO
from pathlib import Path
from typing import Any, Iterable

Image: Any = None
ImageOps: Any = None


IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".JPG", ".JPEG", ".PNG"}


@dataclass
class OptimizedImage:
    source: Path
    output: Path
    original_bytes: int
    optimized_bytes: int
    width: int
    height: int
    quality: int
    resized: bool


def iter_images(root: Path) -> Iterable[Path]:
    for path in root.rglob("*"):
        if path.is_file() and path.suffix in IMAGE_EXTENSIONS:
            yield path


def ensure_pillow() -> None:
    global Image, ImageOps

    if Image is not None and ImageOps is not None:
        return

    try:
        from PIL import Image as pillow_image
        from PIL import ImageOps as pillow_image_ops
    except ModuleNotFoundError:
        print(
            "Missing dependency: Pillow\n"
            "Install it with: python -m pip install pillow",
            file=sys.stderr,
        )
        raise SystemExit(1)

    Image = pillow_image
    ImageOps = pillow_image_ops


def format_bytes(size: int) -> str:
    if size >= 1024 * 1024:
        return f"{size / (1024 * 1024):.2f} MB"
    return f"{size / 1024:.1f} KB"


def encode_webp(image: Image.Image, quality: int) -> bytes:
    buffer = BytesIO()
    image.save(
        buffer,
        format="WEBP",
        quality=quality,
        method=6,
        optimize=True,
    )
    return buffer.getvalue()


def optimize_image(
    source: Path,
    output: Path,
    target_bytes: int,
    min_quality: int,
    start_quality: int,
    resize_step: float,
    min_width: int,
) -> OptimizedImage:
    original_bytes = source.stat().st_size

    with Image.open(source) as opened:
        image = ImageOps.exif_transpose(opened)

        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA" if "A" in image.getbands() else "RGB")

        resized = False
        working = image.copy()
        best_bytes = b""
        best_quality = start_quality

        while True:
            for quality in range(start_quality, min_quality - 1, -5):
                candidate = encode_webp(working, quality)
                if not best_bytes or len(candidate) < len(best_bytes):
                    best_bytes = candidate
                    best_quality = quality

                if len(candidate) <= target_bytes:
                    output.write_bytes(candidate)
                    return OptimizedImage(
                        source=source,
                        output=output,
                        original_bytes=original_bytes,
                        optimized_bytes=len(candidate),
                        width=working.width,
                        height=working.height,
                        quality=quality,
                        resized=resized,
                    )

            if working.width <= min_width:
                output.write_bytes(best_bytes)
                return OptimizedImage(
                    source=source,
                    output=output,
                    original_bytes=original_bytes,
                    optimized_bytes=len(best_bytes),
                    width=working.width,
                    height=working.height,
                    quality=best_quality,
                    resized=resized,
                )

            next_width = max(min_width, int(working.width * resize_step))
            next_height = max(1, int(working.height * (next_width / working.width)))
            working = working.resize((next_width, next_height), Image.Resampling.LANCZOS)
            resized = True


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Optimize images to WebP.")
    parser.add_argument("--root", default="public", help="Folder to scan.")
    parser.add_argument(
        "--target-kb",
        type=int,
        default=100,
        help="Target max size per generated WebP file.",
    )
    parser.add_argument(
        "--start-quality",
        type=int,
        default=82,
        help="Initial WebP quality.",
    )
    parser.add_argument(
        "--min-quality",
        type=int,
        default=45,
        help="Lowest WebP quality before resizing.",
    )
    parser.add_argument(
        "--resize-step",
        type=float,
        default=0.9,
        help="Resize multiplier applied when quality alone is not enough.",
    )
    parser.add_argument(
        "--min-width",
        type=int,
        default=900,
        help="Do not resize below this width.",
    )
    parser.add_argument(
        "--force",
        action="store_true",
        help="Regenerate WebP files even when they are newer than the source.",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Print what would be optimized without writing files.",
    )
    parser.add_argument(
        "--replace-originals",
        action="store_true",
        help="Delete original PNG/JPG files after successful WebP creation.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    root = Path(args.root).resolve()
    target_bytes = args.target_kb * 1024

    if not root.exists():
        print(f"Image root does not exist: {root}", file=sys.stderr)
        return 1

    images = sorted(iter_images(root))

    if not images:
        print(f"No PNG/JPG images found in {root}")
        return 0

    optimized: list[OptimizedImage] = []
    skipped = 0

    for source in images:
        output = source.with_suffix(".webp")

        if (
            output.exists()
            and not args.force
            and output.stat().st_mtime >= source.stat().st_mtime
        ):
            skipped += 1
            continue

        if args.dry_run:
            print(f"Would optimize: {source.relative_to(Path.cwd())} -> {output.name}")
            continue

        ensure_pillow()

        result = optimize_image(
            source=source,
            output=output,
            target_bytes=target_bytes,
            min_quality=args.min_quality,
            start_quality=args.start_quality,
            resize_step=args.resize_step,
            min_width=args.min_width,
        )
        optimized.append(result)

        if args.replace_originals and output.exists():
            source.unlink()

        status = "OK" if result.optimized_bytes <= target_bytes else "OVER"
        print(
            f"{status} {source.relative_to(Path.cwd())} -> "
            f"{output.relative_to(Path.cwd())} "
            f"{format_bytes(result.original_bytes)} -> "
            f"{format_bytes(result.optimized_bytes)} "
            f"{result.width}x{result.height} q{result.quality}"
        )

    if args.dry_run:
        print(f"Dry run complete. {len(images)} image(s) found.")
        return 0

    original_total = sum(item.original_bytes for item in optimized)
    optimized_total = sum(item.optimized_bytes for item in optimized)
    saved = original_total - optimized_total

    print()
    print(f"Optimized: {len(optimized)} image(s)")
    print(f"Skipped: {skipped} image(s)")
    print(f"Before: {format_bytes(original_total)}")
    print(f"After: {format_bytes(optimized_total)}")
    print(f"Saved: {format_bytes(saved)}")

    if args.replace_originals:
        print("Original PNG/JPG files were deleted.")
    else:
        print("Original PNG/JPG files were kept.")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
