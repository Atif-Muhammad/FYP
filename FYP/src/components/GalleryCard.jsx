"use client";
import Image from "next/image";

export default function GalleryCard({ item }) {
  return (
    <div className="relative group h-[400px] rounded-xl overflow-hidden shadow-lg transition-all duration-500">
      <Image
        src={item?.image?.url}
        alt={item?.title}
        fill
        className="object-cover object-center"
      />
      <div className="absolute inset-0 flex flex-col justify-end p-6 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
        <h1 className="text-2xl font-bold">{item?.title}</h1>
        <p className="text-sm break-all">{item?.description}</p>
      </div>
    </div>
  );
}
