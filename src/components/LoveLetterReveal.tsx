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
                My dearest love, I still feel lucky that our paths crossed. I think about the places we have been, the conversations that ran late, and the small moments that would look ordinary to anyone else but mean everything to me.
              </p>
              <p>
                You are my first girlfriend, and I am so grateful for you. I notice the care you give and the effort you put into us. You make me feel listened to, understood, and welcome exactly as I am. I hope I give you that same tenderness in return.
              </p>
              <p>
               I love the real parts of us: the laughter, the honest talks, the plans we make, and even the quiet pauses when we do not need to say much. Thank you for being yourself, and for letting me be part of your life.
              </p>
              <p className="text-foreground font-semibold pt-2">
                I cannot promise every day will be perfect. I can promise to keep listening, keep learning how to love you well, and keep choosing us with care. I love you more than yesterday, and I will find new ways to show it tomorrow.
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
