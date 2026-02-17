import { useState } from "react";
import { motion } from "framer-motion";
import { Music } from "lucide-react";

const songs = [
  {
    title: "Perfect",
    artist: "Ed Sheeran",
    spotifyId: "0tgVpDi06FyKpA1z0VMD4v",
  },
  {
    title: "All of Me",
    artist: "John Legend",
    spotifyId: "3U4isOIWM3VvDubwSI3y7a",
  },
  {
    title: "Thinking Out Loud",
    artist: "Ed Sheeran",
    spotifyId: "34gCuhDGsG4bRPIf9bb02f",
  },
  {
    title: "A Thousand Years",
    artist: "Christina Perri",
    spotifyId: "6lanRgr6wXibZr8KgzXxBl",
  },
  {
    title: "Can't Help Falling in Love",
    artist: "Elvis Presley",
    spotifyId: "44AyOl4qVkzS48vBsbNXaC",
  },
  {
    title: "Kalapastangan",
    artist: "fitterkarma",
    spotifyId: "1udOOSbJnytCdgvbgYOF5s",
  },
  {
    title: "Panaginip",
    artist: "Nicole",
    spotifyId: "6wcjLOGIdmw8BUaRho4c9L",
  },
];

const MusicSection = () => {
  const [currentSong, setCurrentSong] = useState(songs[0]);

  return (
    <div className="max-w-md mx-auto px-4">
      <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 p-6 text-center">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto mb-4 bg-green-500/20 rounded-full flex items-center justify-center"
          >
            <Music className="w-8 h-8 text-green-500" />
          </motion.div>

          <h3 className="text-xl font-semibold">Our Spotify Playlist 🎧</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Tap a song and let the vibes play
          </p>
        </div>

        {/* Song List */}
        <div className="divide-y divide-border">
          {songs.map((song, i) => (
            <div
              key={i}
              onClick={() => setCurrentSong(song)}
              className={`p-4 cursor-pointer transition ${
                currentSong.title === song.title
                  ? "bg-green-500/10"
                  : "hover:bg-secondary/50"
              }`}
            >
              <p className="font-semibold text-sm">{song.title}</p>
              <p className="text-xs text-muted-foreground">{song.artist}</p>
            </div>
          ))}
        </div>

        {/* Spotify Player */}
        <div className="p-4">
          <iframe
            src={`https://open.spotify.com/embed/track/${currentSong.spotifyId}?utm_source=generator`}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl"
          ></iframe>
        </div>

        <div className="p-4 text-center">
          <p className="text-xs text-muted-foreground">
            🎵 Every song reminds me of you 🎵
          </p>
        </div>
      </div>
    </div>
  );
};

export default MusicSection;