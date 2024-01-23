import React from "react";
import useMetronome from "../hooks/useMetronome";

const MetronomeControls = () => {
  const { isPlaying, toggleMetronome, bpm, setBpm } = useMetronome();

  return (
    <div>
      <button onClick={toggleMetronome}>{isPlaying ? "Stop" : "Start"}</button>
      <input
        type="number"
        value={bpm}
        onChange={(e) => setBpm(Number(e.target.value))}
      />
    </div>
  );
};

export default MetronomeControls;
