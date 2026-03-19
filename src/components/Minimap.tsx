import { motion } from "framer-motion";

const heatzones = [
  { x: 55, y: 35, intensity: "high", label: "Vice Beach" },
  { x: 30, y: 60, intensity: "medium", label: "Port District" },
  { x: 70, y: 70, intensity: "low", label: "Everglades" },
  { x: 45, y: 20, intensity: "high", label: "Downtown" },
  { x: 80, y: 45, intensity: "medium", label: "Little Havana" },
];

const intensityColors = {
  high: { fill: "hsl(300, 100%, 50%)", glow: "hsl(300 100% 50% / 0.6)" },
  medium: { fill: "hsl(30, 100%, 55%)", glow: "hsl(30 100% 55% / 0.5)" },
  low: { fill: "hsl(180, 100%, 50%)", glow: "hsl(180 100% 50% / 0.4)" },
};

const Minimap = () => {
  return (
    <motion.div
      className="glass-surface-strong rounded-lg p-4 relative overflow-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-xs tracking-[0.3em] text-muted-foreground">ACTIVE HEATZONES</h2>
        <div className="flex items-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-neon-magenta animate-pulse-glow" />
          <span className="font-display text-[9px] text-neon-magenta tracking-wider">LIVE</span>
        </div>
      </div>

      {/* Map area */}
      <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden bg-muted/30 border border-border/50">
        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[20, 40, 60, 80].map((v) => (
            <g key={v}>
              <line x1={v} y1="0" x2={v} y2="100" stroke="hsl(0 0% 100% / 0.05)" strokeWidth="0.3" />
              <line x1="0" y1={v} x2="100" y2={v} stroke="hsl(0 0% 100% / 0.05)" strokeWidth="0.3" />
            </g>
          ))}
          {/* Coastline */}
          <path
            d="M 10,15 Q 25,10 40,18 T 70,12 Q 85,15 95,20 L 95,95 L 5,95 Z"
            fill="hsl(180 100% 50% / 0.03)"
            stroke="hsl(180 100% 50% / 0.15)"
            strokeWidth="0.5"
          />
        </svg>

        {/* Heatzones */}
        {heatzones.map((zone, i) => {
          const colors = intensityColors[zone.intensity as keyof typeof intensityColors];
          return (
            <motion.div
              key={zone.label}
              className="absolute group cursor-pointer"
              style={{ left: `${zone.x}%`, top: `${zone.y}%`, transform: "translate(-50%, -50%)" }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.15, duration: 0.5, type: "spring", damping: 15 }}
            >
              {/* Pulse ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  width: 24,
                  height: 24,
                  marginLeft: -12,
                  marginTop: -12,
                  border: `1px solid ${colors.fill}`,
                  opacity: 0.3,
                }}
                animate={{ scale: [1, 2, 1], opacity: [0.3, 0, 0.3] }}
                transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
              />
              {/* Dot */}
              <div
                className="w-2.5 h-2.5 rounded-full relative z-10"
                style={{
                  backgroundColor: colors.fill,
                  boxShadow: `0 0 8px ${colors.glow}, 0 0 16px ${colors.glow}`,
                }}
              />
              {/* Label */}
              <div className="absolute left-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                <span className="font-display text-[8px] tracking-wider text-foreground bg-card/80 px-2 py-0.5 rounded border border-border/50">
                  {zone.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-3 justify-center">
        {[
          { label: "HIGH", color: "bg-neon-magenta" },
          { label: "MED", color: "bg-orange-400" },
          { label: "LOW", color: "bg-neon-cyan" },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
            <span className="font-display text-[8px] tracking-[0.2em] text-muted-foreground">{item.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Minimap;
