import { useEffect, useState } from "react";

export function useAnimationControl(animations, actions, names, sectionId) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Create intersection observer for animation control
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsPlaying(true);
          } else {
            setIsPlaying(false);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px",
      }
    );

    // Get all possible container elements
    const containers = {
      home: document.querySelector(".canvas-wrapper"),
      features: document.querySelector(".model-container"),
      comingsoon: document.querySelector(".cs-model-section"),
    };

    // Observe the specific section based on sectionId
    const targetElement = containers[sectionId];
    if (targetElement) {
      observer.observe(targetElement);
    }

    return () => {
      // Cleanup: unobserve the specific element
      if (targetElement) {
        observer.unobserve(targetElement);
      }
    };
  }, [sectionId]); // Add sectionId as dependency

  useEffect(() => {
    if (names.length > 0 && actions) {
      const action = actions[names[0]];
      if (action) {
        if (isPlaying) {
          action.reset().play();
        } else {
          action.stop();
        }
      }
    }
  }, [isPlaying, actions, names]);

  return isPlaying;
}
