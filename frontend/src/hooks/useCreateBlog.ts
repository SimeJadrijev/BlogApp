import { useMutation } from '@tanstack/react-query';
import axios from '../utils/axios';

type CreateBlogData = {
    title: string;
    category: string;
    image?: string;
    content: string;
}

export const useCreateBlog = () => {
    return useMutation({
        mutationFn: async (newBlog: CreateBlogData) => {
            const res = await axios.post('/blogs', newBlog, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return res.data;
        },
    });
};
