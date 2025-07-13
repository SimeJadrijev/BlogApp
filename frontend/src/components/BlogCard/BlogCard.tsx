import c from './index.module.css';
import React from 'react';

type BlogCardProps =
    {
        image: string;
        category: string;
        title: string;
        description: string;
        authorName: string;
        authorImage: string;
        date: string;
    }
export const BlogCard: React.FC<BlogCardProps> = (blog: BlogCardProps) => {
    return <div className={c.card}>

        <div className={c.cardUpper}>
            <img className={c.cardImage} src={blog.image} alt="blog"/>
            <h3>{blog.category}</h3>
            <h1>{blog.title}</h1>
            <p>{blog.description}</p>

        </div>
        <div className={c.cardFooter}>
            <img src={blog.authorImage} alt="user"/>
            <div className={c.cardFooterRight}>
                <h4>{blog.authorName}</h4>
                <p>{blog.date}</p>
            </div>
        </div>
    </div>;
};
