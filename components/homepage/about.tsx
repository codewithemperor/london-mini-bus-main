import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const AboutSection = () => {
  const image1 = "/fleet/ford-1/rear.jpg";
  const image2 = "/fleet/ford-1/interior.jpg";
  return (
    <section className="mt-18 flex flex-col">
      <div className="flex w-full flex-col items-center justify-center">
        <h2 className="text-center text-4xl leading-tight font-bold md:text-6xl">
          About <span className="text-primary">London</span> Minibus Rental
        </h2>
        <p className="mx-auto mt-6 max-w-2xl self-center text-center text-wrap sm:text-xl">
          Why we are your trusted partner for all your trips within and outside
          the United Kingdom
        </p>
      </div>

      <div className="mx-auto my-12 grid gap-12 lg:grid-cols-3">
        {/* images */}
        <div className="relative col-span-1 hidden w-full lg:block">
          <Image
            src={image1}
            width={240}
            height={230}
            className="mr-15 rounded-none"
            alt="Photo of a bus"
          />
          <div className="absolute -right-2 -bottom-2 h-64 w-64 bg-white p-2">
            <Image
              src={image2}
              width={240}
              height={240}
              className="mr-15 rounded-none"
              alt="Photo of a bus"
            />
          </div>
        </div>

        {/* text */}
        <div className="col-span-2 flex w-full flex-col">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold">Why You Should Choose Us</h1>
            <div className="h-1 w-12 bg-amber-400"></div>
          </div>
          <p className="my-5 max-w-lg text-justify text-xs sm:text-lg">
            At London Minibus Rental, we provide affordable and reliable minibus
            hire with driver services across London and the UK. From airport
            transfers and shuttle services to weddings, school trips and
            corporate events, our goal is to make group travel easy, safe, and
            stress free
          </p>
          <p className="max-w-lg text-justify text-xs sm:text-lg">
            With professional drivers and our commitment to customer
            satisfaction, we make every journey smooth and timely. Whether
            you&apos;re traveling locally within London or planning a long
            distance group travel across the UK, we&apos;ve got you covered!{" "}
            <span className="hover:text-secondary-600 text-secondary hover:scale-95 hover:cursor-pointer">
              Read more <ArrowRightIcon className="inline h-4" />
            </span>
          </p>

          <Link
            className="sm:text-md bg-primary-700 hover:bg-primary-50 hover:text-primary-700 mt-8 w-fit self-center rounded-lg px-4 py-3 font-semibold text-white transition group-hover:shadow-lg hover:border hover:shadow-lg sm:self-start sm:text-lg"
            href="/#quote"
          >
            Book Your Trip Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
