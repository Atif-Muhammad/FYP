// "use client";
// import { useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Image from "next/image";

// export default function GallerySection() {


  
//   useEffect(() => {
//     AOS.init({ duration: 800, once: true });
//   }, []);

//   // Gallery data (you can add more)
//   const galleryItems = [
//     {
//       src: "/images/gallery/gallery1.jpg",
//       title: "Leadership Program",
//       desc: "Empowering youth through leadership training and skill development.",
//     },
//     {
//       src: "/images/gallery/gallery2.jpg",
//       title: "Plantation Drive",
//       desc: "Organizing plantation drives to promote environmental awareness.",
//     },
//     {
//       src: "/images/gallery/gallery3.jpg",
//       title: "Youth Gathering",
//       desc: "Arranging gatherings to connect and empower young minds.",
//     },
//     {
//       src: "/images/gallery/gallery4.jpg",
//       title: "Leadership Program",
//       desc: "Empowering youth through leadership training and skill development.",
//     },
//     {
//       src: "/images/gallery/gallery5.jpg",
//       title: "Youth Gathering",
//       desc: "Arranging gatherings to connect and empower young minds.",
//     },
//     {
//       src: "/images/gallery/gallery6.jpg",
//       title: "Youth Gathering",
//       desc: "Arranging gatherings to connect and empower young minds.",
//     },
//     {
//       src: "/images/gallery/gallery7.jpg",
//       title: "Leadership Program",
//       desc: "Empowering youth through leadership training and skill development.",
//     },
//     {
//       src: "/images/gallery/gallery8.jpg",
//       title: "Plantation Drive",
//       desc: "Organizing plantation drives to promote environmental awareness.",
//     },
//     {
//       src: "/images/gallery/gallery9.jpg",
//       title: "Youth Gathering",
//       desc: "Arranging gatherings to connect and empower young minds.",
//     },
//     {
//       src: "/images/gallery/gallery10.jpg",
//       title: "Community Workshop",
//       desc: "Hosting workshops to educate and engage communities on key issues.",
//     },
//     {
//       src: "/images/gallery/gallery11.jpg",
//       title: "Cultural Event",
//       desc: "Celebrating diversity and cultural heritage through vibrant events.",
//     },
//     {
//       src: "/images/gallery/gallery12.jpg",
//       title: "Educational Seminar",
//       desc: "Encouraging learning and skill-building through informative sessions.",
//     },
//     {
//       src: "/images/gallery/gallery13.jpg",
//       title: "Awareness Walk",
//       desc: "Spreading awareness through community walks and campaigns.",
//     },
//     {
//       src: "/images/gallery/gallery14.jpg",
//       title: "Charity Event",
//       desc: "Organizing charity drives to support underprivileged communities.",
//     },
//     {
//       src: "/images/gallery/gallery15.jpg",
//       title: "Sports Activity",
//       desc: "Promoting teamwork, fitness, and unity through sports events.",
//     },
//     {
//       src: "/images/gallery/gallery16.jpg",
//       title: "Tech Seminar",
//       desc: "Empowering students through sessions on innovation and technology.",
//     },
//     {
//       src: "/images/gallery/gallery17.jpg",
//       title: "Relief Drive",
//       desc: "Providing aid to communities affected by natural or social crises.",
//     },
//     {
//       src: "/images/gallery/gallery18.jpg",
//       title: "Cleanliness Campaign",
//       desc: "Encouraging community responsibility through cleanliness initiatives.",
//     },
//     {
//       src: "/images/gallery/gallery19.jpg",
//       title: "Volunteer Meetup",
//       desc: "Bringing together volunteers to plan and execute impactful projects.",
//     },
//     {
//       src: "/images/gallery/gallery20.jpg",
//       title: "Youth Conference",
//       desc: "Uniting young changemakers to discuss innovation and social impact.",
//     },
//   ];

//   return (
//     <>
//       {/* Hero Section */}
//       <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
//         {/* Background Image */}
//         <div className="absolute inset-0">
//           <Image
//             src="/images/home/bg2.jpg"
//             alt="Gallery Background"
//             fill
//             className="object-cover"
//           />
//           <div className="absolute inset-0 bg-black/60"></div>
//         </div>

//         {/* Content */}
//         <div className="relative z-10 px-6" data-aos="fade-up">
//           <h1 className="text-4xl md:text-6xl font-extrabold text-white">
//             Our <span className="text-green-500">Gallery</span>
//           </h1>
//           <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
//             Explore snapshots of our{" "}
//             <span className="text-green-400 font-semibold">journey</span>,
//             highlighting{" "}
//             <span className="text-green-400 font-semibold">
//               youth-led programs
//             </span>
//             ,{" "}
//             <span className="text-green-400 font-semibold">events</span>, and{" "}
//             <span className="text-green-400 font-semibold">achievements</span>.
//           </p>
//         </div>
//       </section>

