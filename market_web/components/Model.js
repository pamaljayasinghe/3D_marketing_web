"use client";
import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import {
  useGLTF,
  useAnimations,
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import "../app/styles/Model.css";

function Model({ url, position, rotation, scale }) {
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
    <group>
      <primitive
        object={scene}
        position={position}
        rotation={rotation}
        scale={scale}
      />
    </group>
  );
}

export default function Scene() {
  return (
    <main className="scene-container">
      <section className="first-section">
        <div className="canvas-wrapper">
          <Canvas
            shadows
            camera={{ position: [0, 0, 5], fov: 45 }}
            className="canvas"
            gl={{
              antialias: true,
              alpha: true,
              preserveDrawingBuffer: true,
            }}
          >
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Model
              url="/models/model1.glb"
              position={[0, -1, 0]}
              rotation={[0, -1.5707963267948966, 0]}
              scale={0.96}
            />
            <Environment preset="lobby" />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
            />
          </Canvas>
        </div>
        <div className="overlay-text">Welcome to Our 3D Experience</div>
        <img
          src="/models/chair2.png"
          alt="Overlay Image"
          className="overlay-image"
        />
      </section>

      <section className="second-section">
        <h2 className="section-title">Discover Our Features</h2>

        <div className="content-wrapper">
          <motion.div
            className="feature-box left"
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h3>Realistic Animations</h3>
            <p>Our 3D characters come with smooth and expressive animations.</p>
          </motion.div>

          <div className="model-container">
            <Canvas
              shadows
              gl={{
                antialias: true,
                alpha: true,
                preserveDrawingBuffer: true,
              }}
              dpr={[1, 2]}
            >
              <PerspectiveCamera
                makeDefault
                position={[0, 0, 8]} // Moved camera back
                fov={50} // Adjusted field of view
                near={0.1}
                far={1000}
              />
              <ambientLight intensity={0.8} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <directionalLight
                position={[0, 5, 5]}
                intensity={0.5}
                castShadow
              />
              <Model
                url="/models/model2.glb"
                position={[0, -2, 0]} // Adjusted Y position down
                rotation={[0, -1.57, 0]}
                scale={3} // Adjusted scale
              />
              <Environment preset="studio" />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={true}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
              />
            </Canvas>
          </div>

          <motion.div
            className="feature-box right"
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h3>Interactive Experiences</h3>
            <p>Engage with 3D content like never before.</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
