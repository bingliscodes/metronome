//ExerciseHistory.tsx
import React, { useState, useEffect } from "react";
import { HistoryEntry } from "./ExerciseManager";

interface ExerciseHistoryProps {
  history: HistoryEntry[];
}
const ExerciseHistory: React.FC<ExerciseHistoryProps> = ({ history }) => {
  if (!Array.isArray(history)) {
    // You can render an error message or a different UI component here
    return <div>No history data available.</div>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>BPM</th>
          <th>Time Signature</th>
        </tr>
      </thead>
      <tbody>
        {history.map((entry, index) => (
          <tr key={index}>
            <td>{new Date(entry.date).toLocaleDateString()}</td>
            <td>{entry.bpm}</td>
            <td>{`${entry.timeSignatureTop}/${entry.timeSignatureBot}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ExerciseHistory;
