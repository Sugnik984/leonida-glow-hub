import { motion } from "framer-motion";
import skylineImg from "@/assets/vice-skyline.jpg";

const SkylineBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      {/* Skyline image with slow pan */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.05, 1], x: [0, -20, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        <img
          src={skylineImg}
          alt=""
          className="w-full h-full object-cover"
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/70 via-obsidian/50 to-obsidian/90" />

      {/* Chromatic aberration overlay */}
      <div className="absolute inset-0 mix-blend-screen opacity-[0.03]"
        style={{
          background: `
            linear-gradient(90deg, hsl(0 100% 50% / 0.3) 0%, transparent 33%),
            linear-gradient(90deg, transparent 66%, hsl(180 100% 50% / 0.3) 100%)
          `
        }}
      />

      {/* Film grain */}
      <div className="film-grain absolute inset-0 pointer-events-none" />

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(0 0% 100% / 0.05) 2px, hsl(0 0% 100% / 0.05) 4px)',
        }}
      />
    </div>
  );
};

export default SkylineBackground;
