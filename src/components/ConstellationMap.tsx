import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";
import html2canvas from "html2canvas";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
}

const generateStars = (count: number): Star[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 2,
    delay: Math.random() * 3,
  }));

const ConstellationMap = () => {
  const [stars] = useState(() => generateStars(60));
  const [selected, setSelected] = useState<number[]>([]);
  const [lines, setLines] = useState<[number, number][]>([]);
  const [complete, setComplete] = useState(false);
  const [poem, setPoem] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const handleStarClick = useCallback(
    (id: number) => {
      if (complete) return;
      setSelected((prev) => {
        const next = [...prev, id];
        if (prev.length > 0) {
          setLines((l) => [...l, [prev[prev.length - 1], id]]);
        }
        return next;
      });
    },
    [complete]
  );

  const generatePoem = () => {
    const lines = [
      "Across galaxies untold,",
      "two souls collided in starlight,",
      "and destiny rewrote the sky.",
      "Love became eternal."
    ];
    return lines.sort(() => 0.5 - Math.random()).join("\n");
  };

  const handleFinish = () => {
    if (selected.length >= 3) {
      setPoem(generatePoem());
      setComplete(true);
    }
  };

  const handleReset = () => {
    setSelected([]);
    setLines([]);
    setComplete(false);
    setPoem("");
  };

  const downloadImage = async () => {
    if (!containerRef.current) return;
    const canvas = await html2canvas(containerRef.current);
    const link = document.createElement("a");
    link.download = "god-mode-constellation.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const getStarPos = (id: number) => {
    const s = stars.find((st) => st.id === id);
    return s ? { x: s.x, y: s.y } : { x: 0, y: 0 };
  };

  return (
    <div className="max-w-3xl mx-auto px-4 text-white">

      <div
        ref={containerRef}
        className="relative w-full aspect-square rounded-3xl overflow-hidden"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, #1a103d 0%, #05010d 80%)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Floating Hearts */}
        <AnimatePresence>
          {complete &&
            Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: 300, opacity: 0 }}
                animate={{ y: -200, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: 3 + Math.random(),
                  delay: Math.random(),
                }}
                className="absolute text-pink-400 text-xl"
                style={{ left: `${Math.random() * 100}%` }}
              >
                💖
              </motion.div>
            ))}
        </AnimatePresence>

        {/* Stars */}
        {stars.map((star) => (
          <motion.button
            key={star.id}
            onClick={() => handleStarClick(star.id)}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: selected.includes(star.id) ? 1.8 : [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              delay: star.delay,
              repeat: Infinity,
            }}
            className="absolute rounded-full"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size * (selected.includes(star.id) ? 2 : 1),
              height: star.size * (selected.includes(star.id) ? 2 : 1),
              background: selected.includes(star.id)
                ? "#ff4fa3"
                : "white",
              boxShadow: selected.includes(star.id)
                ? "0 0 25px #ff4fa3"
                : `0 0 ${star.size * 2}px white`,
            }}
          />
        ))}

        {/* Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {lines.map(([from, to], i) => {
            const a = getStarPos(from);
            const b = getStarPos(to);
            return (
              <motion.line
                key={i}
                x1={`${a.x}%`}
                y1={`${a.y}%`}
                x2={`${b.x}%`}
                y2={`${b.y}%`}
                stroke="#ff4fa3"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6 }}
              />
            );
          })}
        </svg>

        {/* Overlay */}
        <AnimatePresence>
          {complete && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            >
              <div className="text-center px-6 max-w-md">
                <h2 className="text-2xl font-bold mb-4">
                  Our Eternal Galaxy 🌌
                </h2>
                <p className="italic text-pink-300 whitespace-pre-line">
                  {poem}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mt-6">
        {!complete && selected.length >= 3 && (
          <button
            onClick={handleFinish}
            className="bg-pink-500 hover:bg-pink-600 px-6 py-3 rounded-full font-semibold"
          >
            Ignite the Universe ✨
          </button>
        )}

        {complete && (
          <>
            <button
              onClick={downloadImage}
              className="bg-white/20 px-6 py-3 rounded-full"
            >
              Download 📸
            </button>

            <button
              onClick={handleReset}
              className="bg-white/20 px-6 py-3 rounded-full"
            >
              Reset
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ConstellationMap;