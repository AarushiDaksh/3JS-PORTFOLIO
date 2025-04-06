import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Menu } from "lucide-react";
import { soundoff, soundon } from "../assets/icons";
import sakura from "../assets/sakura.mp3";
import { PortfolioRoom } from "../models";
import About from "../Components/About";

const Home = () => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [roomScale, setRoomScale] = useState([1, 1, 1]);
  const [showAbout, setShowAbout] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlayingMusic]);

  useEffect(() => {
    const updateRoomSize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setRoomScale(mobile ? [0.8, 0.8, 0.8] : [1.5, 1.5, 1.5]);
    };

    updateRoomSize();
    window.addEventListener("resize", updateRoomSize);
    return () => window.removeEventListener("resize", updateRoomSize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showAbout ? "hidden" : "auto";
  }, [showAbout]);

  return (
    <section className="w-full h-screen flex flex-col relative overflow-hidden">

    {/* Navbar */}
<div className="absolute top-6 left-0 w-full flex justify-between items-center px-6 z-30">
  <h1 className="text-white text-xl font-bold drop-shadow-md tracking-wider">
    Aarushi
  </h1>

  {isMobile ? (
  <div className="relative z-40">
    <Menu
      className="text-white w-8 h-8 cursor-pointer drop-shadow"
      onClick={() => setShowMenu(!showMenu)}
    />
    {showMenu && (
      <div className="absolute right-0 mt-4 w-48 p-4 rounded-xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl flex flex-col gap-3 animate-fadeIn transition-all duration-300 ease-out">
        <button
          onClick={() => {
            setShowAbout(true);
            setShowMenu(false);
          }}
          className="text-white/90 hover:text-blue-300 font-medium transition"
        >
          About Me
        </button>
        <button className="text-white/90 hover:text-blue-300 font-medium transition">
          Projects
        </button>
        <button className="text-white/90 hover:text-blue-300 font-medium transition">
          Contact
        </button>
      </div>
    )}
  </div>
) : (
  

  
    <div className="flex space-x-6 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full shadow-lg text-white text-sm font-semibold">
      <button onClick={() => setShowAbout(true)} className="hover:text-blue-300 transition">
        About Me
      </button>
      <button className="hover:text-blue-300 transition">Projects</button>
      <button className="hover:text-blue-300 transition">Contact</button>
    </div>
  )}
</div>

      {/* 3D Scene */}
      <div className={`flex-1 ${isMobile ? "h-2/3" : "h-full"} relative`}>
        <Canvas className="w-full h-full" camera={{ position: [3, 2, 5], near: 0.1, far: 1000 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[1, 3, 2]} intensity={1.5} />
            <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />
            <PortfolioRoom scale={roomScale} onShowAbout={() => setShowAbout(true)} />
            <OrbitControls enableZoom={true} />
          </Suspense>
        </Canvas>
      </div>

      {/* About Panel */}
      <div
        className={`fixed z-50 transition-all duration-500 ease-in-out ${
          isMobile
            ? `${showAbout ? "bottom-0 max-h-screen opacity-100" : "bottom-[-100%] opacity-0"} left-0 w-full bg-white overflow-hidden`
            : `${showAbout ? "left-0 translate-x-0" : "-translate-x-full"} top-0 h-full w-96 bg-white shadow-lg p-6`
        }`}
      >
        <About show={showAbout} onClose={() => setShowAbout(false)} />
      </div>
      {/* Music Control Button */}
      
      <button
        onClick={() => setIsPlayingMusic(!isPlayingMusic)}
        className="absolute top-3 right-4 sm:top-auto sm:bottom-4 z-[9999] bg-white text-black p-3 sm:p-2 rounded-full shadow-lg hover:bg-gray-200 transition"
        title={isPlayingMusic ? "Pause Music" : "Play Music"}
      >
        <img
          src={isPlayingMusic ? soundon : soundoff}
          alt="Sound Icon"
          className="w-6 h-6"
        />
      </button>



    </section>
  );
};

export default Home;
