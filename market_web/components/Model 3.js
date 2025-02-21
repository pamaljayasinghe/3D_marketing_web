"use client";
import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  useGLTF,
  useAnimations,
  OrbitControls,
  Environment,
} from "@react-three/drei";
import "../app/styles/Model.css";

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
    <main>
      {/* First Section */}
      <section className="first-section">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          className="canvas"
          gl={{ alpha: true }}
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <Model url="/models/model1.glb" />
          <Environment preset="lobby" />
        </Canvas>

        <div className="overlay-text">Welcome to Our 3D Experience</div>

        <img
          src="/models/chair2.png"
          alt="Overlay Image"
          className="overlay-image"
        />
      </section>

      {/* Second Section */}
      <section className="second-section">
        <h2>About Our Project</h2>
        <p>This is the second section where we can provide more information.</p>
      </section>
    </main>
  );
}
