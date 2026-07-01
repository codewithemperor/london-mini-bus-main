"use client";
import FadeInSection from "@/utils/fade-in-section";
import {
  BriefcaseBusiness,
  Bus,
  Fan,
  Palette,
  Users2,
  Wifi,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Buses = () => {
  return (
    <section className="px-6 py-16 md:px-0 md:py-24">
      <div className="flex w-full flex-col items-center justify-center">
        <h1 className="text-center text-4xl leading-tight font-bold md:text-6xl">
          Services We <span className="text-primary">Render</span>
        </h1>
        <p className="mx-auto mt-6 mb-8 max-w-3xl self-center text-center md:text-xl">
          Explore the range of minibus hire with driver services we provide
          across London and the UK, designed to make every journey comfortable
          and convenient
        </p>
      </div>

      {/* Details */}

      <div className="mx-auto max-w-6xl space-y-24">
        {/* 1 */}
        <FadeInSection delay={200}>
          <div className="mx-auto max-w-6xl space-y-24">
            <div
              id="airport"
              className="group grid items-center gap-12 md:grid-cols-5"
            >
              <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/20" />
              {/* Image */}
              <div className="relative col-span-3 h-[380px] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/buses/bus-7.webp"
                  alt="Airport Transfers"
                  fill
                  className="object-cover transition duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="col-span-2">
                <h3 className="mb-4 text-2xl font-bold">
                  Executive Mercedes
                  <span className="ml-3 inline-block h-1 w-12 bg-orange-400 align-middle transition-all duration-500 group-hover:w-20" />
                </h3>

                {/* description */}
                <div className="mb-3 flex flex-col space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <Users2 size={18} />
                    </div>
                    <p>Sixteen Seater</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <Fan size={18} />
                    </div>
                    <p>Air Conditioned</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <BriefcaseBusiness size={18} />
                    </div>
                    <p>Ample luggage space</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <Bus size={18} />
                    </div>
                    <p>Comfortable and safe buses</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <Wifi size={18} />
                    </div>
                    <p>Free Wifi</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <Palette size={18} />
                    </div>
                    <p>White Color</p>
                  </div>
                </div>

                <button className="bg-primary-700 hover:bg-primary-50 hover:text-primary-700 mt-4 rounded-md px-6 py-3 font-medium text-white transition-all duration-300 group-hover:shadow-lg hover:-translate-y-1 hover:cursor-pointer hover:border">
                  <Link href={"/fleet/mercedes-1"}>View Images</Link>
                </button>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* 2 */}
        <FadeInSection delay={200}>
          <div className="mx-auto max-w-6xl space-y-24">
            <div
              id="airport"
              className="group grid items-center gap-12 md:grid-cols-5"
            >
              <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/20" />
              {/* image for mobile */}
              <div className="relative col-span-3 h-[380px] w-full overflow-hidden rounded-2xl md:hidden">
                <Image
                  src="/buses/bus-8.webp"
                  alt="Airport Transfers"
                  fill
                  className="object-cover transition duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="col-span-2">
                <h3 className="mb-4 text-2xl font-bold">
                  Ford Transit Minibus
                  <span className="ml-3 inline-block h-1 w-12 bg-orange-400 align-middle transition-all duration-500 group-hover:w-20" />
                </h3>

                {/* description */}
                <div className="mb-3 flex flex-col space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <Users2 size={18} />
                    </div>
                    <p>Sixteen Seater</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <Fan size={18} />
                    </div>
                    <p>Air Conditioned</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <BriefcaseBusiness size={18} />
                    </div>
                    <p>Ample luggage space</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <Bus size={18} />
                    </div>
                    <p>Comfortable and safe buses</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <Wifi size={18} />
                    </div>
                    <p>Free Wifi</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <Palette size={18} />
                    </div>
                    <p>Grey Color</p>
                  </div>
                </div>

                <button className="bg-primary-700 hover:bg-primary-50 hover:text-primary-700 mt-4 rounded-md px-6 py-3 font-medium text-white transition-all duration-300 group-hover:shadow-lg hover:-translate-y-1 hover:cursor-pointer hover:border">
                  <Link href={"/fleet/ford-1"}>View Images</Link>
                </button>
              </div>

              {/* Image */}
              <div className="relative col-span-3 hidden h-[380px] w-full overflow-hidden rounded-2xl md:block">
                <Image
                  src="/buses/bus-8.webp"
                  alt="Airport Transfers"
                  fill
                  className="object-cover transition duration-500 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* 3 */}
        <FadeInSection delay={200}>
          <div className="mx-auto max-w-6xl space-y-24">
            <div
              id="airport"
              className="group grid items-center gap-12 md:grid-cols-5"
            >
              <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/20" />
              {/* Image */}
              <div className="relative col-span-3 h-[380px] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/buses/bus-9.webp"
                  alt="Airport Transfers"
                  fill
                  className="object-cover transition duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="col-span-2">
                <h3 className="mb-4 text-2xl font-bold">
                  Ford Transit Minibus
                  <span className="ml-3 inline-block h-1 w-12 bg-orange-400 align-middle transition-all duration-500 group-hover:w-20" />
                </h3>

                {/* description */}
                <div className="mb-3 flex flex-col space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <Users2 size={18} />
                    </div>
                    <p>Sixteen Seater</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <Fan size={18} />
                    </div>
                    <p>Air Conditioned</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <BriefcaseBusiness size={18} />
                    </div>
                    <p>Ample luggage space</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <Bus size={18} />
                    </div>
                    <p>Comfortable and safe buses</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <Wifi size={18} />
                    </div>
                    <p>Free Wifi</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <Palette size={18} />
                    </div>
                    <p>Blue Color</p>
                  </div>
                </div>

                <button className="bg-primary-700 hover:bg-primary-50 hover:text-primary-700 mt-4 rounded-md px-6 py-3 font-medium text-white transition-all duration-300 group-hover:shadow-lg hover:-translate-y-1 hover:cursor-pointer hover:border">
                  <Link href={"/fleet/ford-2"}> View Images</Link>
                </button>
              </div>
            </div>
          </div>
        </FadeInSection>

        {/* 4 */}
        <FadeInSection delay={200}>
          <div className="mx-auto max-w-6xl space-y-24">
            <div
              id="airport"
              className="group grid items-center gap-12 md:grid-cols-5"
            >
              <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-500 group-hover:bg-black/20" />

              {/* image for mobile */}
              <div className="relative col-span-3 h-[380px] w-full overflow-hidden rounded-2xl md:hidden">
                <Image
                  src="/buses/bus-8.webp"
                  alt="Airport Transfers"
                  fill
                  className="object-cover transition duration-500 ease-out group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="col-span-2">
                <h3 className="mb-4 text-2xl font-bold">
                  Ford Transit Minibus
                  <span className="ml-3 inline-block h-1 w-12 bg-orange-400 align-middle transition-all duration-500 group-hover:w-20" />
                </h3>

                {/* description */}
                <div className="mb-3 flex flex-col space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <Users2 size={18} />
                    </div>
                    <p>Sixteen Seater</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <Fan size={18} />
                    </div>
                    <p>Air Conditioned</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <BriefcaseBusiness size={18} />
                    </div>
                    <p>Ample luggage space</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <Bus size={18} />
                    </div>
                    <p>Comfortable and safe buses</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <Wifi size={18} />
                    </div>
                    <p>Free Wifi</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-primary-700 bg-primary-50 flex h-8 w-8 items-center justify-center rounded-full">
                      <Palette size={18} />
                    </div>
                    <p>White Color</p>
                  </div>
                </div>

                <button className="bg-primary-700 hover:bg-primary-50 hover:text-primary-700 mt-4 rounded-md px-6 py-3 font-medium text-white transition-all duration-300 group-hover:shadow-lg hover:-translate-y-1 hover:cursor-pointer hover:border">
                  <Link href={"/fleet/ford-2"}> View Images</Link>
                </button>
              </div>

              {/* Image */}
              <div className="relative col-span-3 hidden h-[380px] w-full overflow-hidden rounded-2xl md:block">
                <Image
                  src="/buses/bus-10.webp"
                  alt="Airport Transfers"
                  fill
                  className="object-cover transition duration-500 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
};

export default Buses;
