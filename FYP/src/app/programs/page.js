"use client";
import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { getPrograms } from "../../../config/apis";
import AOS from "aos";
import "aos/dist/aos.css";
import { PreFooter } from "@/components/PreFooter";
// import { ProgramCard } from "../../../components/programCard";
export default function Programs() {
   useEffect(() => {
      AOS.init({ duration: 1000 });
    }, []);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["programs"],
    queryFn: ({ pageParam = 1 }) => getPrograms({ pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.pages ? lastPage.page + 1 : undefined,
    enabled: true,
  });
  console.log(data);

  if (isLoading) {
    return (
      <main>
      {/* Hero Banner */}
      <section className="relative bg-gray-900 text-white py-28 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/home/bg.jpg"
            alt="Programs"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div
          className="relative max-w-5xl mx-auto px-6 text-center"
          data-aos="fade-up"
        >
          <p className="text-green-400 font-semibold tracking-wide uppercase mb-3">
            Empowering the Youth
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Our Programs
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Federal Youth Parliament (FYP) runs{" "}
            <span className="text-green-400 font-semibold">
              impactful initiatives
            </span>{" "}
            to empower youth, address pressing{" "}
            <span className="text-green-400 font-semibold">social issues</span>,
            and promote{" "}
            <span className="text-green-400 font-semibold">leadership</span>{" "}
            across Pakistan.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#programs"
              className="px-8 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg transition duration-300"
            >
              Explore Programs
            </Link>
            <Link
              href="/pages/contact"
              className="px-8 py-3 rounded-full bg-transparent border border-green-400 text-green-400 hover:bg-green-500 hover:text-white font-semibold shadow-lg transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <div className="flex justify-center items-center w-full h-screen bg-gray-50">
        <h2 className="text-3xl font-semibold text-green-700 animate-pulse">
          Loading...
        </h2>
      </div>
    </main>

    );
  }

  return (
    <main>
      {/* Hero Banner */}
      <section className="relative bg-gray-900 text-white py-28 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/home/bg.jpg"
            alt="Programs"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div
          className="relative max-w-5xl mx-auto px-6 text-center"
          data-aos="fade-up"
        >
          <p className="text-green-400 font-semibold tracking-wide uppercase mb-3">
            Empowering the Youth
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Our Programs
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Federal Youth Parliament (FYP) runs{" "}
            <span className="text-green-400 font-semibold">
              impactful initiatives
            </span>{" "}
            to empower youth, address pressing{" "}
            <span className="text-green-400 font-semibold">social issues</span>,
            and promote{" "}
            <span className="text-green-400 font-semibold">leadership</span>{" "}
            across Pakistan.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#programs"
              className="px-8 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg transition duration-300"
            >
              Explore Programs
            </Link>
            <Link
              href="/pages/contact"
              className="px-8 py-3 rounded-full bg-transparent border border-green-400 text-green-400 hover:bg-green-500 hover:text-white font-semibold shadow-lg transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="w-full py-16 bg-green-50">
  <div className="max-w-6xl mx-auto px-6 space-y-16" id="programs">
    {data?.pages?.[0]?.data?.map((card, i) => (
      <div
        key={card._id || i}
        className={`grid md:grid-cols-2 gap-10 items-center mb-16 ${
          i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
        }`}
        data-aos={i % 2 === 0 ? "fade-right" : "fade-left"}
      >
      
        <div
          className={`flex flex-col justify-center ${
            i % 2 === 0 ? "order-2 md:order-1" : "order-2"
          }`}
        >
          <h2 className="text-2xl font-bold text-green-800">{card?.title}</h2>
          <p className="mt-4 text-gray-600">{card?.description}</p>
        </div>

        <div
          className={`${
            i % 2 === 0 ? "order-1 md:order-2" : "order-1"
          }`}
        >
          <Image
            src={card?.image?.url}
            alt={card?.title}
            width={800}
            height={400}
            className="w-full h-72 object-cover rounded-lg shadow-md"
          />
        </div>
      </div>
    ))}
  </div>
</section>
<PreFooter btnText="View Gallery" link="/gallery" />

    </main>
  );
}





