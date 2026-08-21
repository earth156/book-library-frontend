import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/authService';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import './login.css';

/* ── SVG Icons ── */
const IconUser = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
);

const IconLock = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
);

/* ── Book logo mark ── */
const BookLogo = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="7" fill="#1c1410" />
        <rect x="8" y="7" width="11" height="18" rx="1.5" fill="#92400e" />
        <rect x="8" y="7" width="3" height="18" rx="1" fill="#78350f" />
        <rect x="12" y="11" width="5" height="1.5" rx="0.75" fill="#fcd34d" opacity="0.8" />
        <rect x="12" y="14" width="4" height="1.5" rx="0.75" fill="#fcd34d" opacity="0.6" />
        <rect x="15.5" y="7.5" width="8.5" height="17" rx="1.5" fill="#b45309" />
        <rect x="15.5" y="7.5" width="2.5" height="17" rx="1" fill="#92400e" />
        <rect x="19" y="12" width="3.5" height="1.5" rx="0.75" fill="#fef3c7" opacity="0.7" />
        <rect x="19" y="15" width="2.5" height="1.5" rx="0.75" fill="#fef3c7" opacity="0.5" />
    </svg>
);

/* ── Bookshelf illustration ── */
const BookshelfIllustration = () => (
    <svg className="login-left__illustration" viewBox="0 0 420 260" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="210" cy="248" rx="160" ry="8" fill="#0a0f1a" />
        <rect x="28" y="210" width="364" height="8" rx="2" fill="#1e293b" />
        <rect x="28" y="208" width="364" height="3" rx="1.5" fill="#334155" />
        {/* Book 1 */}
        <rect x="45" y="108" width="36" height="102" rx="2" fill="#7c2d12" />
        <rect x="45" y="108" width="7" height="102" rx="2" fill="#6b2010" />
        <rect x="54" y="138" width="18" height="1.5" rx="0.75" fill="#fed7aa" opacity="0.55" />
        <rect x="54" y="142" width="14" height="1.5" rx="0.75" fill="#fed7aa" opacity="0.4" />
        <rect x="54" y="146" width="16" height="1.5" rx="0.75" fill="#fed7aa" opacity="0.3" />
        {/* Book 2 */}
        <rect x="85" y="145" width="20" height="65" rx="2" fill="#3b0764" />
        <rect x="85" y="145" width="4" height="65" rx="2" fill="#2e065a" />
        <rect x="91" y="165" width="9" height="1.5" rx="0.75" fill="#c4b5fd" opacity="0.6" />
        <rect x="91" y="169" width="7" height="1.5" rx="0.75" fill="#c4b5fd" opacity="0.4" />
        {/* Book 3 */}
        <rect x="109" y="98" width="40" height="112" rx="2" fill="#134e4a" />
        <rect x="109" y="98" width="7" height="112" rx="2" fill="#0f3d3a" />
        <rect x="118" y="128" width="22" height="1.5" rx="0.75" fill="#99f6e4" opacity="0.5" />
        <rect x="118" y="133" width="16" height="1.5" rx="0.75" fill="#99f6e4" opacity="0.35" />
        <rect x="118" y="138" width="19" height="1.5" rx="0.75" fill="#99f6e4" opacity="0.3" />
        {/* Book 4 — leaning */}
        <g transform="rotate(-4 155 185)">
            <rect x="152" y="138" width="26" height="72" rx="2" fill="#1e293b" />
            <rect x="152" y="138" width="5" height="72" rx="2" fill="#0f172a" />
            <rect x="159" y="160" width="13" height="1.5" rx="0.75" fill="#94a3b8" opacity="0.5" />
        </g>
        {/* Book 5 — featured */}
        <rect x="185" y="82" width="50" height="128" rx="2" fill="#92400e" />
        <rect x="185" y="82" width="9" height="128" rx="3" fill="#78350f" />
        <rect x="196" y="112" width="28" height="2" rx="1" fill="#fcd34d" opacity="0.8" />
        <rect x="196" y="117" width="22" height="1.5" rx="0.75" fill="#fcd34d" opacity="0.6" />
        <rect x="196" y="122" width="25" height="1.5" rx="0.75" fill="#fcd34d" opacity="0.5" />
        <rect x="218" y="79" width="7" height="22" rx="1" fill="#d97706" />
        <polygon points="218,101 225,101 221.5,107" fill="#b45309" />
        {/* Book 6 */}
        <rect x="239" y="152" width="18" height="58" rx="2" fill="#7f1d1d" />
        <rect x="239" y="152" width="4" height="58" rx="2" fill="#6b1a1a" />
        <rect x="245" y="172" width="8" height="1.5" rx="0.75" fill="#fca5a5" opacity="0.5" />
        {/* Book 7 */}
        <rect x="261" y="116" width="38" height="94" rx="2" fill="#1e3a5f" />
        <rect x="261" y="116" width="6" height="94" rx="2" fill="#162d4a" />
        <rect x="269" y="146" width="22" height="1.5" rx="0.75" fill="#93c5fd" opacity="0.5" />
        <rect x="269" y="151" width="16" height="1.5" rx="0.75" fill="#93c5fd" opacity="0.35" />
        {/* Book 8 */}
        <rect x="303" y="145" width="18" height="65" rx="2" fill="#14532d" />
        <rect x="303" y="145" width="4" height="65" rx="2" fill="#0f3d22" />
        <rect x="309" y="165" width="8" height="1.5" rx="0.75" fill="#86efac" opacity="0.5" />
        {/* Book 9 */}
        <rect x="325" y="130" width="42" height="80" rx="2" fill="#292524" />
        <rect x="325" y="130" width="7" height="80" rx="2" fill="#1c1917" />
        <rect x="334" y="158" width="22" height="1.5" rx="0.75" fill="#a8a29e" opacity="0.45" />
        <rect x="334" y="163" width="16" height="1.5" rx="0.75" fill="#a8a29e" opacity="0.3" />
        <ellipse cx="210" cy="218" rx="100" ry="5" fill="#d97706" opacity="0.06" />
    </svg>
);

