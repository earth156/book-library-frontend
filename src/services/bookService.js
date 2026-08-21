import axiosClient from '../api/axiosClient';

export const bookService = {
    // ดึงหนังสือทั้งหมด (รองรับ Filter)
    getBooks: async (filters = {}) => {
        // ส่ง params เช่น { categoryId: 1, authorId: 2 } ไปเป็น Query String
        const response = await axiosClient.get('/books', { params: filters });
        return response.data;
    },

    // เพิ่มหนังสือใหม่
    createBook: async (bookData) => {
        const response = await axiosClient.post('/books', bookData);
        return response.data;
    },

    // ลบหนังสือ
    deleteBook: async (id) => {
        const response = await axiosClient.delete(`/books/${id}`);
        return response.data;
    },

    // ดึงรายชื่อหมวดหมู่ (สำหรับทำ Dropdown)
    getCategories: async () => {
        const response = await axiosClient.get('/categories');
        return response.data;
    },

    // ดึงรายชื่อผู้แต่ง (สำหรับทำ Dropdown)
    getAuthors: async () => {
        const response = await axiosClient.get('/authors');
        return response.data;
    }
};