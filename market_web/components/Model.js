"use client";
import { useEffect, useState } from "react";
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
import Navbar from "./Navbar";

function Model({ url, position, rotation, scale }) {
  const { scene, animations } = useGLTF(url);
  const { actions, names } = useAnimations(animations, scene);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );

  useEffect(() => {
    if (names.length > 0) {
      const action = actions[names[0]];
      if (action) {
        action.reset().play();
      }
    }
  }, [actions, names]);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [url]);

  let finalScale = scale;
  let finalPosition = position;

  if (windowWidth <= 768) {
    if (url.includes("model1.glb")) {
      finalScale = scale * 0.8;
      finalPosition = [position[0] - 0.5, position[1] + 0.2, position[2] + 0.3];
    } else if (url.includes("model2.glb")) {
      finalScale = scale * 1.2;
      finalPosition = [position[0], position[1] - 1.5, position[2] - 1];
    }
  }

  return (
    <group>
      <primitive
        object={scene}
        position={finalPosition}
        rotation={rotation}
        scale={finalScale}
      />
    </group>
  );
}

export default function Scene() {
  return (
    <main className="scene-container">
      <Navbar />

      <section className="first-section">
        <div className="canvas-wrapper">
          <Canvas
            shadows
            camera={{ position: [0, 0, 5], fov: 45 }}
            className="canvas"
            gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
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

        <div
          className="content-wrapper columns-layout"
          style={{
            gap: window.innerWidth > 768 ? "4rem" : "2rem",
            justifyContent: "center",
          }}
        >
          <div
            className="column"
            style={{
              gap: window.innerWidth > 768 ? "4rem" : "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <motion.div
              className="feature-box top-left"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h3>Immersive Environments</h3>
              <p>Explore highly detailed and interactive 3D worlds.</p>
            </motion.div>
            <motion.div
              className="feature-box left"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h3>Realistic Animations</h3>
              <p>
                Our 3D characters come with smooth and expressive animations.
              </p>
            </motion.div>
          </div>

          <div
            className="model-container"
            style={{ margin: window.innerWidth > 768 ? "0 4rem" : "0 2rem" }}
          >
            <Canvas
              shadows
              gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
              dpr={[1, 2]}
            >
              <PerspectiveCamera
                makeDefault
                position={[0, 0, 8]}
                fov={50}
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
                position={[0, -2, 0]}
                rotation={[0, -1.57, 0]}
                scale={3}
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

          <div
            className="column"
            style={{
              gap: window.innerWidth > 768 ? "4rem" : "2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <motion.div
              className="feature-box top-right"
              initial={{ opacity: 0, y: -50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h3>Customizable Features</h3>
              <p>Adjust the experience to suit your needs with ease.</p>
            </motion.div>
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
        </div>
      </section>
    </main>
  );
}
