import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../utils/axios.ts';

export const useDeleteComment = (blogId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (commentId: string) => {
            await api.delete(`/comments/${commentId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['comments', blogId] });
        },
    });
};
