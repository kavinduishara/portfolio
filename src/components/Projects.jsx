import React from "react";
import { useInView } from "react-intersection-observer";
import ProjectCard from "./ProjectCard";

const projectsData = [
  {
    title: " Store Management System",
    description: "Built a full-stack store management web app with role-based access, smart billing, and multistore supportImplemented features like secure login with JWT, per-store user roles, bill generation, inventory and employee management, and a sales dashboardTech",
    images:["projects/store/1.png","projects/store/2.png","projects/store/3.png","projects/store/4.png"],
    tech:["logos/tailwind.png","logos/java.png","logos/spring-boot-logo.png",,"logos/react.png"],
    link:"https://github.com/kavinduishara/pos"
  },
  {
    title: " XChange ",
    description: "Built a full-stack web application using Django for the backend and Bootstrap for responsive frontend design. The platform allows users to register, create and manage item listings with images and descriptions, browse other listings, and like items. Implemented user authentication, image handling, and a clean, mobile-friendly UI using Bootstrap components.",
    tech:["logos/dj.png","logos/pyR.png"],
    images:["logos/dj.png","logos/pyR.png"],
    link:"https://github.com/kavinduishara/XChange"
  },
  {
    title: "AR Management System",
    description: " Served as Backend-Focused Full Stack Developer in a team project to streamline academic record management for university use",
    tech:["logos/java.png","logos/spring-boot-logo.png","logos/react.png"],
    images:["logos/java.png","logos/spring-boot-logo.png","logos/react.png"],
    link:"https://github.com/JHansiduYapa/University-Administrative-Automation-System-for-Management-Assistant"
  },
  {
    title: " AI-Powered Project Management Tool ",
    description: "Developing a collaboration platform with live meetings, chats and posts.Implementing RAG with vector search to summarize meeting chats and support follow-up Q&A",
    images:["projects/pm/1.png","projects/pm/2.png"],
    tech:["logos/tailwind.png","logos/next.webp","logos/react.png"],
    link:"https://github.com/kavinduishara/project-management"
  },{
    title: " Real-Time Video Calling App",
    description: "Built a peer-to-peer video calling web app using WebRTC with signaling powered by Firebase Firestore",
    images:["logos/tailwind.png","logos/java.png"],
    tech:["logos/tailwind.png","logos/java.png","logos/spring-boot-logo.png",,"logos/react.png"],
    link:"https://github.com/kavinduishara/webrtc"
  }

  
];

export default function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div
      ref={ref}
      id="Projects"
      className="  p-10"
    >
      <div className="grid grid-cols-1 h-full">
        <div className="flex items-center justify-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold">PROJECTS</h1>
        </div>

        <div className="flex flex-wrap justify-center items-start gap-6">
          {projectsData.map((proj, i) => (
            <ProjectCard
              key={i}
              title={proj.title}
              description={proj.description}
              delay={inView ? i : null}
              images={proj.images || []}
              tech={proj.tech || []}
              link={proj.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
