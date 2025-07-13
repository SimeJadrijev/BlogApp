import { useQuery } from '@tanstack/react-query';

interface Blog {
    _id: string;
    title: string;
    category: string;
    image: string;
    content: string;
    author: {
        username: string;
    };
    date: string;
}

const fetchBlogs = async (): Promise<Blog[]> => {
    const res = await fetch('http://localhost:5000/api/blogs');
    if (!res.ok) {
        throw new Error('Failed to fetch blogs');
    }
    return res.json();
};

export const useBlogs = () => {
    return useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    });
};
