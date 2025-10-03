import React from 'react';
import Songlist from './components/Songlist';
import FacialExpression from './components/FacialExpression';
import { useState } from 'react';
// import song from '../../backend/src/models/song.model';

const App = () => {

    const [songs , setsongs] = useState([]);


  return (
    <div className="min-h-screen bg-zinc-300 text-white">
      {/* Header */}
      <div className="header bg-black px-5 py-3 flex items-center justify-between shadow-lg">
        <img
          className="h-[50px] w-[50px]"
          src="https://img.icons8.com/clouds/100/mac-os.png"
          alt="mac-os"
        />
        <h1 className="text-2xl font-bold text-white">Moddy Player</h1>
        <div className="right-header flex gap-2">
          <img
            className="h-[38px] w-[38px] bg-white rounded-full cursor-pointer hover:bg-sky-600 transition-all"
            src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/external-dark-lighting-flaticons-lineal-color-flat-icons.png"
            alt="theme-toggle"
          />
          <img
            className="h-[40px] w-[40px] cursor-pointer hover:scale-105 transition-all"
            src="https://img.icons8.com/color/48/circled-user-male-skin-type-3--v1.png"
            alt="user"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row">
        {/* Left - Facial Expression */}
        <div className="w-full md:w-1/2 p-4">
          <FacialExpression setsongs = {setsongs}/>
        </div>

        {/* Right - Song List */}
        <div className="w-full md:w-1/2 p-4">
          <Songlist songs = {songs} />
        </div>
      </div>
    </div>
  );
};

export default App;
