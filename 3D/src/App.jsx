import React, { useEffect, useState } from "react";
import Home from "./Pages/home";

function App() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="w-full h-screen relative"
      style={{
        cursor:
          "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 height=%2236%22 width=%2236%22><text y=%2230%22 font-size=%2230%22>🌸</text></svg>') 0 0, auto",
      }}
    >
      {/* Cursor highlight */}
      <div
        className="pointer-events-none fixed z-[9999] transition-all duration-75"
        style={{
          left: pos.x - 20,
          top: pos.y - 20,
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: "rgba(255,192,203,0.2)", // light pink glow
          boxShadow: "0 0 15px rgba(255,105,180,0.5)", // pink glow
        }}
      />

      <Home />
    </div>
  );
}

export default App;
