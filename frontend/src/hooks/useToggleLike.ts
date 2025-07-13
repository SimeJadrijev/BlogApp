import { useMutation } from '@tanstack/react-query';
import api from '../utils/axios';

export const useToggleLike = () => {
    return useMutation({
        mutationFn: async ({
                               blogId,
                               action,
                           }: {
            blogId: string;
            action: 'like' | 'dislike';
        }) => {
            const endpoint = action === 'like' ? `/blogs/${blogId}/like` : `/blogs/${blogId}/dislike`;

            const res = await api.put(endpoint, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            return res.data;
        },
    });
};
