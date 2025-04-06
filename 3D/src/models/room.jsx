import React, { useRef } from "react";
import { Html, Text, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import skyboxScene from "../assets/3d/skybox_stylized_room.glb";

export function PortfolioRoom({ onShowAbout }) {
  const skyRef = useRef();
  const { scene: skybox } = useGLTF(skyboxScene);

  // Invert normals once on mount
  React.useEffect(() => {
    if (skybox) {
      skybox.traverse((child) => {
        if (child.isMesh) {
          child.material.side = THREE.BackSide; // 🔁 Make it a skybox
        }
      });
    }

    if (skyRef.current) {
      skyRef.current.scale.set(11, 11, 11); // Big enough to wrap camera
    }
  }, [skybox]);

  return (
    <group>
      {/* ✅ Background Skybox wrapped around */}
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
        fontSize={0.5}
        color="#002D62"
        textAlign="center"
      >
        Aarushi Daksh
      </Text>

      <Text
        position={[0, 2, 0]}
        fontSize={0.3}
        color="red"
        textAlign="center"
      >
        Have Fun Exploring
      </Text>
    </group>
  );
}


