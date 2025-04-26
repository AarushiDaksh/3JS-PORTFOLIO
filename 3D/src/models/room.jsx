import React, { useRef, useEffect } from "react";
import { Html, Text, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import skyboxScene from "../assets/3d/skybox_stylized_room.glb";

export function PortfolioRoom({ onShowAbout }) {
  const skyRef = useRef();
  const { scene: skybox } = useGLTF(skyboxScene);

  useEffect(() => {
    if (skybox) {
      skybox.traverse((child) => {
        if (child.isMesh) {
          child.material.side = THREE.BackSide;
        }
      });
    }

    if (skyRef.current) {
      skyRef.current.scale.set(10, 10, 10);
    }
  }, [skybox]);

  return (
    <group>
      <primitive ref={skyRef} object={skybox} />

      <Html position={[3, 1.5, -2]} center>
        <button
          className="bg-white p-2 rounded shadow-lg text-xs font-semibold hover:bg-gray-300 transition"
          onClick={onShowAbout}
        >
          Me 😊
        </button>
      </Html>

      <Text position={[0, 2.75, 0]} fontSize={0.5} color="#002D62" textAlign="center">
        Aarushi Daksh
      </Text>

      <Text position={[0, 2, 0]} fontSize={0.3} color="red" textAlign="center">
        Have Fun Exploring
      </Text>
    </group>
  );
}
