import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const VILogo = () => (
  <motion.svg
    viewBox="0 0 140 70"
    className="w-32 h-16"
    xmlns="http://www.w3.org/2000/svg"
    whileHover={{ scale: 1.05 }}
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
        <feGaussianBlur stdDeviation="3" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <text
      x="70" y="52"
      textAnchor="middle"
      fill="url(#vi-gradient)"
      fontFamily="Orbitron, sans-serif"
      fontWeight="900"
      fontSize="52"
      letterSpacing="6"
      filter="url(#vi-glow)"
    >
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
      }, 60);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return <>{displayed}<span className="animate-pulse">_</span></>;
};

const HeroHeader = () => {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center pt-6 pb-2"
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Corner HUD decorations */}
      <div className="absolute top-2 left-4 flex items-center gap-2 opacity-40">
        <div className="w-2 h-2 rounded-full bg-neon-magenta animate-pulse-glow" />
        <span className="font-display text-[8px] tracking-[0.4em] text-muted-foreground">SYS.ONLINE</span>
      </div>
      <div className="absolute top-2 right-4 flex items-center gap-2 opacity-40">
        <span className="font-display text-[8px] tracking-[0.4em] text-muted-foreground">LEONIDA.OS v6.0</span>
        <div className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse-glow" />
      </div>

      <VILogo />

      <motion.h1
        className="font-display text-3xl md:text-5xl lg:text-6xl font-black tracking-wider mt-1 text-center holo-text"
        initial={{ opacity: 0, scaleY: 1.4, letterSpacing: "0.6em" }}
        animate={{ opacity: 1, scaleY: 1, letterSpacing: "0.15em" }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        WELCOME TO LEONIDA
      </motion.h1>

      <motion.div
        className="font-accent text-sm md:text-base text-muted-foreground tracking-[0.5em] mt-2 uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <TypewriterText text="STATE OF LEONIDA • VICE CITY • 2025" delay={1500} />
      </motion.div>

      {/* Decorative holographic line */}
      <motion.div
        className="h-px mt-4 w-full max-w-3xl relative"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className="absolute inset-0 animate-holo-shimmer"
          style={{
            background: "linear-gradient(90deg, transparent, hsl(300 100% 50% / 0.6), hsl(180 100% 50% / 0.6), transparent, hsl(300 100% 50% / 0.4), transparent)",
            backgroundSize: "200% 100%",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default HeroHeader;
