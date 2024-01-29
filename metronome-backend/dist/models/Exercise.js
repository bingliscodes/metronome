"use strict";
// import mongoose, { Document } from 'mongoose';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const mongoose_1 = __importDefault(require("mongoose"));
const historyEntrySchema = new mongoose_1.default.Schema({
    bpm: { type: Number, required: true },
    date: { type: Date, required: true },
    timeSignatureTop: { type: Number, required: true },
    timeSignatureBot: { type: Number, required: true },
});
const exerciseSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    history: [historyEntrySchema],
});
const Exercise = mongoose_1.default.model('Exercise', exerciseSchema);
exports.default = Exercise;
