import React, { useState } from "react";
import axios from "axios";

const AddSong = () => {
  const [form, setForm] = useState({
    title: "",
    artist: "",
    mood: "",
    audio: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "audio") {
      setForm({ ...form, audio: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", form.title);
    data.append("artist", form.artist);
    data.append("mood", form.mood);
    data.append("audio", form.audio);

    try {
      await axios.post("http://localhost:3000/songs", data);
      alert("Song Uploaded 🚀");
    } catch (err) {
      console.log(err);
      alert("Upload failed");
    }
  };





  return (
    <form onSubmit={handleSubmit} className="p-4 bg-zinc-800 rounded-xl">
      <input type="text" name="title" placeholder="Title" onChange={handleChange} className="block mb-2" />
      <input type="text" name="artist" placeholder="Artist" onChange={handleChange} className="block mb-2" />
      <input type="text" name="mood" placeholder="Mood (happy/sad)" onChange={handleChange} className="block mb-2" />
      <input type="file" name="audio" accept="audio/*" onChange={handleChange} className="block mb-2" />
      
      <button type="submit" className="bg-orange-500 px-4 py-2 rounded">
        Upload Song
      </button>
    </form>
  );
};

export default AddSong;