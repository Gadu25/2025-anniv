import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function useFadeTransition({ duration = 1, onExitComplete }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  // Entrance animation
  useLayoutEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration, ease: "power3.out" }
    );
  }, [duration]);

  // Exit animation trigger
  const fadeOut = () => {
    gsap.to(ref.current, {
      opacity: 0,
      y: 20,
      duration,
      onComplete: () => {
        setIsVisible(false);
        onExitComplete?.();
      },
    });
  };

  return { ref, fadeOut, isVisible };
}