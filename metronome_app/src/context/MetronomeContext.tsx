import { createContext, Dispatch, SetStateAction } from "react";

interface BpmContextType {
  bpm: number;
  setBpm: Dispatch<SetStateAction<number>>;
}
export const BpmContext = createContext<BpmContextType>({
  bpm: 120,
  setBpm: () => {},
});

interface IsPlayingContextType {
  isPlaying: boolean;
  setIsPlaying: Dispatch<SetStateAction<boolean>>;
}
export const IsPlayingContext = createContext<IsPlayingContextType>({
  isPlaying: false,
  setIsPlaying: () => {},
});

interface TimeSignatureContextTopType {
  timeSignatureTop: number;
  setTimeSignatureTop: Dispatch<SetStateAction<number>>;
}
export const TimeSignatureTopContext =
  createContext<TimeSignatureContextTopType>({
    timeSignatureTop: 4,
    setTimeSignatureTop: () => {},
  });

interface TimeSignatureContextBotType {
  timeSignatureBot: number;
  setTimeSignatureBot: Dispatch<SetStateAction<number>>;
}
export const TimeSignatureBotContext =
  createContext<TimeSignatureContextBotType>({
    timeSignatureBot: 4,
    setTimeSignatureBot: () => {},
  });
