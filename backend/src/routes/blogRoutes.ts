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

// routes/blogRoutes.ts


// Ruta za ažuriranje bloga
router.put('/:id', verifyToken, async (req: Request, res: Response) => {
    const { title, category, image, content } = req.body;
    const blogId = req.params.id;
    const author = req.userId;  // Korisnički ID iz tokena

    try {
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }

        // Provjera da li korisnik pokušava ažurirati svoj blog
        if (blog.author.toString() !== author) {
            return res.status(403).json({ message: 'You are not the author of this blog.' });
        }

        // Ažuriranje bloga
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
            return res.status(404).json({ message: 'Blog nije pronađen.' });
        }

        blog.likes += 1;
        await blog.save();

        res.json({ message: 'Blog lajkan!', blog });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Greška pri lajkanju bloga.' });
    }
});

router.put('/:id/dislike', verifyToken, async (req: Request, res: Response) => {
    const blogId = req.params.id;

    try {
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.status(404).json({ message: 'Blog nije pronađen.' });
        }

        // Smanji lajkove, ali ne ispod 0
        if (blog.likes > 0) {
            blog.likes -= 1;
            await blog.save();
            res.json({ message: 'Blog dislajkan!', blog });
        } else {
            res.status(400).json({ message: 'Broj lajkova je već 0.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Greška pri dislajkanju bloga.' });
    }
});


// Ruta za brisanje bloga
router.delete('/:id', verifyToken, async (req: Request, res: Response) => {
    const blogId = req.params.id;
    const author = req.userId;  // Korisnički ID iz tokena

    try {
        const blog = await Blog.findById(blogId);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found.' });
        }

        // Provjera da li korisnik pokušava obrisati svoj blog
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
