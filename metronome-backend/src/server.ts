import exercisesRouter from './routes/exercises';
import exercisesWithHistoryRouter from './routes/exercisesWithHistory';
import userRouter from './routes/user';
import express from 'express';
import mongoose from 'mongoose';
import testRouter from './routes/test';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use('/test', testRouter);
app.use('/users', userRouter);
app.use('/exercises', exercisesRouter);
app.use('/exercisesWithHistory', exercisesWithHistoryRouter);

mongoose.connect(process.env.MONGO_URI as string, {
  serverSelectionTimeoutMS: 300000, // The time in milliseconds to wait for a server to respond. Default is 30000 (30 seconds).
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity. Adjust as needed.
  connectTimeoutMS: 30000 // The time in milliseconds to wait for a new connection before throwing an error. Default is 30000 (30 seconds).
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));


app.get('/', (req, res) => {
  res.send('Metronome backend is running');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
