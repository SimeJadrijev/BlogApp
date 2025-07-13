import c from './index.module.css';
import { useParams } from 'react-router-dom';
import { useBlog } from '../../hooks/useBlogs.ts';
import DefaultUserImage from './../../assets/images/deafult-user.jpg';


export const BlogPage = () => {
    const { blogId } = useParams<{ blogId: string }>();
    const { data: blog, isLoading } = useBlog(blogId || '');
    console.log(blog);
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
            <div className={c.authorContainer}>
                <img className={c.authorImage} src={DefaultUserImage} alt="Author" width={20} height={20}/>
                <div className={c.authorInfo}>
                    <p className={c.authorName}>{blog?.author?.username}</p>
                    <p className={c.date}>{displayDate(blog?.date)}</p>
                </div>
            </div>
            <img id={c.blogImage} src={blog?.image}/>
            <p>{blog?.content}</p>
        </div>
    );
};
