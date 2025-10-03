import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';
import axios from "axios"

export default function FacialExpression({setsongs}) {
  const videoRef = useRef();
  const [expression, setExpression] = useState('No face detected');

  const loadModels = async () => {
    const MODEL_URL = '/models';
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
  console.error('Error accessing webcam:', err);
  alert('Please allow camera access in your browser settings.');
});

  };

  const detectMood = async () => {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    if (!detections || detections.length === 0) {
      console.log('No Face Detected');
      setExpression('No face detected');
      return;
    }

    let mostProbableExpression = 0;
    let _expression = '';

    for (const expression of Object.keys(detections[0].expressions)) {
      if (detections[0].expressions[expression] > mostProbableExpression) {
        mostProbableExpression = detections[0].expressions[expression];
        _expression = expression;
      }
    }

    console.log('Most Probable Expression:', _expression, mostProbableExpression.toFixed(2));
    setExpression(_expression);
  };

  // jo api hit krni ho
  // get http://localhost:3000/songs?mood=happy

useEffect(() => {
  if (!expression) return;
  const timeout = setTimeout(() => {
    axios.get(`http://localhost:3000/songs?mood=${expression}`)
      .then(res => setsongs(res.data.songs))
      .catch(console.error);
  }, 800); // wait 800ms after last change

  return () => clearTimeout(timeout);
}, [expression]);


  useEffect(() => {
    loadModels().then(() => {
      startVideo();
    });
  }, []);

  return (
    <div className="bg-amber-800 rounded-xl p-4 flex flex-col items-center gap-5 shadow-md">

           <div className="mt-4 px-4 py-4 bg-black text-white rounded-md text-center w-[80%]">
        Detected Expression: <span className="font-bold text-amber-400 capitalize">{expression}</span>
      </div>

      <video
        ref={videoRef}
        autoPlay
        muted
        className="rounded-lg w-full md:mt-5 h-[400px] object-cover"
      />
   
      <button
        onClick={detectMood}
        className=" px-4 py-2 bg-black text-white rounded-md hover:bg-zinc-700 transition-all md:my-3"
      >
        Detect Mood
      </button>
    </div>
  );
}
