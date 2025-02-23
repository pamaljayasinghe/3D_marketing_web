"use client";
import { useEffect, useState, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import {
  useGLTF,
  useAnimations,
  OrbitControls,
  Environment,
  PerspectiveCamera,
  AdaptiveDpr,
  BakeShadows,
  AdaptiveEvents,
  PerformanceMonitor,
} from "@react-three/drei";
import "../app/styles/Model.css";
import Navbar from "./Navbar";
import ComingSoon from "./coming";
import TeamSection from "./team";
import Footer from "./footer";

function Model({ url, position, rotation, scale }) {
  const { scene, animations } = useGLTF(url, true); // Enable DRACO compression
  const { actions, names } = useAnimations(animations, scene);
  const [windowWidth, setWindowWidth] = useState(1200);

  useEffect(() => {
    // Optimize scene
    scene.traverse((child) => {
      if (child.isMesh) {
        child.frustumCulled = true;
        child.castShadow = false;
        child.receiveShadow = false;

        if (child.material) {
          child.material.precision = windowWidth <= 768 ? "lowp" : "highp";
          if (child.material.map) {
            child.material.map.anisotropy = 1;
          }
        }
      }
    });

    // Debounced resize handler
    const handleResize = debounce(() => {
      setWindowWidth(window.innerWidth);
    }, 250);

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener("resize", handleResize);
  }, [scene, windowWidth]);

  useEffect(() => {
    if (names.length > 0) {
      const action = actions[names[0]];
      if (action) {
        action.reset().play();
        action.setEffectiveTimeScale(0.8);
      }
    }
  }, [actions, names]);

  let finalScale = scale;
  let finalPosition = position;

  if (windowWidth <= 768) {
    if (url.includes("model1.glb")) {
      finalScale = scale * 0.8;
      finalPosition = [position[0] - 0.5, position[1] + 0.2, position[2] + 0.3];
    } else if (url.includes("model2.glb")) {
      finalScale = scale * 1.5;
      finalPosition = [position[0], position[1] - 1.9, position[2] - 1];
    }
  }

  return (
    <primitive
      object={scene}
      position={finalPosition}
      rotation={rotation}
      scale={finalScale}
    />
  );
}

// Optimized Canvas component
function OptimizedCanvas({ children, cameraProps, preset = "lobby" }) {
  const [dpr, setDpr] = useState(1);

  return (
    <Canvas
      shadows={false}
      dpr={dpr}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
        precision: "lowp",
      }}
      camera={cameraProps}
    >
      <Suspense fallback={null}>
        <PerformanceMonitor
          onIncline={() => setDpr(2)}
          onDecline={() => setDpr(1)}
        >
          {children}
        </PerformanceMonitor>
        <Environment preset={preset} />
        <AdaptiveDpr pixelated />
        <BakeShadows />
        <AdaptiveEvents />
      </Suspense>
    </Canvas>
  );
}

// Utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default function Scene() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

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
            <a href="#team" className="hero-button hero-button-primary">
              About Us
            </a>
            <a href="#contact" className="hero-button hero-button-secondary">
              Contact
            </a>
          </div>
        </div>
        <div className="canvas-wrapper">
          <OptimizedCanvas cameraProps={{ position: [0, 0, 5], fov: 45 }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={0.8} />
            <Model
              url="/models/model1.glb"
              position={[0, -1, 0]}
              rotation={[0, -1.5707963267948966, 0]}
              scale={0.96}
            />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
              minPolarAngle={Math.PI / 2}
              maxPolarAngle={Math.PI / 2}
            />
          </OptimizedCanvas>
        </div>
        <img
          src="/models/chair2.png"
          alt="Overlay Image"
          className="overlay-image"
        />
      </section>

      <section className="second-section" id="features">
        <h2 className="section-title">Discover Our Features</h2>

        <div className="content-wrapper columns-layout">
          <div className="column">
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
              <h3>Immersive Environments</h3>
              <p>
                Step into a hyper-realistic 3D fashion world with Fit-On. Our
                advanced augmented reality (AR) and 3D modeling technology
                create an engaging and interactive experience, allowing you to
                visualize outfits in a lifelike setting.
              </p>
            </motion.div>
          </div>

          <div className="model-container">
            <OptimizedCanvas
              cameraProps={{ position: [0, 0, 8], fov: 50 }}
              preset="studio"
            >
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={0.8} />
              <Model
                url="/models/model2.glb"
                position={[0, -2, 0]}
                rotation={[0, -1.57, 0]}
                scale={3}
              />
              <OrbitControls
                enableZoom={false}
                enablePan={false}
                enableRotate={false}
                minPolarAngle={Math.PI / 2}
                maxPolarAngle={Math.PI / 2}
              />
            </OptimizedCanvas>
          </div>

          <div className="column">
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
