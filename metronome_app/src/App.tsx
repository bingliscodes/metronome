import TempoControl from "./components/TempoControl.tsx";
import TimeSignatureControl from "./components/TimeSignatureControl.tsx";
import React, { useState } from "react";
import StartStopButton from "./components/StartStopButton.tsx";
import {
  TimeSignatureTopContext,
  TimeSignatureBotContext,
  BpmContext,
  IsPlayingContext,
} from "./context/MetronomeContext.tsx";
import "./App.css";
import ExerciseList from "./components/ExerciseList.tsx";
import ExerciseManager from "./components/ExerciseManager.tsx";

function App() {
  const [timeSignatureTop, setTimeSignatureTop] = useState<number>(4);
  const [timeSignatureBot, setTimeSignatureBot] = useState<number>(4);
  const [bpm, setBpm] = useState<number>(120);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  return (
    <div>
      <TimeSignatureTopContext.Provider
        value={{ timeSignatureTop, setTimeSignatureTop }}
      >
        <TimeSignatureBotContext.Provider
          value={{ timeSignatureBot, setTimeSignatureBot }}
        >
          <BpmContext.Provider value={{ bpm, setBpm }}>
            <IsPlayingContext.Provider value={{ isPlaying, setIsPlaying }}>
              <StartStopButton />
              <TempoControl />
              <TimeSignatureControl />
              <ExerciseManager />
              <ExerciseList />
            </IsPlayingContext.Provider>
          </BpmContext.Provider>
        </TimeSignatureBotContext.Provider>
      </TimeSignatureTopContext.Provider>
    </div>
  );
}

export default App;
