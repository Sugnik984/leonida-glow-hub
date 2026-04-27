import { motion, AnimatePresence } from "framer-motion";
import { Phone, Map, Briefcase, Radio, Wrench, Users, Menu, ChevronRight } from "lucide-react";
import { useState } from "react";

const actions = [
  { icon: Phone, label: "CONTACTS", color: "300 100% 50%" },
  { icon: Map, label: "MAP", color: "180 100% 50%" },
  { icon: Briefcase, label: "MISSIONS", color: "45 100% 55%" },
  { icon: Radio, label: "RADIO", color: "270 100% 60%" },
  { icon: Wrench, label: "GARAGE", color: "180 100% 50%" },
  { icon: Users, label: "CREW", color: "300 100% 50%" },
];

const QuickAccessMenu = () => {
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState<string | null>(null);

  const handleClick = (label: string) => {
    setClicked(label);
    setTimeout(() => setClicked(null), 600);
  };

  return (
    <div
      className="fixed top-20 left-4 z-50"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Trigger */}
      <motion.button
        className="glass-holographic holo-border rounded-xl px-4 py-3 flex items-center gap-3 relative overflow-hidden group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{ boxShadow: "0 0 30px hsl(45 100% 55% / 0.25)" }}
      >
        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <Menu size={18} style={{ color: "hsl(45 100% 55%)" }} />
        </motion.div>
        <span className="font-display text-[10px] tracking-[0.3em] text-foreground">
          QUICK ACCESS
        </span>
        <motion.div
          animate={{ x: open ? 4 : 0, opacity: open ? 1 : 0.5 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight size={14} style={{ color: "hsl(45 100% 55% / 0.7)" }} />
        </motion.div>

        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-xl pointer-events-none"
          style={{ border: "1px solid hsl(45 100% 55% / 0.5)" }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Expanded options */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-0 left-full ml-3 glass-holographic holo-border rounded-xl p-3 min-w-[260px]"
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ boxShadow: "0 10px 50px hsl(300 100% 50% / 0.3)" }}
          >
            <div className="font-display text-[9px] tracking-[0.3em] text-muted-foreground mb-3 px-1">
              SYSTEM MODULES
            </div>
            <div className="grid grid-cols-3 gap-2">
              {actions.map((action, i) => {
                const Icon = action.icon;
                const isClicked = clicked === action.label;
                return (
                  <motion.button
                    key={action.label}
                    className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg group relative overflow-hidden"
                    style={{
                      background: "hsl(240 12% 6% / 0.5)",
                      border: "1px solid hsl(240 10% 18% / 0.5)",
                    }}
                    whileHover={{
                      scale: 1.1,
                      y: -3,
                      borderColor: `hsl(${action.color} / 0.6)`,
                      boxShadow: `0 0 25px hsl(${action.color} / 0.4)`,
                    }}
                    whileTap={{ scale: 0.92 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => handleClick(action.label)}
                  >
                    {isClicked && (
                      <motion.div
                        className="absolute inset-0 rounded-lg pointer-events-none"
                        style={{
                          border: `2px solid hsl(${action.color})`,
                          boxShadow: `0 0 20px hsl(${action.color} / 0.5)`,
                        }}
                        initial={{ scale: 0.5, opacity: 1 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, hsl(${action.color} / 0.2), transparent 70%)`,
                      }}
                    />
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                    >
                      <Icon
                        size={20}
                        className="relative z-10"
                        style={{ color: `hsl(${action.color})` }}
                      />
                    </motion.div>
                    <span className="font-display text-[7px] tracking-[0.2em] text-muted-foreground relative z-10 group-hover:text-foreground transition-colors">
                      {action.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickAccessMenu;
