import React, { useState, useEffect } from "react";
import Songlist from "./components/Songlist";
import FacialExpression from "./components/FacialExpression";
import AddSong from "./components/AddSong";

const App = () => {
  const [songs, setsongs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isDark, setIsDark] = useState(true);

useEffect(() => {
  fetch("https://moody-player-database.onrender.com/songs?mood=neutral")
    .then(res => res.json())
    .then(data => setsongs(data.songs))
    .catch(err => console.log(err));
}, []);

  // Load saved theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDark(savedTheme === "dark");
    }
  }, []);

  // Save theme
  useEffect(() => {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }, [isDark]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className={isDark ? "dark" : ""}>
      <div
        className={`min-h-screen transition-colors duration-500 ${isDark ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-900"} font-sans`}
      >
        {/* Dynamic Background Blur (Image Style) */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 blur-[120px] rounded-full"></div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <header className="px-6 py-4 flex items-center justify-between backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-tr from-orange-500 to-red-600 rounded-lg shadow-lg"></div>
              <h1 className="text-xl font-bold tracking-tight">Moody Player</h1>
            </div>

            <div className="flex items-center gap-4">
              {/* ADD SONG BUTTON */}
              <button
                onClick={() => setShowForm(!showForm)}
                className="px-3 py-1 bg-orange-500 rounded-md text-sm hover:scale-105 transition"
              >
                ➕ Add Song
              </button>

              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-all border border-white/10"
              >
                {isDark ? "☀️" : "🌙"}
              </button>

              <img
                className="h-10 w-10 rounded-full border-2 border-orange-500/50 p-0.5"
                src="https://img.icons8.com/color/48/circled-user-male-skin-type-3--v1.png"
                alt="user"
              />
            </div>
          </header>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-[450px]">
              <FacialExpression setsongs={setsongs} />
            </div>
            <div className="flex-1">
              <Songlist songs={songs} />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
