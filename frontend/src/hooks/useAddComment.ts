import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../utils/axios.ts';

export const useAddComment = (blogId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (content: string) => {
            const res = await axios.post(
                `/comments/${blogId}`,
                { content },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            );
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', blogId] });
        },
    });
};
