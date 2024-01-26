//ExerciseSelector.tsx
import React, { useState, useContext, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import {
  BpmContext,
  TimeSignatureTopContext,
  TimeSignatureBotContext,
} from "../context/MetronomeContext";

interface HistoryEntry {
  bpm: number;
  date: Date; // or Date, if you prefer to work with Date objects
  timeSignatureTop: number;
  timeSignatureBot: number;
}

interface Exercise {
  _id: string;
  name: string;
  history: HistoryEntry[];
}

const ExerciseSelector = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>("");
  const { timeSignatureTop } = useContext(TimeSignatureTopContext);
  const { timeSignatureBot } = useContext(TimeSignatureBotContext);
  const { bpm } = useContext(BpmContext);
  const [exerciseName, setExerciseName] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {};

  useEffect(() => {}, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newEntry: HistoryEntry = {
      bpm: bpm,
      date: new Date(),
      timeSignatureTop: timeSignatureTop,
      timeSignatureBot: timeSignatureBot,
    };
    console.log(newEntry);
    if (!selectedExerciseId) {
      console.error("No exercise selected");
      return;
    }
    try {
      // Update the history of the selected exercise
      const response = await axios.put(
        `http://localhost:5001/exercises/${selectedExerciseId}`,
        { newEntry }
      );
      console.log(selectedExerciseId);
      console.log(response.data);
      // Optionally, you can fetch the exercises again to update the UI
    } catch (error) {
      console.error("There was an error updating the exercise history:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="ExerciseSelectForm">Select exercise from below</label>
        <select
          className="form-control"
          id="ExerciseSelectForm"
          onChange={handleChange}
        >
          {exercises.map((exercise) => (
            <option key={exercise._id} value={exercise.name}>
              {exercise.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Update Exercise History</button>
    </form>
  );
};

export default ExerciseSelector;
