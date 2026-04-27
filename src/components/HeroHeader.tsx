import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";

const VILogo = () => (
  <motion.svg
    viewBox="0 0 140 70"
    className="w-32 h-16"
    xmlns="http://www.w3.org/2000/svg"
    whileHover={{ scale: 1.1, filter: "brightness(1.3)" }}
    animate={{ filter: ["brightness(1)", "brightness(1.15)", "brightness(1)"] }}
    transition={{ duration: 3, repeat: Infinity }}
  >
    <defs>
      <linearGradient id="vi-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(300, 100%, 50%)">
          <animate attributeName="stop-color" values="hsl(300,100%,50%);hsl(270,100%,60%);hsl(180,100%,50%);hsl(300,100%,50%)" dur="6s" repeatCount="indefinite" />
        </stop>
        <stop offset="100%" stopColor="hsl(180, 100%, 50%)">
          <animate attributeName="stop-color" values="hsl(180,100%,50%);hsl(300,100%,50%);hsl(270,100%,60%);hsl(180,100%,50%)" dur="6s" repeatCount="indefinite" />
        </stop>
      </linearGradient>
      <filter id="vi-glow">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <text x="70" y="52" textAnchor="middle" fill="url(#vi-gradient)" fontFamily="Orbitron, sans-serif" fontWeight="900" fontSize="52" letterSpacing="6" filter="url(#vi-glow)">
      VI
    </text>
  </motion.svg>
);

const TypewriterText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 50);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);
  return <>{displayed}<span className="animate-pulse text-neon-magenta">_</span></>;
};

const HeroHeader = () => {
  const { normalizedX } = useMousePosition();

  return (
    <motion.div
      className="relative z-10 flex flex-col items-center pt-14 md:pt-16 pb-2"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <VILogo />

      <motion.h1
        className="font-display text-3xl md:text-5xl lg:text-6xl font-black tracking-wider mt-1 text-center holo-text"
        initial={{ opacity: 0, scaleY: 1.4, letterSpacing: "0.6em" }}
        animate={{ opacity: 1, scaleY: 1, letterSpacing: "0.15em" }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
        style={{ transform: `skewX(${normalizedX * 1.5}deg)` }}
      >
        LEONIDA NEURAL INTERFACE
      </motion.h1>

      <motion.div
        className="font-accent text-sm md:text-base text-muted-foreground tracking-[0.5em] mt-2 uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <TypewriterText text="STATE OF LEONIDA • VICE CITY • NEURAL LINK ACTIVE" delay={1500} />
      </motion.div>

      {/* Holographic line */}
      <motion.div
        className="h-px mt-4 w-full max-w-3xl relative"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="absolute inset-0 animate-holo-shimmer" style={{
          background: "linear-gradient(90deg, transparent, hsl(300 100% 50% / 0.6), hsl(180 100% 50% / 0.6), transparent, hsl(270 100% 60% / 0.4), transparent)",
          backgroundSize: "200% 100%",
        }} />
      </motion.div>
    </motion.div>
  );
};

export default HeroHeader;
