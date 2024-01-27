import express, { Request, Response } from 'express';
import Exercise from '../models/Exercise';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    //console.log(req.body);
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

  // GET endpoint to fetch history of a specific exercise
  router.get('/history/:id', async (req: Request, res: Response) => {
    try {
      const exerciseId = req.params.id;
      const exercise = await Exercise.findById(exerciseId);
      if (!exercise) {
        return res.status(404).json({ message: 'Exercise not found' });
      }
      res.json({ history: exercise.history });
    } catch (error: any) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  });

  // PUT endpoint to update an exercise's history
  router.put('/:id', async (req: Request, res: Response) => {
    const exerciseId = req.params.id;
    const newHistoryEntry = req.body.newEntry;

    try {
      // Find the exercise by ID and update its history
      const updatedExercise = await Exercise.findByIdAndUpdate(
        exerciseId,
        { $push: { history: newHistoryEntry } },
        { new: true } // This option returns the updated document
      );

      if (updatedExercise) {
        res.json({ updatedHistoryEntry: newHistoryEntry });
      } else {
        res.status(404).json({ message: 'Exercise not found' });
      }

      res.status(200).json(updatedExercise);
    } catch (error: any) {
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
      const result = await Exercise.findByIdAndDelete(req.params.id);
      if (!result) {
        return res.status(404).send('Exercise not found');
      }
      res.send(result);
    } catch (error: any) {
      res.status(500).send({message: error.message});
    }
  });

export default router;
