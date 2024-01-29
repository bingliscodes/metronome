//test.ts
import express, { Request, Response } from 'express';
import Test from '../models/Test';

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
    console.log(req.body);
    try {
      const newTest = new Test(req.body);
      const savedTest = await newTest.save();
      res.status(201).json(savedTest);
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
      const tests = await Test.find();
      res.json(tests);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: "An unknown error occurred" });
      }
    }
  });

export default router;
