import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimeModel } from '../models';

const About = ({ onClose, show, onOpenProjects, onOpenContact }) => {
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
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed z-100 inset-0 bg-black/50 flex items-center justify-center"
        >
          <div className={`relative w-full max-w-md h-[100vh] rounded-xl shadow-xl overflow-hidden ${bgColor}`}>
            {/* Wave Top Decoration */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
              <svg className="relative block w-full h-[40px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path fill="#6366f1" fillOpacity="0.3" d="M0,96L60,122.7C120,149,240,203,360,208C480,213,600,171,720,154.7C840,139,960,149,1080,170.7C1200,192,1320,224,1380,240L1440,256L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z" />
              </svg>
            </div>

            {/* Scrollable Content */}
            <div className="relative h-full overflow-y-scroll scrollbar-hide p-6 pt-12">
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={onClose}
                  className={`text-lg transition hover:text-red-500 ${isDark ? "text-white" : "text-black"}`}
                >
                  ✕
                </button>
                <button
                  onClick={toggleTheme}
                  className="text-sm px-3 py-1 rounded-full bg-gradient-to-r from-green-400 to-teal-500 text-white hover:from-yellow-400 hover:to-red-400 transition"
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
                  className="p-3 text-md font-semibold text-white bg-gradient-to-r from-purple-400 to-red-500 rounded-lg hover:from-red-500 hover:to-purple-600 transition duration-300 shadow-lg"
                  onClick={() => {
                    onClose();
                    onOpenContact();
                  }}
                >
                  Let’s Build Something Amazing!
                </button>

                <button
                  className={`p-3 text-md font-semibold ${isDark ? 'text-gray-300 border border-gray-600 hover:bg-gray-800' : 'text-gray-800 border border-gray-300 hover:bg-gray-200'} rounded-lg transition duration-300`}
                  onClick={() => {
                    onClose();
                    onOpenProjects();
                  }}
                >
                  Explore My Creations 🚀
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </AnimatePresence>
  );
};

export default About;
