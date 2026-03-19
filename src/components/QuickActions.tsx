import { motion } from "framer-motion";
import { Phone, Map, Briefcase, Radio, Wrench, Users } from "lucide-react";

const actions = [
  { icon: Phone, label: "CONTACTS", color: "300 100% 50%" },
  { icon: Map, label: "MAP", color: "180 100% 50%" },
  { icon: Briefcase, label: "MISSIONS", color: "45 100% 55%" },
  { icon: Radio, label: "RADIO", color: "270 100% 60%" },
  { icon: Wrench, label: "GARAGE", color: "180 100% 50%" },
  { icon: Users, label: "CREW", color: "300 100% 50%" },
];

const QuickActions = () => {
  return (
    <motion.div
      className="glass-holographic rounded-xl p-4 holo-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 1.5 }}
    >
      <h2 className="font-display text-[10px] tracking-[0.3em] text-muted-foreground mb-3">QUICK ACCESS</h2>
      <div className="grid grid-cols-3 gap-2">
        {actions.map((action, i) => {
          const Icon = action.icon;
          return (
            <motion.button
              key={action.label}
              className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-lg transition-all duration-300 group relative overflow-hidden"
              style={{
                background: "hsl(240 12% 6% / 0.5)",
                border: "1px solid hsl(240 10% 18% / 0.5)",
              }}
              whileHover={{
                scale: 1.05,
                borderColor: `hsl(${action.color} / 0.5)`,
              }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6 + i * 0.05 }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
                style={{
                  background: `radial-gradient(circle at 50% 50%, hsl(${action.color} / 0.1), transparent 70%)`,
                }}
              />
              <Icon
                size={18}
                className="relative z-10 transition-colors duration-300"
                style={{ color: `hsl(${action.color} / 0.7)` }}
              />
              <span className="font-display text-[7px] tracking-[0.2em] text-muted-foreground relative z-10 group-hover:text-foreground transition-colors">
                {action.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
};

export default QuickActions;
