import CountdownDisplay from "../countdownDisplay";
import { gsap } from "gsap";
import { useRef, useLayoutEffect } from "react";

export function PreCountdown({ targetTime }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const countdownRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.6 }
      );

      tl.fromTo(
        countdownRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        "+=0.4"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef}>
      <h1 ref={titleRef} className="hero__title">
        Every heartbeat counts.
      </h1>
      <CountdownDisplay
        ref={countdownRef}
        targetTime={targetTime}
        syncUrl="/api/sync-time"
      />
    </div>
  );
}

export function AnniversaryDay() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    gsap.fromTo(
      ref.current,
      { scale: 0.9, opacity: 0 }, 
      { scale: 1, opacity: 1, duration: 1 }
    );
  }, []);
  return (
    <div ref={ref}>
      <h1 className="hero__title">A year of memories.</h1>
    </div>
  );
}

export function PostAnniversary() {
  const ref = useRef(null);
  useLayoutEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.2 }
    );
  }, []);
  return (
    <div ref={ref}>
      <h1 className="hero__title">A memory that lives on.</h1>
    </div>
  );
}
