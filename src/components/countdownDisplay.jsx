import { useEffect, useState, useRef } from "react";
import { createCountdown } from "../modules/countdown/index";
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
          scale: 1.2,
          duration: 1,
          ease: "elastic.out",
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
      <div className="segment">
        <span ref={(el) => (digitRefs.current.days = el)}>
          {timeLeft.days}
        </span>
        <p>days</p>
      </div>
      <div className="segment">
        <span ref={(el) => (digitRefs.current.hours = el)}>
          {timeLeft.hours}
        </span>
        <p>hours</p>
      </div>
      <div className="segment">
        <span ref={(el) => (digitRefs.current.minutes = el)}>
          {timeLeft.minutes}
        </span>
        <p>minutes</p>
      </div>
      <div className="segment">
        <span ref={(el) => (digitRefs.current.seconds = el)}>
          {timeLeft.seconds}
        </span>
        <p>seconds</p>
      </div>
    </div>
  );
}
