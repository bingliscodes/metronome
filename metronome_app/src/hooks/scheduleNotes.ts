//scheduleNotes.ts
import playClick from "../context/AudioContext";

export const scheduleNotes = (isPlaying: boolean, AC: AudioContext, bpm: number, timerID: number | undefined, nextNoteTime:number) => {
    const scheduleNextNote = () => {
        const secondsPerBeat = 60.0 / bpm;
        nextNoteTime += secondsPerBeat;
        playClick(AC, '/click2.mp3');

    }
    if(isPlaying){return;}

    while (nextNoteTime < AC.currentTime + 0.1){
        scheduleNextNote();
    }
    timerID = setTimeout(() => scheduleNotes(isPlaying, AC, bpm, timerID, nextNoteTime), 25);
}

import React, { useState, useEffect, useRef, useContext } from 'react';
import { BpmContext, IsPlayingContext } from '../context/MetronomeContext';

const StartStopButton: React.FC = () => {
  const { bpm } = useContext(BpmContext);
  const { isPlaying, setIsPlaying } = useContext(IsPlayingContext);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBufferRef = useRef<AudioBuffer | null>(null);
  const nextNoteTimeRef = useRef<number>(0);
  const schedulerIdRef = useRef<number | null>(null);

  // Function to preload audio
  const preloadAudio = async (url: string) => {
    try {
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      audioBufferRef.current = await audioContextRef.current?.decodeAudioData(arrayBuffer);
    } catch (error) {
      console.error('Error preloading audio:', error);
    }
  };

  useEffect(() => {
    audioContextRef.current = new AudioContext();
    preloadAudio('/click2.mp3');

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    const scheduleBeats = () => {
      if (!audioContextRef.current || !audioBufferRef.current) return;

      while (isPlaying && nextNoteTimeRef.current < audioContextRef.current.currentTime + 0.1) {
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
      <button className="btn btn-dark" onClick={startPlaying}>Start</button>
      <button className="btn btn-dark" onClick={stopPlaying}>Stop</button>
    </div>
  );
};

export default StartStopButton;
