import { useMetronome } from "../context/MetronomeContext";
import useAudioContext from "../hooks/useAudioContext";

interface StartStopButtonProps {
  // Define props here if needed
}

const StartStopButton: React.FC<StartStopButtonProps> = (props) => {
  const { isPlaying, setIsPlaying } = useMetronome();
  const { startOscillator, stopOscillator } = useAudioContext();

  const handleIsPlayingChange = (newIsPlaying: boolean) => {
    setIsPlaying(newIsPlaying);
    if (isPlaying) {
      startOscillator();
    } else {
      stopOscillator();
    }
  };

  return (
    <div>
      <button onClick={() => handleIsPlayingChange(!isPlaying)}>play</button>
    </div>
  );
};

export default StartStopButton;
