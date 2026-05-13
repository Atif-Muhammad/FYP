"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative bg-gray-900 text-white py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src="/images/home/bg.jpg"
            alt="About Us"
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
          <h1 className="text-4xl md:text-6xl font-extrabold">About Us</h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
            Federal Youth Parliament is a platform of{" "}
            <span className="text-green-400 font-semibold">
              young changemakers
            </span>
            , committed to leadership, innovation, and creating lasting impact
            across Pakistan.
          </p>
        </div>
      </section>

{/* About FYP */}
<section className="w-full py-20 bg-[#FAF3DD]">
  <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-start gap-12">
    {/* Content */}
    <div className="flex-1" data-aos="fade-right">
      <h2 className="text-3xl md:text-4xl font-bold text-center md:text-left text-gray-800 mb-4">
        Who <span className="text-green-600">We Are</span>
      </h2>
      <p className="text-lg text-gray-700 leading-relaxed text-justify">
        The Federal Youth Parliament Pakistan (FYP) is a non-Political platform
        committed to empowering young leaders and promoting active youth
        participation in democratic, social, and policy-making processes across
        Pakistan. Founded with the vision of nurturing responsible, skilled, and
        visionary youth, the FYP serves as a training ground where young
        individuals learn about parliamentary practices, legislation, and
        governance through real-time parliamentary sessions, debates, and policy
        discussions. Beyond leadership and legislation, FYP actively engages in
        community service, social welfare initiatives, medical and relief camps,
        environmental and climate change projects, and various youth development
        programs that contribute to the betterment of society. We believe that
        the youth of today are the policymakers of tomorrow, and through
        education, civic engagement, and social action, FYP continues to build a
        generation of ethical, compassionate, and visionary leaders dedicated to
        the progress of Pakistan.
      </p>

      {/* Button */}
      <div className="flex justify-center md:justify-start mt-8">
        <Link
          href="/constitution"
          className="bg-green-700 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-800 transition shadow-md"
        >
          Download Profile
        </Link>
      </div>
    </div>

    {/* Image */}
    <div className="flex-1 flex justify-center items-center" data-aos="fade-left">
      <div className="relative w-full max-w-md h-[400px]">
        <Image
          src="/images/about/about-dummy.jpg"
          alt="About FYP"
          fill
          className="rounded-xl shadow-lg object-cover"
        />
      </div>
    </div>
  </div>
