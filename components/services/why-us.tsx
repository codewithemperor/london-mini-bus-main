// app/components/WhyUs.tsx
import Image from "next/image";
import Clients from "../clients";
import Fleet from "../homepage/fleet";
import Link from "next/link";

const reasons = [
  {
    title: "Comfortable Seats",
    image: "/buses/inside-bus.png",
    desc: "Our minibuses have clean, spacious, and well cushioned seats to keep every passenger comfortable throughout their trips.",
  },
  {
    title: "Professional Drivers",
    image: "/services/driver.png",
    desc: "Our professional and warm drivers uphold the highest standards of service, ensuring every trip runs smoothly and that you are comfortable during your trip.",
  },
  {
    title: "Customer Satisfaction",
    image: "/services/customer.png",
    desc: "Our services are built around your satisfaction. From your first call to the final drop-off, every step of your journey matters to us. ",
  },
  {
    title: "Ample Luggage Space",
    image: "/services/luggage.png",
    desc: "Our minibuses offer plenty of space to safely store your luggage, thereby making every trip comfortable and easy. Proceed to make your booking with us.",
  },
  {
    title: "Child Friendly Travel",
    image: "/services/child.png",
    desc: "Our minibuses are equipped with adjustable seat belts suitable for children aged 1 and above, which ensures a secure and comfortable ride for every passenger",
  },
  {
    title: "Baby Seats Available",
    image: "/services/baby.png",
    desc: "Your child’s comfort and safety matter to us. We offer baby seats for families on all trips. On request, our minibuses are equipped with safe baby seats.",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-gray-50 py-8 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex w-full flex-col items-center justify-center">
          <h2 className="text-center text-4xl leading-tight font-bold md:text-6xl">
            Why Our Clients <span className="text-primary">Love</span> Us
          </h2>
          <p className="mx-auto mt-6 mb-8 max-w-3xl self-center px-3 text-center md:text-xl">
            We&apos;re loved for our punctuality, professionalism, and personal
            touch
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((item, i) => (
            <div
              key={i}
              className="group rounded-3xl bg-white p-4 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative mb-4 h-40 w-full overflow-hidden rounded-xl">
                {/* overlay */}
                <div className="pointer-events-none absolute inset-0 bg-black/0 transition duration-300 group-hover:bg-black/20" />

                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition duration-500 ease-out group-hover:scale-105"
                />
              </div>

              <h4 className="group-hover:text-primary mb-2 font-bold transition-colors duration-300">
                {item.title}
              </h4>

              <p className="mb-2 transition-colors duration-300 group-hover:text-gray-700">
                {item.desc}
              </p>

              <a
                href="#"
                className="text-primary-700 inline-flex items-center font-medium transition-all duration-300 group-hover:translate-x-1"
              >
                Book Now{" "}
                <span className="ml-1 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-8 w-full text-center md:mt-12">
          <Link
            href="/#quote"
            className="bg-primary-700 hover:bg-primary-50 hover:text-primary-700 mt-12 w-fit rounded-md px-10 py-3 font-medium text-white transition-all duration-300 hover:border hover:shadow-lg"
          >
            Get Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
}
