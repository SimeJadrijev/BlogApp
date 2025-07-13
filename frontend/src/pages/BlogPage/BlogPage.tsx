import c from './index.module.css';
import { useParams } from 'react-router-dom';
import { useBlog } from '../../hooks/useBlogs.ts';
import DefaultUserImage from '../../assets/images/deafult-user.jpg';
import { useEffect, useState } from 'react';
import { useToggleLike } from '../../hooks/useToggleLike.ts';
import { CommentsSection } from '../../components/ComponentsSection';


export const BlogPage = () => {
    const { blogId } = useParams<{ blogId: string }>();
    const { data: blog, isLoading } = useBlog(blogId || '');
    const [likes, setLikes] = useState(0);
    const [hasLiked, setHasLiked] = useState(false);
    const toggleLike = useToggleLike();


    const handleLike = () => {
        if (!blogId) return;

        if (!hasLiked) {
            setLikes(prev => prev + 1);
            setHasLiked(true);
            localStorage.setItem(`liked_${blogId}`, 'true');

            toggleLike.mutate({ blogId, action: 'like' });
        } else {
            setLikes(prev => (prev > 0 ? prev - 1 : 0));
            setHasLiked(false);
            localStorage.removeItem(`liked_${blogId}`);

            toggleLike.mutate({ blogId, action: 'dislike' });
        }
    };

    useEffect(() => {
        if (blogId) {
            const liked = localStorage.getItem(`liked_${blogId}`);
            setHasLiked(liked === 'true');
        }
    }, [blogId]);

    useEffect(() => {
        if (blog?.likes !== undefined) {
            setLikes(blog.likes);
        }
    }, [blog]);

    const displayDate = (date: string | undefined): string => {
        if (!date) return '';
        return new Date(date).toLocaleDateString();
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }
    return (
        <div className={c.blogPage}>
            <h1>{blog?.title}</h1>
            <h4>{blog?.category}</h4>
            <img id={c.blogImage} src={blog?.image}/>
            <div className={c.authorContainer}>
                <img className={c.authorImage} src={DefaultUserImage} alt="Author"/>
                <div className={c.authorInfo}>
                    <p className={c.authorName}>{blog?.author?.username}</p>
                    <p className={c.date}>{displayDate(blog?.date)}</p>
                </div>
            </div>
            <p className={c.blogContent}>{blog?.content}</p>
            <button id={c.likeButton} className={hasLiked ? c.unlike : c.like} onClick={handleLike}>  {hasLiked ? `👎(${likes})` : `👍 (${likes})`}</button>

            <CommentsSection blogId={blogId || ''}/>
        </div>
    );
};
