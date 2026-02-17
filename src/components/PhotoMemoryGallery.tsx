import { motion } from "framer-motion";
import { useState } from "react";
import { Heart, X } from "lucide-react";
import memory1 from "@/assets/memory-1.jpg";
import memory2 from "@/assets/memory-2.jpg";
import memory3 from "@/assets/memory-3.jpg";
import memory4 from "@/assets/memory-4.jpg";
import memory5 from "@/assets/memory-5.jpg";
import memory6 from "@/assets/memory-6.jpg";

const memories = [
  { img: memory1, caption: "Sunrise Date's 🌅", rotate: -3 },
  { img: memory2, caption: "River Esplanade Night Walk", rotate: 2 },
  { img: memory3, caption: "Photobooth", rotate: -2 },
  { img: memory4, caption: "With your workmates", rotate: 3 },
  { img: memory5, caption: "Missing you Date's", rotate: -1 },
  { img: memory6, caption: "You + Me = ❤️", rotate: 2 },
];

const PhotoMemoryGallery = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const toggleLike = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  return (
    <>
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 px-4">
        {memories.map((mem, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40, rotate: mem.rotate }}
            whileInView={{ opacity: 1, y: 0, rotate: mem.rotate }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
            onClick={() => setSelected(i)}
            className="cursor-pointer group"
          >
            <div className="bg-card p-3 pb-12 rounded-lg shadow-md hover:shadow-[var(--shadow-soft)] transition-all relative">
              <div className="aspect-square overflow-hidden rounded">
                <img
                  src={mem.img}
                  alt={mem.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <p className="font-body text-sm text-muted-foreground text-center absolute bottom-3 left-3 right-3">
                {mem.caption}
              </p>
              <button
                onClick={(e) => toggleLike(i, e)}
                className="absolute top-5 right-5 bg-card/80 backdrop-blur-sm rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    liked.has(i) ? "fill-primary text-primary" : "text-muted-foreground"
                  }`}
                />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      {selected !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelected(null)}
          className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative max-w-lg w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute -top-10 right-0 text-background hover:text-primary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="bg-card p-4 pb-16 rounded-xl shadow-2xl">
              <img
                src={memories[selected].img}
                alt={memories[selected].caption}
                className="w-full rounded-lg"
              />
              <p className="font-display text-lg text-foreground text-center absolute bottom-5 left-4 right-4">
                {memories[selected].caption}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default PhotoMemoryGallery;
