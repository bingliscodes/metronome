import React from "react";
import playSound from "./playSound.tsx";
import click2 from "./click2.mp3";

const SoundTest: React.FC = () => {
  const handleClick = () => {
    console.log("playing click");
    playSound(click2);
  };

  return (
    <div>
      <button onClick={handleClick}> Play Sound </button>
    </div>
  );
};

export default SoundTest;
