import mongoose, { Document } from 'mongoose';

export interface HistoryEntry {
    bpm: number;
    date: Date; // or Date, if you prefer to work with Date objects
    timeSignatureTop: number;
    timeSignatureBot: number;
}

const historyEntrySchema = new mongoose.Schema({
    bpm: { type: Number, required: true },
    date: { type: Date, required: true },
    timeSignatureTop: { type: Number, required: true },
    timeSignatureBot: { type: Number, required: true },
});

const exerciseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    history: [historyEntrySchema],
  });

  export interface IExerciseWithHistory extends Document {
    _id: string;
    name: string;
    history: {
        bpm: number;
        date: Date;
        timeSignatureTop: number;
        timeSignatureBot: number;
    }[];
}


const ExerciseWithHistory = mongoose.model<IExerciseWithHistory>('ExerciseWithHistory', exerciseSchema);

export default ExerciseWithHistory;
