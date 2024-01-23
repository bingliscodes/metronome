import TempoControl from "./components/TempoControl.tsx";
import TimeSignatureControl from "./components/TimeSignatureControl.tsx";
import React, { useState } from "react";
import StartStopButton from "./components/StartStopButton.tsx";
import "./App.css";
import MetronomeContext from "./context/MetronomeContext.tsx";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const value = { isPlaying, setIsPlaying };
  const [bpm, setBpm] = useState<number>(120);
  return (
    <div>
      <MetronomeContext.Provider value={value}>
        <StartStopButton bpm={bpm} />
        <TempoControl bpm={bpm} setBpm={setBpm} />
        <TimeSignatureControl />
      </MetronomeContext.Provider>
    </div>
  );
}

export default App;
