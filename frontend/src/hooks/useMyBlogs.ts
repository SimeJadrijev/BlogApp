import { useQuery } from '@tanstack/react-query';
import axios from '../utils/axios';

type Blog = {
    _id: string;
    title: string;
    category: string;
    image: string;
    content: string;
    author: {
        username: string;
    };
    likes: number;
    date: string;
}

const fetchMyBlogs = async (): Promise<Blog[]> => {
    const res = await axios.get('/blogs/my-blogs', {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return res.data;
};

export const useMyBlogs = () => {
    return useQuery({
        queryKey: ['myBlogs'],
        queryFn: fetchMyBlogs,
    });
};
