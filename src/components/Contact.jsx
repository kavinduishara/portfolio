import React from "react";
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope } from 'react-icons/fa';

function Contact() {
  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-6"
      id="Contact"
    >
      <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-8">
        Contact Me
      </h1>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-12 w-full max-w-5xl">
        {/* Contact Info */}
        <div className="flex flex-col gap-4 text-gray-200">
          <div className="flex items-center gap-2">
            <FaEnvelope className="text-indigo-400" />
            <span>kavinduishar2923@example.com</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhone className="text-indigo-400" />
            <span>+94 78 519 8734   / +94 72 9089 009</span>
          </div>
          <div className="flex items-center gap-2">
            <FaGithub className="text-indigo-400" />
            <a
              href="https://github.com/kavinduishara"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              github.com/kavinduishara
            </a>
          </div>
          <div className="flex items-center gap-2">
            <FaLinkedin className="text-indigo-400" />
            <a
              href="https://www.linkedin.com/in/kavinduishara"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              linkedin.com/in/kavinduishara
            </a>
          </div>
        </div>

        {/* Contact Form
        <form className="w-full md:w-96 bg-[#111122] p-8 rounded-2xl shadow-lg">
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 rounded-lg bg-[#1a1a2e] border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 rounded-lg bg-[#1a1a2e] border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Message</label>
            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full px-4 py-2 rounded-lg bg-[#1a1a2e] border border-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-lg font-semibold bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 text-white hover:opacity-90 transition"
          >
            Send Message
          </button>
        </form> */}
      </div>
    </section>
  );
}

export default Contact;
