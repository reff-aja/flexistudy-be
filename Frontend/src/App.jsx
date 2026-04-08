import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Dashboard from "./pages/dashboard";

export const AppContext = createContext(null);
export function useApp() { return useContext(AppContext); }

const FAKE_USERS = [
  { email: "sari@email.com", password: "password", name: "Sari Amelia", kelas: "Kelas 10 SMA" },
];

function App() {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("fs_user")) || null; } catch { return null; }
  });
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("fs_dark") === "1");
  const [ttsEnabled, setTtsEnabled] = useState(() => localStorage.getItem("fs_tts") === "1");
  const [highContrast, setHighContrast] = useState(() => localStorage.getItem("fs_hc") === "1");

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", darkMode ? "dark" : "light");
    root.setAttribute("data-hc", highContrast ? "1" : "0");
    localStorage.setItem("fs_dark", darkMode ? "1" : "0");
    localStorage.setItem("fs_hc", highContrast ? "1" : "0");
  }, [darkMode, highContrast]);

  useEffect(() => {
    localStorage.setItem("fs_tts", ttsEnabled ? "1" : "0");
  }, [ttsEnabled]);

  const login = () => {
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Halaman Pendaftaran</h1>
      <p>Mari bergabung dengan FlexiStudy!</p>
      <a href="/">Kembali ke Beranda</a>  
    </div>
  };

  const register = () => {
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h1>Halaman Login</h1>
      <a href="/">Kembali ke Beranda</a>
    </div>
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("fs_user");
  };

  const speak = (text) => {
    if (!ttsEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = "id-ID";
    utt.rate = 0.92;
    window.speechSynthesis.speak(utt);
  };

  const ctx = { user, login, register, logout, darkMode, setDarkMode, ttsEnabled, setTtsEnabled, highContrast, setHighContrast, speak };

  return (
    <AppContext.Provider value={ctx}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/login" /> : <Register />} />
          <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
