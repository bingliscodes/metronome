import React, { useState, useContext } from "react";
import axios from "axios";
import {
  BpmContext,
  TimeSignatureTopContext,
  TimeSignatureBotContext,
} from "../context/MetronomeContext";

const ExerciseForm: React.FC = () => {
  const [exerciseName, setExerciseName] = useState<string>("");
  const { timeSignatureTop } = useContext(TimeSignatureTopContext);
  const { timeSignatureBot } = useContext(TimeSignatureBotContext);
  const { bpm } = useContext(BpmContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExerciseName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const exerciseData = {
        name: exerciseName,
        bpm: bpm,
        timeSignatureTop: timeSignatureTop,
        timeSignatureBot: timeSignatureBot,
        datePracticed: new Date().toISOString(),
      };

      const response = await axios.post(
        "http://localhost:5001/exercises",
        exerciseData
      );
      console.log(response.data);
      setExerciseName(""); // Clear the form after successful submission
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={exerciseName}
        onChange={handleChange}
        placeholder="Exercise Name"
      />
      <button type="submit">Add Exercise</button>
    </form>
  );
};

export default ExerciseForm;
