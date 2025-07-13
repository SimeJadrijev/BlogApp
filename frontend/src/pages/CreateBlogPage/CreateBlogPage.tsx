import { useState } from 'react';
import c from './index.module.css';
import { useCreateBlog } from '../../hooks/useCreateBlog';
import { useNavigate } from 'react-router-dom';

export const CreateBlogPage = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const defaultImageUrl = 'https://dinarakasko.com/image/cache/catalog/basel-demo/blog-1140x700.png';
    const createBlog = useCreateBlog();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !category || !content) {
            alert('Please fill in required fields!');
            return;
        }


        createBlog.mutate(
            {
                title,
                category,
                image: image || defaultImageUrl,
                content,
            },
            {
                onSuccess: () => {
                    alert('Blog successfully created!');
                    navigate('/blogs'); // Nakon uspjeha vrati na landing page
                },
                onError: () => {
                    alert('Failed to create blog.');
                },
            }
        );
    };

    return (
        <form className={c.createBlogForm} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title *"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
            >
                <option value="">Select category *</option>
                <option value="sport">Sport</option>
                <option value="politics">Politics</option>
                <option value="work">Work</option>
            </select>
            <input
                type="text"
                placeholder="Image URL (optional)"
                value={image}
                onChange={(e) => setImage(e.target.value)}
            />
            <textarea
                placeholder="Content *"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <button type="submit">
                Create Blog
            </button>
        </form>
    );
};
