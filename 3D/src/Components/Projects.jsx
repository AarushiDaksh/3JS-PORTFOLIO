import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { motion, AnimatePresence } from "framer-motion";
import { AnimeModel } from "../models";

const Projects = ({ show, onClose, onOpenContact }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isDark = theme === "dark";
  const bgColor = isDark ? "bg-gray-900/90" : "bg-gray-100/90";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const subTextColor = isDark ? "text-gray-300" : "text-gray-700";
  const buttonText = isDark ? "🌞 Mode" : "🌙 Mode";

  const projects = [
    {
      name: "Voqit Movie App 🎬",
      desc: "React Native + TMDB API + Clerk auth.",
      img: "/images/6.png",
      github: "https://github.com/AarushiDaksh/movie-native-app",
    },
    {
      name: "Voqit AI Chatbot 🤖",
      desc: "React, Clerk, TailwindCSS chatbot with Express API.",
      img: "/images/4.png",
      github: "https://voqit-ai.vercel.app/",
    },
    {
      name: "3D Portfolio 🌐",
      desc: "Interactive 3D room portfolio using Three.js.",
      img: "/images/1.png",
      github: "https://3-js-portfolio-aarushi-dakshs-projects.vercel.app/",
    },
    {
      name: "Express CRUD App 🛠️",
      desc: "Basic CRUD operations with Express.js and MongoDB.",
      img: "/images/2.png",
      github: "https://github.com/AarushiDaksh/express-curd-app",
    },
    {
      name: "E-commerce Platform 🛒",
      desc: "Next.js and TypeScript based e-commerce application.",
      img: "/images/5.png",
      github:
        "https://superb-squirrel-63.accounts.dev/sign-in?redirect_url=https%3A%2F%2Fe-com-nextjs-voqit.vercel.app%2F",
    },
    {
      name: "Razorpay Payment Integration 💳",
      desc: "Payment gateway integration using Razorpay.",
      img: "/images/3.png",
      github:
        "https://github.com/AarushiDaksh/https---github.com-AarushiDaksh-razorpay_payment",
    },
  ];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
        >
          <div
            className={`relative w-full max-w-5xl h-screen rounded-xl shadow-xl overflow-hidden ${bgColor}`}
          >
            {/* Top Wave */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
              <svg className="relative block w-full h-[40px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                <path
                  fill="#10b981"
                  fillOpacity="0.3"
                  d="M0,128L60,154.7C120,181,240,235,360,240C480,245,600,203,720,186.7C840,171,960,181,1080,202.7C1200,224,1320,256,1380,272L1440,288L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
                />
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

              <h2 className={`text-3xl font-bold mb-4 ${textColor} font-mono tracking-wide uppercase`}>
                My Projects 🚀
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj, i) => (
                  <div
                    key={i}
                    className={`rounded-xl shadow-lg overflow-hidden transition transform hover:scale-105 ${isDark ? "bg-gray-800" : "bg-white"}`}
                  >
                    <img src={proj.img} alt={proj.name} className="w-full h-40 object-cover" />
                    <div className="p-4">
                      <h3 className={`text-xl font-semibold ${textColor}`}>{proj.name}</h3>
                      <p className={`text-sm my-2 ${subTextColor}`}>{proj.desc}</p>
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-block mt-2 px-4 py-2 rounded-md text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-yellow-400 hover:to-red-400 transition"
                      >
                        View GitHub →
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* 3D Model */}
              <div className="w-full h-[400px] mt-6">
                <Canvas camera={{ position: [0, 0, 5] }}>
                  <AnimeModel isAnimating={true} scale={[3, 3, 3]} position={[0, -1, 0]} />
                </Canvas>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col space-y-3 mt-6">
                <button
                  className="p-3 text-md font-semibold text-white bg-gradient-to-r from-purple-400 to-red-500 rounded-lg hover:from-red-500 hover:to-purple-600 transition duration-300 shadow-lg"
                  onClick={() => {
                    onClose();
                    onOpenContact(); // 👈 open Contact after closing
                  }}
                >
                  Let’s Build Something Amazing!
                </button>

                <a
                  href="https://github.com/AarushiDaksh"
                  target="_blank"
                  rel="noreferrer"
                  className={`text-center p-3 text-md font-semibold ${
                    isDark
                      ? "text-gray-300 border border-gray-600 hover:bg-gray-800"
                      : "text-gray-800 border border-gray-300 hover:bg-gray-200"
                  } rounded-lg transition duration-300`}
                >
                  Explore More Projects on GitHub 🚀
                </a>
              </div>
            </div>
          </div>

          {/* Scrollbar Hide */}
          <style>{`
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Projects;
