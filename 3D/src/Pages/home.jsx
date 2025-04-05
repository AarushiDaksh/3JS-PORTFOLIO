import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
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

  useEffect(() => {
    if (isPlayingMusic) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlayingMusic]);

  useEffect(() => {
    const updateRoomSize = () => {
      setIsMobile(window.innerWidth < 768);
      setRoomScale(window.innerWidth < 768 ? [0.8, 0.8, 0.8] : [1.5, 1.5, 1.5]);
    };

    updateRoomSize();
    window.addEventListener("resize", updateRoomSize);
    return () => window.removeEventListener("resize", updateRoomSize);
  }, []);

  return (
    <section className="w-full h-screen flex flex-col relative overflow-hidden">
      {/* 3D Scene */}
      <div className={`relative ${isMobile ? "h-[65vh]" : "flex-1"}`}>
        <Canvas
          className="w-full h-full bg-transparent"
          camera={{ position: [3, 2, 5], near: 0.1, far: 1000 }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[1, 3, 2]} intensity={1.5} />
            <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />
            <PortfolioRoom scale={roomScale} onShowAbout={() => setShowAbout(true)} />
            <OrbitControls enableZoom={true} />
          </Suspense>
        </Canvas>
      </div>

      {/* Navbar */}
      {isMobile ? (
        <div className="w-full flex justify-around items-center bg-white py-2 shadow-md z-20">
          <button className="text-xs font-semibold text-blue-700" onClick={() => setShowAbout(true)}>About</button>
          <button className="text-xs font-semibold text-blue-700">Projects</button>
          <button className="text-xs font-semibold text-blue-700">Contact</button>
        </div>
      ) : (
        <div className="absolute right-4 top-1/3 flex flex-col space-y-4 bg-white p-2 rounded-lg shadow-lg z-10">
          <button className="p-2 text-sm font-semibold border-b hover:text-blue-600" onClick={() => setShowAbout(true)}>
            About Me
          </button>
          <button className="p-2 text-sm font-semibold border-b hover:text-blue-600">Projects</button>
          <button className="p-2 text-sm font-semibold hover:text-blue-600">Get in Touch</button>
        </div>
      )}

      {/* About Section */}
      {isMobile ? (
        <div
          className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ${
            showAbout ? "translate-y-0" : "translate-y-full"
          }`}
        >
          <div className="p-4">
            <About show={showAbout} onClose={() => setShowAbout(false)} />
          </div>
        </div>
      ) : (
        <div
          className={`fixed top-0 left-0 h-full bg-white shadow-lg p-6 z-50 transition-transform duration-300 ${
            showAbout ? "translate-x-0 w-96" : "-translate-x-full"
          }`}
        >
          <About show={showAbout} onClose={() => setShowAbout(false)} />
        </div>
      )}

      {/* Audio Control */}
      <div className="absolute bottom-4 left-4 z-10">
        <img
          src={isPlayingMusic ? soundon : soundoff}
          alt="jukebox"
          onClick={() => setIsPlayingMusic(!isPlayingMusic)}
          className="w-10 h-10 cursor-pointer object-contain"
        />
      </div>
    </section>
  );
};

export default Home;
