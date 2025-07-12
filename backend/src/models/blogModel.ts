import mongoose, { Schema, Document } from 'mongoose';

// Definiranje tipova za blog
interface IBlog extends Document {
    title: string;
    category: string;
    author: mongoose.Types.ObjectId;
    likes: number;
    image: string;
    date: Date;
    content: string;
}

// Definiranje sheme za blog
const blogSchema: Schema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        likes: {
            type: Number,
            default: 0,
        },
        image: {
            type: String,
            default: "https://dinarakasko.com/image/cache/catalog/basel-demo/blog-1140x700.png",
        },
        date: {
            type: Date,
            default: Date.now,
        },
        content: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, // Dodaje createdAt i updatedAt
    }
);

// Kreiranje modela za blog
const Blog = mongoose.model<IBlog>('Blog', blogSchema);

export default Blog;
