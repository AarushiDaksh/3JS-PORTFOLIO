import React, { Suspense, useRef, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { soundoff, soundon } from "../assets/icons";
import sakura from "../assets/sakura.mp3";
import { PortfolioRoom } from "../models";
import About from "../Components/About";
import { Menu } from "lucide-react"; // You can replace this with your own icon if needed

const Home = () => {
  const audioRef = useRef(new Audio(sakura));
  audioRef.current.volume = 0.4;
  audioRef.current.loop = true;

  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [roomScale, setRoomScale] = useState([1, 1, 1]);
  const [showAbout, setShowAbout] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
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
      {/* Mobile Navbar */}
      {isMobile && (
        <div className="w-full flex items-center justify-between px-4 py-3 bg-white shadow-md z-30 fixed top-0 left-0">
          <h1 className="text-lg font-bold text-gray-800">Portfolio</h1>
          <button onClick={() => setShowMobileMenu((prev) => !prev)}>
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      )}

      {/* Mobile Dropdown Menu */}
      {isMobile && showMobileMenu && (
        <div className="absolute top-14 left-0 w-full bg-white z-20 shadow-md px-4 py-2 space-y-2">
          <button className="block text-sm text-blue-700" onClick={() => { setShowAbout(true); setShowMobileMenu(false); }}>About</button>
          <button className="block text-sm text-blue-700">Projects</button>
          <button className="block text-sm text-blue-700">Contact</button>
        </div>
      )}

      {/* 3D Scene */}
      <div className={`relative ${isMobile ? "pt-14 h-[66vh]" : "flex-1"}`}>
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

      {/* Desktop Sidebar Navbar */}
      {!isMobile && (
        <div className="absolute right-4 top-1/3 flex flex-col space-y-4 bg-white p-2 rounded-lg shadow-lg z-10">
          <button className="p-2 text-sm font-semibold border-b hover:text-blue-600" onClick={() => setShowAbout(true)}>About Me</button>
          <button className="p-2 text-sm font-semibold border-b hover:text-blue-600">Projects</button>
          <button className="p-2 text-sm font-semibold hover:text-blue-600">Get in Touch</button>
        </div>
      )}

      {/* About Section */}
      {isMobile ? (
        <div
          className={`absolute bottom-0 left-0 w-full bg-white z-30 transition-transform duration-300 ${
            showAbout ? "translate-y-0 h-[34vh]" : "translate-y-full h-0"
          } overflow-hidden shadow-2xl`}
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
