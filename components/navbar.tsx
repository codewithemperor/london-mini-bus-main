"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import MobileMenu from "./hamburger-menu";
import { Phone } from "lucide-react";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  const logo = "/logo.png";

  return (
    <header className="sticky top-0 z-40 bg-white/90 shadow-sm sm:px-0 sm:text-sm">
      <div className="container mx-auto flex items-center justify-between px-8 py-2 sm:px-4 lg:px-16">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div
            className="w-36 hover:cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src={logo}
              alt="London Minibus Rental logo"
              width={90}
              height={90}
              priority
            />
          </div>
        </div>

        {/* mobile nav */}
        <MobileMenu />

        {/* nav links */}
        <nav
          className="hidden gap-6 text-slate-600 lg:flex"
          aria-label="Primary navigation"
        >
          <Link
            href="/"
            aria-current={isActive("/") ? "page" : undefined}
            className={`after:bg-secondary relative rounded-md px-2 py-1 transition-all after:absolute after:bottom-0 after:left-1/2 after:h-2.5 after:w-2.5 after:-translate-x-1/2 after:scale-0 after:rounded-full after:opacity-0 after:transition-all after:content-[''] hover:font-semibold hover:after:-bottom-3.5 hover:after:scale-100 hover:after:opacity-100 ${
              isActive("/")
                ? "bg-primary-100/60 font-semibold after:hidden"
                : ""
            }`}
          >
            Home
          </Link>

          <Link
            href="/about"
            aria-current={isActive("/about") ? "page" : undefined}
            className={`after:bg-secondary relative rounded-md px-2 py-1 transition-all after:absolute after:bottom-0 after:left-1/2 after:h-2.5 after:w-2.5 after:-translate-x-1/2 after:scale-0 after:rounded-full after:opacity-0 after:transition-all after:content-[''] hover:font-semibold hover:after:-bottom-3.5 hover:after:scale-100 hover:after:opacity-100 ${
              isActive("/about")
                ? "bg-primary-100/60 font-semibold after:hidden"
                : ""
            }`}
          >
            About Us
          </Link>

          <Link
            href="/services"
            aria-current={isActive("/services") ? "page" : undefined}
            className={`after:bg-secondary relative rounded-md px-2 py-1 transition-all after:absolute after:bottom-0 after:left-1/2 after:h-2.5 after:w-2.5 after:-translate-x-1/2 after:scale-0 after:rounded-full after:opacity-0 after:transition-all after:content-[''] hover:font-semibold hover:after:-bottom-3.5 hover:after:scale-100 hover:after:opacity-100 ${
              isActive("/services")
                ? "bg-primary-100/60 font-semibold after:hidden"
                : ""
            }`}
          >
            Our Services
          </Link>

          <Link
            href="/fleet"
            aria-current={isActive("/fleet") ? "page" : undefined}
            className={`after:bg-secondary relative rounded-md px-2 py-1 transition-all after:absolute after:bottom-0 after:left-1/2 after:h-2.5 after:w-2.5 after:-translate-x-1/2 after:scale-0 after:rounded-full after:opacity-0 after:transition-all after:content-[''] hover:font-semibold hover:after:-bottom-3.5 hover:after:scale-100 hover:after:opacity-100 ${
              isActive("/fleet")
                ? "bg-primary-100/60 font-semibold after:hidden"
                : ""
            }`}
          >
            Fleet
          </Link>

          <Link
            href="/contact"
            aria-current={isActive("/contact") ? "page" : undefined}
            className={`after:bg-secondary relative rounded-md px-2 py-1 transition-all after:absolute after:bottom-0 after:left-1/2 after:h-2.5 after:w-2.5 after:-translate-x-1/2 after:scale-0 after:rounded-full after:opacity-0 after:transition-all after:content-[''] hover:font-semibold hover:after:-bottom-3.5 hover:after:scale-100 hover:after:opacity-100 ${
              isActive("/contact")
                ? "bg-primary-100/60 font-semibold after:hidden"
                : ""
            }`}
          >
            Contact Us
          </Link>
        </nav>

        {/* cta */}
        <div className="hidden space-x-4 md:ml-3 lg:ml-0 lg:flex">
          <Link
            href="/#quote"
            className="bg-secondary hover:bg-secondary-600 rounded-md px-3 py-2 text-black shadow-sm hover:text-white"
          >
            Request Quote
          </Link>
          <a
            href="tel:+442089878046"
            aria-label="Call London Minibus Rental on 020 8987 8046"
            className="text-primary hover:bg-primary-50 flex items-center space-x-2 rounded-md p-2"
          >
            <Phone size={15} /> <span>020 8987 8046</span>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
