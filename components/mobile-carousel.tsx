"use client";

import {
  ArrowRight,
  BookDown,
  BookOpen,
  CakeIcon,
  Calendar1Icon,
  PlaneIcon,
} from "lucide-react";

type Service = {
  title: string;
  description: string;
  classname?: string;
  icon?: React.ReactNode;
  link: string;
};

const MobileServiceCarousel = () => {
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
        "We provide safe and secure transport for students, teachers, and staff; perfect for day trips and educational outings.",
      link: "/services#school",
    },
    {
      classname: "bg-secondary-600",
      icon: <CakeIcon size={24} className="text-white" />,
      title: "Wedding and Events",
      description:
        "Travel with friends and loved ones in our neat, well-maintained minibuses for special occasions.",
      link: "/services#events",
    },
    {
      classname: "bg-primary-700",
      icon: <BookDown size={24} className="text-white" />,
      title: "Funeral Transport",
      description:
        "Punctual and respectful minibus hire services for family and guests.",
      link: "/services#events",
    },
    {
      classname: "bg-primary-700",
      icon: <Calendar1Icon size={24} className="text-white" />,
      title: "Tours and Excursions",
      description:
        "Comfortable minibuses ideal for sightseeing and group adventures.",
      link: "/services#tour",
    },
  ];

  return (
    <div className="mt-4 h-fit w-full lg:hidden">
      {/* Scroll container */}
      <div className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 py-8">
        {services.map((s) => (
          <div key={s.title} className="min-w-[85%] snap-start">
            <div className="relative flex h-full flex-col rounded-3xl bg-white px-6 pt-10 pb-6 shadow-md">
              {/* Icon */}
              <div
                className={`absolute -top-6 flex h-12 w-12 items-center justify-center rounded-full ${s.classname}`}
              >
                {s.icon}
              </div>

              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{s.description}</p>

              <a
                href={s.link}
                className="text-primary-700 mt-auto flex items-center font-semibold"
              >
                Read more <ArrowRight size={16} className="ml-2" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileServiceCarousel;
