import { motion } from "framer-motion";

const stats = [
  { label: "TOTAL CASH", value: "$2,847,320", change: "+12.4%", accent: "magenta" },
  { label: "MISSIONS", value: "47 / 128", change: "36.7%", accent: "cyan" },
  { label: "REP LEVEL", value: "INFAMOUS", change: "LVL 42", accent: "magenta" },
  { label: "VEHICLES", value: "23", change: "3 NEW", accent: "cyan" },
];

const StatsBar = () => {
  return (
    <motion.div
      className="grid grid-cols-2 lg:grid-cols-4 gap-2"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
    >
      {stats.map((stat, i) => (
        <motion.div
          key={stat.label}
          className="chrome-btn rounded-md px-4 py-3 cursor-pointer group"
          whileHover={{ scale: 1.03, y: -2 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          // @ts-ignore
          transition={{ delay: 1.2 + i * 0.1, duration: 0.5 }}
        >
          <div className="font-display text-[9px] tracking-[0.25em] text-muted-foreground">{stat.label}</div>
          <div className={`font-display text-lg font-bold mt-0.5 ${stat.accent === "magenta" ? "text-neon-magenta" : "text-neon-cyan"}`}>
            {stat.value}
          </div>
          <div className="font-body text-xs text-muted-foreground mt-0.5">{stat.change}</div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StatsBar;
