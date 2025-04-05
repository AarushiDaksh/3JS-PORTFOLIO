import React, { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { PortfolioRoom } from "../models";
import About from "../Components/About";

const Home = () => {
  const [roomScale, setRoomScale] = useState([1, 1, 1]);
  const [showAbout, setShowAbout] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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
    <section className="w-full h-screen flex flex-col">
      {/* 3D Scene */}
      <div className={`flex-1 ${isMobile ? "h-2/3" : "h-full"} relative`}>
        <Canvas className="w-full h-full bg-transparent" camera={{ position: [3, 2, 5], near: 0.1, far: 1000 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[1, 3, 2]} intensity={1.5} />
            <hemisphereLight skyColor="#b1e1ff" groundColor="#000000" intensity={1} />
            <PortfolioRoom scale={roomScale} onShowAbout={() => setShowAbout(true)} />
            <OrbitControls enableZoom={true} />
          </Suspense>
        </Canvas>
      </div>

      {/* Right-Side Navbar (Only on Desktop) */}
      {!isMobile && (
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
        <div className={`w-full transition-transform duration-300 ${showAbout ? "h-1/3" : "h-0 overflow-hidden"}`}>
          <About show={showAbout} onClose={() => setShowAbout(false)} />
        </div>
      ) : (
        <div className={`fixed top-0 left-0 h-full bg-white shadow-lg p-6 z-50 transition-transform duration-300
          ${showAbout ? "translate-x-0 w-96" : "-translate-x-full"}`}>
          <About show={showAbout} onClose={() => setShowAbout(false)} />
        </div>
      )}
    </section>
  );
};

export default Home;
