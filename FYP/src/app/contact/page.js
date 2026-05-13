"use client";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ContactForm() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

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
    }

  return (
    <section className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <main
        className="w-full max-w-4xl bg-white rounded-2xl shadow-lg overflow-hidden"
        data-aos="fade-up"
      >
        <div className="p-8 md:p-12">
          {/* Heading */}
          <h1
            className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3 text-center"
            data-aos="fade-down"
          >
            Get in Touch
          </h1>
          <p
            className="text-gray-600 text-center mb-8 max-w-2xl mx-auto"
            data-aos="fade-down"
            data-aos-delay="100"
          >
            Have a question, suggestion, or want to join us? Fill out the form
            below and we’ll get back to you shortly.
          </p>

          {/* Success message */}
          <div
            id="success"
            className="hidden mb-6 p-4 rounded-lg bg-green-100 border border-green-300 text-green-800 text-center font-medium"
          >
            ✅ Thank you — your message has been sent successfully.
          </div>

          {/* Contact Form */}
          <form id="contactForm" className="space-y-6" onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Full Name */}
              <label className="flex flex-col" data-aos="fade-right">
                <span className="text-sm font-medium text-gray-700">
                  Full name <span className="text-red-500">*</span>
                </span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  id="name"
                  type="text"
                  required
                  placeholder="Your full name"
                  className="mt-2 p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                />
              </label>

              {/* Email */}
              <label className="flex flex-col" data-aos="fade-left">
                <span className="text-sm font-medium text-gray-700">
                  Email address <span className="text-red-500">*</span>
                </span>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  id="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="mt-2 p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
                />
              </label>
            </div>

            {/* Message */}
            <label className="flex flex-col" data-aos="fade-up">
              <span className="text-sm font-medium text-gray-700">
                Message <span className="text-red-500">*</span>
              </span>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                id="message"
                rows="5"
                required
                placeholder="Write your message here..."
                className="mt-2 p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition"
              ></textarea>
            </label>

            {/* Buttons */}
            <div
              className="flex flex-wrap items-center gap-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <button
                type="submit"
                className="inline-flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
              >
                Send Message
              </button>

              <button
                type="reset"
                className="inline-flex items-center justify-center border border-gray-300 px-5 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition"
              >
                Reset
              </button>
            </div>

            {/* Note */}
            <p className="text-xs text-gray-500 mt-4 text-center">
              By sending this message, you agree to our terms. We’ll handle your
              personal information responsibly.
            </p>
          </form>
        </div>
      </main>
    </section>
  );
}
