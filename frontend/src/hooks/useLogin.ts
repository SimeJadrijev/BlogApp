import { useMutation } from '@tanstack/react-query';
import axios from '../utils/axios.ts';

type LoginData = {
    username: string;
    password: string;
}

export const useLogin = () => {
    return useMutation({
        mutationFn: async (data: LoginData) => {
            const res = await axios.post('/users/login', data);
            return res.data;
        },
    });
};
