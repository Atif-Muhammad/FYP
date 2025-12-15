"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-white shadow-md h-16 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Brand */}
          <Link href="/" className="flex items-center" onClick={closeMobileMenu}>
            <Image
              src="/images/logo.jpg"
              alt="Logo"
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
            <span className="ml-2 font-bold text-green-700 text-lg">
              Federal Youth Parliament
            </span>
          </Link>

          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6 text-gray-700 font-semibold">
            <Link
              href="/"
              className="hover:text-green-700 hover:scale-110 hover:font-bold transition transform duration-200"
            >
              Home
            </Link>

            {/* About dropdown */}
            <div className="relative group">
              <button className="hover:text-green-700 hover:scale-110 hover:font-bold transition transform duration-200 flex items-center gap-1">
                About
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded py-2 w-48">
                <Link
                  href="/about"
                  className="block px-4 py-2 hover:text-green-700 hover:scale-110 hover:font-bold transition transform duration-200"
                >
                  Mission
                </Link>
                <Link
                  href="/executive"
                  className="block px-4 py-2 hover:text-green-700 hover:scale-110 hover:font-bold transition transform duration-200"
                >
                  Executive Members
                </Link>
              </div>
            </div>

            {/* Events dropdown */}
            <div className="relative group">
              <button className="hover:text-green-700 hover:scale-110 hover:font-bold transition transform duration-200 flex items-center gap-1">
                Events
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div className="absolute hidden group-hover:block bg-white shadow-lg rounded py-2 w-48">
                <Link
                  href="/programs"
                  className="block px-4 py-2 hover:text-green-700 hover:scale-110 hover:font-bold transition transform duration-200"
                >
                  Programs
                </Link>
                <Link
                  href="/achievements"
                  className="block px-4 py-2 hover:text-green-700 hover:scale-110 hover:font-bold transition transform duration-200"
                >
                  Achievements
                </Link>
                <Link
                  href="/gallery"
                  className="block px-4 py-2 hover:text-green-700 hover:scale-110 hover:font-bold transition transform duration-200"
                >
                  Gallery
                </Link>
              </div>
            </div>

            <Link
              href="/memberList"
              className="block px-4 py-2 hover:text-green-700 hover:scale-110 hover:font-bold transition transform duration-200"
            >
              Members List
            </Link>
            <Link
              href="/news"
              className="hover:text-green-700 hover:scale-110 hover:font-bold transition transform duration-200"
            >
              News
            </Link>
            <Link
              href="/contact"
              className="hover:text-green-700 hover:scale-110 hover:font-bold transition transform duration-200"
            >
              Contact
            </Link>

            {/* CTA */}
            <Link
              href="https://forms.gle/fKs6zZpsw5zzgRUu6"
              target="blank"
              className="ml-4 bg-green-700 text-white px-4 py-2 rounded-full hover:bg-green-800"
            >
              Join Us
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 w-full bg-white shadow-md px-4 pt-2 pb-4 space-y-2 text-gray-700 font-semibold z-40">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="block transition transform hover:scale-105 hover:font-bold hover:text-green-700"
          >
            Home
          </Link>

          {/* About */}
          <details className="group" onClick={(e) => e.stopPropagation()}>
            <summary className="cursor-pointer transition transform hover:scale-105 hover:font-bold hover:text-green-700">
              About
            </summary>
            <div className="ml-4 space-y-1">
              <Link href="/about" onClick={closeMobileMenu} className="block hover:text-green-700 hover:font-bold">
                Mission
              </Link>
              <Link href="/executive" onClick={closeMobileMenu} className="block hover:text-green-700 hover:font-bold">
                Executive Members
              </Link>
            </div>
          </details>

          {/* Events */}
          <details className="group" onClick={(e) => e.stopPropagation()}>
            <summary className="cursor-pointer transition transform hover:scale-105 hover:font-bold hover:text-green-700">
              Events
            </summary>
            <div className="ml-4 space-y-1">
              <Link href="/programs" onClick={closeMobileMenu} className="block hover:text-green-700 hover:font-bold">
                Programs
              </Link>
              <Link href="/achievements" onClick={closeMobileMenu} className="block hover:text-green-700 hover:font-bold">
                Achievements
              </Link>
              <Link href="/gallery" onClick={closeMobileMenu} className="block hover:text-green-700 hover:font-bold">
                Gallery
              </Link>
            </div>
          </details>

          <Link href="/memberList" onClick={closeMobileMenu} className="block hover:text-green-700 hover:font-bold">
            Members List
          </Link>
          <Link href="/news" onClick={closeMobileMenu} className="block hover:text-green-700 hover:font-bold">
            News
          </Link>
          <Link href="/contact" onClick={closeMobileMenu} className="block hover:text-green-700 hover:font-bold">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
