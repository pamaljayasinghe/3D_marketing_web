"use client";
import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import "../app/styles/Model.css";
import { FaApple, FaGlobe } from "react-icons/fa";

function Model({ url, position, rotation, scale }) {
  const { scene, animations } = useGLTF(url);
  const { actions, names } = useAnimations(animations, scene);
  const [windowWidth, setWindowWidth] = useState(1200); // Default value

  useEffect(() => {
    // Update window width after component mounts
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (names.length > 0) {
      const action = actions[names[0]];
      if (action) {
        action.reset().play();
      }
    }
  }, [actions, names]);

  let finalScale = scale;
  let finalPosition = position;

  if (windowWidth <= 768) {
    finalScale = [1.7, 1.7, 1.7];
    finalPosition = [position[0], position[1] - 0.1, position[2] + 0.5];
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

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: "01",
    hours: "07",
    minutes: "44",
    seconds: "34",
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const targetDate = new Date("2025-03-17").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        days: days.toString().padStart(2, "0"),
        hours: hours.toString().padStart(2, "0"),
        minutes: minutes.toString().padStart(2, "0"),
        seconds: seconds.toString().padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isMounted) {
    return null; // Return null on server-side
  }

  return (
    <div className="cs-container" id="comingsoon">
      <div className="cs-background-text">2025</div>

      <div className="cs-content-wrapper">
        <div className="cs-timer-section">
          <h1>COMING SOON</h1>
          <p className="cs-description">
            Very soon, we will be available on iOS and Web Platform! Stay tuned!
          </p>

          <div className="cs-countdown-wrapper">
            <div className="cs-countdown-item">
              <div className="cs-countdown-value">{timeLeft.days}</div>
              <div className="cs-countdown-label">Days</div>
            </div>
            <div className="cs-countdown-separator">:</div>
            <div className="cs-countdown-item">
              <div className="cs-countdown-value">{timeLeft.hours}</div>
              <div className="cs-countdown-label">Hours</div>
            </div>
            <div className="cs-countdown-separator">:</div>
            <div className="cs-countdown-item">
              <div className="cs-countdown-value">{timeLeft.minutes}</div>
              <div className="cs-countdown-label">Minutes</div>
            </div>
            <div className="cs-countdown-separator">:</div>
            <div className="cs-countdown-item">
              <div className="cs-countdown-value">{timeLeft.seconds}</div>
              <div className="cs-countdown-label">Seconds</div>
            </div>
          </div>

          <div className="cs-platform-buttons">
            <button className="cs-platform-btn ios-btn">
              <FaApple className="cs-btn-icon" /> iOS App
            </button>
            <button className="cs-platform-btn web-btn">
              <FaGlobe className="cs-btn-icon" /> Web Platform
            </button>
          </div>
        </div>

        <div className="cs-model-section">
          <Canvas
            shadows
            camera={{
              position: [
                0,
                0,
                typeof window !== "undefined" && window.innerWidth <= 768
                  ? 6
                  : 5,
              ],
              fov:
                typeof window !== "undefined" && window.innerWidth <= 768
                  ? 50
                  : 45,
            }}
          >
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Model
              url="/models/model3.glb"
              position={[0, -1.6, 0]}
              rotation={[0, -1.5707963267948966, 0]}
              scale={[1.5, 1.5, 1.5]}
            />
            <Environment preset="lobby" />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={false}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 4}
            />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
