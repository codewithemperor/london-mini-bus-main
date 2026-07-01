"use client";
import Image from "next/image";
import { Facebook, Instagram, LinkedinIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="bg-primary/10 flex flex-col items-center justify-center text-slate-800">
      {/* Top area */}
      <div className="flex max-w-7xl items-center px-6 py-16 text-sm sm:px-10">
        <div className="grid grid-cols-1 items-start justify-between gap-8 md:grid-cols-7 md:gap-0">
          {/* Logo & tagline */}
          <div className="flex flex-col items-center justify-center md:col-span-1 md:items-start">
            <Link href="/" className="hover:cursor-pointer">
              <div className="h-auto">
                <Image
                  src="/logo.png"
                  alt="London Minibus Rental logo"
                  width={90}
                  height={48}
                  className="object-contain"
                />
              </div>
            </Link>

            <p className="w-3/5 text-center sm:w-full sm:text-left">
              The perfect minibus service for all your transport needs
            </p>
          </div>
          <div className="col-span-1" />
          {/* Columns */}
          <div
            className="grid gap-8 md:col-span-3 md:grid-cols-3 md:gap-0 md:justify-self-center"
            aria-label="Footer navigation"
          >
            <div>
              <h3 className="mb-4 text-lg font-bold">Company</h3>
              <ul className="space-y-3">
                <li
                  className={`${pathname === "/" && "text-primary font-extrabold"} hover:scale-105 hover:font-bold`}
                >
                  <Link
                    href="/"
                    aria-current={pathname === "/" ? "page" : undefined}
                  >
                    Home
                  </Link>
                </li>
                <li
                  className={`${pathname === "/about" && "text-primary font-extrabold"} hover:scale-105 hover:font-bold`}
                >
                  <Link
                    href="/about"
                    aria-current={pathname === "/about" ? "page" : undefined}
                  >
                    About Us
                  </Link>
                </li>
                <li
                  className={`${pathname === "/fleet" && "text-primary font-extrabold"} hover:scale-105 hover:font-bold`}
                >
                  <Link
                    href="/fleet"
                    aria-current={pathname === "/fleet" ? "page" : undefined}
                  >
                    Our Fleet
                  </Link>
                </li>
                <li className="hover:scale-105 hover:font-bold">
                  <Link href="/contact#faq">FAQ</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold">Services</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/services#airport"
                    className="hover:scale-105 hover:font-bold"
                  >
                    Airport Transfer
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#events"
                    className="hover:scale-105 hover:font-bold"
                  >
                    Weddings and Events
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#school"
                    className="hover:scale-105 hover:font-bold"
                  >
                    School Trips
                  </Link>
                </li>
                <li>
                  <Link
                    href="/services#tour"
                    className="hover:scale-105 hover:font-bold"
                  >
                    Tours and Excursions
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
              <ul className="space-y-3">
                <li className="hover:underline">
                  <a href="mailto:info@londonminibusrental.co.uks">
                    info@londonminibusrental.co.uks
                  </a>
                </li>
                <li className="hover:underline">
                  <a href="tel:+442089878046">020 8987 8046</a>
                </li>
                <li className="hover:underline">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=SE15+2UQ+Peckham+London"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Oakdene Street, Carlton Grove, Peckham, SE15 2UQ , London
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-span-1" />
          {/* Follow */}
          <div className="flex w-fit flex-col items-start md:col-span-1 md:justify-self-end">
            <h3 className="mb-4 text-lg font-bold">Follow Us</h3>
            <div className="flex space-x-6">
              <a
                href="https://web.facebook.com/profile.php?id=61578560925347"
                rel="nofollow noopener noreferrer"
                target="_blank"
                aria-label="Facebook"
                className="hover:text-secondary-600 rounded-md border border-slate-200"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                rel="nofollow noopener noreferrer"
                target="_blank"
                aria-label="Instagram"
                className="hover:text-secondary-600 rounded-md border border-slate-200"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="bg-secondary-50 w-full border-t border-amber-100">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between px-6 py-4 text-slate-700 md:flex-row md:px-8 lg:px-10">
          <div className="mb-2 hidden md:mb-0 md:block">
            Oakdene Street, Carlton Grove, Peckham, Se15 2uq, London
          </div>
          <div>
            Copyright © {new Date().getFullYear()} All rights reserved - London
            Minibus Rental
          </div>
        </div>
      </div>
    </footer>
  );
}
