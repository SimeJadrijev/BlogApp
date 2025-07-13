import { useQuery } from '@tanstack/react-query';
import axios from '../utils/axios.ts';

type Comment = {
    _id: string;
    content: string;
    author: {
        username: string;
    };
    blog: string;
    createdAt: string;
}

export const useComments = (blogId: string) => {
    return useQuery<Comment[]>({
        queryKey: ['comments', blogId],
        queryFn: async () => {
            const res = await axios.get(`/comments/${blogId}`);
            return res.data;
        },
        enabled: !!blogId,
    });
};
