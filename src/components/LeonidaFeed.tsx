import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Flame, AlertTriangle, Radio, TrendingUp } from "lucide-react";
import GlassPanel from "./GlassPanel";

interface FeedItem {
  id: number;
  type: "news" | "clip" | "alert";
  title: string;
  subtitle: string;
  accent: "magenta" | "cyan" | "neutral";
  size: "sm" | "md" | "lg";
  icon: typeof Flame;
}

const feedItems: FeedItem[] = [
  { id: 1, type: "news", title: "Florida Man Rides Alligator Through Mall", subtitle: "LEONIDA TODAY", accent: "magenta", size: "lg", icon: Flame },
  { id: 2, type: "clip", title: "🔥 Beach Party Gone Wrong", subtitle: "TRENDING • 2.1M views", accent: "cyan", size: "sm", icon: TrendingUp },
  { id: 3, type: "alert", title: "WANTED: Bank Heist Suspects", subtitle: "LCPD ALERT", accent: "magenta", size: "sm", icon: AlertTriangle },
  { id: 4, type: "news", title: "Yacht Club Influencer Scandal", subtitle: "VICE BEACH DAILY", accent: "neutral", size: "md", icon: Radio },
  { id: 5, type: "clip", title: "Street Race: Ocean Drive", subtitle: "VIRAL • 890K views", accent: "cyan", size: "sm", icon: TrendingUp },
  { id: 6, type: "news", title: "Governor Denies Swamp Deal", subtitle: "LEONIDA POLITICS", accent: "neutral", size: "sm", icon: Radio },
  { id: 7, type: "alert", title: "Tropical Storm Warning", subtitle: "WEATHER ALERT", accent: "magenta", size: "md", icon: AlertTriangle },
  { id: 8, type: "clip", title: "Nightclub Opening Gone Viral", subtitle: "TRENDING • 5.4M views", accent: "cyan", size: "sm", icon: TrendingUp },
];

const accentConfig = {
  magenta: { border: "border-neon-magenta/20 hover:border-neon-magenta/50", dot: "bg-neon-magenta", hsl: "300 100% 50%" },
  cyan: { border: "border-neon-cyan/20 hover:border-neon-cyan/50", dot: "bg-neon-cyan", hsl: "180 100% 50%" },
  neutral: { border: "border-border hover:border-muted-foreground/20", dot: "bg-muted-foreground", hsl: "240 5% 55%" },
};

const LeonidaFeed = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <GlassPanel delay={0.7} from="right" glowColor="300 100% 50%" className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-4 pb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-neon-magenta"
            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <h2 className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">LEONIDA FEED</h2>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.div
            className="px-2 py-0.5 rounded-full text-[8px] font-display tracking-wider"
            style={{ background: "hsl(0 80% 50% / 0.15)", color: "hsl(0 80% 60%)", border: "1px solid hsl(0 80% 50% / 0.3)" }}
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ● LIVE
          </motion.div>
        </div>
      </div>

      {/* Notification ping */}
      <motion.div
        className="mx-5 mb-2 px-3 py-1.5 rounded-md flex items-center gap-2"
        style={{
          background: "hsl(300 100% 50% / 0.08)",
          border: "1px solid hsl(300 100% 50% / 0.2)",
        }}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: [0, 1, 1, 0], height: ["0px", "auto", "auto", "0px"] }}
        transition={{ duration: 4, repeat: Infinity, repeatDelay: 8, times: [0, 0.1, 0.9, 1] }}
      >
        <span className="font-display text-[8px] tracking-wider text-neon-magenta">📡 NEW ALERT INCOMING…</span>
      </motion.div>

      {/* Feed grid */}
      <div className="flex-1 overflow-y-auto scrollbar-hide px-3 pb-3">
        <div className="grid grid-cols-2 gap-2 auto-rows-min">
          {feedItems.map((item, i) => {
            const cfg = accentConfig[item.accent];
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                className={`
                  glass-surface rounded-lg p-3 cursor-pointer border transition-all duration-300 relative overflow-hidden
                  ${cfg.border}
                  ${item.size === "lg" || item.size === "md" ? "col-span-2" : ""}
                `}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.8, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                whileHover={{ scale: 1.03, y: -3 }}
              >
                <AnimatePresence>
                  {hoveredId === item.id && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: `linear-gradient(135deg, hsl(${cfg.hsl} / 0.1), transparent 60%)` }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>

                <div className="flex items-start gap-2.5 relative z-10">
                  <motion.div
                    className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: `hsl(${cfg.hsl} / 0.1)`, border: `1px solid hsl(${cfg.hsl} / 0.2)` }}
                    animate={hoveredId === item.id ? { rotate: [0, -5, 5, 0] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    <Icon size={11} style={{ color: `hsl(${cfg.hsl})` }} />
                  </motion.div>
                  <div className="min-w-0">
                    <h3 className="font-body text-sm font-semibold text-foreground leading-tight line-clamp-2">{item.title}</h3>
                    <p className="font-display text-[8px] tracking-[0.15em] text-muted-foreground mt-1 uppercase">{item.subtitle}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </GlassPanel>
  );
};

export default LeonidaFeed;
