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

function addHistoryEntry(exercise: Exercise, newEntry: HistoryEntry): Exercise {
  return {
    ...exercise,
    history: [...exercise.history, newEntry],
  };
}

const ExerciseSelector = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const { timeSignatureTop } = useContext(TimeSignatureTopContext);
  const { timeSignatureBot } = useContext(TimeSignatureBotContext);
  const { bpm } = useContext(BpmContext);
  const [exerciseName, setExerciseName] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setExerciseName(e.target.value);
  };

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get<Exercise[]>(
          "http://localhost:5001/exercises"
        );
        setExercises(response.data);
      } catch (err: any) {
        console.log("there was an error getting the ecxercises.");
      }
    };

    fetchExercises();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const exerciseData = {
        name: exerciseName,
        history: [],
      };

      const response = await axios.post(
        "http://localhost:5001/exercisesWithHistory",
        exerciseData
      );
      console.log(response.data);
    } catch (error) {
      console.error("There was an error submitting the form:", error);
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
