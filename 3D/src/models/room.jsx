import React, { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Text, useGLTF } from "@react-three/drei";
import roomScene from "../assets/3d/home-room.glb";

export function PortfolioRoom({ onShowAbout, ...props }) {
  const roomRef = useRef();
  const { scene, nodes, materials } = useGLTF(roomScene);

  useEffect(() => {
    if (roomRef.current) {
      roomRef.current.position.set(0, -1, 0);
      roomRef.current.scale.set(1, 1, 1);
    }
  }, []);

  useFrame(() => {
    if (roomRef.current) {
      roomRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={roomRef} {...props} dispose={null}>
      {/* Floating Button */}
      <Html position={[1.2, 1.5, -2]} center>
        <button 
          className="bg-white p-2 rounded shadow-lg text-xs font-semibold hover:bg-gray-300 transition"
          onClick={onShowAbout}
        >
          Me 😊
        </button>
      </Html>

      {/* Name Text */}
      <Text position={[0, 2.75, 0]} fontSize={0.30} color="#002D62" textAlign="center">
        Aarushi Daksh
      </Text>

      {/* Subtitle Text */}
      <Text position={[0, 2.5, 0]} fontSize={0.18} color="red" textAlign="center">
        Have Fun Exploring
      </Text>

      {/* Room Structure */}
      <primitive object={scene} />
    </group>
  );
}
