import mongoose, { Document } from 'mongoose';

interface ITest extends Document {
    name: string;
}

const testSchema = new mongoose.Schema({
    name: { type: String, required: true },
});

const Test = mongoose.model<ITest>('Test', testSchema);
export default Test;