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
import ComingSoon from "./coming";
import TeamSection from "./team";
import Footer from "./footer";

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

      <section className="first-section" id="home">
        <div className="hero-content">
          <h1 className="hero-title">Experience Fashion in 3D</h1>
          <p className="hero-description">
            Discover the future of fashion with Fit-On, the ultimate 3D virtual
            dressing room. Transform your shopping experience with AI-powered
            outfit recommendations, LiDAR-based body modeling, and augmented
            reality try-ons.
          </p>
          <div className="hero-buttons">
            <a href="#about" className="hero-button hero-button-primary">
              About Us
            </a>
            <a href="#contact" className="hero-button hero-button-secondary">
              Contact
            </a>
          </div>
        </div>
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
              enableRotate={false}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
        </div>
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
              <h3>Interactive Experiences</h3>
              <p>
                Enhance your shopping journey with virtual try-ons and real-time
                fashion recommendations. Scan in-store QR codes, mix and match
                outfits in your digital closet, and enjoy a seamless online
                shopping experience with direct retailer integrations.
              </p>
            </motion.div>
            <motion.div
              className="feature-box left"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h3>Immersive Environments </h3>
              <p>
                Step into a hyper-realistic 3D fashion world with Fit-On. Our
                advanced augmented reality (AR) and 3D modeling technology
                create an engaging and interactive experience, allowing you to
                visualize outfits in a lifelike setting.
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
              <h3>Realistic Animations</h3>
              <p>
                Experience the most lifelike virtual try-on experience with our
                AI-powered animations. Using LiDAR scanning technology, our
                avatars accurately reflect your body measurements, ensuring
                every movement and fit feels natural.
              </p>
            </motion.div>
            <motion.div
              className="feature-box right"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <h3>Customizable Features</h3>
              <p>
                Your style, your way! With personalized body modeling, wardrobe
                organization, and weather-based outfit recommendations, Fit-On
                tailors every aspect of fashion to your unique preferences.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="coming-soon-section">
        <ComingSoon />
      </section>
      <section className="team-section">
        <TeamSection />
      </section>
      <Footer />
    </main>
  );
}
