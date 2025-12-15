// import React from 'react'

// export const AdvisorCard = (props) => {
//   return (
//     <>
//     <div
//                 key={props.name}
//                 className="group max-w-sm mx-auto bg-white rounded-2xl shadow-lg overflow-hidden relative transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
//                 data-aos="fade-up"
//                 data-aos-delay={props.delay}
//               >
//                 {/* Background Image with overlay */}
//                 <div className="relative w-full h-48 overflow-hidden">
//                   <img
//                     src={props.img}
//                     alt={props.name}
//                     className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
//                   />
//         <div className="absolute inset-0 bg-linear-to-t from-green-900/60 via-green-800/30 to-transparent"></div>
//       </div>

//       {/* Card Content */}
//       <div className="p-6 flex flex-col items-center text-center">
//         {/* Profile Image */}
//         <div className="relative -mt-14 w-28 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-lg">
//           <img
//             src={props.img}
//             alt={props.name}
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Name & Role */}
//         <h3 className="mt-6 text-2xl font-bold text-gray-800">
//           {props.name}
//         </h3>
//         <p className="text-green-700 font-semibold">{props.role}</p>

//         {/* Description */}
//         <p className="mt-4 text-gray-600 text-sm leading-relaxed max-w-xs">
//           {props.bio}
//         </p>
//       </div>
//         </div>
//     </>
//   )
// }
"use client";
import Image from "next/image";
import { useState } from "react";

export function AdvisorCard(props) {
  const [expanded, setExpanded] = useState(false);

  const words = props.bio.split(" ");
  const shortBio = words.slice(0, 80).join(" ");
  const isLong = words.length > 80;

  return (
    <section className="w-full py-20 bg-linear-to-b from-green-50 to-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
      
        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-10 items-center" data-aos="fade-up">
          {/* Left: Image */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-[380px] h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-green-700">
              <Image
                src={props.image}
                alt={props.name}
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>

          {/* Right: Text */}
          <div className="text-gray-700 leading-relaxed space-y-4">
            <h3 className="text-3xl font-bold text-gray-800">
              {props.name}
            </h3>
            <p className="text-green-700 font-semibold text-lg">
              {props.role}
            </p>


            <p className="text-base mt-4">
              {expanded ? props.bio : shortBio + (isLong ? "..." : "")}
            </p>

            {isLong && (
              <button
                onClick={() => setExpanded(!expanded)}
                className="mt-3 inline-block text-green-700 font-semibold hover:underline transition"
              >
                {expanded ? "Read Less" : "Read More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
