"use client";
import { useLenis } from "lenis/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Contact = () => {

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const lenis = useLenis();

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data?.message ||"Message sent 🚀");
        setForm({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message ❌");
      }
    } catch (err) {
      toast.error("Something went wrong ❌");
    }finally{
      setLoading(false);
    }
  };

useEffect(() => {
  if (!lenis) return;

  if (loading) {
    lenis.stop(); // 🔥 scroll freeze
  } else {
    lenis.start(); // 🔥 resume
  }
}, [loading, lenis]);

  return (
    <section className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-24">
      <div className="w-full max-w-3xl">

        {/* HEADING */}
<div className="mb-10 text-center">
  <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
    Let’s Work Together 🚀
  </h1>

  <p className="mt-4 text-gray-400 max-w-lg mx-auto">
I’m a <span className="text-white font-medium">Full Stack Developer</span> with a strong focus on 
<span className="text-white font-medium"> frontend,</span> specializing in React & Next.js. Open for freelance projects, internships, and full-time opportunities.
  </p>

  {/* TRUST LINE */}
  <p className="mt-3 text-sm text-gray-500">
    ⚡ Usually replies within 24 hours
  </p>
</div>

        {/* QUICK CONTACT (VERY IMPORTANT 🔥) */}
{/*         <div className="flex justify-center gap-6 mb-12 text-sm">
          <a
            href=""
            className="border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition"
          >
            Email Me
          </a>

          <a
            href="https://www.linkedin.com/in/karan-mohan-talwar-aaa731295/"
            target="_blank"
            className="border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition"
          >
            LinkedIn
          </a>
        </div> */}

{loading && (
  <div className="fixed inset-0 z-9999 bg-black/70 backdrop-blur-md flex items-center justify-center">

    <div className="flex flex-col items-center gap-4">

      {/* Spinner */}
      <div className="w-10 h-10 border-2 border-white border-t-transparent rounded-full animate-spin"></div>

      {/* Text */}
      <p className="text-sm text-gray-300 tracking-wide">
        Sending your message...
      </p>

    </div>

  </div>
)}
        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-8">

          {/* NAME */}
          <div>
            <label className="text-sm text-gray-400">Your Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="John Doe"
              required
              className="w-full mt-2 bg-transparent border-b border-gray-300 focus:border-white outline-none py-3 transition-all duration-300"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-400">Email Address</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              placeholder="john@email.com"
              required
              className="w-full mt-2 bg-transparent border-b border-gray-300 focus:border-white outline-none py-3 transition-all duration-300"
            />
          </div>

          {/* MESSAGE */}
          <div>
            <label className="text-sm text-gray-400">Project / Role Details</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows="5"
              placeholder="Tell me about your project, hiring requirements, role, timeline, or budget..."
              required
              className="w-full mt-2 bg-transparent border-b border-gray-300 focus:border-white outline-none py-3 transition-all duration-300 resize-none"
            ></textarea>
          </div>

          {/* BUTTON */}
<button
            type="submit"
            disabled={loading}
            className="mt-6 border border-white text-white rounded-full px-20 py-2 flex items-center justify-center gap-2 hover:bg-white hover:text-black transition-all duration-300 disabled:opacity-50"
          >
            {loading ? (
              <>
                {/* Spinner */}
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Sending...
              </>
            ) : (
              "Send Message"
            )}
          </button>
        </form>

      </div>
    </section>
  );
};

export default Contact;