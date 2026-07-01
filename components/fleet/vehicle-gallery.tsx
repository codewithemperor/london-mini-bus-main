"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type GalleryImage = {
  src: string;
  alt: string;
  id: number;
};

export default function VehicleGallery({ car }: { car: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const images: GalleryImage[] = [
    { src: `/fleet/${car}/front.jpg`, alt: "Front view", id: 1 },
    { src: `/fleet/${car}/rear.jpg`, alt: "Rear view", id: 2 },
    { src: `/fleet/${car}/door.jpg`, alt: "Driver door", id: 3 },
    { src: `/fleet/${car}/interior.jpg`, alt: "Interior seats", id: 4 },
  ];

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full bg-white py-2 md:py-10">
      <div className="mx-auto max-w-6xl px-4">
        {/* ===== MOBILE GALLERY ===== */}
        <div className="relative mb-6 h-64 w-full overflow-hidden rounded-xl md:hidden">
          {/* Image */}
          <Image
            src={images[activeIndex].src}
            alt={images[activeIndex].alt}
            fill
            priority
            className="object-cover"
          />

          {/* Left arrow */}
          <button
            onClick={prevImage}
            aria-label="Previous image"
            className="absolute top-1/2 left-3 -translate-y-1/2 rounded-full bg-white/80 p-2 backdrop-blur transition hover:scale-105"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right arrow */}
          <button
            onClick={nextImage}
            aria-label="Next image"
            className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full bg-white/80 p-2 backdrop-blur transition hover:scale-105"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to image ${index + 1}`}
                className={`h-2 w-2 rounded-full transition ${
                  index === activeIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* ===== DESKTOP GALLERY ===== */}
        <div className="hidden items-center justify-between md:flex">
          {/* Left arrow */}
          <button
            onClick={prevImage}
            aria-label="Previous image"
            className="rounded-full p-2 transition hover:shadow-lg"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Main image */}
          <div className="relative h-[650px] w-[830px] overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={images[activeIndex].src}
              alt={images[activeIndex].alt}
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Right arrow */}
          <button
            onClick={nextImage}
            aria-label="Next image"
            className="rounded-full p-2 transition hover:shadow-lg"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        {/* Caption (desktop only) */}
        <p className="my-6 hidden text-center text-gray-800 md:block">
          {activeIndex + 1}/{images.length} – {images[activeIndex].alt}
        </p>

        {/* Thumbnails (desktop only) */}
        <div className="hidden items-center justify-center gap-6 md:flex">
          {images.map((img, index) => (
            <button
              key={img.src}
              onClick={() => setActiveIndex(index)}
              className={`relative h-32 w-40 overflow-hidden rounded-lg border transition ${
                index === activeIndex
                  ? "border-black"
                  : "border-gray-200 opacity-50 hover:opacity-100"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* CTA */}
        <Link
          href="/#quote"
          className="bg-primary hover:bg-primary-50 hover:text-primary-700 mx-auto mt-6 block w-3/5 rounded-md py-2 text-center font-medium text-white transition hover:border md:mx-auto md:mt-10 md:w-fit md:px-6 md:py-3"
        >
          Book Now
        </Link>
      </div>
    </section>
  );
}
