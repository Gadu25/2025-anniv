import { useEffect, useState, useRef } from "react";
import { createCountdown } from "@lex/countdown";

export default function CountdownDisplay({ targetTime, syncUrl }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const countdownRef = useRef(null);

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
      <span>{timeLeft.days}d </span>
      <span>{timeLeft.hours}h </span>
      <span>{timeLeft.minutes}m </span>
      <span>{timeLeft.seconds}s</span>
    </div>
  );
}
