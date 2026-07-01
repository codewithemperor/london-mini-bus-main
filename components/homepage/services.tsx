"use client";
import React from "react";
import ServiceCarousel from "../service-carousel";
import Link from "next/link";
import MobileServiceCarousel from "../mobile-carousel";

const Services = () => {
  return (
    <section className="mt-18 flex flex-col">
      <div className="flex w-full flex-col items-center justify-center">
        <h2 className="text-center text-4xl leading-tight font-bold md:text-6xl">
          Services We <span className="text-primary">Render</span>
        </h2>
        <p className="mx-auto mt-6 mb-8 max-w-3xl self-center text-center text-wrap sm:text-xl">
          Explore the range of minibus hire with driver services we provide
          across London and the UK, designed to make every journey comfortable
          and convenient
        </p>
      </div>
      <MobileServiceCarousel />
      <ServiceCarousel />
      <div className="flex w-full items-center justify-center">
        <Link
          className="sm:text-md bg-primary-700 hover:bg-primary-50 hover:text-primary-700 mt-8 w-fit rounded-lg px-4 py-3 font-semibold text-white transition group-hover:shadow-lg hover:border hover:shadow-lg sm:self-start sm:text-lg"
          href="/services"
        >
          View Services
        </Link>
      </div>
    </section>
  );
};

export default Services;
