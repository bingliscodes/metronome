"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const exerciseSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    bpm: { type: Number, required: true },
    timeSignatureTop: { type: Number, required: true },
    timeSignatureBot: { type: Number, required: true },
    datePracticed: { type: Date, required: true }
});
const Exercise = mongoose_1.default.model('Exercise', exerciseSchema);
exports.default = Exercise;
