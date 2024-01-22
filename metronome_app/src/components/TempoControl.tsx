import React, { useState } from "react";
import { useMetronome } from "../context/MetronomeContext";

interface TempoControlProps {
  // Define props here if needed
}

const TempoControl: React.FC<TempoControlProps> = (props) => {
  const { bpm, setBpm } = useMetronome();

  const handleBpmChange = (newBpm: number) => {
    setBpm(newBpm);
  };
  return (
    <div>
      <button onClick={() => handleBpmChange(bpm - 1)}>-</button>
      <input
        type="number"
        value={bpm}
        onChange={(e) => handleBpmChange(parseInt(e.target.value, 10))}
      />
      <button onClick={() => handleBpmChange(bpm + 1)}>+</button>
    </div>
  );
};

export default TempoControl;
