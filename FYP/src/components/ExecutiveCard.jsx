"use client";
import Image from "next/image";
import { useState } from "react";

export const ExecutiveCard = (props) => {
  const [expanded, setExpanded] = useState(false);

  // Split message into words and truncate at 80
  const words = props.message.split(" ");
  const shortMessage = words.slice(0, 80).join(" ");
  const isLong = words.length > 80;

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
        {console.log(props.intro)}
        {console.log(props.message)}
        {/* Message Section */}
        <blockquote className="text-xl italic text-gray-700 leading-relaxed border-l-4 border-green-600 pl-4">
          {expanded ? props.message : shortMessage + (isLong ? "..." : "")}
        </blockquote>

        {/* Read More / Less Button */}
        {isLong && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-3 text-green-700 font-semibold hover:underline transition"
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        )}

        {/* Social Links */}
        <div className="flex gap-5 mt-6">
          <a
            href={props.facebook}
            className="text-gray-500 hover:text-green-700 transition text-2xl"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href={props.instagram}
            className="text-gray-500 hover:text-green-700 transition text-2xl"
          >
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
};
