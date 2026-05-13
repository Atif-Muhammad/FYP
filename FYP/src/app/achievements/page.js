"use client";

import { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";
import Image from "next/image";
import { getAchievements, getAwards } from "../../../config/apis";
import { PreFooter } from "@/components/PreFooter";

const Achievements = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // ✅ Local state for read more toggles
  const [expandedAchieve, setExpandedAchieve] = useState({});
  const [expandedAward, setExpandedAward] = useState({});

  const toggleAchieve = (i) =>
    setExpandedAchieve((prev) => ({ ...prev, [i]: !prev[i] }));

  const toggleAward = (i) =>
    setExpandedAward((prev) => ({ ...prev, [i]: !prev[i] }));

  // 🔹 Achievements Query
  const {
    data: achieveData,
    isLoading: achieveIsLoading,
    error: achieveError,
    fetchNextPage: achieveFetchNextPage,
    hasNextPage: achieveHasNextPage,
    isFetchingNextPage: achieveIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["achievements"],
    queryFn: ({ pageParam = 1 }) => getAchievements({ pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.pages ? lastPage.page + 1 : undefined,
  });

  // 🔹 Awards Query
  const {
    data: awardData,
    isLoading: awardIsLoading,
    error: awardError,
    fetchNextPage: awardFetchNextPage,
    hasNextPage: awardHasNextPage,
    isFetchingNextPage: awardIsFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["awards"],
    queryFn: ({ pageParam = 1 }) => getAwards({ pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.pages ? lastPage.page + 1 : undefined,
  });

  return (
    <main className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative w-full h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="/images/home/bg2.jpg"
            alt="Achievements Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        <div
          className="relative max-w-5xl mx-auto px-6 text-center text-white"
          data-aos="fade-up"
        >
          <p className="text-green-400 font-semibold tracking-wide uppercase mb-3">
            Celebrating Success
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Our <span className="text-green-400">Achievements</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Over the years, Federal Youth Parliament has earned remarkable{" "}
            <span className="text-green-400 font-semibold">milestones</span> through community service,
            youth empowerment, and impactful programs.
          </p>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-4">
          <span className="text-gray-900">Achievements by</span>{" "}
          <span className="text-green-600">Sectors</span>
        </h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
          FYP’s impact spans across multiple sectors, creating lasting change through healthcare,
          education, community development, and youth empowerment programs.
        </p>

        {/* Achievement Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center" data-aos="zoom-in">
          {achieveData?.pages?.map((page) =>
            page.data?.map((card, i) => (
              <div
                key={card._id || i}
                className="bg-white w-full max-w-[340px] rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:-translate-y-2 flex flex-col"
              >
                <Image
                  src={card.image?.url}
                  alt={card.title}
                  width={500}
                  height={300}
                  className="h-48 w-full object-cover"
                />
                <div className="p-5 flex flex-col grow justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-green-700 mb-2">
                      {card.title}
                    </h3>
                    <p
                      className={`text-gray-600 text-sm leading-relaxed ${
                        expandedAchieve[i] ? "" : "line-clamp-4"
                      }`}
                    >
                      {card.description}
                    </p>
                  </div>
                  {card.description?.length > 160 && (
                    <button
                      onClick={() => toggleAchieve(i)}
                      className="mt-3 text-green-600 font-semibold hover:text-green-800 transition"
                    >
                      {expandedAchieve[i] ? "Read Less" : "Read More"}
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Load More Achievements */}
        {achieveHasNextPage && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => achieveFetchNextPage()}
              disabled={achieveIsFetchingNextPage}
              className="px-6 py-3 bg-green-600 text-white rounded-full font-semibold hover:bg-green-700 transition"
            >
              {achieveIsFetchingNextPage ? "Loading..." : "Load More Achievements"}
            </button>
          </div>
        )}
      </section>

      {/* Awards Section */}
      <section className="relative py-20">
        <div className="absolute inset-0">
          <Image
            src="/images/home/bg2.jpg"
            alt="Awards Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-green-900/70"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            <span className="text-white">Awards &</span>{" "}
            <span className="text-green-400">Recognitions</span>
          </h2>
          <p className="max-w-2xl mx-auto mb-12 text-gray-200">
            Federal Youth Parliament has been honored with multiple awards for{" "}
            <span className="text-green-400 font-semibold">
              leadership, sustainability, and community impact
            </span>.
          </p>

          {/* Awards Grid */}
          <div
            className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-items-center"
            data-aos="fade-up"
          >
            {awardData?.pages?.map((page) =>
              page.data?.map((award, i) => (
                <div
                  key={award._id || i}
                  className="bg-white/90 w-full max-w-[280px] rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:-translate-y-2 flex flex-col"
                >
                  <Image
                    src={award.image?.url}
                    alt={award.title}
                    width={500}
                    height={300}
                    className="h-40 w-full object-cover"
                  />
                  <div className="p-4 text-gray-800 flex flex-col grow justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-green-700">
                        {award.title}
                      </h3>
                      <p
                        className={`text-sm mt-2 break-all ${
                          expandedAward[i] ? "" : "line-clamp-3"
                        }`}
                      >
                        {award.description}
                      </p>
                    </div>
                    {award.description?.length > 100 && (
                      <button
                        onClick={() => toggleAward(i)}
                        className="mt-3 text-green-600 font-semibold hover:text-green-800 transition"
                      >
                        {expandedAward[i] ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Load More Awards */}
          {awardHasNextPage && (
            <div className="flex justify-center mt-10">
              <button
                onClick={() => awardFetchNextPage()}
                disabled={awardIsFetchingNextPage}
                className="px-6 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition"
              >
                {awardIsFetchingNextPage ? "Loading..." : "Load More Awards"}
              </button>
            </div>
          )}
        </div>
      </section>
      <PreFooter btnText="See Latest News" link="/news" />
    </main>
  );
};

export default Achievements;
