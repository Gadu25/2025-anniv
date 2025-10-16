import { useAppPhase } from "../../context/AppPhaseContext";
import { PreCountdown, AnniversaryDay, PostAnniversary } from "./heroPhases";
import { annivDate } from "../../const/common";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export default function Hero() {
  const { phase } = useAppPhase();
  const containerRef = useRef(null);
  const targetTime = new Date(annivDate).getTime();

  useEffect(() => {
    // Fade transition when phase changes
    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
  }, [phase]);

  return (
    <section ref={containerRef} className="hero">
      {phase === "pre" && <PreCountdown targetTime={targetTime} />}
      {phase === "today" && <AnniversaryDay />}
      {phase === "post" && <PostAnniversary />}
    </section>
  );
}
