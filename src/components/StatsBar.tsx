import { motion } from "framer-motion";
import { DollarSign, Target, Shield, Car } from "lucide-react";

const stats = [
  { label: "TOTAL CASH", value: "$2,847,320", change: "+12.4%", accent: "magenta", icon: DollarSign },
  { label: "MISSIONS", value: "47 / 128", change: "36.7%", accent: "cyan", icon: Target },
  { label: "REP LEVEL", value: "INFAMOUS", change: "LVL 42", accent: "magenta", icon: Shield },
  { label: "VEHICLES", value: "23", change: "3 NEW", accent: "cyan", icon: Car },
];

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
        return (
          <motion.div
            key={stat.label}
            className="chrome-btn rounded-lg px-4 py-3 cursor-pointer group relative overflow-hidden"
            whileHover={{ scale: 1.04, y: -3 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {/* Hover glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `radial-gradient(circle at 50% 100%, hsl(${isM ? "300" : "180"} 100% 50% / 0.1), transparent 70%)`,
              }}
            />

            <div className="flex items-center gap-2 relative z-10">
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center"
                style={{
                  background: `hsl(${isM ? "300" : "180"} 100% 50% / 0.1)`,
                  border: `1px solid hsl(${isM ? "300" : "180"} 100% 50% / 0.2)`,
                }}
              >
                <Icon size={14} style={{ color: `hsl(${isM ? "300" : "180"} 100% 50%)` }} />
              </div>
              <div>
                <div className="font-display text-[8px] tracking-[0.25em] text-muted-foreground">{stat.label}</div>
                <div className={`font-display text-base font-bold ${isM ? "text-neon-magenta" : "text-neon-cyan"}`}>
                  {stat.value}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-1 relative z-10">
              <div
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: `hsl(${isM ? "300" : "180"} 100% 50%)` }}
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
