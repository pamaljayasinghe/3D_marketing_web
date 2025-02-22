"use client";
import { useEffect, useState, Suspense, memo, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import {
  useGLTF,
  useAnimations,
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";
import Image from "next/image";
import Navbar from "./Navbar";
import ComingSoon from "./coming";
import TeamSection from "./team";
import Footer from "./footer";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

const Model = memo(function Model({ url, position, rotation, scale }) {
  const { scene, animations } = useGLTF(url);
  const { actions, names } = useAnimations(animations, scene);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (names.length > 0 && actions[names[0]]) {
      actions[names[0]].reset().play();
    }
  }, [actions, names]);

  const { finalScale, finalPosition } = useMemo(() => {
    let fs = scale;
    let fp = position;
    if (windowSize.width <= 768) {
      if (url.includes("model1.glb")) {
        fs = scale * 0.8;
        fp = [position[0] - 0.5, position[1] + 0.2, position[2] + 0.3];
      } else if (url.includes("model2.glb")) {
        fs = scale * 1.2;
        fp = [position[0], position[1] - 1.5, position[2] - 1];
      }
    }
    return { finalScale: fs, finalPosition: fp };
  }, [windowSize.width, url, scale, position]);

  return (
    <primitive
      object={scene}
      position={finalPosition}
      rotation={rotation}
      scale={finalScale}
    />
  );
});

const LoadingFallback = function LoadingFallback() {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        color: "white",
      }}
    >
      Loading...
    </div>
  );
};

const SceneCanvas = memo(function SceneCanvas({ children, ...props }) {
  return (
    <Canvas {...props}>
      <Suspense fallback={null}>
        {children}
        <Environment preset="lobby" />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
        />
      </Suspense>
    </Canvas>
  );
});

export default function Scene() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

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
          <SceneCanvas
            shadows
            camera={{ position: [0, 0, 5], fov: 45 }}
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
          </SceneCanvas>
        </div>
        <div className="overlay-image-container">
          <Image
            src="/models/chair2.png"
            alt="Overlay"
            width={250}
            height={250}
            className="overlay-image"
            priority={false}
          />
        </div>
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
            <SceneCanvas
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
            </SceneCanvas>
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
