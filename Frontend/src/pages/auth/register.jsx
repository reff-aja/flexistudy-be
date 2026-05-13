import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

const Register = () => {
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [tingkatanKelas, setTingkatanKelas] = useState("SD"); // ✅ Tambah state
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://flexistudy-be-production-f89d.up.railway.app', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          nama_depan: namaDepan, 
          nama_belakang: namaBelakang,
          email: email, 
          password: password,
          tingkatan_kelas: tingkatanKelas  // ✅ Kirim ke backend
        }),
      });

      const data = await response.json();

      if (data.status === "sukses") {
        alert(data.pesan);
        navigate("/login");
      } else {
        alert("Gagal daftar: " + data.pesan);
      }

    } catch (error) {
      console.error(error);
      alert("Gagal konek ke server!");
    }
  };

  return (
    // ✅ FIX: Hapus div auth-container duplikat
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
              <input 
                type="text"
                className="finput"
                placeholder="Nama Depan"
                value={namaDepan}
                onChange={(e) => setNamaDepan(e.target.value)}
              />
            </div>
            <div className="field">
              <label>Nama Belakang</label>
              <input 
                type="text" 
                className="finput"  
                placeholder="Nama Belakang"
                value={namaBelakang}
                onChange={(e) => setNamaBelakang(e.target.value)}
              />
            </div>
          </div>
          
          <div className="field">
            <label>Alamat Email</label>
            <input 
              type='email'
              placeholder='Masukan alamat email'
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
              placeholder="Masukan Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
            {/* ✅ FIX: Tambah value dan onChange agar data terkirim */}
            <select 
              className="finput"
              value={tingkatanKelas}
              onChange={(e) => setTingkatanKelas(e.target.value)}
            >
              <option value="SD">SD</option>
              <option value="Kelas 7 SMP">Kelas 7 SMP</option>
              <option value="Kelas 8 SMP">Kelas 8 SMP</option>
              <option value="Kelas 9 SMP">Kelas 9 SMP</option>
              <option value="Kelas 10 SMA">Kelas 10 SMA</option>
              <option value="Kelas 11 SMA">Kelas 11 SMA</option>
              <option value="Kelas 12 SMA">Kelas 12 SMA</option>
            </select>
          </div>
          
          <button type="button" onClick={handleRegister} className="btn-full">
            Lanjut ke Tes Awal →
          </button>
          
          <div className="switch">
            Sudah punya akun? <Link to="/login"><span>Masuk</span></Link>
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
