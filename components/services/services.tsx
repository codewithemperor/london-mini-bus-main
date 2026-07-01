"use client";
import FadeInSection from "@/utils/fade-in-section";
import Image from "next/image";
import Link from "next/link";

export default function Services() {
  return (
    <section className="py-24">
      <div className="flex w-full flex-col items-center justify-center">
        <h2 className="text-center text-4xl leading-tight font-bold md:text-6xl">
          Services We <span className="text-primary">Render</span>
        </h2>
        <p className="mx-auto mt-6 mb-8 max-w-3xl self-center px-4 text-center md:px-0 md:text-xl">
          Explore the range of minibus hire with driver services we provide
          across London and the UK, designed to make every journey comfortable
          and convenient
        </p>
      </div>

      {/* Services */}

      <div className="mx-auto max-w-6xl space-y-24">
        {/* 1 */}
        <FadeInSection delay={200}>
          <div
            id="airport"
            className="group mx-auto flex flex-col items-center gap-12 px-5 md:mx-0 md:grid md:grid-cols-5 md:px-0"
          >
            <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-500" />
            {/* Image */}
            <div className="relative col-span-3 h-40 w-full overflow-hidden rounded-2xl md:h-[380px]">
              <Image
                src="/services/airport.png"
                alt="Airport Transfers"
                fill
                className="object-cover transition duration-500 ease-out group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="mx-auto px-3 md:col-span-2">
              <h3 className="mb-4 text-lg font-bold md:text-2xl">
                Airport Transfers
                <span className="ml-3 inline-block h-1 w-12 bg-orange-400 align-middle transition-all duration-500 group-hover:w-20" />
              </h3>

              {/* description */}

              <div className="flex flex-col space-y-1 text-justify">
                <p className="mb-6 w-full leading-relaxed">
                  Our airport transfer service in London provides comfortable,
                  punctual, and professional transport to and from all major
                  airports including Heathrow, Gatwick, Stansted, Luton, and
                  London City Airport.
                </p>
                <p className="mb-6 w-full leading-relaxed">
                  If you are catching an early morning flight or arriving late
                  at night, our minibus hire with driver promises a smooth
                  journey every time. We monitor flight schedules in real time
                  to allow us adjust for delays; this way our assigned driver is
                  right there when you need them and on time.
                </p>
              </div>

              <button className="bg-primary-700 hover:bg-primary-50 hover:text-primary-700 mt-4 rounded-md px-3 py-2 font-medium text-white transition-all duration-300 group-hover:shadow-lg hover:border md:px-6 md:py-3">
                <Link href="/#quote">Book Now</Link>
              </button>
            </div>
          </div>
        </FadeInSection>

        {/* 2 */}
        <FadeInSection delay={200}>
          {" "}
          <div
            id="school"
            className="group mx-auto flex flex-col items-center gap-12 px-5 md:mx-0 md:grid md:grid-cols-5 md:px-0"
          >
            <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-500" />
            {/* Image */}
            <div className="relative col-span-3 h-40 w-full overflow-hidden rounded-2xl md:hidden">
              <Image
                src="/services/school.png"
                alt="Airport Transfers"
                fill
                className="object-cover transition duration-500 ease-out group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="mx-auto px-3 md:col-span-2">
              <h3 className="mb-4 text-2xl font-bold">
                School Trips
                <span className="ml-3 inline-block h-1 w-12 bg-orange-400 align-middle transition-all duration-500 group-hover:w-20" />
              </h3>

              {/* description */}
              <div className="flex flex-col space-y-1 text-justify">
                <p className="mb-6 w-full leading-relaxed">
                  Our school trips and minibus hire services in London are
                  designed to make every journey for students smooth, safe, and
                  well coordinated. We work with schools, colleges, and
                  educational institutions to provide dependable transport for
                  school trips, daily school runs, football games, excursions,
                  and extracurricular activities.
                </p>
                <p className="mb-6 w-full leading-relaxed">
                  Our drivers are experienced, DBS-checked, and trained to
                  prioritize child safety, so schools and parents can have
                  complete peace of mind. With our flexible booking options and
                  a focus on punctuality, we make school transport across the UK
                  easy, reliable, and stress-free.
                </p>
              </div>

              <button className="bg-primary-700 hover:bg-primary-50 hover:text-primary-700 mt-4 rounded-md px-3 py-2 font-medium text-white transition-all duration-300 group-hover:shadow-lg hover:border md:px-6 md:py-3">
                <Link href="/#quote"> Book Now</Link>
              </button>
            </div>

            {/* Image */}
            <div className="relative col-span-3 hidden h-[380px] w-full overflow-hidden rounded-2xl md:block">
              <Image
                src="/services/school.png"
                alt="Airport Transfers"
                fill
                className="object-cover transition duration-500 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        </FadeInSection>

        {/* 3 */}
        <FadeInSection delay={200}>
          {" "}
          <div
            id="events"
            className="group mx-auto flex flex-col items-center gap-12 px-5 md:mx-0 md:grid md:grid-cols-5 md:px-0"
          >
            <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-500" />
            {/* Image */}
            <div className="relative col-span-3 h-40 w-full overflow-hidden rounded-2xl md:h-[380px]">
              <Image
                src="/services/wedding.png"
                alt="Airport Transfers"
                fill
                className="object-cover transition duration-500 ease-out group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="mx-auto px-3 md:col-span-2">
              <h3 className="mb-4 text-2xl font-bold">
                Weddings and Events
                <span className="ml-3 inline-block h-1 w-12 bg-orange-400 align-middle transition-all duration-500 group-hover:w-20" />
              </h3>

              {/* description */}

              <div className="flex flex-col space-y-1 text-justify">
                <p className="mb-6 w-full leading-relaxed">
                  At London Minibus Rental, we understand how important life’s
                  special moments are; from weddings and birthdays to family
                  gatherings and memorials. Our professional minibus hire with
                  driver service ensures your guests arrive safely, comfortably,
                  and on time.
                </p>
                <p className="mb-6 w-full leading-relaxed">
                  Whether you’re planning a wedding in London, attending a
                  funeral service, or organising a birthday celebration with
                  friends, we provide reliable group transport that takes the
                  stress out of travel off you. We know that every event is
                  unique, that is why we offer flexible pick up points and
                  friendly drivers who prioritise your comfort.
                </p>
              </div>

              <button className="bg-primary-700 hover:bg-primary-50 hover:text-primary-700 mt-4 rounded-md px-3 py-2 font-medium text-white transition-all duration-300 group-hover:shadow-lg hover:border md:px-6 md:py-3">
                <Link href="/#quote">Book Now</Link>
              </button>
            </div>
          </div>
        </FadeInSection>

        {/* 4 */}
        <FadeInSection delay={200}>
          {" "}
          <div
            id="tour"
            className="group mx-auto flex flex-col items-center gap-12 px-5 md:mx-0 md:grid md:grid-cols-5 md:px-0"
          >
            <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-500" />
            {/* image */}
            <div className="relative col-span-3 h-40 w-full overflow-hidden rounded-2xl md:hidden">
              <Image
                src="/services/tour.png"
                alt="Airport Transfers"
                fill
                className="object-cover transition duration-500 ease-out group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="mx-auto px-3 md:col-span-3">
              <h3 className="mb-4 text-2xl font-bold">
                Tours and Excursion
                <span className="ml-3 inline-block h-1 w-12 bg-orange-400 align-middle transition-all duration-500 group-hover:w-20" />
              </h3>

              {/* description */}

              <div className="flex flex-col space-y-1 text-justify">
                <p className="mb-6 w-full leading-relaxed">
                  Discover London and beyond with our comfortable minibus hire
                  for tours and excursions. If you&apos;re going on a day trip,
                  sightseeing tour or weekend getaway, we make your travel easy,
                  fun, and stress free. Our experienced drivers know the best
                  routes and attractions across London and the UK; from historic
                  landmarks and museums to scenic countryside spots.
                </p>
                <p className="font-bold">Popular tour destinations include:</p>
                <ul className="list-disc">
                  <li>
                    Central London landmarks (Buckingham Palace, Tower Bridge,
                    London Eye, Westminster Abbey)
                    <li>Theme parks like Thorpe Park and Legoland Windsor</li>
                    <li>
                      Seaside places in Brighton, Southend, or Bournemouth
                    </li>
                  </li>
                  <li>
                    Countryside adventures to Oxford, Cambridge, or the
                    Cotswolds
                  </li>
                </ul>

                <p className="">
                  Sit back and enjoy the journey while we handle the driving,
                  parking, and logistics
                </p>
              </div>

              <button className="bg-primary-700 hover:bg-primary-50 hover:text-primary-700 mt-4 rounded-md px-3 py-2 font-medium text-white transition-all duration-300 group-hover:shadow-lg hover:border md:px-6 md:py-3">
                <Link href="/#quote">Book Now</Link>
              </button>
            </div>

            {/* Image */}
            <div className="relative col-span-2 hidden h-[380px] w-full overflow-hidden rounded-2xl md:block">
              <Image
                src="/services/tour.png"
                alt="Airport Transfers"
                fill
                className="object-center transition duration-500 ease-out group-hover:scale-105"
              />
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
