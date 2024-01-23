import React, { useState } from "react";

interface TempoControlProps {
  bpm: number;
  setBpm: React.Dispatch<React.SetStateAction<number>>;
}

const TempoControl: React.FC<TempoControlProps> = ({ bpm, setBpm }) => {
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
