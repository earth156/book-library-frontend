import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Toast, ToastContainer } from 'react-bootstrap';
import useBooks from '../hooks/useBooks';
import BookForm from '../components/BookForm';
import BookList from '../components/BookList';
import libraryBg from '../../assets/images/library-bg.jpg';
import './books.css';

const BooksPage = () => {
    const { books, categories, authors, isLoading, error, addBook, deleteBook } = useBooks();
    const navigate = useNavigate();

    // ── Filter state ──
    const [filterCategory, setFilterCategory] = useState('');
    const [filterAuthor, setFilterAuthor] = useState('');

    // ── Delete confirm dialog state ──
    const [deleteTarget, setDeleteTarget] = useState(null); // { id, title }

    // ── Logout confirm dialog state ──
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // ── Success toast state ──
    const [successToast, setSuccessToast] = useState({ show: false, title: '' });

    // ── Client-side filter ──
    const filteredBooks = books.filter((book) => {
        const matchCategory = filterCategory ? book.categoryId === parseInt(filterCategory) : true;
        const matchAuthor = filterAuthor ? book.authorId === parseInt(filterAuthor) : true;
        return matchCategory && matchAuthor;
    });

    const hasActiveFilter = filterCategory || filterAuthor;

    const handleResetFilter = () => {
        setFilterCategory('');
        setFilterAuthor('');
    };

    // ── Add book handler ──
    const handleAddBook = async (bookData) => {
        const created = await addBook(bookData);
        if (created) {
            setSuccessToast({ show: true, title: created.title });
        }
    };

    // ── Delete handlers ──
    const handleDeleteRequest = (book) => {
        setDeleteTarget(book); // เปิด confirm dialog
    };

    const handleDeleteConfirm = async () => {
        if (!deleteTarget) return;
        await deleteBook(deleteTarget.id);
        setDeleteTarget(null); // ปิด dialog
    };

    const handleDeleteCancel = () => {
        setDeleteTarget(null);
    };

    // ── Logout handlers ──
    const handleLogoutRequest = () => {
        setShowLogoutModal(true);
    };

    const handleLogoutConfirm = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    const handleLogoutCancel = () => {
        setShowLogoutModal(false);
    };

    return (
        <div
            className="books-page"
            style={{
                backgroundImage: `linear-gradient(rgba(15,23,42,0.85), rgba(15,23,42,0.95)), url(${libraryBg})`,
            }}
        >

            {/* ── Success Toast ── */}
            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1100 }}>
                <Toast
                    show={successToast.show}
                    onClose={() => setSuccessToast({ show: false, title: '' })}
                    delay={3500}
                    autohide
                    className="books-toast--success"
                >
                    <Toast.Header className="books-toast__header">
                        <span className="books-toast__icon">✓</span>
                        <strong className="me-auto">เพิ่มหนังสือสำเร็จ</strong>
                    </Toast.Header>
                    <Toast.Body className="books-toast__body">
                        เพิ่มหนังสือ <strong>"{successToast.title}"</strong> เรียบร้อยแล้ว
                    </Toast.Body>
                </Toast>
            </ToastContainer>

            {/* ── Delete Confirm Modal ── */}
            <Modal
                show={!!deleteTarget}
                onHide={handleDeleteCancel}
                centered
                contentClassName="books-modal__content"
            >
                <Modal.Header className="books-modal__header" closeButton>
                    <Modal.Title className="books-modal__title">ยืนยันการลบ</Modal.Title>
                </Modal.Header>
                <Modal.Body className="books-modal__body">
                    คุณต้องการลบหนังสือ{' '}
                    <strong className="books-modal__book-name">
                        "{deleteTarget?.title}"
                    </strong>{' '}
                    ออกจากระบบหรือไม่?
                    <p className="books-modal__warning">การดำเนินการนี้ไม่สามารถย้อนกลับได้</p>
                </Modal.Body>
                <Modal.Footer className="books-modal__footer">
                    <Button
                        variant="secondary"
                        onClick={handleDeleteCancel}
                        className="books-modal__btn-cancel"
                    >
                        ยกเลิก
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleDeleteConfirm}
                        className="books-modal__btn-confirm"
                    >
                        ลบหนังสือ
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* ── Logout Confirm Modal ── */}
            <Modal
                show={showLogoutModal}
                onHide={handleLogoutCancel}
                centered
                contentClassName="books-modal__content"
            >
                <Modal.Header className="books-modal__header" closeButton>
                    <Modal.Title className="books-modal__title">ยืนยันการออกจากระบบ</Modal.Title>
                </Modal.Header>
                <Modal.Body className="books-modal__body">
                    คุณต้องการออกจากระบบหรือไม่?
                </Modal.Body>
                <Modal.Footer className="books-modal__footer">
                    <Button
                        variant="secondary"
                        onClick={handleLogoutCancel}
                        className="books-modal__btn-cancel"
                    >
                        ยกเลิก
                    </Button>
                    <Button
                        variant="danger"
                        onClick={handleLogoutConfirm}
                        className="books-modal__btn-confirm"
                    >
                        ออกจากระบบ
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* ── Navbar ── */}
            <nav className="books-navbar">
                <span className="books-navbar__brand">
                    Book<span className="books-navbar__brand-dot">Lib</span>
                </span>
                <div className="books-navbar__right">
                    <span className="books-navbar__stats">
                        หนังสือทั้งหมด <strong>{books.length}</strong> เล่ม
                    </span>
                    <button className="books-navbar__logout" onClick={handleLogoutRequest}>
                        ออกจากระบบ
                    </button>
                </div>
            </nav>

            <div className="books-container">
                {/* ── Page header ── */}
                <div className="books-header">
                    <div className="books-header__left">
                        <p className="books-header__eyebrow">ระบบห้องสมุด</p>
                        <h1 className="books-header__title">จัดการหนังสือ</h1>
                        <p className="books-header__subtitle">
                            เพิ่ม ลบ และค้นหาหนังสือตามหมวดหมู่หรือผู้แต่ง
                        </p>
                    </div>
                </div>

                {/* ── Error state ── */}
                {error && (
                    <div className="books-alert books-alert--error">
                        <span>⚠</span>
                        <span>{error}</span>
                    </div>
                )}

                {/* ── Loading / Content ── */}
                {isLoading ? (
                    <div className="books-alert books-alert--loading">
                        <span>กำลังโหลดข้อมูล...</span>
                    </div>
                ) : (
                    <>
                        {/* ── Filter bar ── */}
                        <div className="books-filter-bar">
                            <span className="books-filter-bar__label">กรอง</span>

                            <select
                                className="books-filter-bar__select"
                                value={filterCategory}
                                onChange={(e) => setFilterCategory(e.target.value)}
                            >
                                <option value="">หมวดหมู่ทั้งหมด</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>

                            <select
                                className="books-filter-bar__select"
                                value={filterAuthor}
                                onChange={(e) => setFilterAuthor(e.target.value)}
                            >
                                <option value="">ผู้แต่งทั้งหมด</option>
                                {authors.map((author) => (
                                    <option key={author.id} value={author.id}>{author.name}</option>
                                ))}
                            </select>

                            {hasActiveFilter && (
                                <button
                                    className="books-filter-bar__reset"
                                    onClick={handleResetFilter}
                                >
                                    ล้างตัวกรอง ✕
                                </button>
                            )}

                            <span className="books-filter-bar__count">
                                แสดง <strong>{filteredBooks.length}</strong> / {books.length} เล่ม
                            </span>
                        </div>

                        {/* ── Main grid ── */}
                        <div className="books-grid">
                            {/* Left: Form */}
                            <div>
                                <p className="books-section-label">เพิ่มหนังสือใหม่</p>
                                <BookForm
                                    categories={categories}
                                    authors={authors}
                                    onSubmit={handleAddBook}
                                />
                            </div>

                            {/* Right: List */}
                            <div>
                                <p className="books-section-label">
                                    รายการหนังสือ
                                    {hasActiveFilter
                                        ? ` (กรองแล้ว: ${filteredBooks.length} เล่ม)`
                                        : ` (${books.length} เล่ม)`}
                                </p>
                                <BookList
                                    books={filteredBooks}
                                    onDelete={handleDeleteRequest}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default BooksPage;
