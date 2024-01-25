import express, { Request, Response } from 'express';
import Exercise from '../models/Exercise';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    try {
      const newExercise = new Exercise(req.body);
      const savedExercise = await newExercise.save();
      res.status(201).json(savedExercise);
    } catch (error) {
      if (error instanceof Error) {
        // Now TypeScript knows error is of type Error
        res.status(400).json({ message: error.message });
      } else {
        // Handle cases where the error is not an instance of Error
        res.status(400).json({ message: "An unknown error occurred" });
      }
    }
  });
  
  router.get('/', async (req: Request, res: Response) => {
    try {
      const exercises = await Exercise.find();
      res.json(exercises);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  });
  

export default router;
