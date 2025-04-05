import React, { useEffect, useRef } from "react";
import { Html, Text, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

import skyboxScene from "../assets/3d/skybox_stylized_room.glb";

export function PortfolioRoom({ onShowAbout }) {
  const skyRef = useRef();
  const { scene: skybox } = useGLTF(skyboxScene);

  useEffect(() => {
    if (skyRef.current) {
      skyRef.current.position.set(0, 0, -5); // Keep it behind
      skyRef.current.scale.set(10, 10, 10);  // Adjust to fill the background
    }
  }, []);

  return (
    <group>
      {/* ✅ Background Skybox Model */}
      <primitive ref={skyRef} object={skybox} />

      {/* ✅ Floating Button */}
      <Html position={[1.2, 1.5, -2]} center>
        <button
          className="bg-white p-2 rounded shadow-lg text-xs font-semibold hover:bg-gray-300 transition"
          onClick={onShowAbout}
        >
          Me 😊
        </button>
      </Html>

      {/* ✅ Floating Text */}
      <Text
        position={[0, 2.75, 0]}
        fontSize={0.7}
        color="#002D62"
        textAlign="center"
      >
        Aarushi Daksh
      </Text>

      <Text
        position={[0, 2, 0]}
        fontSize={0.4}
        color="red"
        textAlign="center"
        
      >
        Have Fun Exploring
      </Text>
    </group>
  );
}

useGLTF.preload(skyboxScene);
