import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import luciaImg from "@/assets/lucia.png";
import jasonImg from "@/assets/jason.png";

interface CharacterData {
  name: string;
  subtitle: string;
  image: string;
  color: string;
  colorHsl: string;
  stats: { label: string; value: string }[];
}

const characters: CharacterData[] = [
  {
    name: "LUCIA",
    subtitle: "The Survivor",
    image: luciaImg,
    color: "magenta",
    colorHsl: "300 100% 50%",
    stats: [
      { label: "WANTED", value: "★★★☆☆" },
      { label: "STAMINA", value: "87%" },
      { label: "SHOOTING", value: "72%" },
      { label: "DRIVING", value: "91%" },
    ],
  },
  {
    name: "JASON",
    subtitle: "The Enforcer",
    image: jasonImg,
    color: "cyan",
    colorHsl: "180 100% 50%",
    stats: [
      { label: "WANTED", value: "★★★★☆" },
      { label: "STAMINA", value: "93%" },
      { label: "SHOOTING", value: "88%" },
      { label: "DRIVING", value: "79%" },
    ],
  },
];

const CharacterSwitcher = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);

  const activeChar = characters[activeIndex];

  return (
    <motion.div
      className="glass-surface-strong rounded-lg overflow-hidden relative"
      initial={{ opacity: 0, x: -60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
    >
      {/* Background bleed effect */}
      <AnimatePresence>
        <motion.div
          key={activeChar.color}
          className="absolute inset-0 opacity-20"
          style={{
            background: `radial-gradient(circle at ${activeIndex === 0 ? '30%' : '70%'} 50%, hsl(${activeChar.colorHsl} / 0.4), transparent 70%)`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>

      {/* Header */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between relative z-10">
        <h2 className="font-display text-xs tracking-[0.3em] text-muted-foreground">CHARACTER HUD</h2>
        <div className="flex gap-1">
          {characters.map((char, i) => (
            <button
              key={char.name}
              onClick={() => setActiveIndex(i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className={`w-8 h-8 rounded-md flex items-center justify-center font-display text-[10px] font-bold transition-all duration-300 ${
                activeIndex === i
                  ? char.color === "magenta" ? "bg-neon-magenta/20 text-neon-magenta glow-magenta" : "bg-neon-cyan/20 text-neon-cyan glow-cyan"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              }`}
            >
              {char.name[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Character display */}
      <div className="relative flex items-end justify-center h-72 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChar.name}
            className="absolute bottom-0 flex flex-col items-center"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 1.05 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={activeChar.image}
              alt={activeChar.name}
              className="h-64 object-contain drop-shadow-2xl"
              style={{
                filter: `drop-shadow(0 0 30px hsl(${activeChar.colorHsl} / 0.4))`,
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Name overlay */}
        <div className="absolute bottom-4 left-5 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChar.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
            >
              <h3
                className="font-display text-3xl font-black"
                style={{ color: `hsl(${activeChar.colorHsl})` }}
              >
                {activeChar.name}
              </h3>
              <p className="font-body text-sm text-muted-foreground tracking-widest uppercase">
                {activeChar.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 pb-5 pt-3 grid grid-cols-2 gap-2 relative z-10">
        {activeChar.stats.map((stat, i) => (
          <motion.div
            key={`${activeChar.name}-${stat.label}`}
            className="glass-surface rounded-md px-3 py-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i, duration: 0.4 }}
          >
            <div className="font-display text-[9px] tracking-[0.2em] text-muted-foreground">{stat.label}</div>
            <div className="font-body text-sm font-semibold text-foreground">{stat.value}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CharacterSwitcher;
