import express, { Request, Response } from 'express';
import Blog from '../models/blogModel';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', verifyToken, async (req: Request, res: Response) => {
    const { title, category, image, content } = req.body;
    const author = req.userId;

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

router.get('/', async (req: Request, res: Response) => {
    try {
        const blogs = await Blog.find().populate('author', 'username');
        res.json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching blogs.' });
    }
});

router.get('/my-blogs', verifyToken, async (req: Request, res: Response) => {
    const userId = req.userId;

    try {
        console.log('tuuuu sam');
        const blogs = await Blog.find({ author: userId }).populate('author', 'username');
        console.log('jesam li ovdjeee');
        res.json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching your blogs.' });
    }
});

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

router.put('/:id', verifyToken, async (req: Request, res: Response) => {
    const { title, category, image, content } = req.body;
    const blogId = req.params.id;
    const author = req.userId;

    try {
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }

        if (blog.author.toString() !== author) {
            return res.status(403).json({ message: 'You are not the author of this blog.' });
        }

        blog.title = title || blog.title;
        blog.category = category || blog.category;
        blog.image = image || blog.image;
        blog.content = content || blog.content;

        await blog.save();

        res.json({ message: 'Blog updated successfully!', blog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating blog.' });
    }
});


router.put('/:id/like', verifyToken, async (req: Request, res: Response) => {
    const blogId = req.params.id;

    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }

        blog.likes += 1;
        await blog.save();

        res.json({ message: 'Blog liked.', blog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while liking the blog.' });
    }
});

router.put('/:id/dislike', verifyToken, async (req: Request, res: Response) => {
    const blogId = req.params.id;

    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }

        if (blog.likes > 0) {
            blog.likes -= 1;
            await blog.save();
            res.json({ message: 'Blog unliked.', blog });
        } else {
            res.status(400).json({ message: 'Number of likes is already 0.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error while unliking the blog.' });
    }
});


router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
    const blogId = req.params.id;
    const author = req.userId;

    try {
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }

        if (blog.author.toString() !== author) {
            return res.status(403).json({ message: 'You are not the author of this blog.' });
        }

        await Blog.deleteOne({ _id: blogId });


        res.json({ message: 'Blog deleted successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting blog.' });
    }
});


export default router;
