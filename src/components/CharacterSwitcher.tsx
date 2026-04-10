import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlassPanel from "./GlassPanel";
import luciaImg from "@/assets/lucia.png";
import jasonImg from "@/assets/jason.png";

interface CharacterData {
  name: string;
  subtitle: string;
  image: string;
  color: string;
  colorHsl: string;
  stats: { label: string; value: number; max: number }[];
}

const characters: CharacterData[] = [
  {
    name: "LUCIA",
    subtitle: "The Survivor",
    image: luciaImg,
    color: "magenta",
    colorHsl: "300 100% 50%",
    stats: [
      { label: "WANTED", value: 3, max: 5 },
      { label: "STAMINA", value: 87, max: 100 },
      { label: "SHOOTING", value: 72, max: 100 },
      { label: "DRIVING", value: 91, max: 100 },
    ],
  },
  {
    name: "JASON",
    subtitle: "The Enforcer",
    image: jasonImg,
    color: "cyan",
    colorHsl: "180 100% 50%",
    stats: [
      { label: "WANTED", value: 4, max: 5 },
      { label: "STAMINA", value: 93, max: 100 },
      { label: "SHOOTING", value: 88, max: 100 },
      { label: "DRIVING", value: 79, max: 100 },
    ],
  },
];

const CircularStat = ({ value, max, label, color, delay }: { value: number; max: number; label: string; color: string; delay: number }) => {
  const percentage = (value / max) * 100;
  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      className="flex flex-col items-center gap-1"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: "spring", damping: 15 }}
    >
      <div className="relative w-12 h-12">
        <svg className="w-12 h-12 -rotate-90" viewBox="0 0 40 40">
          <circle cx="20" cy="20" r="18" fill="none" stroke="hsl(240 10% 15%)" strokeWidth="2" />
          <motion.circle
            cx="20" cy="20" r="18" fill="none"
            stroke={`hsl(${color})`}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ delay: delay + 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: `drop-shadow(0 0 4px hsl(${color} / 0.6))` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-display text-[9px] font-bold text-foreground">
            {label === "WANTED" ? `${value}/${max}` : `${value}`}
          </span>
        </div>
      </div>
      <span className="font-display text-[7px] tracking-[0.2em] text-muted-foreground">{label}</span>
    </motion.div>
  );
};

const CharacterSwitcher = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeChar = characters[activeIndex];

  return (
    <GlassPanel delay={0.5} from="left" glowColor={activeChar.colorHsl}>
      {/* Ambient bleed */}
      <AnimatePresence>
        <motion.div
          key={activeChar.color}
          className="absolute inset-0 z-0"
          style={{
            background: `
              radial-gradient(circle at ${activeIndex === 0 ? "30%" : "70%"} 60%, hsl(${activeChar.colorHsl} / 0.15), transparent 60%),
              radial-gradient(circle at 50% 0%, hsl(${activeChar.colorHsl} / 0.08), transparent 50%)
            `,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AnimatePresence>

      {/* Header */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: `hsl(${activeChar.colorHsl})` }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <h2 className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">CHARACTER HUD</h2>
        </div>
        <div className="flex gap-1.5">
          {characters.map((char, i) => (
            <motion.button
              key={char.name}
              onClick={() => setActiveIndex(i)}
              className={`relative w-9 h-9 rounded-lg flex items-center justify-center font-display text-[10px] font-bold transition-all duration-300 overflow-hidden ${
                activeIndex === i ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {activeIndex === i && (
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  layoutId="activeCharTab"
                  style={{
                    background: `hsl(${char.colorHsl} / 0.2)`,
                    border: `1px solid hsl(${char.colorHsl} / 0.4)`,
                    boxShadow: `0 0 15px hsl(${char.colorHsl} / 0.3)`,
                  }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                />
              )}
              <span className="relative z-10">{char.name[0]}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Character display */}
      <div className="relative flex items-end justify-center h-64 overflow-hidden">
        {/* Energy aura */}
        <motion.div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full blur-3xl pointer-events-none"
          style={{ backgroundColor: `hsl(${activeChar.colorHsl} / 0.15)` }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChar.name}
            className="absolute bottom-0 flex flex-col items-center"
            initial={{ opacity: 0, y: 40, scale: 0.9, rotateY: -15 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, y: -30, scale: 1.1, rotateY: 15 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.img
              src={activeChar.image}
              alt={activeChar.name}
              className="h-56 object-contain"
              style={{
                filter: `drop-shadow(0 0 40px hsl(${activeChar.colorHsl} / 0.5)) drop-shadow(0 20px 40px hsl(240 15% 3% / 0.8))`,
              }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Name overlay */}
        <div className="absolute bottom-3 left-5 z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChar.name}
              initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: 30, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3
                className="font-display text-2xl md:text-3xl font-black tracking-wider"
                style={{
                  color: `hsl(${activeChar.colorHsl})`,
                  textShadow: `0 0 30px hsl(${activeChar.colorHsl} / 0.6), 0 0 60px hsl(${activeChar.colorHsl} / 0.3)`,
                }}
              >
                {activeChar.name}
              </h3>
              <p className="font-accent text-xs text-muted-foreground tracking-[0.3em] uppercase">
                {activeChar.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Circular Stats */}
      <div className="px-5 pb-5 pt-3 flex justify-between relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChar.name}
            className="flex justify-between w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {activeChar.stats.map((stat, i) => (
              <CircularStat
                key={`${activeChar.name}-${stat.label}`}
                value={stat.value}
                max={stat.max}
                label={stat.label}
                color={activeChar.colorHsl}
                delay={0.05 * i}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </GlassPanel>
  );
};

export default CharacterSwitcher;
