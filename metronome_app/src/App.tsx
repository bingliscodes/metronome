import TempoControl from "./components/TempoControl.tsx";
import TimeSignatureControl from "./components/TimeSignatureControl.tsx";
import React, { useState } from "react";
import StartStopButton from "./components/StartStopButton.tsx";
import "./App.css";

function App() {
  const [bpm, setBpm] = useState<number>(120);
  return (
    <div>
      <StartStopButton bpm={bpm} />
      <TempoControl bpm={bpm} setBpm={setBpm} />
      <TimeSignatureControl />
    </div>
  );
}

export default App;
