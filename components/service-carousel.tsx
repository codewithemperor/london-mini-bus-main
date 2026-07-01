"use client";

import {
  ArrowRight,
  BookDown,
  BookOpen,
  CakeIcon,
  Calendar1Icon,
  ChevronRight,
  PlaneIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Service = {
  title: string;
  description: string;
  classname?: string;
  icon?: React.ReactNode;
  link: string;
};

type Props = {
  interval?: number;
};

const ServiceCarousel = ({ interval = 5000 }: Props) => {
  const services: Service[] = [
    {
      classname: "bg-primary-700",
      icon: <PlaneIcon size={24} className="text-white" />,
      title: "Airport transfers",
      description:
        "Enjoy punctual and convenient minibus hire with driver to and from all major airports in London and the United Kingdom",
      link: "/services#airport",
    },
    {
      classname: "bg-accent",
      icon: <BookOpen size={24} className="text-white" />,
      title: "School Trips",
      description:
        "We provide safe and secure transport for students, teachers, and staff; perfect for day trips, tours, and educational outings.",
      link: "/services#school",
    },
    {
      classname: "bg-secondary-600",
      icon: <CakeIcon size={24} className="text-white" />,
      title: "Wedding and Events",
      description:
        "Travel with friends and loved ones in our neat and well maintained minibuses for weddings, parties, and special occasions.",
      link: "/services#events",
    },
    {
      classname: "bg-primary-700",
      icon: <BookDown size={24} className="text-white" />,
      title: "Funeral Transport",
      description:
        "We provide funeral minibus hire services and our drivers ensure punctual transport for family and guests.",
      link: "/services#events",
    },
    {
      classname: "bg-primary-700",
      icon: <Calendar1Icon size={24} className="text-white" />,
      title: "Tours and Excursions",
      description:
        "Discover fun sites in London and beyond with our comfortable minibuses ideal for sightseeing and group adventures.",
      link: "/services#tour",
    },
  ];

  // Duplicate for infinite loop
  const items = [...services, ...services];

  const trackRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<number | null>(null);
  const hoverRef = useRef(false);

  const [index, setIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);

  // Responsive items
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setItemsToShow(mq.matches ? 3 : 1);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const cardWidth = 100 / itemsToShow;
  const resetIndex = services.length;
  const maxIndex = resetIndex - itemsToShow;

  // Slide
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const slideWidth = 100 / itemsToShow;

    track.style.transition = "transform 600ms ease";
    track.style.transform = `translateX(-${index * slideWidth}%)`;

    if (index > maxIndex) {
      setTimeout(() => {
        track.style.transition = "none";
        track.style.transform = "translateX(0)";
        setIndex(0);
      }, 600);
    }
  }, [index, itemsToShow]);

  // Autoplay
  useEffect(() => {
    // clear any existing interval
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
    }

    autoplayRef.current = window.setInterval(() => {
      if (!hoverRef.current) {
        setIndex((prev) => prev + 1);
      }
    }, interval);

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [interval, services.length]);

  return (
    <div
      className="relative mx-auto mt-12 hidden w-full lg:block"
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      {/* CONSTANT ARROW (does NOT move) */}
      <button
        onClick={() => setIndex((i) => i + 1)}
        aria-label="Next"
        className="hover:bg-primary-50 absolute top-1/2 right-40 z-30 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg lg:right-30 xl:right-8"
      >
        <ChevronRight size={28} className="text-gray-900" />
      </button>

      {/* VIEWPORT (this is the ONLY overflow-hidden element) */}
      <div className="w-full overflow-hidden">
        {/* TRACK (this moves) */}
        <div
          className="flex py-8"
          ref={trackRef}
          style={{ width: `${items.length * cardWidth}%` }}
        >
          {items.map((s, i) => (
            <div key={`${s.title}-${i}`} style={{ width: `${cardWidth}%` }}>
              <div className="mx-3">
                {" "}
                <div className="relative flex h-full flex-col space-y-4 rounded-4xl bg-white px-6 pt-10 pb-6 shadow-sm hover:shadow-xl">
                  <div
                    className={`absolute -top-6 flex h-12 w-12 items-center justify-center rounded-full ${s.classname}`}
                  >
                    {s.icon}
                  </div>

                  <h3 className="text-xl font-semibold">{s.title}</h3>
                  <p className="w-5/6 text-sm">{s.description}</p>

                  <a
                    href={s.link}
                    className="text-primary-700 mt-auto flex items-center font-semibold"
                  >
                    Read more <ArrowRight size={18} className="ml-2" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCarousel;
