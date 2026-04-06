import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../App';
import './auth.css';

const getStrength = (pw) => {
  if (!pw) return { score: 0, label: '', bars: [false, false, false, false] };
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ['', 'Lemah', 'Cukup', 'Kuat', 'Sangat Kuat'];
  const classes = ['', 'fill-weak', 'fill-ok', 'fill-strong', 'fill-strong'];
  return {
    score,
    label: labels[score],
    cls: classes[score],
    bars: [score >= 1, score >= 2, score >= 3, score >= 4],
  };
};

const Register = () => {
  const { register, speak } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ namaDepan: '', namaBelakang: '', email: '', password: '', kelas: 'Kelas 10 SMA' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const strength = getStrength(form.password);

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]: v }));
    setErrors(e => ({ ...e, [k]: '' }));
  };

  const validate = () => {
    const e = {};
    if (!form.namaDepan.trim()) e.namaDepan = 'Nama depan wajib diisi';
    if (!form.namaBelakang.trim()) e.namaBelakang = 'Nama belakang wajib diisi';
    if (!form.email) e.email = 'Email wajib diisi';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Format email tidak valid';
    if (!form.password) e.password = 'Password wajib diisi';
    else if (form.password.length < 6) e.password = 'Password minimal 6 karakter';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    register(form);
    speak(`Selamat datang di FlexiStudy, ${form.namaDepan}! Akun berhasil dibuat.`);
    navigate('/dashboard');
  };

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
          <div className="al-tag">Bergabung Sekarang</div>
          <div className="al-title">Mulai belajar tanpa batas, gratis selamanya</div>
          <div className="al-desc">
            Daftar hanya dalam 30 detik. Tidak perlu kartu kredit. Akses langsung ke ratusan materi adaptif sesuai kelasmu.
          </div>
        </div>

        <div className="al-stats">
          <div className="al-stat">
            <div className="al-stat-n">Gratis</div>
            <div className="al-stat-l">Untuk selamanya</div>
          </div>
          <div className="al-stat">
            <div className="al-stat-n">30 dtk</div>
            <div className="al-stat-l">Waktu daftar</div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="auth-right">
        <div className="auth-card">
          <div className="step-indicator">
            <div className="step-dot active"></div>
            <div className="step-dot active"></div>
            <div className="step-dot"></div>
          </div>

          <div className="card-title">Buat Akun Baru</div>
          <div className="card-sub">Langkah 1 dari 2 — Informasi Akun</div>

          <div className="row2">
            <div className="field">
              <label>Nama Depan</label>
              <input type="text" className={`finput${errors.namaDepan ? ' error' : ''}`} placeholder="Sari"
                value={form.namaDepan} onChange={e => set('namaDepan', e.target.value)} />
              {errors.namaDepan && <div className="field-error">{errors.namaDepan}</div>}
            </div>
            <div className="field">
              <label>Nama Belakang</label>
              <input type="text" className={`finput${errors.namaBelakang ? ' error' : ''}`} placeholder="Amelia"
                value={form.namaBelakang} onChange={e => set('namaBelakang', e.target.value)} />
              {errors.namaBelakang && <div className="field-error">{errors.namaBelakang}</div>}
            </div>
          </div>

          <div className="field">
            <label>Alamat Email</label>
            <input type="email" className={`finput${errors.email ? ' error' : ''}`} placeholder="nama@email.com"
              value={form.email} onChange={e => set('email', e.target.value)} />
            {errors.email && <div className="field-error">{errors.email}</div>}
          </div>

          <div className="field">
            <label>Password</label>
            <input type="password" className={`finput${errors.password ? ' error' : ''}`} placeholder="Minimal 6 karakter"
              value={form.password} onChange={e => set('password', e.target.value)} />
            {form.password && (
              <div className="strength">
                <div className="strength-bar">
                  {strength.bars.map((filled, i) => (
                    <div key={i} className={`sb${filled ? ' ' + strength.cls : ''}`}></div>
                  ))}
                </div>
                <div className="strength-lbl" style={{ color: strength.score <= 1 ? 'var(--red)' : strength.score === 2 ? 'var(--orange)' : 'var(--green)' }}>
                  Kekuatan: {strength.label}
                </div>
              </div>
            )}
            {errors.password && <div className="field-error">{errors.password}</div>}
          </div>

          <div className="field">
            <label>Tingkatan Kelas</label>
            <select className="finput" value={form.kelas} onChange={e => set('kelas', e.target.value)}>
              <option>SD Kelas 4</option>
              <option>SD Kelas 5</option>
              <option>SD Kelas 6</option>
              <option>Kelas 7 SMP</option>
              <option>Kelas 8 SMP</option>
              <option>Kelas 9 SMP</option>
              <option>Kelas 10 SMA</option>
              <option>Kelas 11 SMA</option>
              <option>Kelas 12 SMA</option>
            </select>
          </div>

          <button className={`btn-full${loading ? ' loading' : ''}`} onClick={handleSubmit} disabled={loading}>
            {loading ? 'Membuat akun...' : 'Lanjut ke Tes Awal →'}
          </button>

          <div className="switch">
            Sudah punya akun? <Link to="/login">Masuk</Link>
          </div>

          <div className="terms">
            Dengan mendaftar, kamu menyetujui <span>Syarat Layanan</span> dan <span>Kebijakan Privasi</span> kami.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
