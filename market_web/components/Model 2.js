"use client";
import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  useAnimations,
  OrbitControls,
  Environment,
} from "@react-three/drei";

function Model({ url }) {
  const { scene, animations } = useGLTF(url);
  const { actions, names } = useAnimations(animations, scene);

  useEffect(() => {
    if (names.length > 0) {
      const action = actions[names[0]];
      if (action) {
        action.reset().play();
      }
    }
  }, [actions, names]);

  return (
    <>
      <primitive
        object={scene}
        scale={0.96}
        position={[0, -1, 0]}
        rotation={[0, -1.5707963267948966, 0]} // -Math.PI/2 (90 degrees left)
      />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false} // Disable rotation
        minPolarAngle={Math.PI / 2}
        maxPolarAngle={Math.PI / 2}
      />
    </>
  );
}

export default function Scene() {
  return (
    <div
      className="model-container"
      style={{
        position: "relative",
        width: "100vw",
        height: "80vh",
        backgroundImage: "url('/models/darkback.svg')", // Set background image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        overflow: "hidden",
      }}
    >
      {/* WebGL Canvas with Transparent Background */}
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 5, // Keep model above the background
        }}
        gl={{ alpha: true }} // Enable transparent background
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Model url="/models/model1.glb" />
        <Environment preset="lobby" />
      </Canvas>

      {/* Image Positioned on Top */}
      <img
        src="/models/chair2.png"
        alt="Overlay Image"
        style={{
          position: "absolute",
          top: "470px",
          left: "940px",
          width: "250px",
          height: "auto",
          zIndex: 2, // Ensure image is above the canvas
        }}
      />

      {/* Text Overlay */}
      <div
        style={{
          position: "absolute",
          top: "20%", // Adjust positioning
          left: "10%",
          color: "white",
          fontSize: "2rem",
          fontWeight: "bold",
          zIndex: 10, // Ensure text is above everything
          textShadow: "2px 2px 8px rgba(0,0,0,0.5)",
        }}
      >
        Welcome to Our 3D Experience
      </div>
    </div>
  );
}
