
// import React from 'react'

// export const ProgramCard = () => {
//   return (
//     <>
//     <div
//                 className="grid md:grid-cols-2 gap-10 items-center mb-16"
//                 data-aos="fade-left"
//               >
//                 <Image
//                   src="/images/programs/leadership-program.jpg"
//                   alt="Leadership Program"
//                   width={800}
//                   height={400}
//                   className="w-full h-72 object-cover rounded-lg shadow-md"
//                 />
//                 <div>
//                   <h2 className="text-2xl font-bold text-green-800">
//                     Leadership Program
//                   </h2>
//                   <p className="mt-4 text-gray-600">
//                     FYP launched a leadership program to nurture confident, ethical,
//                     and visionary young leaders ready to shape the nation’s future.
//                   </p>
//                 </div>
//               </div>
    
//     </>
//   )
// }


////////////////////////////////////////////////////////////////////////////////////

"use client";
import Image from "next/image";

export function ProCard({ program }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition-all duration-300">
      <Image
        src={program.image?.url}
        alt={program.title}
        width={600}
        height={300}
        className="w-full h-60 object-cover"
      />
      {console.log(program.image)}
      <div className="p-5">
        <h3 className="text-xl font-bold text-green-800 mb-2">
          {program.title}
        </h3>
        <p className="text-gray-600 line-clamp-3">{program.description}</p>
      </div>
    </div>
  );
}
