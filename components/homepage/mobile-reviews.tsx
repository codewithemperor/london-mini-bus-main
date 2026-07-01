"use client";

import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";

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
    rating: 3,
  },
  {
    id: 4,
    name: "Omar",
    location: "Guildford",

    text: "Excellent customer service, punctual, and clean minibuses. Will recommend.",
    rating: 5,
  },
  {
    id: 5,
    name: "Sophie",
    location: "Croydon",
    text: "Booked for an airport transfer and everything ran exactly on time. Clear updates and a spotless minibus.",
    rating: 5,
  },
  {
    id: 6,
    name: "Daniel",
    location: "Camden",
    text: "Our corporate group had a smooth journey across London. The driver was calm, helpful, and professional.",
    rating: 5,
  },
  {
    id: 7,
    name: "Priya",
    location: "Ilford",
    text: "Easy booking, fair pricing, and plenty of room for bags. I would happily use them for family trips again.",
    rating: 5,
  },
  {
    id: 8,
    name: "George",
    location: "Wembley",
    text: "Reliable service for our event pickup. The team handled timing changes without any fuss.",
    rating: 5,
  },
];

export default function CustomerReviewMobile() {
  const [index, setIndex] = useState(0);

  const total = TESTIMONIALS.length;
  const review = TESTIMONIALS[index];

  const next = () => setIndex((i) => Math.min(i + 1, total - 1));

  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  return (
    <section className="bg-primary/5 mt-12 px-4 py-16 lg:hidden">
      {/* Title */}
      <h2 className="text-center text-4xl font-bold">
        What Our <span className="text-primary">Customers</span> Say
      </h2>

      {/* Card */}
      <div className="relative mt-10 rounded-2xl bg-white p-6 text-center shadow-lg">
        {/* Avatar */}
        <div className="bg-primary-700 mx-auto mb-8 flex h-40 w-40 items-center justify-center rounded-full text-5xl font-bold text-white shadow-xl">
          {review.name.slice(0, 1)}
        </div>

        {/* Name */}
        <h3 className="text-primary-700 text-lg font-semibold">
          {review.name}
        </h3>
        <p className="text-gray-500">{review.location}</p>

        {/* Review */}
        <p className="mt-4 leading-relaxed text-gray-700">{review.text}</p>

        {/* Stars */}
        <div className="mt-4 flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < review.rating ? "text-secondary" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Controls */}
        <div className="mt-6 flex items-center justify-between">
          {TESTIMONIALS[index].id !== 1 && (
            <button
              onClick={prev}
              className="bg-primary rounded-full p-2 text-white"
              aria-label="Previous"
            >
              <ChevronLeft />
            </button>
          )}

          <span className="text-xs text-gray-400">
            {index + 1} / {total}
          </span>

          {TESTIMONIALS[index].id !==
            TESTIMONIALS[TESTIMONIALS.length - 1].id && (
            <button
              onClick={next}
              className="bg-primary rounded-full p-2 text-white"
              aria-label="Next"
            >
              <ChevronRight />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
