"use client";

import Image from "next/image";
import React from "react";

const clients = [
  { src: "/services/client-1.webp", alt: "Monsta logo" },
  { src: "/services/client-2.webp", alt: "Gallions logo" },
  { src: "/services/client-3.webp", alt: "Sandblast logo" },
  { src: "/services/client-4.webp", alt: "Openworks logo" },
];

const Clients = () => {
  return (
    <section className="mt-18 flex w-full flex-col items-center space-y-6 text-center">
      <h2 className="px-8 text-xl font-semibold md:px-0 md:text-3xl">
        Some of our corporate clients across the UK
      </h2>

      <div className="mx-auto hidden w-full max-w-6xl items-center justify-center gap-16 overflow-hidden md:flex">
        {clients.map((client, i) => (
          <div
            key={i}
            className="group relative transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-105"
          >
            {/* Logo */}
            <Image
              src={client.src}
              alt={client.alt}
              width={170}
              height={170}
              className="relative z-10 opacity-80 transition-all duration-300 group-hover:opacity-100"
            />
          </div>
        ))}
      </div>

      {/* mobile */}
      <div className="flex flex-col space-y-3 sm:hidden">
        {clients.map((client, i) => (
          <Image
            src={client.src}
            alt={client.alt}
            key={i}
            width={150}
            height={150}
            className="relative z-10 opacity-80 transition-all duration-300 group-hover:opacity-100"
          />
        ))}
      </div>
    </section>
  );
};

export default Clients;
