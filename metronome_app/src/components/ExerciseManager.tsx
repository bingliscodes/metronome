//ExerciseManager.tsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import ExerciseHistory from "./ExerciseHistory";
import {
  BpmContext,
  TimeSignatureTopContext,
  TimeSignatureBotContext,
} from "../context/MetronomeContext";

export interface HistoryEntry {
  bpm: number;
  date: Date; // or Date, if you prefer to work with Date objects
  timeSignatureTop: number;
  timeSignatureBot: number;
}

export interface Exercise {
  _id: string;
  name: string;
  history: HistoryEntry[];
}

const ExerciseManager: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState<string>("");
  const [exerciseName, setExerciseName] = useState<string>("");
  const [exerciseHistory, setExerciseHistory] = useState<HistoryEntry[]>([]);
  const { bpm } = useContext(BpmContext);
  const { timeSignatureTop } = useContext(TimeSignatureTopContext);
  const { timeSignatureBot } = useContext(TimeSignatureBotContext);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get<Exercise[]>(
          "http://localhost:5001/exercises"
        );
        setExercises(response.data);
      } catch (err: any) {
        console.log("there was an error getting the exercises.");
      }
    };

    fetchExercises();
  }, []);

  const handleExerciseChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setExerciseName(e.target.value);
    const selectedExercise = exercises.find(
      (exercise) => exercise.name === e.target.value
    );
    if (selectedExercise) {
      setSelectedExerciseId(selectedExercise._id);

      try {
        const response = await axios.get(
          `http://localhost:5001/exercises/history/${selectedExercise._id}`
        );
        //store the history of the selected exercise as a state. Now we can access this and display it
        const history = response.data.history;
        setExerciseHistory(history);
      } catch (error) {
        console.error("Error fetching exercise history:", error);
      }
    }
    const selectedId = exercises.find(
      (exercise) => exercise.name === e.target.value
    )?._id;
    setSelectedExerciseId(selectedId || "");
  };

  const handleExerciseNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExerciseName(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedExerciseId) {
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
        //console.log(selectedExerciseId);
        //console.log(response.data);
        // Optionally, you can fetch the exercises again to update the UI
      } catch (error) {
        console.error(
          "There was an error updating the exercise history:",
          error
        );
      }
    } else {
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
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Exercise Name Input */}
        <input
          type="text"
          value={exerciseName}
          onChange={handleExerciseNameChange}
          placeholder="Enter new exercise name or select below"
        />

        {/* Other form fields for BPM, Time Signature, etc. */}

        {/* Dropdown for selecting existing exercise */}
        <select onChange={handleExerciseChange}>
          <option value="">Select an Exercise</option>
          {exercises.map((exercise) => (
            <option key={exercise._id} value={exercise.name}>
              {exercise.name}
            </option>
          ))}
        </select>

        {/* Submit button */}
        <button type="submit">
          {selectedExerciseId ? "Update Exercise" : "Add New Exercise"}
        </button>
      </form>
      <ExerciseHistory history={exerciseHistory} />
    </div>
  );
};

export default ExerciseManager;
