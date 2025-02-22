// ComingSoon.js
import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  useGLTF,
  useAnimations,
} from "@react-three/drei";
import "../app/styles/Model.css";

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
  }, []);

  let finalScale = scale;
  let finalPosition = position;

  if (windowWidth <= 768) {
    finalScale = [2, 2, 2]; // Custom scale for mobile
    finalPosition = [position[0], position[0] - 1.5, position[2] + 0.5]; // Adjusted for mobile
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

  useEffect(() => {
    const targetDate = new Date("2024-12-31").getTime();

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

  return (
    <div className="cs-container">
      <div className="cs-background-text">2025</div>

      <div className="cs-content-wrapper">
        <div className="cs-timer-section">
          <h1>COMING SOON</h1>

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
            <button className="cs-platform-btn ios-btn">iOS App</button>
            <button className="cs-platform-btn web-btn">Web Platform</button>
          </div>
        </div>

        <div className="cs-model-section">
          <Canvas
            shadows
            camera={{
              position: [0, 0, window.innerWidth <= 768 ? 6 : 5],
              fov: window.innerWidth <= 768 ? 50 : 45,
            }}
          >
            <ambientLight intensity={0.8} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <Model
              url="/models/model3.glb"
              position={[0, -1.6, 0]} // Default position
              rotation={[0, -1.5707963267948966, 0]}
              scale={[1.5, 1.5, 1.5]} // Default scale
            />
            <Environment preset="lobby" />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              enableRotate={true}
              maxPolarAngle={Math.PI / 2}
              minPolarAngle={Math.PI / 4}
            />
          </Canvas>
        </div>
      </div>
    </div>
  );
}
