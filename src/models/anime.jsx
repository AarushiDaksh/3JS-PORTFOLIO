import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useFrame } from "@react-three/fiber"; // ✅ Import useFrame
import animeScene from "../assets/3d/anime.glb";

export function AnimeModel({ isAnimating, ...props }) {
  const ref = useRef();
  
  const { scene, animations, nodes, materials } = useGLTF(animeScene);
  const { actions } = useAnimations(animations, ref);

  useEffect(() => {
    if (isAnimating) {
      actions[Object.keys(actions)[0]]?.play();
    } else {
      actions[Object.keys(actions)[0]]?.stop();
    }
  }, [actions, isAnimating]);

  // ✅ Rotate Model Continuously
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y += 0.02; // Adjust speed if needed
    }
  });

  return (
    <group
      {...props}
      ref={ref}
      scale={[5, 5, 5]} // ✅ Increase size
      position={[0, -5, 0]}   // ✅ Move slightly down
    >
      <primitive object={scene} />
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Clara_Armature_269">
                <group name="GLTF_created_0">
                  <primitive object={nodes.GLTF_created_0_rootJoint} />
                  <skinnedMesh name="Object_7" geometry={nodes.Object_7.geometry} material={materials.face_Tex} skeleton={nodes.Object_7.skeleton} />
                  <skinnedMesh name="Object_8" geometry={nodes.Object_8.geometry} material={materials.hair_Tex} skeleton={nodes.Object_8.skeleton} />
                  <skinnedMesh name="Object_9" geometry={nodes.Object_9.geometry} material={materials.eyes_tex} skeleton={nodes.Object_9.skeleton} />
                  <skinnedMesh name="Object_10" geometry={nodes.Object_10.geometry} material={materials.face_tex_nonshadow} skeleton={nodes.Object_10.skeleton} />
                  <skinnedMesh name="Object_11" geometry={nodes.Object_11.geometry} material={materials.eyebrows_Tex} skeleton={nodes.Object_11.skeleton} />
                  <skinnedMesh name="Object_12" geometry={nodes.Object_12.geometry} material={materials.hair_maegami} skeleton={nodes.Object_12.skeleton} />
                  <skinnedMesh name="Object_14" geometry={nodes.Object_14.geometry} material={materials.frill_Tex} skeleton={nodes.Object_14.skeleton} />
                  <skinnedMesh name="Object_15" geometry={nodes.Object_15.geometry} material={materials.cloth_tex} skeleton={nodes.Object_15.skeleton} />
                  <skinnedMesh name="Object_16" geometry={nodes.Object_16.geometry} material={materials.chain_tex} skeleton={nodes.Object_16.skeleton} />
                  <skinnedMesh name="Object_17" geometry={nodes.Object_17.geometry} material={materials.skin_tex} skeleton={nodes.Object_17.skeleton} />
                  <skinnedMesh name="Object_18" geometry={nodes.Object_18.geometry} material={materials.skin_black} skeleton={nodes.Object_18.skeleton} />
                  <skinnedMesh name="Object_19" geometry={nodes.Object_19.geometry} material={materials.cloth_blue} skeleton={nodes.Object_19.skeleton} />
                  <skinnedMesh name="Object_21" geometry={nodes.Object_21.geometry} material={materials.frill_Tex} skeleton={nodes.Object_21.skeleton} />
                  <skinnedMesh name="Object_22" geometry={nodes.Object_22.geometry} material={materials.cloth_blue} skeleton={nodes.Object_22.skeleton} />
                  <skinnedMesh name="Object_24" geometry={nodes.Object_24.geometry} material={materials.hair_Tex} skeleton={nodes.Object_24.skeleton} />
                  <skinnedMesh name="Object_26" geometry={nodes.Object_26.geometry} material={materials.hat_tex} skeleton={nodes.Object_26.skeleton} />
                  <skinnedMesh name="Object_27" geometry={nodes.Object_27.geometry} material={materials.frill_Tex} skeleton={nodes.Object_27.skeleton} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
