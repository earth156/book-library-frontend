import { useState, useEffect } from 'react';
import axiosClient from '../../api/axiosClient';

const useBooks = () => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchInitialData = async () => {
            setIsLoading(true);
            setError('');
            try {
                const [booksRes, categoriesRes, authorsRes] = await Promise.all([
                    axiosClient.get('/books'),
                    axiosClient.get('/categories'),
                    axiosClient.get('/authors'),
                ]);
                setBooks(booksRes.data);
                setCategories(categoriesRes.data);
                setAuthors(authorsRes.data);
            } catch (err) {
                setError('ไม่สามารถโหลดข้อมูลได้ กรุณาลองใหม่อีกครั้ง');
                console.error('Fetch error:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchInitialData();
    }, []);

    const addBook = async (bookData) => {
        try {
            const response = await axiosClient.post('/books', bookData);
            setBooks((prev) => [...prev, response.data]);
            return response.data; // ส่งข้อมูลหนังสือที่สร้างกลับไปให้ caller
        } catch (err) {
            setError('ไม่สามารถเพิ่มหนังสือได้ กรุณาตรวจสอบข้อมูล');
            console.error('Add book error:', err);
            return null;
        }
    };

    const deleteBook = async (id) => {
        try {
            await axiosClient.delete(`/books/${id}`);
            setBooks((prev) => prev.filter((book) => book.id !== id));
        } catch (err) {
            setError('ไม่สามารถลบหนังสือได้ กรุณาลองใหม่อีกครั้ง');
            console.error('Delete book error:', err);
        }
    };

    const fetchBookById = async (id) => {
        try {
            const response = await axiosClient.get(`/books/${id}`);
            return response.data;
        } catch (err) {
            console.error('Fetch book by ID error:', err);
            return null;
        }
    };

    return { books, categories, authors, isLoading, error, addBook, deleteBook, fetchBookById };
};

export default useBooks;
