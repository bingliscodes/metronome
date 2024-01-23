import { useState, useEffect, useCallback } from 'react';
import { useMetronome } from "../context/MetronomeContext";

const useAudioContext = () => {
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [oscillator, setOscillator] = useState<OscillatorNode | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const {bpm} = useMetronome();
    const [metronomeInterval, setMetronomeInterval] = useState<number | null>(null);


    useEffect(() => {
        const newAudioContext = new (window.AudioContext || window.webkitAudioContext)();
        setAudioContext(newAudioContext);

        return () => {
            if (oscillator) {
                oscillator.stop();
                oscillator.disconnect();
            }
            newAudioContext.close();
        };
    }, []);

    const startOscillator = useCallback(() => {
        if (audioContext && !oscillator) {
            console.log('Starting oscillator');
            const newOscillator = audioContext.createOscillator();
            newOscillator.type = 'sine';
            newOscillator.frequency.setValueAtTime(440, audioContext.currentTime);
            newOscillator.connect(audioContext.destination);
            newOscillator.start();
            setOscillator(newOscillator);
            setIsPlaying(true);
        }
    }, [audioContext, oscillator]);

    const stopOscillator = useCallback(() => {
        console.log('Stopping oscillator');
        if (oscillator) {
            oscillator.stop();
            oscillator.disconnect();
            setOscillator(null);
            setIsPlaying(false);
        }
    }, [oscillator]);

    return { audioContext, oscillator, isPlaying, startOscillator, stopOscillator };
};

export default useAudioContext;
