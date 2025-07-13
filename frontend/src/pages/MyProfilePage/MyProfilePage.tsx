import c from './index.module.css';
import { useMyBlogs } from '../../hooks/useMyBlogs';
import { BlogCard } from '../../components/BlogCard';
import DefaultUserImage from '../../assets/images/deafult-user.jpg';
import { useState } from 'react';
import { useUpdateProfile } from '../../hooks/useUpdateProfile.ts';

export const MyProfilePage = () => {
    const { data: blogs } = useMyBlogs();
    const updateUser = useUpdateProfile();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser.mutate(
            { username: username || undefined, password: password || undefined },
            {
                onSuccess: () => {
                    alert('Profile updated successfully!');
                    setUsername('');
                    setPassword('');
                },
                onError: () => {
                    alert('Error updating profile.');
                },
            }
        );
    };


    return (
        <div className={c.myProfilePage}>

            <h2>My Profile</h2>
            <form className={c.profileForm} onSubmit={handleUpdate}>
                <input
                    type="text"
                    placeholder="New username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="New password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Update Profile</button>
            </form>
            <h2>My Blogs</h2>
            <div className={c.blogList}>
                {blogs && blogs.length > 0 ? (
                    blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .map(blog => (
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
                        ))
                ) : (
                    <p>You haven't created any blogs yet.</p>
                )}
            </div>
        </div>
    );
};
