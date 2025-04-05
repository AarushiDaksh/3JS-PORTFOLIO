import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import { AnimeModel } from '../models';

const About = ({ onClose, show }) => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState('dark');
  const [isBuildClicked, setIsBuildClicked] = useState(false);

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
  const bgColor = isDark ? 'bg-gray-900/90 backdrop-blur-xl' : 'bg-gray-100/90 backdrop-blur-md';
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subTextColor = isDark ? 'text-gray-300' : 'text-gray-700';
  const buttonText = isDark ? '🌞 Mode' : '🌙 Mode';

  return (
    <div className={`fixed z-30 top-0 md:top-4 left-0 md:left-4 h-[65%] md:h-[90%] w-full md:w-[400px] lg:w-[380px] max-w-full md:max-w-sm rounded-none md:rounded-xl ${bgColor} shadow-2xl transition-transform duration-300 transform ${show ? 'translate-x-0' : '-translate-x-full'}`}>

      {/* Hide scrollbar and smooth scroll */}
      <style>
        {`
          .no-scrollbar::-webkit-scrollbar { display: none; }
          .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

          html {
            scroll-behavior: smooth;
          }
        `}
      </style>

      {/* Animated Wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-[40px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#6366f1" fillOpacity="0.3" d="M0,96L60,122.7C120,149,240,203,360,208C480,213,600,171,720,154.7C840,139,960,149,1080,170.7C1200,192,1320,224,1380,240L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
        </svg>
      </div>

      <div className="relative h-full overflow-y-auto no-scrollbar p-6 pt-10">
        <div className="flex justify-between items-center mb-4">
          <button className="text-lg hover:text-red-500 transition" onClick={onClose}>✕</button>
          <button
            className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-yellow-400 hover:to-red-400 transition"
            onClick={toggleTheme}
          >
            {buttonText}
          </button>
        </div>

        <h2 className={`text-3xl font-extrabold mb-4 ${textColor} tracking-wide uppercase font-mono`}>
          Who Am I? 🚀
        </h2>

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

        <div className="w-full h-[400px] mt-6">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <AnimeModel isAnimating={true} scale={[3, 3, 3]} position={[0, -1, 0]} />
          </Canvas>
        </div>

        <div className="flex flex-col space-y-3 mt-6">
          <button
            className={`p-3 text-md font-semibold text-white rounded-lg transition duration-300 shadow-lg
              ${isBuildClicked
                ? 'bg-gradient-to-r from-red-500 to-purple-600'
                : 'bg-gradient-to-r from-purple-400 to-red-500 hover:from-red-500 hover:to-purple-600'
              }`}
            onClick={() => {
              setIsBuildClicked(true);
              navigate('/contact');
            }}
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
