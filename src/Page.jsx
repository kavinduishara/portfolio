import React, { useState, useEffect } from 'react' 
import NavBar from './components/NavBar' 
import { FaGithub, FaLinkedin } from 'react-icons/fa' 
import Icons from './components/Icons' 
import Projects from './components/Projects' 
import styled from "styled-components"; 
import SpiningSphere from "./SpiningSphere" 
import About from './components/About'
import Contact from './components/Contact'

const StyledText = styled.h1` 
    font-family: "Orbitron", sans-serif; 
    font-size: 30px; 
`; 

function Page() { 
  const [text, setText] = useState(true) 

  useEffect(() => { 
    const interval = setInterval(() => { 
      setText(t => !t) 
    }, 6000) 
    return () => clearInterval(interval) 
  }, []) 

  return ( 
    <div className="relative min-h-screen bg-gradient-to-r from-indigo-900 to-black">
      {/* Main Content */}
      <div className="relative z-10 text-gray-100">

        <NavBar /> 

        {/* Hero Section */}
        <div className="flex flex-col md:flex-row h-screen w-full relative scroll-mt-20 pt-20 items-center justify-center" id="home">

          {/* Left Section */}
          <div className="flex flex-col items-center justify-center text-center md:text-left md:items-start px-4 md:px-20 w-full md:w-1/2">
            <h1 className="font-mono text-xl sm:text-3xl md:text-4xl mt-6 text-gray-200">
              HI, I'M
            </h1> 

            {/* Gradient Name */}
            <h1 className="font-mono font-bold text-3xl sm:text-5xl md:text-6xl 
              bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 
              bg-clip-text text-transparent drop-shadow-lg mt-2">
              KAVINDU ISHARA
            </h1>

            {/* One-line job title */}
            <div className='flex flex-col sm:flex-row text-xl justify-center md:justify-start items-center mt-4'>
              <h1 className="font-mono text-xl text-gray-200 mr-0 sm:mr-2 mb-2 sm:mb-0">
                I'M A
              </h1>
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 
                bg-clip-text text-transparent font-bold typewriter2 text-xl sm:text-2xl">
                {text ? "FRONTEND DEVELOPER" : "BACKEND DEVELOPER"}
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex flex-wrap space-x-4 md:space-x-6 mt-6 justify-center md:justify-start">
              <a 
                href="https://github.com/kavinduishara" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-200 hover:bg-gradient-to-r hover:from-indigo-400 hover:to-pink-400 hover:bg-clip-text hover:text-transparent transition-all duration-300"
              > 
                <FaGithub size={28} className="sm:mr-2"/>
              </a> 
              <a 
                href="https://www.linkedin.com/in/kavinduishara" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-200 hover:bg-gradient-to-r hover:from-pink-400 hover:to-indigo-400 hover:bg-clip-text hover:text-transparent transition-all duration-300"
              > 
                <FaLinkedin size={28} className="sm:mr-2"/>
              </a> 
            </div>
          </div> 

          {/* 3D Sphere */}
          <div className="w-full md:w-1/2 h-80 sm:h-96 md:h-full flex justify-center items-center mt-10 md:mt-0">
            <SpiningSphere/>
          </div>

        </div> 

        {/* Other Sections */}
        <About/>
        <Icons/>
        <Projects/> 
        <Contact/>

      </div> 
    </div> 
  ) 
} 

export default Page
