import React from "react";
import Boxes from "../Boxes";

function About() {
  return (
    <section
      className="min-h-screen grid grid-cols-1 md:grid-cols-2 items-center justify-center gap-16 px-8 py-20"
      id="About"
    >
      {/* Left side - Animated Boxes */}
      <div className="flex justify-center">
        <Boxes />
      </div>

      {/* Right side - Text content */}
      <div className="text-center md:text-left max-w-2xl">
        <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          About Me
        </h1>
        <p className="mt-6 text-gray-400 text-lg leading-relaxed">
          I’m <span className="font-semibold text-indigo-400">Kavindu Ishara</span>, 
          a passionate developer who loves building modern web apps and exploring 
          both frontend and backend technologies. I enjoy learning new tools, 
          frameworks, and working on projects that challenge me to grow. 🚀
        </p>
      </div>
    </section>
  );
}

export default About;

