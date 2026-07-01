/* eslint-disable @next/next/no-img-element */
"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Testimonial = {
  id: number;
  name: string;
  location: string;
  text: string;
  rating: number;
};

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Aisha",
    location: "Manchester",

    text: "Very professional and comfortable. Will book again. Drivers were friendly and punctual.",
    rating: 5,
  },
  {
    id: 2,
    name: "Liam",
    location: "Bristol",

    text: "Great experience — clean vehicle and excellent service. Highly recommended.",
    rating: 5,
  },
  {
    id: 3,
    name: "Mina",
    location: "Leeds",
    text: "Smooth booking process and friendly drivers. Comfortable trip throughout.",
    rating: 5,
  },
  {
    id: 4,
    name: "Omar",
    location: "Guildford",
    text: "Excellent customer service, punctual, and clean minibuses. Will recommend.",
    rating: 5,
  },
];

export default function Customer() {
  const [active, setActive] = useState<number>(0);
  const [prevActive, setPrevActive] = useState<number | null>(null);

  const [direction, setDirection] = useState<"left" | "right">("right"); // slide direction
  const animatingRef = useRef(false);

  const getAvatarUrl = (name: string) => {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
      name,
    )}&background=0D47A1&color=ffffff&size=256&bold=true`;
  };

  // helper: go to next/prev with wrap
  // const next = () => {
  //   if (animatingRef.current) return;
  //   setDirection("right");
  //   setActive((s) => (s + 1) % TESTIMONIALS.length);
  // };
  // const prev = () => {
  //   if (animatingRef.current) return;
  //   setDirection("left");
  //   setActive((s) => (s - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  // };
  const next = () => {
    if (animatingRef.current) return;
    setDirection("right");
    setPrevActive(active);
    setActive((s) => (s + 1) % TESTIMONIALS.length);
  };

  const prev = () => {
    if (animatingRef.current) return;
    setDirection("left");
    setPrevActive(active);
    setActive((s) => (s - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const getVisibleAvatars = () => {
    const visible = [];
    const total = TESTIMONIALS.length;

    for (let offset = -2; offset <= 2; offset++) {
      visible.push(TESTIMONIALS[(active + offset + total) % total]);
    }

    return visible;
  };

  // optional: keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // When active changes, briefly mark animating to prevent rapid double-click
  useEffect(() => {
    animatingRef.current = true;
    const t = setTimeout(() => (animatingRef.current = false), 420); // should match transition duration
    return () => clearTimeout(t);
  }, [active]);

  return (
    <section className="bg-primary/5 relative mt-18 hidden h-[900px] w-full flex-col items-center justify-center overflow-hidden lg:flex">
      {/* background white blob */}
      <div className="absolute -top-170 h-[1000px] w-[1500px] rounded-full bg-white" />
      <div className="z-50">
        <h2 className="text-center text-4xl leading-tight font-bold md:text-6xl">
          What Our <span className="text-primary">Customers</span> Say
        </h2>
        <p className="mx-auto mt-6 mb-8 max-w-3xl self-center text-center text-xl text-wrap">
          Real stories from happy passengers who trust us for reliable and
          comfortable minibus hire across London
        </p>
      </div>
      {/* Avatar curve row */}
      <div className="relative mt-10 flex space-x-22">
        {getVisibleAvatars().map((r, i) => {
          const isActive = r.id === TESTIMONIALS[active].id;

          // curve math for exactly 5 items
          const mid = 2; // center of five items
          const curveAmount = Math.pow(i - mid, 2) * -15;

          return (
            <button
              key={`avatar-${active}-${i}`}
              onClick={() => {
                const newIndex = TESTIMONIALS.findIndex((t) => t.id === r.id);
                setPrevActive(active);
                setDirection(newIndex > active ? "right" : "left");
                setActive(newIndex);
              }}
              aria-label={`Show testimonial from ${r.name}`}
              className="z-50 flex transform items-center justify-center rounded-full transition-all duration-300"
              style={{
                transform: `translateY(${curveAmount}px) scale(${isActive ? 1.12 : 1})`,
              }}
            >
              <div
                className={`relative overflow-hidden rounded-full transition-shadow duration-300 ${
                  isActive
                    ? "ring-secondary mx-6 ring-4"
                    : "ring-2 ring-white/60"
                }`}
                style={{
                  width: isActive ? 140 : 100,
                  height: isActive ? 140 : 100,
                }}
              >
                <img
                  src={getAvatarUrl(r.name)}
                  alt={r.name}
                  className="h-full w-full rounded-full object-cover"
                  loading="lazy"
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Carousel container — we render every item but position/animate them so only one appears */}
      <div className="relative mt-12 h-[350px] w-[700px] overflow-visible">
        {/* arrows */}
        {TESTIMONIALS[active].id !== 1 && (
          <button
            onClick={prev}
            className="bg-primary-700 absolute top-3/7 -left-8 z-40 -translate-y-1/2 rounded-full p-2 text-white shadow-md hover:scale-105"
            aria-label="previous testimonial"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        )}

        {TESTIMONIALS[active].id !==
          TESTIMONIALS[TESTIMONIALS.length - 1].id && (
          <button
            onClick={next}
            className="bg-primary-700 absolute top-3/7 -right-8 z-40 -translate-y-1/2 rounded-full p-2 text-white shadow-md hover:scale-95"
            aria-label="next testimonial"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
        {/* slides */}
        <div className="relative h-full w-full">
          {TESTIMONIALS.map((r, i) => {
            const offset = i - active;
            const half = Math.floor(TESTIMONIALS.length / 2);
            let normalizedOffset = offset;
            if (offset > half) normalizedOffset = offset - TESTIMONIALS.length;
            if (offset < -half) normalizedOffset = offset + TESTIMONIALS.length;

            const isActive = i === active;

            const baseClass =
              "absolute left-0 top-0 flex h-full w-full items-start justify-center transition-all duration-400 ease-in-out";

            const transform = (() => {
              if (normalizedOffset === 0) return `translateX(0px) scale(1)`;
              return `translateX(${normalizedOffset * 110}%) scale(0.98)`;
            })();

            return (
              <article
                key={r.id}
                className={baseClass}
                style={{
                  transform,
                  opacity: isActive ? 1 : 0,
                  zIndex: isActive ? 30 : 10,
                  transitionProperty: "transform, opacity",
                  transitionDuration: "420ms",
                }}
              >
                <div className="relative mx-auto mt-0 flex h-[300px] w-[700px] flex-col items-center justify-center space-y-4 rounded-2xl bg-white p-10 text-center shadow-md">
                  <h1 className="text-primary-700 text-2xl font-semibold">
                    {r.name}
                  </h1>
                  <p className="text-xl">{r.location}</p>
                  <p className="py-3 text-center">{r.text}</p>

                  <div className="flex justify-center">
                    <div className="flex space-x-2">
                      {/* always show 5 stars; filled according to rating */}
                      {Array.from({ length: 5 }).map((_, idx) =>
                        idx < r.rating ? (
                          <Star key={idx} className="text-secondary h-5 w-5" />
                        ) : (
                          <Star key={idx} className="h-5 w-5 text-gray-200" />
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
