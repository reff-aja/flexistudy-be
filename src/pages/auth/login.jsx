import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../App';
import './auth.css';

const Login = () => {
  const { login, speak } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!email) e.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Format email tidak valid';
    if (!password) e.password = 'Password wajib diisi';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    setError('');
    if (!validate()) return;

    setLoading(true);
    await new Promise(r => setTimeout(r, 600)); // simulate network
    const res = login(email, password);
    setLoading(false);

    if (res.ok) {
      speak('Selamat datang kembali di FlexiStudy!');
      navigate('/dashboard');
    } else {
      setError(res.msg);
      speak(res.msg);
    }
  };

  const handleKey = (e) => { if (e.key === 'Enter') handleSubmit(); };

  return (
    <div className="auth-page">
      {/* Left Panel */}
      <div className="auth-left">
        <Link to="/" className="al-logo">
          <div className="al-li">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L11.5 4V10L7 13L2.5 10V4L7 1Z" stroke="#fff" strokeWidth="1.5"/>
              <circle cx="7" cy="7" r="2" fill="#fff"/>
            </svg>
          </div>
          <span className="al-name">FlexiStudy</span>
        </Link>

        <div className="al-content">
          <div className="al-tag">Platform Belajar Adaptif</div>
          <div className="al-title">Lanjutkan perjalanan belajarmu</div>
          <div className="al-desc">
            Ribuan pelajar sudah merasakan manfaat FlexiStudy. Sistem adaptif kami akan menyesuaikan materi sesuai kemampuanmu secara otomatis.
          </div>
        </div>

        <div className="al-stats">
          <div className="al-stat">
            <div className="al-stat-n">120K+</div>
            <div className="al-stat-l">Pelajar aktif</div>
          </div>
          <div className="al-stat">
            <div className="al-stat-n">96%</div>
            <div className="al-stat-l">Tingkat kepuasan</div>
          </div>
          <div className="al-stat">
            <div className="al-stat-n">800+</div>
            <div className="al-stat-l">Materi</div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-card">
          <div className="card-illo">🎓</div>
          <div className="card-title">Selamat Datang!</div>
          <div className="card-sub">Masuk untuk melanjutkan perjalanan belajarmu</div>

          {error && (
            <div className="alert alert-error">⚠️ {error}</div>
          )}

          <div className="field">
            <label>Alamat Email</label>
            <input
              type="email"
              className={`finput${errors.email ? ' error' : ''}`}
              placeholder="nama@email.com"
              value={email}
              onChange={e => { setEmail(e.target.value); setErrors(v => ({ ...v, email: '' })); }}
              onKeyDown={handleKey}
            />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className="field">
            <label>Password</label>
            <input
              type="password"
              className={`finput${errors.password ? ' error' : ''}`}
              placeholder="••••••••"
              value={password}
              onChange={e => { setPassword(e.target.value); setErrors(v => ({ ...v, password: '' })); }}
              onKeyDown={handleKey}
            />
            {errors.password && <div className="field-error">{errors.password}</div>}
          </div>

          <div className="forgot" onClick={() => speak('Fitur lupa password akan segera tersedia.')}>
            Lupa password?
          </div>

          <button
            className={`btn-full${loading ? ' loading' : ''}`}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Masuk ke FlexiStudy'}
          </button>

          <div className="divider">
            <div className="dline"></div>
            <div className="dtxt">atau masuk dengan</div>
            <div className="dline"></div>
          </div>

          <div className="oauth">
            <div className="obtn" onClick={() => speak('Login dengan Google belum tersedia.')}>🌐 Google</div>
            <div className="obtn" onClick={() => speak('Login dengan Facebook belum tersedia.')}>📘 Facebook</div>
          </div>

          <div className="switch">
            Belum punya akun? <Link to="/register">Daftar gratis</Link>
          </div>

          <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '11px', color: 'var(--ts)' }}>
            💡 Demo: <strong>sari@email.com</strong> / <strong>password</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
