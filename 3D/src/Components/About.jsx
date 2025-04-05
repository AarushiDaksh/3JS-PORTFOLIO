import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { AnimeModel } from '../models';

const About = ({ onClose, show }) => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');

  // Persist theme in localStorage
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

  // Theme-specific styles
  const isDark = theme === 'dark';
  const bgColor = isDark ? 'bg-gray-900' : 'bg-gray-100';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subTextColor = isDark ? 'text-gray-300' : 'text-gray-700';
  const buttonText = isDark ? '🌞 Mode' : '🌙 Mode';

  return (
    <div className={`fixed top-0 left-0 h-full w-[500px] ${bgColor} shadow-lg z-20 
      transform transition-transform duration-300 ${show ? "translate-x-0" : "-translate-x-full"}`}>

      {/* CSS Inside Page */}
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .no-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>

      {/* Scrollable Container */}
      <div className="h-full overflow-y-auto p-6 no-scrollbar">

        {/* Top Controls */}
        <div className="flex justify-between items-center mb-4">
          <button className="text-lg hover:text-red-500 transition" onClick={onClose}>✕</button>
          <button
            className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-yellow-400 hover:to-red-400 transition"
            onClick={toggleTheme}
          >
            {buttonText}
          </button>
        </div>

        {/* About Heading */}
        <h2 className={`text-3xl font-extrabold mb-4 ${textColor} tracking-wide uppercase font-mono`}>
          Who Am I? 🚀
        </h2>

        {/* Creative Description */}
        <p className={`text-lg ${subTextColor} mb-6 font-semibold italic tracking-wide font-[Poppins] leading-relaxed`}>
          <span className="bg-gradient-to-r from-purple-400 to-red-500 text-transparent bg-clip-text">
            Greetings, traveler of the digital realm! I’m Aarushi Daksh, a Full Stack Sorcerer weaving magic into code.
            Whether it’s crafting <strong>sleek UIs</strong>, sculpting <strong>3D experiences</strong>, or optimizing <strong>backend wonders</strong>,
            I thrive on transforming <strong>imagination into innovation.</strong>
          </span>
        </p>

        <p className={`text-md ${isDark ? 'text-gray-400' : 'text-gray-800'} font-medium leading-relaxed`}>
          With expertise in <strong>React, Three.js, and the latest web tech</strong>, I sculpt digital landscapes that <strong>breathe, move, and inspire</strong>.  
          My mission? To bridge the gap between <strong>art & technology</strong>, turning dreams into seamless, interactive realities.  
          Every line of code I write is infused with <strong>passion, precision, and the desire to push boundaries</strong>. 🌌
        </p>

        <p className={`text-md ${isDark ? 'text-gray-500' : 'text-gray-600'} font-medium italic mt-4`}>
          "Great things are built pixel by pixel, function by function, and dream by dream."
        </p>

        {/* 3D Model */}
        <div className="w-full h-[400px] mt-6">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <AnimeModel isAnimating={true} scale={[3, 3, 3]} position={[0, -1, 0]} />
          </Canvas>
        </div>

        {/* Call to Action */}
        <div className="flex flex-col space-y-3 mt-6">
          <button
            className="p-3 text-md font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg 
              hover:from-red-500 hover:to-purple-600 transition duration-300 shadow-lg"
            onClick={() => navigate('/contact')}
          >
            Let’s Build Something Amazing!
          </button>

          <button
            className={`p-3 text-md font-semibold ${isDark ? 'text-gray-300 border border-gray-600 hover:bg-gray-800' : 'text-gray-800 border border-gray-300 hover:bg-gray-200'} rounded-lg transition duration-300`}
            onClick={() => navigate('/projects')}
          >
            Explore My Creations 🚀
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
