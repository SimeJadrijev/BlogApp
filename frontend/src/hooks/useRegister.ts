import { useMutation } from '@tanstack/react-query';
import axios from '../utils/axios.ts';

type RegisterData = {
    username: string;
    password: string;
}

export const useRegister = () => {
    return useMutation({
        mutationFn: async (data: RegisterData) => {
            const res = await axios.post('/users/register', data);
            return res.data;
        },
    });
};
