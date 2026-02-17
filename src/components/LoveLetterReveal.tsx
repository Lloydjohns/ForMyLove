import { motion } from "framer-motion";
import { useState } from "react";
import { Heart } from "lucide-react";

const LoveLetterReveal = () => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="flex flex-col items-center px-4">
      {!opened ? (
        <motion.button
          whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setOpened(true)}
          className="relative bg-primary text-primary-foreground px-10 py-5 rounded-2xl font-display text-xl shadow-[var(--shadow-glow)] hover:shadow-[0_0_60px_hsl(345_80%_65%_/_0.4)] transition-shadow"
        >
          <span className="flex items-center gap-3">
            <Heart className="w-6 h-6 animate-heartbeat" />
            Open My Love Letter
            <Heart className="w-6 h-6 animate-heartbeat" />
          </span>
        </motion.button>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateX: 90 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-md w-full bg-card border-2 border-primary/20 rounded-3xl p-8 shadow-[var(--shadow-glow)] text-center"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-4xl mb-4">💌</p>
            <h3 className="font-display text-2xl text-foreground mb-4 italic">
              My Dearest Love,
            </h3>
            <div className="font-body text-muted-foreground leading-relaxed space-y-3 text-base">
              <p>
                Every day with you feels like a beautiful dream I never want to wake up from.
              </p>
              <p>
                Youre my first girlfriend, and Im so grateful for you. I see all the effort you give and all the love you show, and it means more to me than words can say.
              </p>
              <p>
               You are both my strength and my weakness, the reason my heart feels so full. Thank you for being you, my love.
              </p>
              <p className="text-foreground font-semibold pt-2">
                I love you more than yesterday, less than tomorrow. 
              </p>
              <p className="text-2xl pt-2">Forever yours, ❤️</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default LoveLetterReveal;
