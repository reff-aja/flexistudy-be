import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../App';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useApp(); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('${process.env.REACT_APP_API_URL}/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.status === "sukses") {
        login({
          name: data.data.nama,
          email: data.data.email,
          kelas: data.data.kelas,
          xp: data.data.xp,
          level: data.data.level,
          streak: data.data.streak,
          progress_ipa: data.data.progress_ipa,
          progress_b_indonesia: data.data.progress_b_indonesia,
          progress_b_inggris: data.data.progress_b_inggris,
        });

        if (data.xp_bonus > 0) {
          alert(`🔥 Login streak: ${data.data.streak} hari! +${data.xp_bonus} XP`);
        }
        navigate("/dashboard");
      } else {
        alert("Gagal: " + (data.detail || data.pesan));
      }
    } catch (error) {
      alert("Gagal konek ke server! Pastikan FastAPI sudah jalan.");
    } finally {
      setLoading(false);
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
          
          <div className="field">
            <label>Alamat Email</label>
            <input
              type="email"
              className="finput"
              placeholder="Alamat Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            />
          </div>
          
          <div className="forgot">Lupa password?</div>
          
          <button onClick={handleLogin} className="btn-full" disabled={loading}>
            {loading ? "Memuat..." : "Masuk ke FlexiStudy"}
          </button>

          <div className="switch">
            Belum punya akun? <Link to="/register"><span>Daftar gratis</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;