</section>



      {/* Mission & Vision */}
      <section className="w-full py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative w-full h-[420px]" data-aos="fade-right">
            <Image
              src="/images/home/bg2.jpg"
              alt="Mission & Vision"
              fill
              className="rounded-2xl shadow-lg object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6" data-aos="fade-left">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              Our <span className="text-green-600">Mission & Vision</span>
            </h2>

            {/* Mission */}
            <div>
              <h3 className="text-xl font-semibold text-green-700 mb-3">
                Our mission is to empower, educate, and engage the youth of
                Pakistan by:
              </h3>
              <ul className="space-y-2 text-gray-700 leading-relaxed list-disc list-inside">
                <li>
                  Providing a platform for democratic learning through
                  parliamentary simulations and legislative training.
                </li>
                <li>
                  Encouraging youth participation in policy discussions,
                  community service, and social welfare initiatives.
                </li>
                <li>
                  Organizing medical camps, environmental and climate change
                  projects, and leadership development programs nationwide.
                </li>
                <li>
                  Promoting values of unity, integrity, and volunteerism among
                  the youth to strengthen the foundations of a peaceful and
                  progressive Pakistan.
                </li>
              </ul>
            </div>

            {/* Vision */}
            <div>
              <h3 className="text-xl font-semibold text-green-700 mb-3">
                Our Vision
              </h3>
              <p className="text-gray-700 leading-relaxed">
                To build a progressive, empowered, and responsible generation of
                young Pakistanis who actively contribute to democracy, social
                development, and nation-building through leadership, education,
                and civic engagement.
              </p>
              <p className="text-gray-700 leading-relaxed">
                We envision a Pakistan where youth voices shape policies,
                promote justice, equality, and sustainability, and work
                collectively for a brighter and more inclusive future.
              </p>
            </div>
          </div>
        </div>
      </section>

  {/* Certificates Section */}
{[
  {
    title: "Certificate of Registration",
    text: "Our organization is officially registered and recognized. Below is our certificate of registration for transparency and credibility.",
    img: "/images/about/registrationCertificate.jpg",
  },
  {
    title: "Certificate of Incorporation",
    text: "Our organization is officially incorporated and recognized as a legal entity. Below is our Certificate of Incorporation, which reflects our legitimacy and credibility.",
    img: "/images/about/incorporationCertificate.jpg",
  },
].map((cert, i) => (
  <section key={i} className="w-full py-20 bg-white">
    <div
      className="max-w-4xl mx-auto px-6 text-center"
      data-aos="fade-up"
    >
      <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">
        {cert.title.split(" ")[0]}{" "}
        <span className="text-green-600">
          {cert.title.split(" ").slice(1).join(" ")}
        </span>
      </h2>

      <p className="text-gray-600 mb-10 max-w-2xl mx-auto">{cert.text}</p>

      {/* Certificate Image Card */}
      <div
        className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200 hover:shadow-green-200 transition duration-500"
        data-aos="fade-up"
      >
        <div className="relative w-full max-w-2xl mx-auto h-[400px] sm:h-[500px]">
          <Image
            src={cert.img}
            alt={cert.title}
            fill
            className="object-contain p-4"
          />
        </div>
      </div>
    </div>
  </section>
))}

      {/* Organisation Objectives */}
      <section className="w-full py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 text-center" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-12">
            Organization <span className="text-green-600">Objectives</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {[
              "🌱 Youth Leadership",
              "💪 Women Empowerment",
              "🔥 Youth Empowerment",
              "♿ Disable Rights",
              "🏳️‍🌈 Transgender Rights",
              "🤝 Relief Activities",
              "🩺 Medical / Dental Camps",
              "📢 Awareness Sessions",
              "🗳️ Youth Politics",
              "🌍 Social Volunteerism",
              "🚭 Anti Narcotics",
            ].map((title, idx) => (
              <div
                key={idx}
                className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition"
              >
                <h3 className="font-semibold text-lg text-green-700 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600">
                  Encouraging youth to make impactful change and lead with
                  vision.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="w-full py-20 bg-[#FAF3DD]">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-12">
            Our <span className="text-green-600">Core Values</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              ["Integrity", "We believe in honesty, accountability, and transparency in all our actions."],
              ["Collaboration", "We thrive on teamwork, partnerships, and collective efforts to bring change."],
              ["Innovation", "We embrace creativity and new ideas to solve problems and build solutions."],
            ].map(([title, desc], i) => (
              <div
                key={i}
                className="p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition"
                data-aos="zoom-in"
                data-aos-delay={i * 100}
              >
                <h3 className="text-xl font-bold text-green-700 mb-4">{title}</h3>
                <p className="text-gray-600 text-base">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="relative bg-green-700 py-20 text-center text-white">
        <div className="absolute inset-0">
          <Image
            src="/images/home/bg.jpg"
            alt="Join Us"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-green-900/70"></div>
        </div>

        <div
          className="relative z-10 max-w-4xl mx-auto px-6"
          data-aos="fade-up"
        >
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6">
            Join Us Today
          </h2>
          <p className="text-lg text-gray-200 mb-8">
            Be part of a nationwide movement of young leaders working together
            for a brighter, stronger, and more inclusive Pakistan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="https://forms.gle/SLmzTont6kSrKJyv7"
              target="blank"
              className="px-8 py-3 rounded-full bg-white text-green-700 font-semibold shadow-lg hover:bg-gray-100 transition duration-300"
            >
              Become a Member
            </Link>
            <Link
              href="/contact"
              className="px-8 py-3 rounded-full bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
