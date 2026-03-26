import React, { useState, useRef } from "react";

const Songlist = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const audioRefs = useRef([]);

  const handlePlayPause = (index) => {
    if (currentSongIndex === index) {
      if (isPlaying) {
        audioRefs.current[index].pause();
        setIsPlaying(false);
      } else {
        setLoadingIndex(index);
        audioRefs.current[index].play();
      }
    } else {
      audioRefs.current.forEach((audio) => audio?.pause());

      setLoadingIndex(index);
      setCurrentSongIndex(index);
      audioRefs.current[index].play();
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-zinc-900 rounded-xl p-4 h-full shadow-md transition-colors duration-300">
      <h2 className="text-lg font-bold mb-4 text-zinc-900 dark:text-white">
        🎧 Now Playing
      </h2>

      <div className="max-h-[550px] overflow-y-auto space-y-3 pr-2 custom-scroll">
        {Array.isArray(songs) && songs.length > 0 ? (
          songs.map((song, index) => {
            const isActive = currentSongIndex === index;

            return (
              <div
                key={index}
                className={`flex flex-col p-3 rounded-md transition-all duration-200
                bg-white dark:bg-zinc-800
                ${
                  isActive
                    ? "ring-2 ring-pink-500 bg-gray-200 dark:bg-zinc-700"
                    : "hover:bg-gray-200 dark:hover:bg-zinc-700"
                }`}
              >
                {/* Top Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Icon */}
                    <div className="relative">
                      <svg
                        className={`w-12 h-12 rounded-md ${
                          isActive ? "animate-pulse" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 64 64"
                      >
                        <circle cx="32" cy="32" r="23" fill="#fd3c4f" />
                      </svg>

                      {isActive && isPlaying && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
                      )}
                    </div>

                    {/* Text */}
                    <div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                        {song.title}
                      </p>
                      <p className="text-xs text-gray-600 dark:text-zinc-400">
                        {song.artist}
                      </p>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex gap-2 items-center">
                    <audio
                      ref={(el) => (audioRefs.current[index] = el)}
                      src={song.audio}
                      className="hidden"
                      onWaiting={() => setLoadingIndex(index)}
                      onCanPlay={() => {
                        setLoadingIndex(null);
                        setIsPlaying(true);
                      }}
                      onPlaying={() => {
                        setLoadingIndex(null);
                        setIsPlaying(true);
                      }}
                      onEnded={() => {
                        setIsPlaying(false);
                        setCurrentSongIndex(null);
                        setLoadingIndex(null);
                      }}
                    />

                    <button
                      onClick={() => handlePlayPause(index)}
                      disabled={loadingIndex === index}
                      className={`
                      relative flex items-center justify-center
                      w-10 h-10 rounded-full
                      bg-gradient-to-br from-green-400 to-green-600
                      dark:from-green-500 dark:to-green-700
                      hover:from-green-300 hover:to-green-500
                      active:scale-90
                      transition-all duration-200
                      shadow-md hover:shadow-lg
                      disabled:opacity-50 disabled:cursor-not-allowed
                    `}
                    >
                      {loadingIndex === index ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : currentSongIndex === index && isPlaying ? (
                        <div className="flex gap-[3px]">
                          <span className="w-[3px] h-4 bg-white rounded-sm"></span>
                          <span className="w-[3px] h-4 bg-white rounded-sm"></span>
                        </div>
                      ) : (
                        <div className="ml-[2px] w-0 h-0 border-l-[10px] border-l-white border-y-[6px] border-y-transparent"></div>
                      )}
                    </button>
                  </div>
                </div>

                {/* Progress */}
                {isActive && (
                  <div className="mt-2 w-full h-1 bg-gray-300 dark:bg-zinc-600 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-green-400 ${
                        isPlaying ? "animate-[progress_5s_linear]" : ""
                      }`}
                    ></div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-500 dark:text-zinc-400 text-sm">
            No songs available
          </p>
        )}
      </div>
    </div>
  );
};

export default Songlist;