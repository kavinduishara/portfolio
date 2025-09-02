import { useEffect, useState } from "react";

export default function ProjectCard({ title, description, delay, images, tech, link }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade-out
      setTimeout(() => {
        setCurrentImage(prev => (prev + 1) % images.length);
        setFade(true); // fade-in new image
      }, 300); // duration matches CSS transition
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div
      style={{ "--i": delay }}
      className={`w-80 h-80 m-5 bg-transparent [perspective:1000px] group ${delay ? "animate-fadeInUp" : ""}`}
    >
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

        {/* Front */}
        <div className="absolute w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black 
                        rounded-lg shadow-xl flex flex-col [backface-visibility:hidden] overflow-hidden 
                        border border-indigo-400 shadow-indigo-500/40 transition-all">
          <div className="h-40 w-full bg-black flex justify-center items-center rounded-t-lg overflow-hidden relative">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={title}
                className={`absolute h-full w-full object-contain transition-opacity duration-500 ease-in-out
                  ${idx === currentImage ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>
          <div className="flex-1 flex flex-col justify-between p-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              {tech.map((e, idx) => (
                <img key={idx} src={e} alt="tech" className="h-8 w-8 object-contain" />
              ))}
            </div>
          </div>
        </div>

        {/* Back */}
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute w-full h-full bg-gradient-to-br from-gray-800 via-gray-900 to-black 
                     rounded-lg shadow-xl flex flex-col items-center justify-center text-white text-center px-4 
                     [transform:rotateY(180deg)] [backface-visibility:hidden] border border-indigo-400 hover:shadow-indigo-500/40 transition-all"
        >
          <h3 className="text-lg font-semibold mb-2">More Info</h3>
          <p className="text-sm mb-3">{description}</p>
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
                           bg-clip-text text-transparent font-bold">
            View Repository
          </span>
        </a>
      </div>
    </div>
  );
}
