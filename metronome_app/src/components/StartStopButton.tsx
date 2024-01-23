import React, { useState, useContext, useEffect } from "react";
import click2 from "./click2.mp3";

interface StartStopButtonProps {
  bpm: number;
}

const StartStopButton: React.FC<StartStopButtonProps> = ({ bpm }) => {
  let intervalMs = (60 / bpm) * 1000;
  const audio = new Audio(click2);

  const [isPlaying, setIsPlaying] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
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
