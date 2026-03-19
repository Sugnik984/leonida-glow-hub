import { motion } from "framer-motion";

const VILogo = () => (
  <svg viewBox="0 0 120 60" className="w-28 h-14" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="vi-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="hsl(300, 100%, 50%)" />
        <stop offset="100%" stopColor="hsl(180, 100%, 50%)" />
      </linearGradient>
    </defs>
    <text
      x="60" y="48"
      textAnchor="middle"
      fill="url(#vi-gradient)"
      fontFamily="Orbitron, sans-serif"
      fontWeight="900"
      fontSize="48"
      letterSpacing="4"
    >
      VI
    </text>
  </svg>
);

const HeroHeader = () => {
  return (
    <motion.div
      className="relative z-10 flex flex-col items-center pt-8 pb-4"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <VILogo />

      <motion.h1
        className="font-display text-4xl md:text-6xl lg:text-7xl font-black tracking-wider mt-2 text-center"
        style={{
          background: "linear-gradient(135deg, hsl(300 100% 50%), hsl(330 100% 60%), hsl(180 100% 50%))",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
        initial={{ opacity: 0, scaleY: 1.3, letterSpacing: "0.5em" }}
        animate={{ opacity: 1, scaleY: 1, letterSpacing: "0.15em" }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      >
        WELCOME TO LEONIDA
      </motion.h1>

      <motion.p
        className="font-body text-lg md:text-xl text-muted-foreground tracking-widest mt-2 uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
      >
        State of Leonida • Vice City • 2025
      </motion.p>

      {/* Decorative line */}
      <motion.div
        className="h-px mt-6 w-full max-w-2xl"
        style={{
          background: "linear-gradient(90deg, transparent, hsl(300 100% 50% / 0.5), hsl(180 100% 50% / 0.5), transparent)"
        }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
};

export default HeroHeader;
