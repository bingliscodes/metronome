import React, { createContext, useState, useContext, ReactNode } from "react";

interface MetronomeContextData {
  bpm: number;
  setBpm: (bpm: number) => void;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

const MetronomeContext = createContext<MetronomeContextData | undefined>(
  undefined
);

export const useMetronome = () => {
  const context = useContext(MetronomeContext);
  if (context === undefined) {
    throw new Error("useMetronome must be used within a MetronomeProvider");
  }
  return context;
};

interface MetronomeProviderProps {
  children: ReactNode;
}

export const MetronomeProvider: React.FC<MetronomeProviderProps> = ({
  children,
}) => {
  const [bpm, setBpm] = useState<number>(120);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const value = {
    bpm,
    setBpm,
    isPlaying,
    setIsPlaying,
  };
  return (
    <MetronomeContext.Provider value={value}>
      {children}
    </MetronomeContext.Provider>
  );
};
