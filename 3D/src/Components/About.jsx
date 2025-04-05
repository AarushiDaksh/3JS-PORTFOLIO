import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { AnimeModel } from '../models';

const About = ({ onClose, show }) => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-gray-900/90' : 'bg-gray-100/90';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subTextColor = isDark ? 'text-gray-300' : 'text-gray-700';
  const buttonText = isDark ? '🌞 Mode' : '🌙 Mode';

  return (
    <div
      className={`
        fixed inset-0 z-30 backdrop-blur-md bg-black/30 transition-all duration-500 ease-in-out
        ${show ? 'visible opacity-100' : 'invisible opacity-0'}
      `}
    >
      <div
        className={`
          absolute bottom-0 md:left-0 md:top-0 
          w-full md:w-[500px] 
          h-[60%] md:h-full 
          transform transition-transform duration-500 ease-in-out 
          ${show ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:-translate-x-full'} 
          ${bgColor} shadow-2xl rounded-t-2xl md:rounded-none
        `}
      >
        <style>
          {`
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .smooth-scroll {
              scroll-behavior: smooth;
            }
          `}
        </style>

        {/* SVG WAVE TOP */}
        <div className="w-full overflow-hidden rotate-180">
          <svg className="w-full h-[40px]" viewBox="0 0 1440 320">
            <path
              fill={isDark ? "#111827" : "#f3f4f6"}
              fillOpacity="1"
              d="M0,64L60,85.3C120,107,240,149,360,149.3C480,149,600,107,720,106.7C840,107,960,149,1080,165.3C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </div>

        <div className="h-full overflow-y-auto px-4 pt-2 pb-6 md:p-6 no-scrollbar smooth-scroll">

          {/* Header Controls */}
          <div className="flex justify-between items-center mb-4">
            <button className="text-xl font-bold hover:text-red-500" onClick={onClose}>✕</button>
            <button
              className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-yellow-400 hover:to-red-400 transition"
              onClick={toggleTheme}
            >
              {buttonText}
            </button>
          </div>

          <h2 className={`text-2xl md:text-3xl font-extrabold mb-3 ${textColor} tracking-wide uppercase font-mono`}>
            Who Am I? 🚀
          </h2>

          <p className={`text-base ${subTextColor} mb-4 font-medium italic`}>
            <span className="bg-gradient-to-r from-purple-400 to-red-500 text-transparent bg-clip-text">
              Greetings, traveler of the digital realm! I’m Aarushi Daksh, a Full Stack Sorcerer weaving magic into code.
              From <strong>sleek UIs</strong> to <strong>3D experiences</strong> to <strong>backend wonders</strong> —
              I thrive on transforming <strong>imagination into innovation.</strong>
            </span>
          </p>

          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-800'} font-medium`}>
            I craft digital landscapes using <strong>React, Three.js</strong>, and the latest web tech.
            My mission is to merge <strong>art & technology</strong>, turning dreams into interactive realities.  
          </p>

          <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'} font-medium italic mt-4`}>
            "Great things are built pixel by pixel, function by function, and dream by dream."
          </p>

          {/* 3D Model */}
          <div className="w-full h-[200px] md:h-[400px] mt-6">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <AnimeModel isAnimating={true} scale={[3, 3, 3]} position={[0, -1, 0]} />
            </Canvas>
          </div>

          {/* Buttons */}
          <div className="flex flex-col space-y-3 mt-6">
            <button
              className="p-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg 
                hover:from-red-500 hover:to-purple-600 transition duration-300 shadow-lg"
              onClick={() => navigate('/contact')}
            >
              Let’s Build Something Amazing!
            </button>

            <button
              className={`p-3 text-sm font-semibold ${isDark ? 'text-gray-300 border border-gray-600 hover:bg-gray-800' : 'text-gray-800 border border-gray-300 hover:bg-gray-200'} rounded-lg transition duration-300`}
              onClick={() => navigate('/projects')}
            >
              Explore My Creations 🚀
            </button>
          </div>

          {/* SVG WAVE BOTTOM */}
          <div className="w-full overflow-hidden mt-6">
            <svg className="w-full h-[40px]" viewBox="0 0 1440 320">
              <path
                fill={isDark ? "#111827" : "#f3f4f6"}
                fillOpacity="1"
                d="M0,64L60,85.3C120,107,240,149,360,149.3C480,149,600,107,720,106.7C840,107,960,149,1080,165.3C1200,181,1320,171,1380,165.3L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
              ></path>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
