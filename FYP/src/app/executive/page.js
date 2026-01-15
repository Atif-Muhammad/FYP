"use client";

import { useEffect } from "react";
import "aos/dist/aos.css";
import Image from "next/image";
import { AdvisorCard } from "../../components/AdvisorCard";
import { ExecutiveCard } from "../../components/ExecutiveCard";
import JuniorExecutiveCard from "../../components/JuniorExecutiveCard";
import { useQuery } from "@tanstack/react-query";
import { getExectives } from "../../../config/apis";
import Aos from "aos";
import dynamic from "next/dynamic";

function ExecutiveSection() {
  useEffect(() => {
    Aos.init({ duration: 800, once: true });
  }, []);

  const { data, error, isLoading } = useQuery({
    queryKey: ["Execs"],
    queryFn: getExectives,
    enabled: true,
  });

  const execData = data?.data || {};
  const mainExecs = execData.main || [];
  const otherExecs = execData.others || [];
  const patron = execData.patron?.[0] || null;
  const advisors = execData.advisors || [];

  if (isLoading) {
    return (
      <>
       {/* Hero Section */}
      <section className="relative w-full bg-gray-900 text-white py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/home/bg.jpg"
            alt="Programs"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div
          className="relative max-w-5xl mx-auto px-6 text-center"
          data-aos="zoom-in"
        >
          <p className="text-green-400 font-semibold tracking-wide uppercase mb-4">
            Federal Youth Parliament
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Meet Our Leaders
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            The Executive Members of Federal Youth Parliament are visionary
            changemakers, dedicated to{" "}
            <span className="text-green-400 font-semibold">
              youth empowerment
            </span>{" "}
            and{" "}
            <span className="text-green-400 font-semibold">leadership</span>,
            building a brighter future for Pakistan.
          </p>
        </div>
      </section>
      <div className="flex justify-center items-center w-full h-screen bg-gray-50">
        <h2 className="text-3xl font-semibold text-green-700 animate-pulse">
          Loading...
        </h2>
      </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center w-full h-screen bg-red-50">
        <h2 className="text-2xl font-semibold text-red-700">
          Failed to load executives.
        </h2>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative w-full bg-gray-900 text-white py-28 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/home/bg.jpg"
            alt="Programs"
            fill
            className="object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div
          className="relative max-w-5xl mx-auto px-6 text-center"
          data-aos="zoom-in"
        >
          <p className="text-green-400 font-semibold tracking-wide uppercase mb-4">
            Federal Youth Parliament
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Meet Our Leaders
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            The Executive Members of Federal Youth Parliament are visionary
            changemakers, dedicated to{" "}
            <span className="text-green-400 font-semibold">
              youth empowerment
            </span>{" "}
            and{" "}
            <span className="text-green-400 font-semibold">leadership</span>,
            building a brighter future for Pakistan.
          </p>
        </div>
      </section>

     {/* Executive Members */}
<section className="w-full py-20 bg-linear-to-b from-green-50 to-white">
  <div className="max-w-7xl mx-auto px-6">
    <h2
      className="text-center font-extrabold text-4xl md:text-5xl text-green-800 mb-16"
      data-aos="fade-up"
    >
      Executive Members
    </h2>

    {mainExecs
      ?.slice() // make a copy to avoid mutating original array
      .sort((a, b) => {
        const priority = {
          "General Secretary": 0,
          "Chairman": 1,
          "Vice President": 2,
        };

        const aPriority = priority[a.role] ?? 99;
        const bPriority = priority[b.role] ?? 99;

        return aPriority - bPriority;
      })
      .map((executive) => (
        <ExecutiveCard
          key={executive?._id}
          name={executive?.name ?? "Unknown"}
          role={executive?.role ?? ""}
          intro={executive?.about ?? ""}
          image={executive?.image ?? {}}
          message={executive?.message ?? ""}
          facebook={executive?.socials?.fb ?? ""}
          instagram={executive?.socials?.insta ?? ""}
        />
      ))}
  </div>

      {/* Junior Executives */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {otherExecs.map((other, index) => (
            <JuniorExecutiveCard
              key={index}
              name={other?.name ?? "Unknown"}
              role={other?.role ?? ""}
              img={other?.image?.url ?? "/images/default.jpg"}
              delay={100}
            />
          ))}
        </div>
      </section>

      {/* Patron In Chief */}
      {patron && (
        <section className="w-full py-20 bg-linear-to-b from-green-50 to-white">
          <div className="max-w-7xl mx-auto px-6 text-center" data-aos="fade-up">
            <h2 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-16">
              Patron In Chief
            </h2>
            <div className="flex flex-col items-center">
              <div className="relative w-[480px] h-[280px] sm:w-[600px] sm:h-[350px] overflow-hidden rounded-2xl shadow-2xl border-4 border-green-600">
                <Image
                  src={patron?.image?.url}
                  alt={patron?.name ?? "Patron in Chief"}
                  fill
                  className="object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </div>
              <h2 className="mt-8 text-3xl font-bold text-gray-800">
                {patron?.name ?? "Unknown"}
              </h2>
              <p className="text-green-700 font-semibold text-lg">
                {patron?.role ?? ""}
              </p>
              <blockquote className="max-w-2xl mt-8 text-xl italic text-gray-700 border-l-4 border-green-600 pl-4 leading-relaxed">
                {patron?.message ?? ""}
              </blockquote>
            </div>
          </div>
        </section>
      )}

      {/* Advisors */}
      <section className="w-full py-20 bg-linear-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2
            className="text-center font-extrabold text-4xl md:text-5xl text-green-800 mb-16"
            data-aos="fade-up"
          >
            Advisors
          </h2>
          {advisors.map((advisor, i) => (
            <AdvisorCard
              key={advisor?._id ?? i}
              image={advisor?.image?.url ?? "/images/default.jpg"}
              name={advisor?.name ?? "Unknown"}
              role={advisor?.role ?? ""}
              bio={advisor?.message ?? ""}
              delay={advisor?.delay ?? 100}
            />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-[#FAF3DD] py-16">
        <div className="max-w-4xl mx-auto px-6 text-center" data-aos="zoom-in">
          <h2 className="text-3xl font-bold text-green-800 mb-4">
            Join Us in Shaping the Future
          </h2>
          <p className="text-gray-700 mb-8">
            Be part of the movement that empowers youth and builds communities.
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://forms.gle/SLmzTont6kSrKJyv7"
              target="blank"
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full font-semibold shadow-md transition"
            >
              Join Us
            </a>
            <a
              href="/contact"
              className="bg-white border border-green-700 text-green-700 hover:bg-green-100 px-6 py-3 rounded-full font-semibold shadow-md transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

// ✅ Disable SSR — avoids hydration mismatch
export default dynamic(() => Promise.resolve(ExecutiveSection), { ssr: false });
