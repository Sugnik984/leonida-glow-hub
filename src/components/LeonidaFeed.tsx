import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Flame, AlertTriangle, Radio, TrendingUp, Zap, Eye, MessageCircle, Share2, Heart } from "lucide-react";
import GlassPanel from "./GlassPanel";

interface FeedItem {
  id: number;
  type: "news" | "clip" | "alert";
  title: string;
  subtitle: string;
  accent: "magenta" | "cyan" | "neutral";
  size: "sm" | "md" | "lg";
  icon: typeof Flame;
  views?: string;
  likes?: string;
}

const feedItems: FeedItem[] = [
  { id: 1, type: "news", title: "Florida Man Rides Alligator Through Mall", subtitle: "LEONIDA TODAY", accent: "magenta", size: "lg", icon: Flame, views: "4.2M", likes: "312K" },
  { id: 2, type: "clip", title: "🔥 Beach Party Gone Wrong", subtitle: "TRENDING • 2.1M views", accent: "cyan", size: "sm", icon: TrendingUp, views: "2.1M", likes: "89K" },
  { id: 3, type: "alert", title: "WANTED: Bank Heist Suspects", subtitle: "LCPD ALERT", accent: "magenta", size: "sm", icon: AlertTriangle },
  { id: 4, type: "news", title: "Yacht Club Influencer Scandal", subtitle: "VICE BEACH DAILY", accent: "neutral", size: "md", icon: Radio, views: "1.8M", likes: "204K" },
  { id: 5, type: "clip", title: "Street Race: Ocean Drive", subtitle: "VIRAL • 890K views", accent: "cyan", size: "sm", icon: TrendingUp, views: "890K", likes: "67K" },
  { id: 6, type: "news", title: "Governor Denies Swamp Deal", subtitle: "LEONIDA POLITICS", accent: "neutral", size: "sm", icon: Radio },
  { id: 7, type: "alert", title: "Tropical Storm Warning", subtitle: "WEATHER ALERT", accent: "magenta", size: "md", icon: AlertTriangle },
  { id: 8, type: "clip", title: "Nightclub Opening Gone Viral", subtitle: "TRENDING • 5.4M views", accent: "cyan", size: "sm", icon: TrendingUp, views: "5.4M", likes: "445K" },
];

const accentConfig = {
  magenta: { border: "border-neon-magenta/20 hover:border-neon-magenta/50", dot: "bg-neon-magenta", hsl: "300 100% 50%" },
  cyan: { border: "border-neon-cyan/20 hover:border-neon-cyan/50", dot: "bg-neon-cyan", hsl: "180 100% 50%" },
  neutral: { border: "border-border hover:border-muted-foreground/20", dot: "bg-muted-foreground", hsl: "240 5% 55%" },
};

const trendingTags = [
  { label: "#ViceBeach", color: "300 100% 50%" },
  { label: "#LeonidaChaos", color: "180 100% 50%" },
  { label: "#FloridaMan", color: "270 60% 60%" },
  { label: "#OceanDrive", color: "45 100% 50%" },
];

const LeonidaFeed = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeViewers, setActiveViewers] = useState(14829);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveViewers(prev => prev + Math.floor(Math.random() * 20) - 8);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
      <div className="flex-1 overflow-y-auto scrollbar-hide px-3 pb-2">
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
                  <div className="min-w-0 flex-1">
                    <h3 className="font-body text-sm font-semibold text-foreground leading-tight line-clamp-2">{item.title}</h3>
                    <p className="font-display text-[8px] tracking-[0.15em] text-muted-foreground mt-1 uppercase">{item.subtitle}</p>
                    {item.views && (
                      <div className="flex items-center gap-3 mt-1.5">
                        <span className="flex items-center gap-1 text-[8px] text-muted-foreground">
                          <Eye size={8} /> {item.views}
                        </span>
                        <span className="flex items-center gap-1 text-[8px] text-muted-foreground">
                          <Heart size={8} /> {item.likes}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ═══ UPGRADED BOTTOM SECTION ═══ */}
      <div className="px-3 pb-3 pt-1 space-y-2 border-t border-white/[0.04]">

        {/* Trending Tags — horizontal scroll with glow */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
          <Zap size={9} className="text-neon-magenta shrink-0" />
          {trendingTags.map((tag, i) => (
            <motion.span
              key={tag.label}
              className="shrink-0 px-2 py-0.5 rounded-full font-display text-[8px] tracking-wider cursor-pointer whitespace-nowrap"
              style={{
                background: `hsl(${tag.color} / 0.08)`,
                color: `hsl(${tag.color})`,
                border: `1px solid hsl(${tag.color} / 0.2)`,
                boxShadow: `0 0 8px hsl(${tag.color} / 0.1)`,
              }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.5 + i * 0.1 }}
              whileHover={{
                scale: 1.1,
                boxShadow: `0 0 16px hsl(${tag.color} / 0.3)`,
              }}
            >
              {tag.label}
            </motion.span>
          ))}
        </div>

        {/* Live Viewer Counter + Activity Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <motion.div
              className="flex items-center gap-1 px-2 py-1 rounded-md"
              style={{
                background: "hsl(180 100% 50% / 0.06)",
                border: "1px solid hsl(180 100% 50% / 0.15)",
              }}
            >
              <Eye size={9} className="text-neon-cyan" />
              <motion.span
                className="font-display text-[9px] tracking-wider text-neon-cyan"
                key={activeViewers}
                initial={{ y: -6, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 20 }}
              >
                {activeViewers.toLocaleString()}
              </motion.span>
              <span className="font-display text-[7px] tracking-wider text-muted-foreground">WATCHING</span>
            </motion.div>

            <div className="flex items-center gap-2">
              {[MessageCircle, Share2, Heart].map((ActionIcon, i) => (
                <motion.button
                  key={i}
                  className="w-6 h-6 rounded-md flex items-center justify-center"
                  style={{
                    background: "hsl(240 10% 20% / 0.4)",
                    border: "1px solid hsl(240 10% 30% / 0.3)",
                  }}
                  whileHover={{
                    scale: 1.2,
                    background: "hsl(300 100% 50% / 0.15)",
                    borderColor: "hsl(300 100% 50% / 0.4)",
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <ActionIcon size={10} className="text-muted-foreground" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Activity Pulse Bars */}
          <div className="flex items-end gap-[2px] h-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-[2px] rounded-full"
                style={{ background: `hsl(${i < 6 ? "300 100% 50%" : "180 100% 50%"} / 0.5)` }}
                animate={{
                  height: [4, Math.random() * 14 + 4, 6, Math.random() * 12 + 4, 4],
                }}
                transition={{
                  duration: 1.5 + Math.random() * 0.5,
                  repeat: Infinity,
                  delay: i * 0.08,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        </div>

        {/* Neural Network Status Line */}
        <motion.div
          className="flex items-center gap-2 px-2 py-1 rounded-md"
          style={{
            background: "linear-gradient(90deg, hsl(300 100% 50% / 0.04), hsl(180 100% 50% / 0.04))",
            border: "1px solid hsl(270 60% 50% / 0.1)",
          }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: "hsl(120 80% 50%)" }}
            animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.span
            className="font-display text-[7px] tracking-[0.2em] text-muted-foreground"
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            NEURAL FEED ENGINE v6.1 • SCANNING LEONIDA NETWORK…
          </motion.span>
        </motion.div>
      </div>
    </GlassPanel>
  );
};

export default LeonidaFeed;
