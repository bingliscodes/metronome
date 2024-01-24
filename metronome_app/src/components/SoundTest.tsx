//SoundTest.tsx
import React, { useState, useEffect, useContext } from "react";
import playClick from "../context/AudioContext";

const SoundTest: React.FC = () => {
  let testSound = "https://actions.google.com/sounds/v1/alarms/beep_short.ogg";
  let filePath = "/click2.mp3";
  let AC = new AudioContext();
  const handleClick = () => {
    playClick(AC, filePath);
  };
  return <button onClick={handleClick}>Play Test</button>;
};
export default SoundTest;
