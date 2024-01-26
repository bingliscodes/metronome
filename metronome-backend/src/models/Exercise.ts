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
  bpm: { type: Number, required: false },
  timeSignatureTop: { type: Number, required: false },
  timeSignatureBot: { type: Number, required: false },
  datePracticed: { type: Date, required: false }
});

const Exercise = mongoose.model<IExercise>('Exercise', exerciseSchema);
export default Exercise;
