import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Environment varijable
dotenv.config();

const server = express();
const PORT = process.env.PORT || 5000;

// Middleware
server.use(express.json());

// Spajanje na MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blogApp')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(err));

// Ruta
server.get('/', (req, res) => {
    res.send('Hello from backend!');
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
