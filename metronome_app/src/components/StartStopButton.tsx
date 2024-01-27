import React, { useState, useContext, useEffect, useRef } from "react";
import {
  BpmContext,
  TimeSignatureTopContext,
  TimeSignatureBotContext,
  IsPlayingContext,
} from "../context/MetronomeContext";

const StartStopButton: React.FC = () => {
  const { timeSignatureTop } = useContext(TimeSignatureTopContext);
  const { timeSignatureBot } = useContext(TimeSignatureBotContext);
  const { bpm } = useContext(BpmContext);
  const { isPlaying, setIsPlaying } = useContext(IsPlayingContext);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const schedulerIdRef = useRef<number | null>(null);

  const preloadAudio = async (url: string) => {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const decodedData = await audioContextRef.current?.decodeAudioData(
        arrayBuffer
      );

      if (decodedData) {
        audioBufferRef.current = decodedData;
      } else {
        console.error("Failed to decode audio data");
        audioBufferRef.current = null;
      }
    } catch (error) {
      console.error("Error preloading audio:", error);
      audioBufferRef.current = null;
    }
  };

  useEffect(() => {
    audioContextRef.current = new AudioContext();
    preloadAudio("/click2.mp3");

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext();
    }

    const scheduleBeats = () => {
      if (!audioContextRef.current || !audioBufferRef.current) return;

      while (
        isPlaying &&
        nextNoteTimeRef.current < audioContextRef.current.currentTime + 0.1
      ) {
        const source = audioContextRef.current.createBufferSource();
        source.buffer = audioBufferRef.current;
        source.connect(audioContextRef.current.destination);
        source.start(nextNoteTimeRef.current);
        nextNoteTimeRef.current += 60 / bpm;
      }

      if (isPlaying) {
        schedulerIdRef.current = window.setTimeout(scheduleBeats, 25);
      }
    };

    if (isPlaying) {
      nextNoteTimeRef.current = audioContextRef.current.currentTime;
      scheduleBeats();
    } else {
      if (schedulerIdRef.current !== null) {
        clearTimeout(schedulerIdRef.current);
      }
    }

    return () => {
      if (schedulerIdRef.current !== null) {
        clearTimeout(schedulerIdRef.current);
      }
    };
  }, [isPlaying, bpm]);

  const startPlaying = () => {
    setIsPlaying(true);
  };

  const stopPlaying = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <button className="btn btn-dark btn-lg" onClick={startPlaying}>
        Start
      </button>
      <button className="btn btn-dark btn-lg" onClick={stopPlaying}>
        Stop
      </button>
    </div>
  );
};

export default StartStopButton;
