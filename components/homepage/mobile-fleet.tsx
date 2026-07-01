/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const images = [
  "/buses/bus-1.webp",
  "/buses/bus-2.webp",
  "/buses/bus-3.webp",
  "/buses/bus-4.webp",
  "/buses/bus-5.webp",
  "/buses/bus-6.webp",
];

export default function FleetMobile() {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const triggerNext = () => {
    setIsFading(true);
    setTimeout(() => {
      setIndex((i) => (i + 1) % images.length);
      setIsFading(false);
    }, 300); // must match fade duration
  };

  const triggerPrev = () => {
    setIsFading(true);
    setTimeout(() => {
      setIndex((i) => (i - 1 + images.length) % images.length);
      setIsFading(false);
    }, 300);
  };

  /* ---------- Swipe handlers ---------- */
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;

    const deltaX = touchStartX.current - e.changedTouches[0].clientX;
    const SWIPE_THRESHOLD = 50;

    if (deltaX > SWIPE_THRESHOLD) triggerNext();
    if (deltaX < -SWIPE_THRESHOLD) triggerPrev();

    touchStartX.current = null;
  };

  /* ---------- Auto slide ---------- */
  useEffect(() => {
    const interval = setInterval(() => {
      triggerNext();
    }, 2000); // 4s feels right for mobile

    return () => clearInterval(interval);
  }, []);
  return (
    <section className="w-full px-4 py-16 md:hidden">
      {/* Title */}
      <h2 className="text-center text-4xl font-bold">
        Our <span className="text-primary">Fleet</span>
      </h2>
      <p className="mx-auto mt-4 max-w-md px-3 text-center text-gray-600">
        Modern, clean, and comfortable minibuses, from 8 to 16 seaters.
      </p>

      {/* Swipe + Fade Image */}
      <div
        className="relative mx-auto mt-8 h-64 w-full touch-pan-y overflow-hidden rounded-xl bg-white shadow-lg"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[index]}
          alt="Minibus"
          draggable={false}
          className={`h-full w-full object-cover transition-opacity duration-300 select-none ${
            isFading ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      {/* Indicator */}
      {/* <div className="mt-4 flex justify-center gap-3">
        {images.map((_, i) => (
          <span
            key={i}
            className={`h-3 w-3 rounded-full transition-all duration-300 ${
              i === index ? "bg-primary scale-110" : "bg-gray-300"
            }`}
          />
        ))}
      </div> */}

      {/* CTA */}
      <Link
        href="/fleet"
        className="mx-auto mt-8 block w-fit rounded-xl bg-indigo-900 px-6 py-3 font-medium text-white shadow transition hover:-translate-y-0.5"
      >
        View Full Fleet
      </Link>
    </section>
  );
}
