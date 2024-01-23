const playSound = (soundUrl: string) => {
  const audio = new Audio(soundUrl);
  audio.play().catch((e) => console.error("Error playing sound:", e));
};

export default playSound;
