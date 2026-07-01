"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Fleet = () => {
  const images = [
    "/buses/bus-1.JPG",
    "/buses/bus-2.png",
    "/buses/bus-3.JPG",
    "/buses/bus-4.png",
    "/buses/bus-5.png",
    "/buses/bus-6.png",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000); // change slide every 4s

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="my-6 hidden flex-col md:my-18 md:flex">
      <div className="flex flex-col items-center">
        <h2 className="text-center text-4xl font-bold md:text-6xl">
          Our <span className="text-primary">Fleet</span> Of Minibuses
        </h2>
        <p className="mx-auto mt-6 mb-8 max-w-3xl text-center sm:text-xl">
          From 8-seaters to 16-seaters, our modern and well-maintained vehicles
          ready to take you anywhere in comfort
        </p>
      </div>

      <div className="relative mx-auto h-[700px] w-4/5 overflow-hidden">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt="Minibus"
            fill
            priority={i === 0}
            className={`absolute inset-0 object-cover transition-opacity duration-1000 ease-in-out ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      <Link
        href="/fleet"
        className="hover:bg-primary-50 hover:text-primary-700 mx-auto mt-8 rounded-xl bg-indigo-900 px-6 py-3 text-white shadow-md transition"
      >
        View Fleet
      </Link>
    </section>
  );
};

export default Fleet;
