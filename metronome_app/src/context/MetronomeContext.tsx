import { createContext } from "react";

export const TimeSignatureTopContext = createContext<number>(4);
export const TimeSignatureBotContext = createContext<number>(4);
export const BpmContext = createContext<number>(120);
export const IsPlayingContext = createContext<boolean>(false);
