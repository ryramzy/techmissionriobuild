"use client";

import { useEffect, useState } from "react";

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem("splash_shown");
    if (!hasSeenSplash) {
      setIsVisible(true);
      sessionStorage.setItem("splash_shown", "true");
      
      const fadeTimer = setTimeout(() => {
        setIsFadingOut(true);
      }, 2000);
      
      const unmountTimer = setTimeout(() => {
        setIsVisible(false);
      }, 2500);

      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(unmountTimer);
      };
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center transition-all duration-500 ${
        isFadingOut ? "opacity-0 scale-105 pointer-events-none" : "opacity-100 scale-100"
      }`}
      style={{ backgroundColor: "#0e5c38" }}
    >
      <div className="flex flex-col items-center text-center">
        <h1 className="text-white text-[2.5rem] font-bold mb-1">
          TechMission Rio
        </h1>
        <p className="text-white uppercase tracking-widest opacity-60 text-sm mb-8">
          Rio de Janeiro
        </p>
        <div className="w-3 h-3 rounded-full bg-[#5ae0a0] animate-ping" />
      </div>
    </div>
  );
}
