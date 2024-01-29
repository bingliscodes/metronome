// import mongoose, { Document } from 'mongoose';

// interface IExercise extends Document {
//   name: string;
//   bpm: number;
//   timeSignatureTop: number;
//   timeSignatureBot: number;
//   datePracticed: Date;
// }

// const exerciseSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   bpm: { type: Number, required: false },
//   timeSignatureTop: { type: Number, required: false },
//   timeSignatureBot: { type: Number, required: false },
//   datePracticed: { type: Date, required: false }
// });

// const Exercise = mongoose.model<IExercise>('Exercise', exerciseSchema);
// export default Exercise;

//Exercise.ts
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

  export interface IExercise extends Document {
    _id: string;
    name: string;
    history: {
        bpm: number;
        date: Date;
        timeSignatureTop: number;
        timeSignatureBot: number;
    }[];
}


const Exercise = mongoose.model<IExercise>('Exercise', exerciseSchema);

export default Exercise;