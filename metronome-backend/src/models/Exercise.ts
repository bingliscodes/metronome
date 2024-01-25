import mongoose, { Document } from 'mongoose';

interface IExercise extends Document {
  name: string;
  bpm: number;
  timeSignatureTop: number;
  timeSignatureBot: number;
  datePracticed: Date;
}

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  bpm: { type: Number, required: true },
  timeSignatureTop: { type: Number, required: true },
  timeSignatureBot: { type: Number, required: true },
  datePracticed: { type: Date, required: true }
});

const Exercise = mongoose.model<IExercise>('Exercise', exerciseSchema);
export default Exercise;
