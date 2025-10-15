import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import CountdownDisplay from "../countdownDisplay";

export default function Hero() {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const countdownRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 1 } });

      tl.from(containerRef.current, { opacity: 0, y: 40 })
        .from(titleRef.current, { opacity: 0, y: 30 }, "-=0.5")
        .from(countdownRef.current, { opacity: 0, y: 20 }, "-=0.4");
    }, containerRef);

    return () => ctx.revert(); // ✅ clean up GSAP context
  }, []);

  const targetTime = new Date("2025-11-17T00:00:00").getTime();

  return (
    <section ref={containerRef} className="hero">
      <h1 ref={titleRef} className="hero__title">
        {/* One year down, countless memories to go. */}
        Countdown
      </h1>
      <div ref={countdownRef}>
        <CountdownDisplay targetTime={targetTime} syncUrl="/api/sync-time" />
      </div>
    </section>
  );
}
