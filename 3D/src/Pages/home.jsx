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
      <div className="absolute top-4 left-4 z-30 flex items-center justify-between w-full px-4">
        {isMobile ? (
          <>
            <Menu
              className="text-black w-8 h-8 cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />
            {showMenu && (
              <div className="absolute top-12 left-4 bg-white text-black shadow-md rounded-md p-3 flex flex-col space-y-2 z-40">
                <button onClick={() => { setShowAbout(true); setShowMenu(false); }} className="hover:text-blue-500">
                  About Me
                </button>
                <button className="hover:text-blue-500">Projects</button>
                <button className="hover:text-blue-500">Contact</button>
              </div>
            )}
          </>
        ) : (
          <div className="absolute right-4 top-1/3 flex flex-col space-y-4 bg-white text-black p-2 rounded-lg shadow-lg z-10">
            <button className="p-2 text-sm font-semibold border-b hover:text-blue-600" onClick={() => setShowAbout(true)}>
              About Me
            </button>
            <button className="p-2 text-sm font-semibold border-b hover:text-blue-600">Projects</button>
            <button className="p-2 text-sm font-semibold hover:text-blue-600">Get in Touch</button>
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
        className="absolute bottom-4 right-4 z-[9999] bg-white text-black p-3 sm:p-2 rounded-full shadow-lg hover:bg-gray-200 transition"

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
