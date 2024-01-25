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

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await axios.get<Exercise[]>(
          "http://localhost:5001/exercises"
        );
        setExercises(response.data);
      } catch (err: any) {}
    };

    fetchExercises();
  }, []);

  const handleSubmit = () => {};
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="ExerciseSelectForm">Select exercise from below</label>
        <select className="form-control" id="ExerciseSelectForm">
          {exercises.map((exercise) => (
            <option key={exercise._id}>{exercise.name}</option>
          ))}
        </select>
      </div>
    </form>
  );
};

export default ExerciseSelector;
