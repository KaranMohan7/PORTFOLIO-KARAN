"use client";
import React from "react";

const Contact = () => {
  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-3xl">

        {/* HEADING */}
        <div className="mb-14 text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            Let’s Work Together
          </h1>
          <p className="mt-4 text-gray-400 max-w-lg mx-auto">
            Got a project idea or want to collaborate? Drop a message and I’ll
            get back to you soon.
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-8">

          {/* NAME */}
          <div>
            <label className="text-sm text-gray-400">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full mt-2 bg-transparent border-b border-gray-300 focus:border-white outline-none py-3 transition-all duration-300"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-400">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full mt-2 bg-transparent border-b border-gray-300 focus:border-white outline-none py-3 transition-all duration-300"
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className="text-sm text-gray-400">Message</label>
            <textarea
              rows="5"
              placeholder="Tell me about your project..."
              className="w-full mt-2 bg-transparent border-b border-gray-300 focus:border-white outline-none py-3 transition-all duration-300 resize-none"
            ></textarea>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className="mt-6 border border-white text-white rounded-full px-20 py-2 hover:bg-white hover:text-black transition-all duration-300"
          >
            Send Message
          </button>
        </form>

      </div>
    </section>
  );
};

export default Contact;