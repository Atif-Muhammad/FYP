"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

//  swiper slider imports

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import { getHome } from "../../config/apis";

export default function HomePage() {


  const { data, isError, isLoading } = useQuery({
    queryKey: ["home"],
    queryFn: getHome,
    enabled: true
  });


  console.log(data)


  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  
      const [expandedCards, setExpandedCards] = useState({});
  
    const toggleExpand = (index) => {
      setExpandedCards((prev) => ({
        ...prev,
        [index]: !prev[index],
      }));
    };
 const isTextLong = (text) => text && text.split(" ").length > 40;
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `
      *New Message from FYP Website*
    ----------------------------
     Name: ${form.name}
     Email: ${form.email}
     Message: ${form.message}`;
    const whatsappUrl = `https://wa.me/923335825437?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappUrl, "_blank");
    setForm({ name: "", email: "", message: "" });
  }

  
  return (
    <main>
{/* ******************** HERO *********************** */}
<section className="relative min-h-[90vh] flex items-center justify-center text-center text-white overflow-hidden">
  {/* Background Slideshow */}
  <div id="slideshow" className="absolute inset-0">
    <Image src="/images/home/bg.jpg" fill alt="bg" className="object-cover opacity-100 transition-opacity duration-1000" />
    <Image src="/images/home/bg2.jpg" fill alt="bg2" className="object-cover opacity-0 transition-opacity duration-1000" />
    <Image src="/images/home/bg3.jpg" fill alt="bg3" className="object-cover opacity-0 transition-opacity duration-1000" />
  </div>

  {/* Overlay */}
  <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/70"></div>

  {/* Hero Content */}
  <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center" data-aos="fade-up">
    <span className="inline-block bg-green-600 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium tracking-wide mb-3 sm:mb-4 animate-pulse">
      Empowering Youth • Shaping Future
    </span>
    <h1 className="font-extrabold text-3xl sm:text-4xl md:text-6xl leading-tight mb-3 sm:mb-4 drop-shadow-lg">
      Federal Youth <span className="text-green-500">Parliament</span>
    </h1>
    <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8 max-w-2xl">
      A united platform where young leaders raise their voices, create impact, and lead Pakistan toward a brighter tomorrow.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
      <Link href="https://forms.gle/SLmzTont6kSrKJyv7" target="blank" className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-6 py-3 shadow-lg transition transform hover:scale-105 text-center">
        Join FYP Now
      </Link>
      <Link href="/about" className="bg-white/90 hover:bg-white text-green-700 font-semibold rounded-full px-6 py-3 shadow-lg transition transform hover:scale-105 text-center">
        Learn More
      </Link>
    </div>
  </div>
</section>

     <section className="w-full py-20 bg-linear-to-r from-green-50 via-[#FAF3DD] to-green-50">
  <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-start gap-12">
    
    {/* LEFT SIDE */}
    <div className="flex-1 flex flex-col gap-6 items-center md:items-start text-center md:text-left" data-aos="fade-up">
      <span className="inline-block bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium tracking-wide w-fit mx-auto md:mx-0">
        Who We Are
      </span>

      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
        About <span className="text-green-600">Federal Youth Parliament</span>
      </h2>

      <p className="text-lg text-gray-700 leading-relaxed">
        The Federal Youth Parliament is a vibrant platform uniting young leaders to
        address social, political, and economic challenges. Through collaboration,
        innovation, and civic engagement, we empower youth to shape a brighter
        and more inclusive future for Pakistan.
      </p>

      <Link 
        href="/about" 
        className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-6 py-3 shadow-lg transition transform hover:scale-105 w-fit mx-auto md:mx-0"
      >
        Learn More
      </Link>
    </div>

    {/* RIGHT SIDE */}
    <div className="flex-1 relative flex justify-center md:block" data-aos="fade-down">
      <Image 
        src="/images/about/about-dummy.jpg" 
        alt="About FYP" 
        width={600} 
        height={400} 
        className="w-full rounded-2xl shadow-xl object-cover border-4 border-white" 
      />
    </div>

  </div>
</section>

      {/* ******************** PROGRAM CARDS *********************** */}
      <section className="w-full py-20 bg-green-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Our <span className="text-green-700">Programs</span>
          </h2>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Federal Youth Parliament runs diverse initiatives to empower youth,
            build leadership, and create meaningful impact in communities.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 justify-items-center content-start">
          {data?.programs?.map((card, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg overflow-hidden 
                         hover:shadow-2xl transform transition duration-500
                         hover:-translate-y-2 hover:scale-[1.02]
                         w-full max-w-[360px] flex flex-col self-start"
              data-aos="fade-up"
              data-aos-delay={(i + 1) * 100}
            >
              {/* Image */}
              <Image
                src={card.image?.url}
                alt={card.title}
                width={400}
                height={300}
                className="w-full h-56 object-cover"
              />

              {/* Content */}
              <div className="p-6 flex flex-col grow justify-between">
                <h3 className="text-xl font-semibold text-green-800">
                  {card.title}
                </h3>

                <p
                  className={`mt-3 text-gray-600 leading-relaxed text-sm transition-all duration-300 ${
                    expandedCards[i] ? "" : "line-clamp-4"
                  }`}
                >
                  {card.description}
                </p>

                {isTextLong(card.description) ? (
                  <button
                    onClick={() => toggleExpand(i)}
                    className=" text-green-700 font-semibold hover:text-green-900 transition self-start"
                  >
                    {expandedCards[i] ? "Read Less" : "Read More"}
                  </button>
                ): <button
                    onClick={() => toggleExpand(i)}
                    className="mt-5 text-green-700 font-semibold hover:text-green-900 transition self-start"
                  >
                    &nbsp;
                  </button>}
              </div>
            </div>
          ))}
        </div>

        {/* See More Button */}
        <div
          className="mt-12 flex justify-center"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <Link
            href="/programs"
            className="bg-green-700 text-white font-bold rounded-full px-8 py-3 hover:bg-green-800 transition"
          >
            See More
          </Link>
        </div>
      </div>
    </section>
     {/* ************************************************ EXECUTIVE MEMBERS ********************************* */}
<section className="w-full py-16 sm:py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6">
    <div className="text-center mb-10 sm:mb-12" data-aos="fade-up">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
        Our <span className="text-green-700">Executive Members</span>
      </h2>
      <p className="mt-3 text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
        Meet the leadership team driving Federal Youth Parliament forward with vision, dedication, and passion for youth empowerment.
      </p>
    </div>

    <div className="grid gap-8 sm:gap-10 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
      {data?.members?.map((member, i) => (
        <div
          key={i}
          className="w-full max-w-[320px] sm:max-w-[340px] bg-white shadow-lg rounded-2xl overflow-hidden flex flex-col justify-between transition-transform duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl"
          data-aos="fade-up"
          data-aos-delay={member.delay}
        >
          {/* Background */}
          <div className="absolute inset-0">
            <img src={member.image?.url} alt={member.role} className="w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
          </div>

          {/* Content */}
          <div className="relative flex flex-col items-center text-center p-6">
            <img
              src={member.image?.url}
              alt={member.role}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-green-600 shadow-lg object-cover mb-4"
            />
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">{member.name}</h3>
            <p className="text-green-700 font-semibold mb-2 text-sm sm:text-base">
              {(member.role === "Chairman" ||
                member.role === "Vice President" ||
                member.role === "General Secretary")
                ? `Co-Founder / ${member.role}`
                : member.role}
            </p>
            <p className="text-gray-700 text-sm sm:text-base leading-relaxed line-clamp-4">
              {member.about}
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="relative flex justify-center gap-6 py-4 bg-white/70 backdrop-blur-md border-t">
            <a href="#" className="text-gray-500 hover:text-green-700 transition text-lg sm:text-xl">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-green-700 transition text-lg sm:text-xl">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      ))}
    </div>

    <div className="mt-10 sm:mt-12 flex justify-center" data-aos="fade-up" data-aos-delay="400">
      <a
        href="/executive"
        className="bg-green-700 text-white font-bold rounded-full px-8 py-3 hover:bg-green-800 transition"
      >
        See More
      </a>
    </div>
  </div>
</section>

      {/* ****************************************** UPCOMING EVENTS ******************************** */}
      <section className="w-full py-16 bg-gray-50">
  <div className="max-w-6xl mx-auto px-6">
    <h2
      className="text-3xl md:text-4xl font-extrabold text-center text-green-700 mb-10"
      data-aos="fade-up"
    >
      Upcoming <span className="text-gray-800">Events</span>
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {data?.events?.map((event, i) => (
        <div
          key={i}
          className="bg-white rounded-xl shadow-lg hover:shadow-xl transition p-6"
          data-aos="fade-up"
        >
          {/* Event Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
            <span className="bg-green-600 text-white text-sm font-semibold px-2 py-1 rounded-full w-fit">
              {event.eventDate}
            </span>
            <span className="text-gray-500 text-sm text-right sm:text-left wrap-break-word max-w-[200px]">
              📍 {event.location}
            </span>
          </div>

          {/* Event Content */}
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {event.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            {event.description}
          </p>
        </div>
      ))}
    </div>
  </div>
</section>

{/* ****************************************** GALLERY ******************************** */}
<section className="py-20 bg-white">
  <div className="text-center mb-12" data-aos="fade-up">
    <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
      <span className="text-green-700">FYP</span> Gallery
    </h2>
    <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
      Explore memorable moments and highlights captured from our journey at the Federal Youth Parliament.
    </p>
  </div>

  {/* Responsive Gallery */}
 <div className="flex items-center gap-2 h-[400px] w-full max-w-4xl mt-10 mx-auto"
data-aos="fade-up">
    {data?.galleryImages?.slice(0, 6).map((img) => (
        <div
          key={img?._id}
          className="relative group grow transition-all w-56 rounded-lg overflow-hidden h-[400px] duration-500 hover:w-full"
        >
            <img
              className="h-full w-full object-cover object-center"
              src={img.image?.url}
              alt={img.title}
            />
        </div>
    ))}
        </div>

  <div
    className="mt-12 flex justify-center"
    data-aos="fade-up"
    data-aos-delay="200"
  >
    <Link
      href="/gallery"
      className="bg-green-700 text-white font-bold rounded-full px-8 py-3 hover:bg-green-800 transition"
    >
      View Gallery
    </Link>
  </div>
</section>

      {/* {*************************************** NEWS & UPDATES *******************************} */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-12" data-aos="fade-up">
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
              News & <span className="text-green-700">Updates</span>
            </h2>
            <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest activities, events, and initiatives from
              the Federal Youth Parliament.
            </p>
          </div>

          {/* Swiper Section */}
          <div data-aos="fade-up" data-aos-delay="100">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="mySwiper"
            >
              {data?.newsUpdates?.map((item, index) => (
                <SwiperSlide key={index}>
                  <a
                    href= "/news"
                    className="block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2"
                  >
                    <div className="relative">
                      <Image
                        src={item.image?.url}
                        alt={item.title}
                        width={600}
                        height={400}
                        className="h-80 w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6">
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {item.title}
                        </h3>
                        <p className="text-gray-200 text-sm mb-3">{item.description}</p>
                        <span className="text-green-400 font-semibold hover:underline">
                          Read More →
                        </span>
                      </div>
                    </div>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      {/* ****************************************** CONTACT FORM ******************************** */}
      <section className="relative bg-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/home/bg2.jpg"
            alt="background"
            className="w-full h-full object-cover opacity-70"
          />
        </div>
        <div className="absolute inset-0 bg-linear-to-r from-black/70 to-green-900/50"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div data-aos="fade-right" className="space-y-6">
            <p className="text-green-400 font-semibold tracking-wide uppercase">Be a part of FYP</p>
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Join Us Now and <span className="text-green-400">Be the Voice of Change!</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Step into leadership with the Federal Youth Parliament (FYP). Inspire change, connect with leaders,
              and be the force that drives Pakistan toward a brighter future. Your journey starts here!
            </p>
          </div>

          <div data-aos="fade-left" className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-white/80 text-gray-800 focus:ring-2 focus:ring-green-400 outline-none transition"
                name="name"
                value={form.name}
                onChange={handleChange}
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg bg-white/80 text-gray-800 focus:ring-2 focus:ring-green-400 outline-none transition"
              />
              <textarea
                placeholder="Type Your Message"
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-white/80 text-gray-800 focus:ring-2 focus:ring-green-400 outline-none transition"
                name="message"
                value={form.message}
                onChange={handleChange}
              ></textarea>
              <button
                type="submit"
                className="w-full bg-linear-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-3 rounded-full shadow-lg transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>


    </main>
  );
}
