import { motion } from "framer-motion";
import { useState } from "react";

interface FeedItem {
  id: number;
  type: "news" | "clip" | "alert";
  title: string;
  subtitle: string;
  accent: "magenta" | "cyan" | "neutral";
  size: "sm" | "md" | "lg";
}

const feedItems: FeedItem[] = [
  { id: 1, type: "news", title: "Florida Man Rides Alligator Through Mall", subtitle: "LEONIDA TODAY", accent: "magenta", size: "lg" },
  { id: 2, type: "clip", title: "🔥 Beach Party Gone Wrong", subtitle: "TRENDING • 2.1M views", accent: "cyan", size: "sm" },
  { id: 3, type: "alert", title: "WANTED: Bank Heist Suspects", subtitle: "LCPD ALERT", accent: "magenta", size: "sm" },
  { id: 4, type: "news", title: "Yacht Club Influencer Scandal", subtitle: "VICE BEACH DAILY", accent: "neutral", size: "md" },
  { id: 5, type: "clip", title: "Street Race: Ocean Drive", subtitle: "VIRAL • 890K views", accent: "cyan", size: "sm" },
  { id: 6, type: "news", title: "Governor Denies Swamp Deal", subtitle: "LEONIDA POLITICS", accent: "neutral", size: "sm" },
  { id: 7, type: "alert", title: "Tropical Storm Warning", subtitle: "WEATHER ALERT", accent: "magenta", size: "md" },
  { id: 8, type: "clip", title: "Nightclub Opening Gone Viral", subtitle: "TRENDING • 5.4M views", accent: "cyan", size: "sm" },
];

const accentColors = {
  magenta: "border-neon-magenta/30 hover:border-neon-magenta/60",
  cyan: "border-neon-cyan/30 hover:border-neon-cyan/60",
  neutral: "border-border hover:border-muted-foreground/30",
};

const accentDots = {
  magenta: "bg-neon-magenta",
  cyan: "bg-neon-cyan",
  neutral: "bg-muted-foreground",
};

const LeonidaFeed = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <motion.div
      className="glass-surface-strong rounded-lg overflow-hidden flex flex-col h-full"
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.7 }}
    >
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-neon-magenta animate-pulse-glow" />
          <h2 className="font-display text-xs tracking-[0.3em] text-muted-foreground">LEONIDA FEED</h2>
        </div>
        <span className="font-body text-xs text-muted-foreground">LIVE</span>
      </div>

      {/* Bento grid */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-3 pb-3">
        <div className="grid grid-cols-2 gap-2 auto-rows-min">
          {feedItems.map((item, i) => (
            <motion.div
              key={item.id}
              className={`
                glass-surface rounded-md p-3 cursor-pointer border transition-all duration-300
                ${accentColors[item.accent]}
                ${item.size === "lg" ? "col-span-2 row-span-1" : ""}
                ${item.size === "md" ? "col-span-2" : ""}
              `}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.8, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-2">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${accentDots[item.accent]}`} />
                <div className="min-w-0">
                  <h3 className="font-body text-sm font-semibold text-foreground leading-tight truncate">
                    {item.title}
                  </h3>
                  <p className="font-display text-[9px] tracking-[0.15em] text-muted-foreground mt-1 uppercase">
                    {item.subtitle}
                  </p>
                </div>
              </div>

              {/* Glitch effect on hover */}
              {hoveredId === item.id && (
                <motion.div
                  className="absolute inset-0 rounded-md pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, hsl(${item.accent === "cyan" ? "180" : "300"} 100% 50% / 0.05), transparent)`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LeonidaFeed;
