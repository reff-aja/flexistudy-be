import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleLogin = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
  
    try {
      const response = await fetch('http://127.0.0.1:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email, 
          password: password 
        }),
      });

      const data = await response.json();

      if (data.status === "sukses") {
        alert("Berhasil: " + data.pesan);
      } else {
        alert("Gagal: " + data.pesan);
      }
    } catch (error) {
      console.error(error);
      alert("Gagal konek ke server! Pastikan FastAPI sudah jalan.");
    }
  };

  return (
    <div className="auth-container">
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
              style={{ letterSpacing: '4px' }} 
              defaultValue="password"
            />
          </div>
          
          <div className="forgot">Lupa password?</div>
          
          <Link to="/pages/landingPage"><button onClick={handleLogin} className="btn-full">Masuk ke FlexiStudy</button></Link>

          <div className="switch">
            Belum punya akun? <Link to="/register"><span>Daftar gratis</span></Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Login;