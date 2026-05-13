"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  // Set dynamic year like your original JS did
  useEffect(() => {
    const yearSpan = document.querySelector(".footerYear");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
  }, []);

  return (
    <footer className="bg-white text-gray-800 py-12 border-t  border-gray-200">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Quick Links */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-green-600">
            Quick Links
          </h2>
          <ul className="space-y-2 text-gray-600">
            <li>
              <Link href="#" className="hover:text-green-700 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-green-700 transition">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green-700 transition">
                Contact
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-green-700 transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Logo + Description */}
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Image
              src="/images/logo.jpg"
              alt="Logo"
              width={56}
              height={56}
              className="rounded-full shadow-lg border-2 border-green-600"
            />
            <h2 className="text-2xl font-bold ml-3">
              Federal Youth <span className="text-green-600">PARLIAMENT</span>
            </h2>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            Federal Youth Parliament (FYP) empowers young leaders from across
            Pakistan to engage in policy, leadership, and community development
            — driving innovation, collaboration, and a brighter future for the
            nation.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-green-600">Contact</h2>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li className="flex items-center gap-2">
              <i className="fa-solid fa-location-dot text-green-600"></i>
                Office  no C-7, Spinzar IT tower University road peshawar  .
            </li>
            <li className="flex items-center gap-2">
              <i className="fa-solid fa-phone text-green-600"></i>
              +92 336 1098720
            </li>
            <li className="flex items-center gap-2">
              <i className="fa-solid fa-envelope text-green-600"></i>
              federalyouthparliamentpakistan@gmail.com
            </li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-5">
            <a
              href="https://www.facebook.com/share/1726g84KvL/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition"
            >
              <i className="fa-brands fa-facebook-f"></i>
            </a>

            <a
              href="https://www.instagram.com/federalyouthparliament?igsh=cGUwcnU3cWxmYWEx"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center rounded-full border border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Credit Section */}
      <p className="text-center text-gray-500 my-4 font-bold flex gap-2 justify-center items-center">
        Developed By{" "}
        <Image
          src="/images/cc-logo.png"
          alt="logo"
          width={48}
          height={48}
          className="rounded-full object-cover"
        />{" "}
        <span className="text-yellow-400">Code</span>
        <span className="text-blue-400">Club</span>
      </p>

      {/* Bottom Line */}
      <div className="mt-10 border-t border-gray-200 pt-4 text-center text-sm text-gray-500">
        © <span className="footerYear"></span>{" "}
        <span className="text-green-600 font-semibold">
          Federal Youth Parliament
        </span>
        . <span className="text-yellow-600">All rights reserved.</span>
      </div>
    </footer>
  );
}
