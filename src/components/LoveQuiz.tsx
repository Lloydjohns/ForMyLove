import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Heart } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  loveNote: string;
}

const questions: Question[] = [
  {
    question: "What makes us perfect together?",
    options: ["Everything 💕", "Our chemistry ✨", "The way we laugh 😂", "All of the above 💖"],
    correctIndex: 3,
    loveNote: "That's right! Everything about us is magic 💫",
  },
  {
    question: "What's the best part of our day?",
    options: ["Good morning texts 🌅", "Late night talks 🌙", "Being together 🥰", "Every single moment ❤️"],
    correctIndex: 3,
    loveNote: "Every moment with you is the best moment 💗",
  },
  {
    question: "How much do I love you?",
    options: ["A lot ❤️", "More than words can say 💝", "To the moon and back 🌙", "Infinitely ♾️"],
    correctIndex: 3,
    loveNote: "My love for you has no limits, and it never will 💕",
  },
  {
    question: "What would I do without you?",
    options: ["Be lost 🥺", "Miss your smile 😊", "Not be as happy 💔", "I don't even want to think about it 🥹"],
    correctIndex: 3,
    loveNote: "You complete my world in ways I can never explain 🌍❤️",
  },
  {
    question: "Will I always love you?",
    options: ["Yes ❤️", "Forever 💕", "Always and forever 💖", "Until the stars stop shining ✨"],
    correctIndex: 3,
    loveNote: "My love for you is eternal, baby. Always and forever 💞",
  },
];

const LoveQuiz = () => {
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showNote, setShowNote] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === questions[currentQ].correctIndex) {
      setScore((s) => s + 1);
    }
    setTimeout(() => setShowNote(true), 500);
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelected(null);
      setShowNote(false);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 px-6"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-7xl mb-6"
        >
          💖
        </motion.div>
        <h3 className="font-display text-3xl text-foreground mb-4">
          You Know Us So Well!
        </h3>
        <p className="font-body text-lg text-muted-foreground max-w-md mx-auto">
          {score === questions.length
            ? "Perfect score! You really know how special we are together 🥰"
            : `You got ${score}/${questions.length}! But honestly, every answer is right because we're perfect together 💕`}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-4">
      {/* Progress */}
      <div className="flex gap-2 mb-8 justify-center">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full transition-all duration-500 ${
              i <= currentQ ? "w-8 bg-primary" : "w-4 bg-secondary"
            }`}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.4 }}
        >
          <h3 className="font-display text-2xl md:text-3xl text-foreground text-center mb-8">
            {questions[currentQ].question}
          </h3>

          <div className="grid gap-3">
            {questions[currentQ].options.map((option, i) => (
              <motion.button
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(i)}
                className={`w-full p-4 rounded-xl text-left font-body text-base transition-all duration-300 border-2 ${
                  selected === null
                    ? "bg-card border-border hover:border-primary hover:shadow-[var(--shadow-soft)]"
                    : selected === i
                    ? i === questions[currentQ].correctIndex
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-secondary border-primary/50"
                    : i === questions[currentQ].correctIndex
                    ? "bg-primary/10 border-primary"
                    : "bg-card border-border opacity-50"
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {showNote && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center"
              >
                <p className="text-muted-foreground font-body italic text-lg mb-4">
                  {questions[currentQ].loveNote}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-body font-semibold shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-glow)] transition-shadow"
                >
                  {currentQ < questions.length - 1 ? "Next" : "See Results"}
                  <Heart className="w-4 h-4" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LoveQuiz;