/* ─── Component ─── */
const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await authService.login(username, password);
            localStorage.setItem('token', data.token);
            navigate('/books');
        } catch (err) {
            setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            {/* ── Left panel ── */}
            <div className="login-left">
                <div className="login-left__warm-layer" />
                <BookshelfIllustration />
                <div className="login-left__rule" />
                <h1 className="login-left__heading">
                    คลังหนังสือ<br />
                    <span>ส่วนตัวของคุณ</span>
                </h1>
                <p className="login-left__body">
                    ค้นหา จัดการ และค้นพบหนังสือในทุกหมวดหมู่ — ได้ในที่เดียว
                </p>
            </div>

            {/* ── Right panel ── */}
            <div className="login-right">
                <div className="login-card">

                    {/* Logo */}
                    <div className="login-logo">
                        <BookLogo />
                        <span className="login-logo__text">BookLib</span>
                    </div>

                    <h2 className="login-heading">เข้าสู่ระบบ</h2>
                    <p className="login-subheading">กรอกข้อมูลเพื่อเข้าใช้งาน</p>

                    {/* Error — ใช้ react-bootstrap Alert */}
                    {error && (
                        <Alert
                            variant="danger"
                            className="login-alert"
                            onClose={() => setError('')}
                            dismissible
                        >
                            {error}
                        </Alert>
                    )}

                    {/* Form — ใช้ react-bootstrap Form */}
                    <Form id="login-form" onSubmit={handleLogin} className="login-form">

                        <Form.Group className="login-field" controlId="login-username">
                            <Form.Label className="login-label">ชื่อผู้ใช้</Form.Label>
                            <div className="login-input-wrap">
                                <span className="login-input-icon"><IconUser /></span>
                                <Form.Control
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="กรอกชื่อผู้ใช้ของคุณ"
                                    required
                                    autoComplete="username"
                                    className="login-input"
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="login-field" controlId="login-password">
                            <Form.Label className="login-label">รหัสผ่าน</Form.Label>
                            <div className="login-input-wrap">
                                <span className="login-input-icon"><IconLock /></span>
                                <Form.Control
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                    className="login-input"
                                />
                            </div>
                        </Form.Group>

                        <Button
                            id="login-submit-btn"
                            type="submit"
                            disabled={loading}
                            className="login-btn"
                        >
                            {loading ? (
                                <>
                                    <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                        className="me-2"
                                    />
                                    กำลังเข้าสู่ระบบ…
                                </>
                            ) : (
                                'เข้าสู่ระบบ'
                            )}
                        </Button>
                    </Form>

                    <p className="login-footer">© {new Date().getFullYear()} ระบบห้องสมุดหนังสือ</p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;