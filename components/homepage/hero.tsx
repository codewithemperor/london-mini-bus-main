"use client";
import Link from "next/link";
/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";

const words = ["Affordable", "Reliable", "Comfortable", "Professional"];
const texts = [
  " Enjoy budget friendly group travel with transparent pricing and quotes tailored to your trip",
  "Travel with professional licensed drivers, neatly maintained vehicles and a enjoy a great ride across the UK",
  "Join hundreds of satisfied customers who rely on our safe, and trustworthy minibus hire service for every occasion",
];
const Hero = () => {
  const [index, setIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade out

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setTextIndex((prev) => (prev + 1) % texts.length);
        setFade(true); // fade back in
      }, 500); // fade duration
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-12 pb-8 md:pb-8">
      <div className="container mx-auto grid grid-cols-1 items-center gap-10 px-0 md:px-6">
        <div className="grid w-full">
          <div className="w-fit justify-self-center rounded-2xl bg-indigo-400/10 px-4 py-1 text-black md:justify-self-start">
            <p>We provide efficient minibus service</p>
          </div>

          {/* hero  text */}
          <div
            className={`transition-all duration-500 ease-in-out ${
              fade ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
            }`}
          >
            <h1 className="mt-4 text-center text-3xl leading-tight font-bold sm:text-3xl md:text-left md:text-5xl lg:line-clamp-2 lg:max-w-4xl lg:text-6xl">
              <span className="text-primary">{words[index]}</span> Minibus Hire
              With Driver Across The UK
            </h1>

            <p className="mt-6 max-w-2xl text-center text-slate-800 md:text-left md:text-lg">
              {texts[textIndex]}
            </p>
          </div>

          <div className="mt-8 flex w-full items-center justify-center gap-3 md:justify-start">
            <Link
              href="/#quote"
              className="bg-primary-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg px-3 py-2 text-white hover:border sm:px-6 sm:py-3"
            >
              Book Your Trip
            </Link>
            <Link
              href="/#calculator"
              className="border-primary-100 hover:border-primary border px-3 py-2 text-black not-first:rounded-lg sm:px-6 sm:py-3"
            >
              Calculate Quote
            </Link>
          </div>

          {/* stats */}
          <ul className="sm: mx-auto my-12 flex w-full flex-col items-center justify-center space-y-8 text-center text-lg text-slate-600 sm:flex-row sm:space-y-0 sm:space-x-20 sm:text-left sm:text-xl md:my-20">
            <li className="flex flex-col">
              <strong className="text-2xl font-extrabold text-black sm:text-3xl">
                500+
              </strong>
              <span>Satisfied Customers</span>
            </li>
            <li className="flex flex-col">
              <strong className="text-2xl font-extrabold text-black sm:text-3xl">
                1000+
              </strong>
              <span>Completed Trips</span>
            </li>
            <li className="flex flex-col">
              <strong className="text-2xl font-extrabold text-black sm:text-3xl">
                20+
              </strong>
              <span>Travel Agents Onboarded</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;
