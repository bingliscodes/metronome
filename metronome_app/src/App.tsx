import TempoControl from "./components/TempoControl.tsx";
import TimeSignatureControl from "./components/TimeSignatureControl.tsx";
import { MetronomeProvider } from "./context/MetronomeContext.tsx";
import StartStopButton from "./components/StartStopButton.tsx";
import MetronomeControls from "./components/MetronomeControls.tsx";
import SoundTest from "./components/SoundTest.tsx";
import "./App.css";

const App: React.FC = () => {
  return (
    <MetronomeProvider>
      <div className="App">
        <SoundTest />
      </div>
    </MetronomeProvider>
  );
};

export default App;
