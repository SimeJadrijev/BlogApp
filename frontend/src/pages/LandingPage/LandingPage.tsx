import React, { useState } from 'react';
import { useBlogs } from '../../hooks/useBlogs.ts';
import { BlogCard } from '../../components/BlogCard';
import DefaultUserImage from '../../assets/images/deafult-user.jpg';
import c from './index.module.css';
import { LandingHeader } from '../../components/LandingHeader';

// type Blog = {
//     image: string;
//     category: string;
//     title: string;
//     description: string;
//     authorName: string;
//     authorImage: string;
//     date: string;
// };


export const LandingPage: React.FC = () => {
    const { data: blogs } = useBlogs();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const filteredBlogs = blogs
        ?.filter(blog => blog.title.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(blog => !selectedCategory || blog.category === selectedCategory);
    return (
        <>
            <LandingHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} selectedCategory={selectedCategory}
                           setSelectedCategory={setSelectedCategory}/>
            <div className={c.landingPage}>
                {filteredBlogs && filteredBlogs.map(blog => (
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
        </>
    );
};
