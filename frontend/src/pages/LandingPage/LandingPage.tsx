import React from 'react';
import { useBlogs } from '../../hooks/useBlogs.ts';
import { BlogCard } from '../../components/BlogCard';
import DefaultUserImage from '../../assets/images/deafult-user.jpg';
import c from './index.module.css';

type Blog = {
    image: string;
    category: string;
    title: string;
    description: string;
    authorName: string;
    authorImage: string;
    date: string;
};


export const LandingPage: React.FC = () => {
    const { data: blogs, isLoading, isError } = useBlogs();

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Došlo je do greške prilikom učitavanja blogova.</p>;
    }

    return (
        <div className={c.landingPage}>
            {blogs && blogs.map(blog => (
                <BlogCard
                    key={blog._id}
                    image={blog.image}
                    category={blog.category}
                    title={blog.title}
                    description={blog.content.slice(0, 100) + '...'}
                    authorName={blog.author.username}
                    authorImage={DefaultUserImage}
                    date={new Date(blog.date).toLocaleDateString()}
                />
            ))}
        </div>
    );
};
