import TempoControl from "./components/TempoControl.tsx";
import TimeSignatureControl from "./components/TimeSignatureControl.tsx";
import { MetronomeProvider } from "./context/MetronomeContext.tsx";
import "./App.css";

const App: React.FC = () => {
  return (
    <MetronomeProvider>
      <div className="App">
        <TempoControl />
        <TimeSignatureControl />
      </div>
    </MetronomeProvider>
  );
};

export default App;
