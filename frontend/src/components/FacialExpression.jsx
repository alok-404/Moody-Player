import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import axios from "axios";

export default function FacialExpression({ setsongs }) {
  const videoRef = useRef();
  const [expression, setExpression] = useState("Ready to Scan");
  const [isCamOn, setIsCamOn] = useState(false);

  const API =
    window.location.hostname === "localhost"
      ? "http://localhost:3000"
      : "https://moody-player-database.onrender.com";

  const loadModels = async () => {
    const MODEL_URL = "/models";
    await Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
      faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
    ]);
  };

  const toggleCamera = () => {
    if (isCamOn) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach((track) => track.stop());
      setIsCamOn(false);
    } else {
      startVideo();
    }
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsCamOn(true);
        }
      })
      .catch((err) => alert("Camera Access Denied"));
  };

  const detectMood = async () => {
    if (!isCamOn)
      return alert("Pehle camera on karein! (click on start cam button)");
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (detections?.length > 0) {
      const moods = detections[0].expressions;
      const topMood = Object.keys(moods).reduce((a, b) =>
        moods[a] > moods[b] ? a : b,
      );
      setExpression(topMood);
    }
  };

  useEffect(() => {
    loadModels();
  }, []);

  useEffect(() => {
    if (expression === "Ready to Scan" || !expression) return;

    axios

      .get(`${API}/songs?mood=${expression}`)
      .then((res) => setsongs(res.data.songs))
      .catch(console.error);
  }, [expression]);

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 shadow-2xl overflow-hidden relative">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-medium opacity-70">Mood Analysis</h3>
        <button
          onClick={toggleCamera}
          className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${isCamOn ? "bg-red-500/20 text-red-400" : "bg-green-500/20 text-green-400"}`}
        >
          {isCamOn ? "STOP CAM" : "START CAM"}
        </button>
      </div>

      <div className="relative group">
        <video
          ref={videoRef}
          autoPlay
          muted
          className={`rounded-2xl w-full h-[320px] object-cover bg-black/40 transition-all ${!isCamOn && "opacity-20"}`}
        />

        {isCamOn && (
          <div className="absolute inset-0 border-2 border-orange-500/30 rounded-2xl pointer-events-none animate-pulse"></div>
        )}
      </div>

      <div className="mt-6 flex flex-col items-center gap-4">
        <div className="text-center">
          <p className="text-xs uppercase tracking-widest opacity-50 mb-1">
            Detected Vibe
          </p>
          <h2 className="text-3xl font-bold text-orange-400 capitalize">
            {expression}
          </h2>
        </div>

        <button
          onClick={detectMood}
          className="w-full py-4 bg-orange-600 hover:bg-orange-500 rounded-2xl font-bold shadow-lg shadow-orange-900/20 transition-all active:scale-95"
        >
          Scan My Mood
        </button>
      </div>
    </div>
  );
}
