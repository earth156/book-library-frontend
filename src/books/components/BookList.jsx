import '../books.css';

const BookList = ({ books, onDelete }) => {
    if (books.length === 0) {
        return (
            <div className="book-list-card">
                <div className="book-list__empty">
                    <span className="book-list__empty-icon">📚</span>
                    <p className="book-list__empty-text">ไม่พบหนังสือที่ตรงกับเงื่อนไข</p>
                </div>
            </div>
        );
    }

    return (
        <div className="book-list-card">
            <div className="book-list-wrapper">
                <table className="book-list-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>ชื่อหนังสือ</th>
                            <th>หมวดหมู่</th>
                            <th>ผู้แต่ง</th>
                            <th className="col-center">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book, index) => (
                            <tr key={book.id}>
                                <td className="col-index">{index + 1}</td>
                                <td className="col-title">{book.title}</td>
                                <td className="col-badge">
                                    {book.category
                                        ? <span className="badge badge--category">{book.category.name}</span>
                                        : '—'}
                                </td>
                                <td className="col-badge">
                                    {book.author
                                        ? <span className="badge badge--author">{book.author.name}</span>
                                        : '—'}
                                </td>
                                <td className="col-center">
                                    <button
                                        className="book-list__delete-btn"
                                        onClick={() => onDelete(book)}
                                    >
                                        ลบ
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default BookList;
