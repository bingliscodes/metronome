import { createContext } from "react";

const MetronomeContext = createContext({
  isPlaying: false,
  setIsPlaying: (isPlaying: boolean) => {},
});

export default MetronomeContext;
