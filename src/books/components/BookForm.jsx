import { useState } from 'react';
import '../pages/books.css';

const BookForm = ({ categories, authors, onSubmit }) => {
    const [title, setTitle] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [authorId, setAuthorId] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};

        if (!title.trim()) {
            newErrors.title = 'กรุณากรอกชื่อหนังสือ';
        } else if (title.trim().length < 2) {
            newErrors.title = 'ชื่อหนังสือต้องมีอย่างน้อย 2 ตัวอักษร';
        }

        if (!categoryId) {
            newErrors.categoryId = 'กรุณาเลือกหมวดหมู่';
        }

        if (!authorId) {
            newErrors.authorId = 'กรุณาเลือกผู้แต่ง';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        onSubmit({ title: title.trim(), categoryId, authorId });
        setTitle('');
        setCategoryId('');
        setAuthorId('');
        setErrors({});
    };

    return (
        <form onSubmit={handleSubmit} className="book-form" noValidate>
            <div className="book-form__field">
                <label className="book-form__label">ชื่อหนังสือ</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value);
                        if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
                    }}
                    placeholder="กรอกชื่อหนังสือ"
                    className={`book-form__input ${errors.title ? 'is-invalid' : ''}`}
                />
                {errors.title && <span className="book-form__error-text">{errors.title}</span>}
            </div>

            <div className="book-form__field">
                <label className="book-form__label">หมวดหมู่</label>
                <select
                    value={categoryId}
                    onChange={(e) => {
                        setCategoryId(e.target.value);
                        if (errors.categoryId) setErrors((prev) => ({ ...prev, categoryId: '' }));
                    }}
                    className={`book-form__select ${errors.categoryId ? 'is-invalid' : ''}`}
                >
                    <option value="">-- เลือกหมวดหมู่ --</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
                {errors.categoryId && <span className="book-form__error-text">{errors.categoryId}</span>}
            </div>

            <div className="book-form__field">
                <label className="book-form__label">ผู้แต่ง</label>
                <select
                    value={authorId}
                    onChange={(e) => {
                        setAuthorId(e.target.value);
                        if (errors.authorId) setErrors((prev) => ({ ...prev, authorId: '' }));
                    }}
                    className={`book-form__select ${errors.authorId ? 'is-invalid' : ''}`}
                >
                    <option value="">-- เลือกผู้แต่ง --</option>
                    {authors.map((author) => (
                        <option key={author.id} value={author.id}>
                            {author.name}
                        </option>
                    ))}
                </select>
                {errors.authorId && <span className="book-form__error-text">{errors.authorId}</span>}
            </div>

            <button type="submit" className="book-form__btn">
                + เพิ่มหนังสือ
            </button>
        </form>
    );
};

export default BookForm;
