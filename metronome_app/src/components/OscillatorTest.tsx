import useAudioContext from "../hooks/useAudioContext";
const OscillatorTest = () => {
  // Assuming you have hooks or services to control the oscillator
  const { startOscillator, stopOscillator } = useAudioContext();

  return (
    <div>
      <button onClick={() => startOscillator(440)}>Start</button>
      <button onClick={stopOscillator}>Stop</button>
      {/* Include visual feedback or console logs in these methods */}
    </div>
  );
};

export default OscillatorTest;