//       {/* Gallery Section */}
//       <section className="max-w-7xl mx-auto px-6 py-16">
//         <h2
//           className="text-3xl md:text-4xl font-extrabold text-center mb-4"
//           data-aos="fade-up"
//         >
//           <span className="text-gray-900">Photo</span>{" "}
//           <span className="text-green-600">Gallery</span>
//         </h2>
//         <p
//           className="text-center text-gray-600 max-w-2xl mx-auto mb-10"
//           data-aos="fade-up"
//         >
//           Relive the most inspiring and memorable moments from Federal Youth
//           Parliament’s activities and programs.
//         </p>

//         {/* Gallery Grid */}
//         <div
//           className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-10"
//           data-aos="fade-up"
//         >
//           {galleryItems.map((item, index) => (
//             <div
//               key={index}
//               className="relative group h-[400px] rounded-xl overflow-hidden shadow-lg transition-all duration-500"
//             >
//               <Image
//                 src={item.src}
//                 alt={item.title}
//                 fill
//                 className="object-cover object-center"
//               />
//               <div className="absolute inset-0 flex flex-col justify-end p-6 text-white bg-black/50 opacity-0 group-hover:opacity-100 transition-all duration-300">
//                 <h1 className="text-2xl font-bold">{item.title}</h1>
//                 <p className="text-sm">{item.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </>
//   );
// }



///////////////////////////////////////////////////

"use client";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import GalleryCard from "@/components/GalleryCard";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { getGallery } from "../../../config/apis";
import { PreFooter } from "@/components/PreFooter";

export default function GallerySection() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["gallery"],
    queryFn: ({ pageParam = 1 }) => getGallery({ pageParam }),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.pages ? lastPage.page + 1 : undefined,
    enabled: true,
  });


  if (isLoading) {
    return (
      <>
        {/* Hero Section */}
        <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
            src="/images/home/bg2.jpg"
            alt="Gallery Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-6" data-aos="fade-up">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">
            Our <span className="text-green-500">Gallery</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Explore snapshots of our{" "}
            <span className="text-green-400 font-semibold">journey</span>,
            highlighting{" "}
            <span className="text-green-400 font-semibold">
              youth-led programs
            </span>
            ,{" "}
            <span className="text-green-400 font-semibold">events</span>, and{" "}
            <span className="text-green-400 font-semibold">achievements</span>.
          </p>
        </div>
      </section>

    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2
        className="text-3xl md:text-4xl font-extrabold text-center mb-4"
        data-aos="fade-up"
      >
        <span className="text-gray-900">Photo</span>{" "}
        <span className="text-green-600">Gallery</span>
      </h2>

      <p
        className="text-center text-gray-600 max-w-2xl mx-auto mb-10"
        data-aos="fade-up"
      >
        Relive the inspiring moments from Federal Youth Parliament’s programs and events.
      </p>
    
    </section>
      <h2 className="text-3xl font-semibold text-green-700 animate-pulse">
        Loading...
      </h2>
      </>
      )
      ;}
  if (error) return <h2 className="text-center py-10 w-full h-screen justify-center items-center text-red-500">Failed to load gallery.</h2>;

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center text-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/home/bg2.jpg"
            alt="Gallery Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 px-6" data-aos="fade-up">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">
            Our <span className="text-green-500">Gallery</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
            Explore snapshots of our{" "}
            <span className="text-green-400 font-semibold">journey</span>,
            highlighting{" "}
            <span className="text-green-400 font-semibold">
              youth-led programs
            </span>
            ,{" "}
            <span className="text-green-400 font-semibold">events</span>, and{" "}
            <span className="text-green-400 font-semibold">achievements</span>.
          </p>
        </div>
      </section>

    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2
        className="text-3xl md:text-4xl font-extrabold text-center mb-4"
        data-aos="fade-up"
      >
        <span className="text-gray-900">Photo</span>{" "}
        <span className="text-green-600">Gallery</span>
      </h2>

      <p
        className="text-center text-gray-600 max-w-2xl mx-auto mb-10"
        data-aos="fade-up"
      >
        Relive the inspiring moments from Federal Youth Parliament’s programs and events.
      </p>

      <div
        className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-10"
        data-aos="fade-up"
      >
        {data?.pages?.map((page) =>
          page.data.map((item, i) => <GalleryCard key={i} item={item} />)
        )}
      </div>

      {hasNextPage && (
        <div className="flex justify-center mt-10">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="px-6 py-3 bg-green-500 text-white rounded-full font-semibold hover:bg-green-600 transition"
          >
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </section>

    <PreFooter btnText="View Achievements" link="/achievements" />
    </>
  );
}
