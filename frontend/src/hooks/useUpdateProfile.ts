import { useMutation } from '@tanstack/react-query';
import axios from '../utils/axios';

type UpdateProfileData = {
    username?: string;
    password?: string;
};

export const useUpdateProfile = () => {
    return useMutation({
        mutationFn: async (data: UpdateProfileData) => {
            const res = await axios.put('/users/update', data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            return res.data;
        },
    });
};
