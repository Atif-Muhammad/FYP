"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getNews } from "../../../config/apis";
import { PreFooter } from "@/components/PreFooter";

export default function News() {

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["news"],
    queryFn: ({ pageParam = 1 }) => getNews({ pageParam }), // ✅ fixed: use correct function name
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.pages ? lastPage.page + 1 : undefined,
    enabled: true,
  });

  console.log(data);

  if (isLoading) return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-28 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/home/bg2.jpg" // you can change the image path if needed
            alt="News & Updates"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div
          className="relative max-w-5xl mx-auto px-6 text-center"
          data-aos="fade-up"
        >
          <p className="text-green-400 font-semibold tracking-wide uppercase mb-3">
            Stay Informed
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Latest News &amp; Updates
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest happenings,{" "}
            <span className="text-green-400 font-semibold">
              announcements, and success stories
            </span>{" "}
            from the <span className="text-green-400 font-semibold">Federal Youth Organization</span>.
          </p>

          {/* Optional Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#latest-news"
              className="px-8 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg transition duration-300"
            >
              Explore News
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 rounded-full bg-transparent border border-green-400 text-green-400 hover:bg-green-500 hover:text-white font-semibold shadow-lg transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <div className="flex justify-center items-center w-full h-screen bg-gray-50">
        <h2 className="text-3xl font-semibold text-green-700 animate-pulse">
          Loading...
        </h2>
      </div>
    </>
  );
  if (error) return <h2 className="text-center items-center justify-center w-full h-screen py-10 text-red-500">Error loading news.</h2>;



  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-28 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/home/bg2.jpg" // you can change the image path if needed
            alt="News & Updates"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div
          className="relative max-w-5xl mx-auto px-6 text-center"
          data-aos="fade-up"
        >
          <p className="text-green-400 font-semibold tracking-wide uppercase mb-3">
            Stay Informed
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Latest News &amp; Updates
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Stay updated with the latest happenings,{" "}
            <span className="text-green-400 font-semibold">
              announcements, and success stories
            </span>{" "}
            from the <span className="text-green-400 font-semibold">Federal Youth Organization</span>.
          </p>

          {/* Optional Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="#latest-news"
              className="px-8 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg transition duration-300"
            >
              Explore News
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 rounded-full bg-transparent border border-green-400 text-green-400 hover:bg-green-500 hover:text-white font-semibold shadow-lg transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>


      {/* Main Content */}
      <main className="w-full bg-gray-50" id="latest-news">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
          {/* Article 1 */}
          {data?.pages?.[0]?.data?.map((card, i) => (
            <article key={i} className="relative bg-white shadow-lg rounded-2xl overflow-hidden group">
              <Image
                src={card?.image?.url}
                alt={card?.title}
                width={1200}
                height={500}
                className="w-full h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition duration-500"></div>
              <div className="absolute bottom-0 p-8 text-white">
                <span className="text-sm opacity-80">{card?.createdAt}</span>
                <h2 className="text-4xl font-bold mt-2">
                  {card?.title}
                </h2>
                <p className="mt-3 text-gray-200 max-w-3xl">
                  {card?.description}
                </p>
              </div>
            </article>
          ))}

        </section>
        <PreFooter btnText="About Us " link="/about" />
      </main>
    </>
  );
}



