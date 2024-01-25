import React, { useContext } from "react";
import { BpmContext } from "../context/MetronomeContext";
import "./TempoControl.css";

const TempoControl: React.FC = () => {
  const { bpm, setBpm } = useContext(BpmContext);

  const handleBpmChange = (newBpm: number) => {
    setBpm(newBpm);
  };
  return (
    <div className="tempo-control">
      <button className="tempo-btn" onClick={() => handleBpmChange(bpm - 1)}>
        -
      </button>
      <input
        className="tempo-input"
        type="number"
        value={bpm}
        onChange={(e) => handleBpmChange(parseInt(e.target.value, 10))}
      />
      <button className="tempo-btn" onClick={() => handleBpmChange(bpm + 1)}>
        +
      </button>
    </div>
  );
};

export default TempoControl;
