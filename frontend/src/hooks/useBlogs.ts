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

const fetchBlog = async (id: string): Promise<Blog> => {
    const res = await fetch(`http://localhost:5000/api/blogs/${id}`);
    if (!res.ok) {
        throw new Error('Failed to fetch blog');
    }
    return res.json();
};

export const useBlogs = () => {
    return useQuery({
        queryKey: ['blogs'],
        queryFn: fetchBlogs,
    });
};

export const useBlog = (id: string) => {
    return useQuery({
        queryKey: ['blog', id],
        queryFn: () => fetchBlog(id),
        enabled: !!id,
    });
};
