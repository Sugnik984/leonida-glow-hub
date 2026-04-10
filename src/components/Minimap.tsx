import { motion } from "framer-motion";
import GlassPanel from "./GlassPanel";

const heatzones = [
  { x: 55, y: 35, intensity: "high" as const, label: "Vice Beach" },
  { x: 30, y: 60, intensity: "medium" as const, label: "Port District" },
  { x: 70, y: 70, intensity: "low" as const, label: "Everglades" },
  { x: 45, y: 20, intensity: "high" as const, label: "Downtown" },
  { x: 80, y: 45, intensity: "medium" as const, label: "Little Havana" },
];

const intensityColors = {
  high: { fill: "hsl(300, 100%, 50%)", glow: "hsl(300 100% 50% / 0.6)", ring: "hsl(300 100% 50% / 0.3)" },
  medium: { fill: "hsl(45, 100%, 55%)", glow: "hsl(45 100% 55% / 0.5)", ring: "hsl(45 100% 55% / 0.2)" },
  low: { fill: "hsl(180, 100%, 50%)", glow: "hsl(180 100% 50% / 0.4)", ring: "hsl(180 100% 50% / 0.2)" },
};

const Minimap = () => {
  return (
    <GlassPanel delay={0.9} from="bottom" glowColor="180 100% 50%" className="flex-1">
      <div className="p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-neon-magenta"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <h2 className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">ACTIVE HEATZONES</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display text-[8px] text-muted-foreground tracking-wider">SCANNING</span>
            <motion.div
              className="w-3 h-3 rounded-full border border-neon-cyan/40"
              style={{ borderTopColor: "hsl(180 100% 50%)" }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>

        {/* Map area */}
        <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden bg-muted/20 border border-border/30">
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {[10, 20, 30, 40, 50, 60, 70, 80, 90].map((v) => (
              <g key={v}>
                <line x1={v} y1="0" x2={v} y2="100" stroke="hsl(240 10% 20% / 0.3)" strokeWidth="0.2" />
                <line x1="0" y1={v} x2="100" y2={v} stroke="hsl(240 10% 20% / 0.3)" strokeWidth="0.2" />
              </g>
            ))}
            <path d="M 10,15 Q 25,10 40,18 T 70,12 Q 85,15 95,20 L 95,95 L 5,95 Z" fill="hsl(180 100% 50% / 0.02)" stroke="hsl(180 100% 50% / 0.12)" strokeWidth="0.4" />
            <path d="M 20,20 L 80,80" stroke="hsl(0 0% 100% / 0.05)" strokeWidth="0.3" strokeDasharray="2,2" />
            <path d="M 50,10 L 50,90" stroke="hsl(0 0% 100% / 0.05)" strokeWidth="0.3" strokeDasharray="2,2" />
            <path d="M 10,50 L 90,50" stroke="hsl(0 0% 100% / 0.05)" strokeWidth="0.3" strokeDasharray="2,2" />
          </svg>

          {/* Radar sweep */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="w-full h-full"
              style={{
                background: "conic-gradient(from 0deg, transparent 0deg, hsl(180 100% 50% / 0.08) 30deg, transparent 60deg)",
                transformOrigin: "center",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Heatzones */}
          {heatzones.map((zone, i) => {
            const colors = intensityColors[zone.intensity];
            return (
              <motion.div
                key={zone.label}
                className="absolute group cursor-pointer"
                style={{ left: `${zone.x}%`, top: `${zone.y}%`, transform: "translate(-50%, -50%)" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2 + i * 0.15, duration: 0.5, type: "spring", damping: 15 }}
                whileHover={{ scale: 1.5 }}
              >
                <motion.div
                  className="absolute rounded-full"
                  style={{ width: 32, height: 32, marginLeft: -16, marginTop: -16, border: `1px solid ${colors.ring}` }}
                  animate={{ scale: [1, 2.5, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2.5 + i * 0.3, repeat: Infinity }}
                />
                <div
                  className="w-3 h-3 rounded-full relative z-10"
                  style={{ backgroundColor: colors.fill, boxShadow: `0 0 10px ${colors.glow}, 0 0 20px ${colors.glow}, 0 0 40px ${colors.ring}` }}
                />
                <div className="absolute left-5 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none">
                  <div
                    className="font-display text-[8px] tracking-wider text-foreground px-2.5 py-1 rounded-md"
                    style={{ background: "hsl(240 12% 6% / 0.9)", border: `1px solid ${colors.ring}`, boxShadow: `0 0 10px ${colors.ring}` }}
                  >
                    {zone.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex gap-5 mt-3 justify-center">
          {[
            { label: "CRITICAL", color: "bg-neon-magenta", shadow: "shadow-[0_0_6px_hsl(300_100%_50%/0.5)]" },
            { label: "ACTIVE", color: "bg-yellow-400", shadow: "shadow-[0_0_6px_hsl(45_100%_55%/0.5)]" },
            { label: "WATCH", color: "bg-neon-cyan", shadow: "shadow-[0_0_6px_hsl(180_100%_50%/0.5)]" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${item.color} ${item.shadow}`} />
              <span className="font-display text-[7px] tracking-[0.25em] text-muted-foreground">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </GlassPanel>
  );
};

export default Minimap;
