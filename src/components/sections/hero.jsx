import { useRef, useLayoutEffect } from "react";
import { gsap } from "gsap";
import CountdownDisplay from "../countdownDisplay";
import { annivDate } from "../../const/common";
import { useAppPhase } from "../../context/AppPhaseContext";

export default function Hero() {
  const { phase } = useAppPhase();
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

  const targetTime = new Date(annivDate).getTime();

  return (
    <section ref={containerRef} className="hero">
      {
        phase === 'pre' ? (
          <>
            <h1 ref={titleRef} className="hero__title">
              Every heartbeat counts.
            </h1>
            <div ref={countdownRef}>
              <CountdownDisplay targetTime={targetTime} syncUrl="/api/sync-time" />
            </div>
          </>
        ) : phase === 'today' ? (
          <h1 ref={titleRef} className="hero__title">
            A year of memories — and many more waiting to be made.
          </h1>
        ) : (
          <h1 ref={titleRef} className="hero__title">A memory that lives on.</h1>
        )
      }
      <span>phase: {phase}</span>
    </section>
  );
}
