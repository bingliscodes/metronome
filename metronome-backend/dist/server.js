"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exercises_1 = __importDefault(require("./routes/exercises"));
const exercisesWithHistory_1 = __importDefault(require("./routes/exercisesWithHistory"));
const user_1 = __importDefault(require("./routes/user"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const test_1 = __importDefault(require("./routes/test"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/test', test_1.default);
app.use('/users', user_1.default);
app.use('/exercises', exercises_1.default);
app.use('/exercisesWithHistory', exercisesWithHistory_1.default);
mongoose_1.default.connect(process.env.MONGO_URI, {
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
