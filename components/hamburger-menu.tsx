"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone } from "lucide-react";

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const linkClass = (href: string) =>
    `block  p-3  transition ${
      isActive(href)
        ? "font-semibold text-primary bg-light"
        : "text-gray-700 hover:underline"
    }`;

  return (
    <>
      {/* Hamburger Button */}

      <button
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="flex flex-col gap-1.5 lg:hidden"
      >
        <span className="h-0.5 w-6 bg-black" />
        <span className="h-0.5 w-6 bg-black" />
        <span className="h-0.5 w-6 bg-black" />
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-black/40"
        />
      )}

      {/* Slide Menu */}
      <nav
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-white p-6 text-lg font-bold shadow-lg transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <button onClick={() => setOpen(false)} className="mb-6 font-semibold">
          ✕
        </button>

        <ul className="space-y-2">
          <li>
            <Link
              href="/"
              className={linkClass("/")}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={linkClass("/about")}
              onClick={() => setOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/services"
              className={linkClass("/services")}
              onClick={() => setOpen(false)}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className={linkClass("/contact")}
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              href="/fleet"
              className={linkClass("/fleet")}
              onClick={() => setOpen(false)}
            >
              Our Fleet
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
