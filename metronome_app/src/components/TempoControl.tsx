import React, { useContext } from "react";
import { BpmContext } from "../context/MetronomeContext";

const TempoControl: React.FC = () => {
  const { bpm, setBpm } = useContext(BpmContext);

  const handleBpmChange = (newBpm: number) => {
    setBpm(newBpm);
  };
  return (
    <div>
      <button className="btn btn-dark" onClick={() => handleBpmChange(bpm - 1)}>
        -
      </button>
      <input
        type="number"
        value={bpm}
        onChange={(e) => handleBpmChange(parseInt(e.target.value, 10))}
      />
      <button className="btn btn-dark" onClick={() => handleBpmChange(bpm + 1)}>
        +
      </button>
    </div>
  );
};

export default TempoControl;
