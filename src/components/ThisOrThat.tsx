import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Heart, Sparkles } from "lucide-react";

const questions = [
  { q: "Date night?", a: "Movie at home 🍿", b: "Fancy dinner 🥂" },
  { q: "Morning routine?", a: "Cuddle in bed 🛏️", b: "Make breakfast together 🥞" },
  { q: "Travel?", a: "Beach vacation 🏖️", b: "City adventure 🌆" },
  { q: "Song?", a: "Our song on repeat 🎵", b: "Discover new music 🎧" },
  { q: "Love language?", a: "Words of affirmation 💬", b: "Physical touch 🤗" },
];

const ThisOrThat = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [finished, setFinished] = useState(false);

  const handleChoice = (choice: string) => {
    const newAnswers = [...answers, choice];
    setAnswers(newAnswers);
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent(current + 1);
    }
  };

  if (finished) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md mx-auto text-center bg-card border border-border rounded-3xl p-8 shadow-[var(--shadow-soft)]"
      >
        <Sparkles className="w-10 h-10 text-primary mx-auto mb-4" />
        <h3 className="font-display text-2xl text-foreground mb-3">
          We're perfect together! 💕
        </h3>
        <p className="font-body text-muted-foreground mb-4">
          No matter what we choose, every moment with you is the best choice I ever made.
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {answers.map((a, i) => (
            <span
              key={i}
              className="bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full font-body text-sm"
            >
              {a}
            </span>
          ))}
        </div>
        <button
          onClick={() => {
            setCurrent(0);
            setAnswers([]);
            setFinished(false);
          }}
          className="mt-6 font-body text-sm text-primary hover:underline"
        >
          Play again? 🔄
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="text-center mb-4">
        <span className="font-body text-sm text-muted-foreground">
          {current + 1} / {questions.length}
        </span>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="font-display text-2xl text-foreground text-center mb-6">
            {questions[current].q}
          </h3>
          <div className="grid gap-4">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleChoice(questions[current].a)}
              className="bg-card border-2 border-primary/30 hover:border-primary rounded-2xl p-5 font-body text-lg text-foreground text-center shadow-sm hover:shadow-[var(--shadow-soft)] transition-all"
            >
              {questions[current].a}
            </motion.button>
            <div className="text-center font-display text-muted-foreground text-sm">or</div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleChoice(questions[current].b)}
              className="bg-card border-2 border-primary/30 hover:border-primary rounded-2xl p-5 font-body text-lg text-foreground text-center shadow-sm hover:shadow-[var(--shadow-soft)] transition-all"
            >
              {questions[current].b}
            </motion.button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ThisOrThat;
