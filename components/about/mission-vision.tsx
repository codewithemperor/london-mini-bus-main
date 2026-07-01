import FadeInSection from "@/utils/fade-in-section";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// AboutSection.tsx
// A responsive Next.js + Tailwind component that recreates the layout in the provided image.
// - Uses alternating image / text rows
// - Mobile-first, stacked on small screens, two-column on md+
// - Rounded images, subtle shadow, accent buttons

const sections = [
  {
    title: "What  ",
    highlight: "Drives",
    text: `We believe that transport should be more than movement — it
    should be reliable, safe, and professional. This guides everything we do at
    London Minibus Rental. Every journey we run reflects our commitment to
    service and safety for our clients.`,
    image: "/buses/bus-1.JPG",
    cta: true,
  },
  {
    title: "Our Mission",
    highlight: "Mission",
    text: `To deliver safe, reliable, and comfortable transport experiences built on
    punctuality, professionalism, and care.`,
    image: "/about/image-1.png",
  },
  {
    title: "Our Vision",
    highlight: "Vision",
    text: `To set the standard for modern and dependable transport where every ride is
    safe, reliable and satisfying.`,
    image: "/about/image-2.png",
  },
  {
    title: "Our Promise",
    highlight: "Promise",
    text: `At the heart of our minibus hire with driver service is a promise to make
    every journey safe and smooth. Whether you're booking transport for an
    airport transfer, school trip, event, or tour, we ensure a reliable and
    comfortable experience every time.`,
    image: "/about/image-3.png",
    cta: true,
  },
];

const Accent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="text-primary">{children}</span>
);

export default function MissionVision() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <div className="space-y-20">
        <FadeInSection delay={200}>
          {sections.map((s, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <div
                key={s.title}
                className={`grid grid-cols-1 items-center gap-8 space-x-6 md:grid-cols-12`}
              >
                {/* Image column */}
                <div
                  className={`md:col-span-6 ${
                    isEven ? "md:order-2" : "md:order-1"
                  }`}
                >
                  <div className="mt-4 overflow-hidden rounded-2xl shadow-lg sm:mt-0">
                    {/* Using the same image for sample; replace src for each section if you have multiple */}
                    <Image
                      src={s.image}
                      alt={s.title}
                      width={1200}
                      height={800}
                      className="block h-auto w-full rounded-2xl object-cover"
                    />
                  </div>
                </div>

                {/* Text column */}
                <div
                  className={`md:col-span-6 ${isEven ? "md:order-1" : "md:order-2"}`}
                >
                  <h3 className="mb-4 text-2xl leading-tight font-extrabold text-slate-900 md:text-3xl">
                    {s.title.split(" ").slice(0, -1).join(" ")}{" "}
                    <Accent>{s.highlight}</Accent>{" "}
                    {s.highlight === "Drives" && "Us"}
                  </h3>

                  <p className="mb-6 leading-relaxed text-slate-600 sm:text-lg">
                    {s.text}
                  </p>

                  <div className="mb-4 flex items-center space-x-4 sm:mb-0">
                    {s.cta && (
                      <Link
                        href="/#quote"
                        className="bg-primary hover:bg-primary-50 hover:text-primary-700 inline-flex items-center rounded-md px-3 py-2.5 font-medium text-white shadow-sm hover:border focus:ring-2 focus:outline-none md:px-5"
                      >
                        Book Your Trip
                      </Link>
                    )}

                    <Link
                      href="/#calculator"
                      className="hover:text-secondary-600 inline-flex items-center font-medium text-slate-500 hover:font-bold"
                    >
                      Calculate Quote →
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </FadeInSection>

        {/* values */}
        <FadeInSection delay={200}>
          {" "}
          <div className="grid grid-cols-1 gap-12 px-4 md:px-12 lg:grid-cols-7">
            <div className="relative col-span-3 hidden h-full rounded-xl shadow-md md:block">
              <Image
                src="/about/image-4.png"
                fill
                className="rounded-xl object-cover"
                alt="a team putting their hands together"
              />
            </div>
            <div className="col-span-4 py-4 md:py-12">
              <div className="space-y-4">
                <h1 className="text-5xl font-bold">
                  Our <span className="text-primary">Values</span>
                </h1>
                <p className="max-w-sm">
                  The principles that guide how we serve and ensure that every
                  trip reflects our commitment to excellence and care
                </p>
              </div>
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <h4 className="font-semibold">Safety First</h4>
                  <p className="text-slate-500">
                    Every journey begins with safety and we ensure complete
                    peace of mind for every passenger.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Reliability</h4>
                  <p className="text-slate-500">
                    We keep our word and are on time, every time. Our clients
                    trust us because we deliver consistently.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Professionalism</h4>
                  <p className="text-slate-500">
                    Our team upholds the highest standards of courtesy,
                    communication, and service in every trip.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold">Customer First</h4>
                  <p className="text-slate-500">
                    Your satisfaction drives us. We go above and beyond to make
                    every trip smooth, comfortable, and fun.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
