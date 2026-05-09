import React, { createContext, useContext, useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import Dashboard from "./pages/dashboard";
import MateriIPA from "./pages/MateriIPA";
import MateriBahasaIndonesia from "./pages/MateriBahasaIndonesia";
import MateriBahasaInggris from "./pages/MateriBahasaInggris";

export const AppContext = createContext(null);
export function useApp() { return useContext(AppContext); }

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

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("fs_user", JSON.stringify(userData));
  };

  const register = (userData) => {
    setUser(userData);
    localStorage.setItem("fs_user", JSON.stringify(userData));
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/materi/ipa" element={<MateriIPA />} />
          <Route path="/materi/bahasa-indonesia" element={<MateriBahasaIndonesia />} />
          <Route path="/materi/bahasa-inggris" element={<MateriBahasaInggris />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;