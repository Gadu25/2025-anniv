import { createContext, useContext, useEffect, useState } from "react";

const AppPhaseContext = createContext();

export function AppPhaseProvider({ children, targetDate }) {
  const [phase, setPhase] = useState("pre"); // 'pre' | 'today' | 'post'

  useEffect(() => {
    const checkPhase = () => {
      const now = new Date();
      const target = new Date(targetDate);

      console.log(target, "target");

      // For example, "today" means same calendar date
      const isSameDay =
        now.getFullYear() === target.getFullYear() &&
        now.getMonth() === target.getMonth() &&
        now.getDate() === target.getDate();

      if (now < target) setPhase("pre");
      else if (isSameDay) setPhase("today");
      else setPhase("post");
    };

    // Run immediately and then every few seconds
    checkPhase();
    const interval = setInterval(checkPhase, 1000); // check every second
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <AppPhaseContext.Provider value={{ phase }}>
      {children}
    </AppPhaseContext.Provider>
  );
}

export function useAppPhase() {
  return useContext(AppPhaseContext);
}
