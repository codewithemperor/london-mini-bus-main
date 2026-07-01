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
  fadeDuration?: number;
};

const ServiceCarousel = ({ interval = 7500, fadeDuration = 1200 }: Props) => {
  const servicesRendered: Service[] = [
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
        "We provide funeral minibus hire services and our drivers ensure punctual transport for family an guests on the trip.",
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
  const carouselRef = useRef<HTMLDivElement>(null);

  const n = servicesRendered.length;
  const [itemsToShow, setItemsToShow] = useState<number>(3); // default large
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);
  const autoplayRef = useRef<number | null>(null);
  const hoverRef = useRef(false);

  // Keep an up-to-date copy for timers
  const intervalRef = useRef(interval);
  intervalRef.current = interval;

  // Detect breakpoint: 1 item on small screens, 3 on large (lg breakpoint ~ 1024px)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(min-width: 1024px)"); // lg
    const setFromQuery = () => setItemsToShow(mq.matches ? 3 : 1);
    setFromQuery();

    // Add listener
    if ("addEventListener" in mq) {
      mq.addEventListener("change", setFromQuery);
    } else {
      // Safari fallback
      // @ts-expect-error desc
      mq.addListener(setFromQuery);
    }

    return () => {
      if ("removeEventListener" in mq) {
        mq.removeEventListener("change", setFromQuery);
      } else {
        // @ts-expect-error desc

        mq.removeListener(setFromQuery);
      }
    };
  }, []);

  // Helper to compute visible slice (wrap-around)
  const getVisible = (start: number) => {
    const res: Service[] = [];
    for (let i = 0; i < itemsToShow; i++) {
      res.push(servicesRendered[(start + i) % n]);
    }
    return res;
  };

  // Advance one step (used by arrow or autoplay)
  const advance = (step = 1) => {
    // trigger fade-out
    setIsFading(true);

    // wait fadeDuration then change index and fade-in
    window.setTimeout(() => {
      setActiveIndex((prev) => (prev + step) % n);
      setIsFading(false);
    }, fadeDuration);
  };

  // Autoplay loop
  useEffect(() => {
    // don't autoplay if there's nothing or only 1 item in total
    if (n <= 1) return;

    const startAutoplay = () => {
      stopAutoplay();
      autoplayRef.current = window.setInterval(() => {
        if (!hoverRef.current) advance(1);
      }, intervalRef.current);
    };

    const stopAutoplay = () => {
      if (autoplayRef.current !== null) {
        clearInterval(autoplayRef.current);
        autoplayRef.current = null;
      }
    };

    startAutoplay();
    return () => stopAutoplay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n, itemsToShow, fadeDuration]);

  // Pause on hover
  const handleMouseEnter = () => {
    hoverRef.current = true;
  };
  const handleMouseLeave = () => {
    hoverRef.current = false;
  };

  // Click right arrow: advance immediately (reset autoplay visually)
  const handleArrowClick = () => {
    advance(1);
  };

  const visible = getVisible(activeIndex);

  return (
    <div
      className="relative mx-auto mt-12"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Right Arrow */}
      <button
        onClick={handleArrowClick}
        aria-label="Next"
        className="hover:bg-primary-50 absolute top-1/2 right-0 z-10 -translate-y-1/2 transition-transform hover:scale-105 hover:rounded-full lg:-right-12 lg:p-3"
      >
        <ChevronRight size={28} />
      </button>

      {/* Fade container: we animate opacity on change */}
      <div
        className={`flex items-stretch justify-center gap-6 py-4 lg:px-8`}
        // Use Tailwind transition for smooth fade; also set pointer events none while fading to avoid double-clicks
        style={{
          transition: `opacity ${fadeDuration}ms ease`,
          opacity: isFading ? 0 : 1,
          pointerEvents: isFading ? "none" : "auto",
        }}
      >
        {/* Render visible cards */}
        {visible.map((s, idx) => (
          <div
            key={`${activeIndex}-${idx}-${s.title}`}
            className={`/* default mobile: show 1 full width */ /* lg+: 3 items fit across */ relative flex min-w-full flex-col space-y-4 rounded-4xl px-6 pt-10 pb-4 shadow-sm hover:shadow-xl lg:min-w-[33.333%]`}
          >
            <div
              className={`absolute -top-6 flex h-12 w-12 items-center justify-center rounded-full ${s.classname ?? ""}`}
            >
              {s.icon}
            </div>

            <h1 className="text-xl font-semibold">{s.title}</h1>
            <p className="max-w-sm">{s.description}</p>

            <a
              href={s.link}
              className="text-primary-700 flex items-center font-semibold"
            >
              Read more
              <span className="ml-2 inline-block">
                <ArrowRight size={18} />
              </span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCarousel;
