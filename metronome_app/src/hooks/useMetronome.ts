import { useState, useEffect, useCallback } from 'react';

const useMetronome = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [bpm, setBpm] = useState(120);
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
    const [tickBuffer, setTickBuffer] = useState<AudioBuffer | null>(null);
    const [intervalId, setIntervalId] = useState<number | null>(null);  // State to store the interval ID


    // Load the tick sound
    useEffect(() => {
        fetch('metronome_app/src/assets/click2.mp3')
            .then((response) => response.arrayBuffer())
            .then(arrayBuffer => {
                console.log('Audio file fetched, ArrayBuffer:', arrayBuffer);
                audioContext.decodeAudioData(arrayBuffer);
            })
            .then(audioBuffer => {
                console.log('Audio file decoded successfully:', audioBuffer);
                setTickBuffer(audioBuffer); // Assuming you're setting state here
            })
            .catch((error) => console.error('Error loading metronome tick sound:', error));
    }, [audioContext]);

    // Function to play the tick sound
    const playTick = useCallback(() => {
        if (audioContext && tickBuffer) {
            const tickSource = audioContext.createBufferSource();
            tickSource.buffer = tickBuffer;
            tickSource.connect(audioContext.destination);
            tickSource.start();
        }
    }, [audioContext, tickBuffer]);

    // Toggle the metronome on and off
    const toggleMetronome = useCallback(() => {
        setIsPlaying((prevIsPlaying) => {
            if (!prevIsPlaying) {
                const interval = (60 / bpm) * 1000;
                const id = setInterval(playTick, interval);
                setIntervalId(id);  // Store the interval ID
                return true;
            } else {
                if (intervalId !== null) {
                    clearInterval(intervalId);
                    setIntervalId(null);
                }
                return false;
            }
        });
    }, [bpm, playTick, intervalId]);

    return { isPlaying, toggleMetronome, bpm, setBpm };
};

export default useMetronome;
