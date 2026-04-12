import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../App';
import './auth.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useApp();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        login({
          name: data.data.nama_depan + ' ' + data.data.nama_belakang,
          email: data.data.email,
          kelas: data.data.kelas || 'Pelajar',
        });
        alert("Login berhasil!");
        navigate("/dashboard");
      } else {
        alert("Gagal: " + (data.detail || data.pesan || "Email / password salah"));
      }
    } catch (error) {
      console.error("ERROR:", error);
      alert("Gagal konek ke backend!");
    }
  };

  return (
    <div className="auth-container fade-in">
      <div className="panel">
        <div className="panel-label">Login</div>
        <div className="card">
          <div className="card-illo">🎓</div>
          <div className="card-title">Selamat Datang!</div>
          <div className="card-sub">Masuk untuk melanjutkan perjalanan belajarmu</div>

          <form onSubmit={handleLogin}>
            <div className="field">
              <label>Alamat Email</label>
              <input
                type="email"
                className="finput"
                placeholder="Alamat Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Password</label>
              <input
                type="password"
                className="finput"
                placeholder="Masukan Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="forgot">Lupa password?</div>

            <button type="submit" className="btn-full">
              Masuk ke FlexiStudy
            </button>
          </form>

          <div className="switch">
            Belum punya akun? <Link to="/register"><span>Daftar gratis</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;