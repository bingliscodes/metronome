import exercisesRouter from './routes/exercises';
import exercisesWithHistoryRouter from './routes/exercisesWithHistory';
import userRouter from './routes/user';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/user', userRouter);
app.use('/exercises', exercisesRouter);
app.use('/exercisesWithHistory', exercisesWithHistoryRouter);



mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


app.get('/', (req, res) => {
  res.send('Metronome backend is running');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
