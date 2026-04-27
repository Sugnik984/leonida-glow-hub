import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Flame, AlertTriangle, Radio, TrendingUp, Zap, Eye, MessageCircle, Share2, Heart, Bell, X } from "lucide-react";

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
  magenta: { border: "border-neon-magenta/20 hover:border-neon-magenta/50", hsl: "300 100% 50%" },
  cyan: { border: "border-neon-cyan/20 hover:border-neon-cyan/50", hsl: "180 100% 50%" },
  neutral: { border: "border-border hover:border-muted-foreground/20", hsl: "240 5% 55%" },
};

const trendingTags = [
  { label: "#ViceBeach", color: "300 100% 50%" },
  { label: "#LeonidaChaos", color: "180 100% 50%" },
  { label: "#FloridaMan", color: "270 60% 60%" },
  { label: "#OceanDrive", color: "45 100% 50%" },
];

const LeonidaFeedNotification = () => {
  const [open, setOpen] = useState(false);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [activeViewers, setActiveViewers] = useState(14829);
  const [unread, setUnread] = useState(8);
  const [tickerIndex, setTickerIndex] = useState(0);

  useEffect(() => {
    const i = setInterval(() => {
      setActiveViewers(prev => prev + Math.floor(Math.random() * 20) - 8);
    }, 2000);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const i = setInterval(() => {
      setTickerIndex(prev => (prev + 1) % feedItems.length);
    }, 3500);
    return () => clearInterval(i);
  }, []);

  const handleOpen = () => {
    setOpen(true);
    setUnread(0);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* ═══ COLLAPSED: Notification Bell ═══ */}
      <AnimatePresence>
        {!open && (
          <motion.button
            onClick={handleOpen}
            onMouseEnter={handleOpen}
            initial={{ opacity: 0, x: 40, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="group relative flex items-center gap-2 pl-3 pr-4 py-2 rounded-full overflow-hidden"
            style={{
              background: "linear-gradient(135deg, hsl(300 100% 50% / 0.12), hsl(180 100% 50% / 0.08))",
              border: "1px solid hsl(300 100% 50% / 0.35)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 8px 32px hsl(300 100% 50% / 0.25), inset 0 1px 0 hsl(0 0% 100% / 0.1)",
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ border: "1px solid hsl(300 100% 60% / 0.6)" }}
              animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />

            {/* Bell icon */}
            <motion.div
              className="relative"
              animate={{ rotate: [0, -12, 12, -8, 8, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
            >
              <Bell size={14} className="text-neon-magenta" />
              {unread > 0 && (
                <motion.span
                  className="absolute -top-1.5 -right-1.5 min-w-[14px] h-[14px] px-1 rounded-full flex items-center justify-center font-display text-[8px] font-bold"
                  style={{
                    background: "hsl(0 90% 55%)",
                    color: "white",
                    boxShadow: "0 0 8px hsl(0 90% 55% / 0.8)",
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: [0, 1.3, 1] }}
                >
                  {unread}
                </motion.span>
              )}
            </motion.div>

            {/* Live ticker text */}
            <div className="flex items-center gap-2 max-w-[180px] overflow-hidden">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <AnimatePresence mode="wait">
                <motion.span
                  key={tickerIndex}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="font-display text-[9px] tracking-wider text-foreground/90 truncate"
                >
                  {feedItems[tickerIndex].title}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Scan line shimmer */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(180 100% 70% / 0.15), transparent)",
              }}
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ═══ EXPANDED: Full Feed Panel ═══ */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop click-catcher */}
            <motion.div
              className="fixed inset-0 -z-10"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: -20, filter: "blur(20px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, y: -10, filter: "blur(12px)" }}
              transition={{ type: "spring", stiffness: 220, damping: 26 }}
              onMouseLeave={() => setOpen(false)}
              className="w-[380px] max-h-[78vh] rounded-2xl overflow-hidden flex flex-col relative"
              style={{
                background: "linear-gradient(135deg, hsl(240 30% 8% / 0.85), hsl(280 30% 6% / 0.9))",
                border: "1px solid hsl(300 100% 50% / 0.3)",
                backdropFilter: "blur(30px)",
                boxShadow: "0 24px 80px hsl(0 0% 0% / 0.6), 0 0 60px hsl(300 100% 50% / 0.15), inset 0 1px 0 hsl(0 0% 100% / 0.08)",
              }}
            >
              {/* Decorative top scan line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ background: "linear-gradient(90deg, transparent, hsl(300 100% 60%), hsl(180 100% 60%), transparent)" }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              {/* Header */}
              <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <motion.div
                    className="w-2 h-2 rounded-full bg-neon-magenta"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <h2 className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">LEONIDA FEED</h2>
                  <motion.span
                    className="px-1.5 py-0.5 rounded-full text-[7px] font-display tracking-wider"
                    style={{ background: "hsl(0 80% 50% / 0.15)", color: "hsl(0 80% 60%)", border: "1px solid hsl(0 80% 50% / 0.3)" }}
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ● LIVE
                  </motion.span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="w-6 h-6 rounded-md flex items-center justify-center hover:bg-white/[0.08] transition-colors"
                >
                  <X size={12} className="text-muted-foreground" />
                </button>
              </div>

              {/* Feed grid */}
              <div className="flex-1 overflow-y-auto scrollbar-hide px-3 py-3">
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
                        transition={{ delay: 0.04 * i + 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        onMouseEnter={() => setHoveredId(item.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        whileHover={{ scale: 1.03, y: -3 }}
                      >
                        <AnimatePresence>
                          {hoveredId === item.id && (
                            <motion.div
                              className="absolute inset-0 pointer-events-none"
                              style={{ background: `linear-gradient(135deg, hsl(${cfg.hsl} / 0.12), transparent 60%)` }}
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
                            <h3 className="font-body text-xs font-semibold text-foreground leading-tight line-clamp-2">{item.title}</h3>
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

              {/* Bottom section */}
              <div className="px-3 pb-3 pt-2 space-y-2 border-t border-white/[0.06]">
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
                      transition={{ delay: 0.5 + i * 0.08 }}
                      whileHover={{ scale: 1.1, boxShadow: `0 0 16px hsl(${tag.color} / 0.3)` }}
                    >
                      {tag.label}
                    </motion.span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="flex items-center gap-1 px-2 py-1 rounded-md"
                      style={{ background: "hsl(180 100% 50% / 0.06)", border: "1px solid hsl(180 100% 50% / 0.15)" }}
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
                    </div>

                    <div className="flex items-center gap-1.5">
                      {[MessageCircle, Share2, Heart].map((ActionIcon, i) => (
                        <motion.button
                          key={i}
                          className="w-6 h-6 rounded-md flex items-center justify-center"
                          style={{ background: "hsl(240 10% 20% / 0.4)", border: "1px solid hsl(240 10% 30% / 0.3)" }}
                          whileHover={{ scale: 1.2, background: "hsl(300 100% 50% / 0.15)", borderColor: "hsl(300 100% 50% / 0.4)" }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <ActionIcon size={10} className="text-muted-foreground" />
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-end gap-[2px] h-4">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-[2px] rounded-full"
                        style={{ background: `hsl(${i < 5 ? "300 100% 50%" : "180 100% 50%"} / 0.5)` }}
                        animate={{ height: [4, Math.random() * 14 + 4, 6, Math.random() * 12 + 4, 4] }}
                        transition={{ duration: 1.5 + Math.random() * 0.5, repeat: Infinity, delay: i * 0.08, ease: "easeInOut" }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LeonidaFeedNotification;
