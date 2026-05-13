"use client";
import Image from "next/image";
import { useState } from "react";

export const ExecutiveCard = (props) => {
  const [expanded, setExpanded] = useState(false);

  const words = props.message.split(" ");
  const shortMessage = words.slice(0, 80).join(" ");
  const isLong = words.length > 80;

  // ── CHAIRMAN — premium centred card ──────────────────────────────────────
  if (props.isChairman) {
    return (
      <div
        className="relative mb-24 rounded-3xl overflow-hidden shadow-2xl border border-teal-300 bg-gradient-to-br from-[#f0fdfa] via-white to-[#ecfdf5]"
        data-aos="fade-up"
      >
        {/* teal top ribbon */}
        <div className="h-2 w-full bg-gradient-to-r from-teal-500 via-green-600 to-teal-500" />

        <div className="flex flex-col lg:flex-row gap-10 items-center px-10 py-12">
          {/* Image */}
          <div className="flex-shrink-0 flex flex-col items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-br from-teal-500 to-green-600 blur-sm opacity-50" />
              <Image
                src={props.image?.url}
                alt={props.name}
                width={320}
                height={320}
                className="relative w-64 h-64 lg:w-80 lg:h-80 object-cover rounded-3xl shadow-xl border-4 border-teal-500"
              />
            </div>
            {/* Chairman badge */}
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600 to-green-700 text-white text-sm font-bold px-5 py-1.5 rounded-full shadow-md tracking-wide">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M2 19h20v2H2v-2zm2-3l3-9 5 5 5-9 3 9H4z" />
              </svg>
              Chairman
            </span>
          </div>

          {/* Content */}
          <div className="flex-1">
            <p className="text-teal-700 text-sm font-bold tracking-widest uppercase mb-1">Federal Youth Parliament</p>
            <h3 className="text-4xl font-extrabold text-gray-900 mb-1">{props.name}</h3>
            <p className="text-green-700 font-semibold text-lg mb-4">{props.role}</p>
            {props.intro && (
              <p className="text-gray-600 text-sm font-medium mb-4 italic border-l-4 border-teal-500 pl-3">{props.intro}</p>
            )}
            <blockquote className="text-gray-700 text-base leading-relaxed border-l-4 border-green-600 pl-4 italic">
              {expanded ? props.message : shortMessage + (isLong ? "..." : "")}
            </blockquote>
            {isLong && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-3 text-teal-700 font-semibold hover:underline transition"
              >
                {expanded ? "Read Less" : "Read More"}
              </button>
            )}
          </div>
        </div>

        {/* teal bottom ribbon */}
        <div className="h-1 w-full bg-gradient-to-r from-teal-500 via-green-600 to-teal-500" />
      </div>
    );
  }

  // ── DEFAULT executive card ────────────────────────────────────────────────
  return (
    <div
      className="grid md:grid-cols-2 gap-10 items-center mb-20"
      data-aos="fade-up"
    >
      {/* Image Section */}
      <div className="flex justify-center">
        <Image
          src={props.image?.url}
          alt={props.name}
          width={380}
          height={380}
          className="w-80 h-80 object-cover rounded-3xl shadow-2xl border-4 border-green-600"
        />
      </div>

      {/* Content Section */}
      <div>
        <h3 className="text-3xl font-bold text-gray-800">{props.name}</h3>
        <p className="text-green-700 font-semibold mb-4">{props.role}</p>
        <p className="text-gray-700 font-semibold mb-4">{props.intro}</p>
        <blockquote className="text-xl italic text-gray-700 leading-relaxed border-l-4 border-green-600 pl-4">
          {expanded ? props.message : shortMessage + (isLong ? "..." : "")}
        </blockquote>

        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-green-700 font-semibold hover:underline transition"
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    </div>
  );
};
