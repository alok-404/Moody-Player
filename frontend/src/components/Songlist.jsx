import React, { useState, useRef } from "react";

const Songlist = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState({});
  const audioRefs = useRef([]);

  // Play / Pause safely
  const handlePlayPause = (index) => {
    const audioEl = audioRefs.current[index];
    if (!audioEl) return;

    if (currentSongIndex === index) {
      if (isPlaying) audioEl.pause();
      else audioEl.play();
      setIsPlaying(!isPlaying);
    } else {
      // Pause all other audios
      audioRefs.current.forEach((audio) => audio?.pause());
      audioEl.play();
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

  // Seek bar change
  const handleSeek = (index, value) => {
    const audio = audioRefs.current[index];
    if (!audio || !audio.duration) return;

    audio.currentTime = (value / 100) * audio.duration;
    setProgress((prev) => ({ ...prev, [index]: value }));
  };

  // Update progress for slider
  const updateProgress = (index) => {
    const audio = audioRefs.current[index];
    if (!audio || !audio.duration) return;

    const value = (audio.currentTime / audio.duration) * 100;
    setProgress((prev) => ({ ...prev, [index]: value }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold px-2">Recommended for you</h2>

      <div className="grid gap-4 max-h-[70vh] overflow-y-auto pr-2 custom-scroll">
        {songs.length > 0 ? (
          songs.map((song, index) => (
            <div
              key={song._id || index}
              className={`p-4 rounded-[1.5rem] border transition-all ${
                currentSongIndex === index
                  ? "bg-white/10 border-orange-500/50 shadow-xl"
                  : "bg-white/5 border-white/5"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br cursor-pointer from-zinc-700 to-zinc-800 rounded-xl flex items-center justify-center text-2xl shadow-inner">
                  {currentSongIndex === index && isPlaying ? "🎵" : "📻"}
                </div>

                <div className="flex-1">
                  <h4 className="font-bold text-lg leading-tight">{song.title}</h4>
                  <p className="text-sm opacity-50">{song.artist}</p>
                </div>

                <button
                  onClick={() => handlePlayPause(index)}
                  className="w-12 h-12 flex items-center cursor-pointer justify-center rounded-full bg-orange-600 text-white shadow-lg"
                >
                  {currentSongIndex === index && isPlaying ? "⏸" : "▶"}
                </button>
              </div>

              {/* Seek bar */}
              {currentSongIndex === index && (
                <div className="mt-4 px-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress[index] || 0}
                    onChange={(e) => handleSeek(index, e.target.value)}
                    className="w-full h-1.5 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                  />
                  <audio
                    ref={(el) => (audioRefs.current[index] = el)}
                    src={song.audio}
                    preload="metadata"
                    onTimeUpdate={() => updateProgress(index)}
                    onEnded={() => {
                      setIsPlaying(false);
                      setCurrentSongIndex(null);
                    }}
                  />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-20 opacity-30 italic text-lg">
            No music found. Try scanning your face!
          </div>
        )}
      </div>
    </div>
  );
};

export default Songlist;
