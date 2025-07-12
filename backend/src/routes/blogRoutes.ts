import express, { Request, Response } from 'express';
import Blog from '../models/blogModel';
import { verifyToken } from '../middleware/authMiddleware'; // Provjera JWT tokena

const router = express.Router();

// Ruta za kreiranje novog bloga
router.post('/', verifyToken, async (req: Request, res: Response) => {
    const { title, category, image, content } = req.body;
    const author = req.userId; // Korisnički ID iz tokena

    try {
        const newBlog = new Blog({
            title,
            category,
            author,
            image,
            content,
        });

        await newBlog.save();
        res.status(201).json({ message: 'Blog successfully created!', blog: newBlog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating blog.' });
    }
});

// Ruta za dohvat svih blogova
router.get('/', async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find().populate('author', 'username'); // Populiraj autora
        res.json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching blogs.' });
    }
});

// Ruta za dohvat bloga po ID-u
router.get('/:id', async (req: Request, res: Response) => {
    const blogId = req.params.id;

    try {
        const blog = await Blog.findById(blogId).populate('author', 'username');
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }
        res.json(blog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching blog.' });
    }
});

export default router;
