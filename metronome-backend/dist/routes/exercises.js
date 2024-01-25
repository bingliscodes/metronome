"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Exercise_1 = __importDefault(require("../models/Exercise"));
const router = express_1.default.Router();
router.post('/', async (req, res) => {
    try {
        const newExercise = new Exercise_1.default(req.body);
        const savedExercise = await newExercise.save();
        res.status(201).json(savedExercise);
    }
    catch (error) {
        if (error instanceof Error) {
            // Now TypeScript knows error is of type Error
            res.status(400).json({ message: error.message });
        }
        else {
            // Handle cases where the error is not an instance of Error
            res.status(400).json({ message: "An unknown error occurred" });
        }
    }
});
router.get('/', async (req, res) => {
    try {
        const exercises = await Exercise_1.default.find();
        res.json(exercises);
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        }
        else {
            res.status(500).json({ message: "An unknown error occurred" });
        }
    }
});
exports.default = router;
