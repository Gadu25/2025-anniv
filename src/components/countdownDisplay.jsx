import { useEffect, useState, useRef } from "react";
import { createCountdown } from "@lex/countdown";
import { gsap } from "gsap";

export default function CountdownDisplay({ targetTime, syncUrl }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const prevTime = useRef(timeLeft);
  const countdownRef = useRef(null);
  const digitRefs = useRef({});

  // Animate only the digit that changed
  useEffect(() => {
    const changedUnits = [];

    // detect which unit changed
    for (const key in timeLeft) {
      if (timeLeft[key] !== prevTime.current[key]) {
        changedUnits.push(key);
      }
    }

    // store new values
    prevTime.current = timeLeft;

    // animate each changed digit
    changedUnits.forEach((unit) => {
      const el = digitRefs.current[unit];
      if (!el) return;

      gsap.fromTo(
        el,
        { scale: 1 },
        {
          scale: 1.1,
          duration: 0.25,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        }
      );
    });
  }, [timeLeft]);

  // Initialize countdown
  useEffect(() => {
    const countdown = createCountdown({
      targetTime,
      syncUrl,
      onTick: setTimeLeft,
      onEnd: () => console.log("Countdown finished!"),
    });

    countdownRef.current = countdown;
    return () => countdown.stop();
  }, [targetTime, syncUrl]);

  return (
    <div className="countdown">
      <span ref={(el) => (digitRefs.current.days = el)}>
        {timeLeft.days}d
      </span>
      <span ref={(el) => (digitRefs.current.hours = el)}>
        {timeLeft.hours}h
      </span>
      <span ref={(el) => (digitRefs.current.minutes = el)}>
        {timeLeft.minutes}m
      </span>
      <span ref={(el) => (digitRefs.current.seconds = el)}>
        {timeLeft.seconds}s
      </span>
    </div>
  );
}
