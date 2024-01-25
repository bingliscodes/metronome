import express, { Request, Response } from 'express';
import ExerciseWithHistory from '../models/ExerciseWithHistory';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    console.log(req.body);
    try {
      const newExercise = new ExerciseWithHistory(req.body);
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
      const exercises = await ExerciseWithHistory.find();
      res.json(exercises);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  });
  
// DELETE endpoint to remove an exercise
  router.delete('/:id', async (req: Request, res: Response) => {
    try {
      const result = await ExerciseWithHistory.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).send('Exercise not found');
      }
      res.send(result);
    } catch (error: any) {
      res.status(500).send({message: error.message});
    }
  });

export default router;
