import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes';
import blogRoutes from './routes/blogRoutes';
import commentRoutes from './routes/commentRoutes';
import cors from 'cors';
import { seedBlogs } from './seed/blog.seed';
import { seedUsers } from './seed/user.seed';


dotenv.config();

const server = express();
const PORT = process.env.PORT || 5000;

server.use(express.json());
server.use(cors());

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/blogApp')
    .then(async () => {
        console.log('Connected to MongoDB');
        await seedUsers();
        await seedBlogs();
    })
    .catch((err) => console.log(err));

server.get('/', (req, res) => {
    res.send('Hello from backend!');
});

server.use('/api/users', userRoutes);
server.use('/api/blogs', blogRoutes);
server.use('/api/comments', commentRoutes);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
