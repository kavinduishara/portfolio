import React from 'react';
import { useInView } from 'react-intersection-observer';

function SkillsBox({ title, children }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div
      ref={ref}
      className="border-1 shadow-md p-6 rounded-xl bg-gray-900/40  border-indigo-400 shadow-indigo-500/40  backdrop-blur-md transition duration-700 ease-out"
    >
      <h1 className="text-center text-2xl font-bold text-indigo-400 mb-4">
        {title}
      </h1>
      <div className="flex flex-col gap-4 justify-center items-center">
        {typeof children === 'function' ? children(inView) : children}
      </div>
    </div>
  );
}

const lang = [
  { url: 'logos/cpp.png', name: 'C++' },
  { url: 'logos/java.png', name: 'Java' },
  { url: 'logos/js.webp', name: 'JavaScript' },
  { url: 'logos/pyR.png', name: 'Python' },
  { url: 'logos/ts.png', name: 'TypeScript' },
];

const frame = [
  { url: 'logos/next.webp', name: 'Next.js' },
  { url: 'logos/react.png', name: 'React' },
  { url: 'logos/spring-boot-logo.png', name: 'Spring Boot' },
  { url: 'logos/tailwind.png', name: 'Tailwind CSS' },
  { url: 'logos/dj.png', name: 'Django' },
];

export default function Icons() {
  return (
    <div
      className="min-h-screen w-screen text-white relative scroll-mt-20 px-10"
      id="skills"
    >
      <h1 className="text-4xl font-bold text-center pt-10 text-gray-200 mb-10">
        SKILLS
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Languages */}
        <SkillsBox title="Languages">
          {(inView) =>
            lang.map((e, i) => (
              <div
                key={i}
                style={inView ? { '--i': i } : {}}
                className={`flex w-full justify-between items-center opacity-0 ${
                  inView ? 'animate-fadeInRight' : ''
                }`}
              >
                <img
                  src={e.url}
                  alt={e.name}
                  title={e.name}
                  className="h-12"
                />
                <span className="text-lg">{e.name}</span>
              </div>
            ))
          }
        </SkillsBox>

        {/* Frameworks */}
        <SkillsBox title="Frameworks">
          {(inView) =>
            frame.map((e, i) => (
              <div
                key={i}
                style={inView ? { '--i': i } : {}}
                className={`flex w-full justify-between items-center opacity-0 ${
                  inView ? 'animate-fadeInLeft' : ''
                }`}
              >
                <img
                  src={e.url}
                  alt={e.name}
                  title={e.name}
                  className="h-12"
                />
                <span className="text-lg">{e.name}</span>
              </div>
            ))
          }
        </SkillsBox>
      </div>
    </div>
  );
}
