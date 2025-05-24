import React, { useEffect, useState } from "react";
import Home from "./Pages/home";

function App() {
  const [bursts, setBursts] = useState([]);

  const spawnFlower = (x, y) => {
    const id = Date.now();
    setBursts((prev) => [...prev, { id, x, y }]);
    setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 1000); // auto-remove after 1s
  };

  useEffect(() => {
    const handleClick = (e) => {
      spawnFlower(e.clientX, e.clientY);
    };
    const handleTouch = (e) => {
      const touch = e.touches[0];
      if (touch) spawnFlower(touch.clientX, touch.clientY);
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleTouch);

    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, []);

  return (
    <div
      className="w-full h-screen relative overflow-hidden"
      style={{
        cursor:
          "url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 height=%2236%22 width=%2236%22><text y=%2230%22 font-size=%2230%22>🌸</text></svg>') 0 0, auto",
      }}
    >
      {/* 🌼 Tap Bursts */}
      {bursts.map((burst) => (
        <div
          key={burst.id}
          className="animate-flower"
          style={{
            position: "fixed",
            left: burst.x,
            top: burst.y,
            transform: "translate(-50%, -50%)",
            fontSize: "28px",
            pointerEvents: "none",
            zIndex: 9999,
          }}
        >
          🌼
        </div>
      ))}

      <Home />
    </div>
  );
}

export default App;
