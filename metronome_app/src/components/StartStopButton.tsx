import React, { useState, useContext, useEffect } from "react";
import click2 from "./click2.mp3";
import {
  BpmContext,
  TimeSignatureTopContext,
  TimeSignatureBotContext,
} from "../context/MetronomeContext";

const StartStopButton: React.FC = () => {
  const timeSignatureTop = useContext(TimeSignatureTopContext);
  const timeSignatureBot = useContext(TimeSignatureBotContext);
  const { bpm, setBpm } = useContext(BpmContext);

  let intervalMs = (60 / bpm) * 1000;
  const audio = new Audio(click2);

  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  //const { isPlaying, setIsPlaying } = useContext(MetronomeContext);
  useEffect(() => {
    if (isPlaying) {
      // Start playing
      const id = setInterval(() => {
        //console.log("Playing metronome. BPM is", { bpm });
        audio.play().catch((e) => console.error("Error playing sound:", e));
      }, intervalMs);
      setIntervalId(id);
    } else if (intervalId) {
      // Stop playing
      clearInterval(intervalId);
      setIntervalId(null);
    }
  }, [isPlaying]); // Effect runs when isPlaying changes

  const startPlaying = () => {
    setIsPlaying(true);
    console.log(timeSignatureTop, ":", timeSignatureBot);
    console.log("intervalMs is", intervalMs);
    console.log("bpm is", bpm);
  };

  const stopPlaying = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <button onClick={startPlaying}>Start</button>
      <button onClick={stopPlaying}>Stop</button>
    </div>
  );
};

export default StartStopButton;
