"use client";
import Image from "next/image";

export default function AchievementCard({ achievement }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:-translate-y-2">
      <Image
        src={achievement.image?.url}
        alt={achievement.title}
        width={500}
        height={300}
        className="h-48 w-full object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-bold text-green-700 mb-2">{achievement.title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{achievement.description}</p>
      </div>
    </div>
  );
}
