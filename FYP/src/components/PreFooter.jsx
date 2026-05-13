import React from 'react'

export const PreFooter = (props) => {
  return (
    <section className="w-full bg-linear-to-b from-green-100 to-white py-16">
  <div
    className="max-w-5xl mx-auto px-6 text-center"
    data-aos="zoom-in"
  >
    <h2 className="text-3xl md:text-4xl font-extrabold text-green-800 mb-4">
      Stay Connected With Us
    </h2>
    <p className="text-gray-700 mb-10 max-w-2xl mx-auto">
      We’d love to hear from you! Reach out, explore our journey, and see how we’re making a difference together.
    </p>
    <div className="flex flex-wrap justify-center gap-6">
      <a
        href={props.link}
        className="bg-white border border-green-700 text-green-700 hover:bg-green-100 px-6 py-3 rounded-full font-semibold shadow-md transition"
      >
        {props.btnText}
      </a>
      <a
        href="/contact"
        className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-full font-semibold shadow-md transition"
      >
        Contact Us
      </a>
      
    </div>
  </div>
</section>

  )
}
