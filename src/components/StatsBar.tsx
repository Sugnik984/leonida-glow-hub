import { motion } from "framer-motion";
import { DollarSign, Target, Shield, Car } from "lucide-react";
import { useEffect, useState } from "react";

const stats = [
  { label: "TOTAL CASH", value: 2847320, prefix: "$", change: "+12.4%", accent: "magenta", icon: DollarSign },
  { label: "MISSIONS", displayValue: "47 / 128", change: "36.7%", accent: "cyan", icon: Target },
  { label: "REP LEVEL", displayValue: "INFAMOUS", change: "LVL 42", accent: "magenta", icon: Shield },
  { label: "VEHICLES", value: 23, change: "3 NEW", accent: "cyan", icon: Car },
];

const AnimatedNumber = ({ target, prefix = "" }: { target: number; prefix?: string }) => {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let frame: number;
    let start: number;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / 2000, 1);
      setVal(Math.floor(target * p));
      if (p < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return <>{prefix}{val.toLocaleString()}</>;
};

const StatsBar = () => {
  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
    >
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        const isM = stat.accent === "magenta";
        const hue = isM ? "300" : "180";
        return (
          <motion.div
            key={stat.label}
            className="chrome-btn rounded-lg px-4 py-3 cursor-pointer group relative overflow-hidden"
            whileHover={{ scale: 1.06, y: -4, rotateX: 3 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ transformPerspective: 600 }}
          >
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: `radial-gradient(circle at 50% 100%, hsl(${hue} 100% 50% / 0.15), transparent 70%)` }}
            />
            {/* Breathing border glow */}
            <motion.div
              className="absolute inset-0 rounded-lg pointer-events-none"
              style={{ boxShadow: `inset 0 0 15px hsl(${hue} 100% 50% / 0.05)` }}
              animate={{ opacity: [0.3, 0.7, 0.3] }}
              transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
            />
            <div className="flex items-center gap-2 relative z-10">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center"
                style={{ background: `hsl(${hue} 100% 50% / 0.1)`, border: `1px solid hsl(${hue} 100% 50% / 0.2)` }}
              >
                <motion.div animate={{ y: [0, -1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}>
                  <Icon size={14} style={{ color: `hsl(${hue} 100% 50%)` }} />
                </motion.div>
              </div>
              <div>
                <div className="font-display text-[8px] tracking-[0.25em] text-muted-foreground">{stat.label}</div>
                <div className={`font-display text-base font-bold tabular-nums ${isM ? "text-neon-magenta" : "text-neon-cyan"}`}>
                  {stat.value ? <AnimatedNumber target={stat.value} prefix={stat.prefix || ""} /> : stat.displayValue}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-1 relative z-10">
              <motion.div
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: `hsl(${hue} 100% 50%)` }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="font-accent text-[10px] text-muted-foreground">{stat.change}</span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default StatsBar;
