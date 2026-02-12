import React, { useState, useRef } from "react";

const Songlist = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRefs = useRef([]);

  const handlePlayPause = (index) => {
    if (currentSongIndex === index) {
      // same song clicked → toggle play/pause
      if (isPlaying) {
        audioRefs.current[index].pause();
        setIsPlaying(false);
      } else {
        audioRefs.current[index].play();
        setIsPlaying(true);
      }
    } else {
      // pause all others
      audioRefs.current.forEach((audio) => audio?.pause());

      // play the new song
      audioRefs.current[index].play();
      setCurrentSongIndex(index);
      setIsPlaying(true);
    }
  };

  return (
    <div className="bg-zinc-800 rounded-xl p-4 h-full shadow-md">
      <h2 className="text-lg font-bold mb-4">🎵 Songs</h2>
      <div className="max-h-[550px] overflow-y-auto space-y-3 pr-2 custom-scroll">
        {Array.isArray(songs) && songs.length > 0 ? (
          songs.map((song, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-zinc-700 p-3 rounded-md hover:bg-zinc-600 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <svg
                  className="w-12 h-12 object-cover rounded-md"
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="64"
                  height="64"
                  viewBox="0 0 64 64"
                >
                  <circle cx="32" cy="32" r="23" fill="#fd3c4f"></circle>
                  <ellipse
                    cx="32"
                    cy="61"
                    opacity=".3"
                    rx="19"
                    ry="3"
                  ></ellipse>
                  <path
                    fill="#fff"
                    d="M32,14c2.577,0,4.674-1.957,4.946-4.461C35.352,9.19,33.699,9,32,9 C19.297,9,9,19.297,9,32c0,1.699,0.19,3.352,0.539,4.946C12.044,36.674,14,34.577,14,32C14,22.075,22.075,14,32,14z"
                    opacity=".3"
                  ></path>
                  <path
                    fill="none"
                    stroke="#fff"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-miterlimit="10"
                    stroke-width="3"
                    d="M15.047,23.427c1.878-3.699,4.932-6.705,8.666-8.522"
                  ></path>
                  <path
                    d="M54.461,27.054C51.956,27.326,50,29.423,50,32c0,9.925-8.075,18-18,18 c-2.577,0-4.674,1.957-4.946,4.461C28.648,54.81,30.301,55,32,55c12.703,0,23-10.297,23-23C55,30.301,54.81,28.648,54.461,27.054z"
                    opacity=".15"
                  ></path>
                  <path
                    fill="#fff"
                    d="M45.001,20.991c0-1.544-1.393-2.712-2.913-2.444l-15.039,2.71c-1.186,0.209-2.05,1.24-2.05,2.444	v9.973c0,0.648-0.604,1.116-1.234,0.966c-0.771-0.184-1.604-0.205-2.467-0.019c-2.087,0.451-3.771,2.146-4.187,4.241	c-0.703,3.532,1.981,6.63,5.387,6.63c3.038,0,5.5-2.462,5.5-5.5c0-0.04-0.005-0.078-0.006-0.117v-11.22l14.008-2.505L42,31.674	c0,0.648-0.604,1.116-1.234,0.966c-0.771-0.184-1.604-0.206-2.467-0.019c-2.088,0.451-3.771,2.146-4.188,4.24	c-0.703,3.532,1.98,6.63,5.387,6.63c3.026,0,5.48-2.445,5.498-5.467l0.004,0.006V20.991z"
                  ></path>
                </svg>

                <div>
                  <p className="text-sm font-semibold">{song.title}</p>
                  <p className="text-xs text-zinc-300">{song.artist}</p>
                </div>
              </div>

              <div className="flex gap-2 justify-center items-center">
                <audio
                  ref={(el) => (audioRefs.current[index] = el)}
                  src={song.audio}
                  className="hidden"
                  onEnded={() => {
                    setIsPlaying(false);
                    setCurrentSongIndex(null);
                  }}
                />
                <button
                  onClick={() => handlePlayPause(index)}
                  className="text-white transition-all text-lg cursor-pointer active:scale-95"
                >
                  {currentSongIndex === index && isPlaying ? "⏸️" : "▶"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-zinc-400 text-sm">No songs available</p>
        )}
      </div>
    </div>
  );
};

export default Songlist;