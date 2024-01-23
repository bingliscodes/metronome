import React, { useState, useEffect, useContext } from "react";
import playSound from "./playSound.tsx";
import click2 from "./click2.mp3";
import MetronomeContext from "../context/MetronomeContext.tsx";

const SoundTest: React.FC = () => {
  const { isPlaying, setIsPlaying } = useContext(MetronomeContext);
  const handleClick = () => {
    if (isPlaying) {
      const interval = setInterval(() => {
        playSound(click2);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      console.log("cannot play. isPlaying is", isPlaying);
    }
  };
  return <button onClick={handleClick}>Play Test</button>;
};
export default SoundTest;
