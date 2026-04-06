import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";

// Komponen sederhana untuk halaman Daftar
const RegisterPage = () => (
  <div style={{ padding: "50px", textAlign: "center" }}>
    <h1>Halaman Pendaftaran</h1>
    <p>Mari bergabung dengan FlexiStudy!</p>
    <a href="/">Kembali ke Beranda</a>
  </div>
);

// Komponen sederhana untuk halaman Login
const LoginPage = () => (
  <div style={{ padding: "50px", textAlign: "center" }}>
    <h1>Halaman Login</h1>
    <a href="/">Kembali ke Beranda</a>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;