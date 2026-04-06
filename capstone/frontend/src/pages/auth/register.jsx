import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nama_depan: namaDepan, 
         nama_belakang: namaBelakang,
         email: email, 
         password: password 
       }),
      });
     const data = await response.json();
     alert(data.pesan);
   } catch (error) {
      alert("Gagal konek ke server!");
   }
  };

  return (
    <div className="auth-container">
    <div className="auth-container fade-in">
      <div className="panel">
        <div className="panel-label">Register</div>
        <div className="card">
          <div className="step-indicator">
            <div className="step-dot active"></div>
            <div className="step-dot active"></div>
            <div className="step-dot"></div>
          </div>

          <div className="card-title">Buat Akun Baru</div>
          <div className="card-sub">Selesaikan daftar akun mu yuk!</div>
          
          <div className="row2">
            <div className="field">
              <label>Nama Depan</label>
              <input type="text" className="finput" defaultValue="Sari" />
            </div>
            <div className="field">
              <label>Nama Belakang</label>
              <input type="text" className="finput" defaultValue="Amelia" />
            </div>
          </div>
          
          <div className="field">
            <label>Alamat Email</label>
            <input 
            type='email'
            placeholder=' Masukan alamat email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='finput'
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
            <div className="strength">
              <div className="strength-bar">
                <div className="sb fill"></div>
                <div className="sb fill"></div>
                <div className="sb fill"></div>
                <div className="sb"></div>
              </div>
              <div className="strength-lbl">Kekuatan: Kuat</div>
            </div>
          </div>
          
          <div className="field">
            <label>Tingkatan Kelas</label>
            <select className="finput">
              <option>SD</option>
              <option>Kelas 7 SMP</option>
              <option>Kelas 8 SMP</option>
              <option>Kelas 9 SMP</option>
              <option>Kelas 10 SMA</option>
              <option>Kelas 11 SMA</option>
              <option>Kelas 12 SMA</option>
            </select>
          </div>
          
          <Link to="/login"><button onClick={handleLanjut} className="btn-full" >Lanjut ke Tes Awal →</button></Link>
          
          <div className="switch">
            Sudah punya akun? <Link to="/login"><span>Masuk</span></Link>
          </div>
          
          <div className="terms">
            Dengan mendaftar, kamu menyetujui <span>Syarat Layanan</span> dan <span>Kebijakan Privasi</span> kami.
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Register;