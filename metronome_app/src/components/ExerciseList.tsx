//ExerciseList.tsx to display data
import React, { useState, useEffect } from "react";
import axios from "axios";

interface Exercise {
  _id: string;
  name: string;
  bpm: number;
  timeSignatureTop: number;
  timeSignatureBot: number;
  datePracticed: Date;
}

//functional component to return a row given an exercise. This allows us to handle front-end and back-end deletion simultaneously
const ExerciseRow = ({ exercise, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5001/exercises/${exercise._id}`);
      onDelete(exercise._id);
    } catch (error) {
      console.error("Error deleting exercise:", error);
    }
  };

  return (
    <tr>
      <td>{exercise.name}</td>
      <td>{exercise.bpm}</td>
      <td>{`${exercise.timeSignatureTop}/${exercise.timeSignatureBot}`}</td>
      <td>{new Date(exercise.datePracticed).toLocaleDateString()}</td>
      <td>
        <button onClick={handleDelete}>X</button> {/* Delete button */}
      </td>
    </tr>
  );
};

const ExerciseList: React.FC = () => {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercises = async () => {
      setLoading(true);
      try {
        const response = await axios.get<Exercise[]>(
          "http://localhost:5001/exercises"
        );
        setExercises(response.data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, []);
  const handleDelete = (id: string) => {
    setExercises(exercises.filter((exercise) => exercise._id !== id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>BPM</th>
          <th>Time Signature</th>
          <th>Date Practiced</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {exercises.map((exercise) => (
          <ExerciseRow
            key={exercise._id}
            exercise={exercise}
            onDelete={handleDelete}
          />
        ))}
      </tbody>
    </table>
  );
};

export default ExerciseList;
