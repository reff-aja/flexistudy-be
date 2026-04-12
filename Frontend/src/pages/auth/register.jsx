import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './auth.css';

const Register = () => {
  const [namaDepan, setNamaDepan] = useState("");
  const [namaBelakang, setNamaBelakang] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [kelas, setKelas] = useState("SD");
  const navigate = useNavigate();

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
          password: password,
          kelas: kelas,
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
      alert("Gagal konek ke server!");
    }
  };

  return (
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

          <form onSubmit={handleRegister}>
            <div className="row2">
              <div className="field">
                <label>Nama Depan</label>
                <input
                  type="text"
                  className="finput"
                  placeholder="Nama Depan"
                  value={namaDepan}
                  onChange={(e) => setNamaDepan(e.target.value)}
                  required
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
                type="email"
                placeholder="Masukan alamat email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="finput"
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
              <select className="finput" value={kelas} onChange={(e) => setKelas(e.target.value)}>
                <option>SD</option>
                <option>Kelas 7 SMP</option>
                <option>Kelas 8 SMP</option>
                <option>Kelas 9 SMP</option>
                <option>Kelas 10 SMA</option>
                <option>Kelas 11 SMA</option>
                <option>Kelas 12 SMA</option>
              </select>
            </div>

            <button type="submit" className="btn-full">Lanjut ke Tes Awal →</button>
          </form>

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