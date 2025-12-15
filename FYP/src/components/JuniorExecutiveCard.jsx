"use client";
import Image from "next/image";

export default function AdvisorCard({ name, role, img, delay }) {
  return (
    <div
      className="group relative bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-xl w-full max-w-xs mx-auto flex flex-col items-center"
      data-aos="fade-up"
      data-aos-delay={delay}
    >
      {/* Image Section */}
      <div className="relative w-full h-60 overflow-hidden">
        <Image
          src={img}
          alt={name}
          width={400}
          height={400}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent"></div>
      </div>

      {/* Text Section */}
      <div className="flex flex-col grow justify-center items-center text-center px-4 py-6">
        <h3 className="text-xl font-semibold text-gray-800 transition-colors line-clamp-1">
          {name}
        </h3>
        <p className="text-green-700 text-sm font-medium mt-1 line-clamp-1">
          {role}
        </p>
      </div>

      {/* Hover Border Highlight */}
      <div className="absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-green-500 transition-all duration-500"></div>
    </div>
  );
}
