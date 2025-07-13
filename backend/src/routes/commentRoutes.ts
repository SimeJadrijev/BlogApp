import express, { Request, Response } from 'express';
import Comment from '../models/commentModel';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/:blogId', verifyToken, async (req: Request, res: Response) => {
    const { content } = req.body;
    const blogId = req.params.blogId;
    const author = req.userId;

    try {
        const newComment = new Comment({
            content,
            author,
            blog: blogId,
        });

        await newComment.save();

        res.status(201).json({ message: 'Comment added successfully!', comment: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error adding comment.' });
    }
});

router.get('/:blogId', async (req: Request, res: Response) => {
    const blogId = req.params.blogId;

    try {
        const comments = await Comment.find({ blog: blogId }).populate('author', 'username');
        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Greška pri dohvaćanju komentara.' });
    }
});

router.delete('/:commentId', verifyToken, async (req: Request, res: Response) => {
    const commentId = req.params.commentId;
    const userId = req.userId;

    try {
        const comment = await Comment.findById(commentId);
        if (!comment) {
            return res.status(404).json({ message: 'Komentar nije pronađen.' });
        }

        if (comment.author.toString() !== userId) {
            return res.status(403).json({ message: 'Nemaš dopuštenje za brisanje ovog komentara.' });
        }

        await comment.deleteOne();

        res.json({ message: 'Komentar je obrisan.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Greška pri brisanju komentara.' });
    }
});


export default router;
