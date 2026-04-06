import React from 'react';
import { Link } from "react-router-dom";
import '../App.css';

const LandingPage = () => {
  return (
    <div className="frame">
      {/* Navigation */}
      <nav className="nav">
        <div className="logo">
          <div className="li">
            
          </div>
          <span className="ln">Flexi<span>Study</span></span>
        </div>
        <div className="nav-links">
          <span>Fitur</span>
          <span>Materi</span>
          <span>Harga</span>
          <span>Tentang</span>
        </div>
        <div className="nb">
          <button className="bg">Masuk</button>
          <button className="bp">Mulai Gratis</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero">
        <div>
          <div className="hbadge">
            <span className="hdot"></span> Platform Belajar Adaptif #1
          </div>
          <h1>Belajar <em>Fleksibel</em>,<br />Tumbuh Bersama</h1>
          <p className="hp">
            FlexiStudy menyesuaikan materi dengan kemampuanmu agar setiap pelajar dari berbagai latar belakang punya kesempatan belajar yang sama.
          </p>
          <div className="hbtns">
            <button className="bpl">Mulai Belajar Gratis</button>
            <button className="bsl">Lihat Demo</button>
          </div>
          <div className="stats">
            <div><div className="sn">120K+</div><div className="sl">Pelajar aktif</div></div>
            <div><div className="sn">800+</div><div className="sl">Materi tersedia</div></div>
            <div><div className="sn">96%</div><div className="sl">Tingkat kepuasan</div></div>
          </div>
        </div>

        <div>
          <div className="fbadge" style={{ fontSize: '16px' }}>
            🏆 <span>Level naik! +125 XP</span>
          </div>
          <div className="hcard">
            <div className="hh">
              <div className="av">SA</div>
              <div>
                <div className="aname">Sari Amelia</div>
                <div className="asub">Kelas 10 · Level Menengah</div>
              </div>
              <div className="abadge">Aktif</div>
            </div>
            <div className="prow">
              <span style={{ fontSize: '11px', fontWeight: 600 }}>Progress Minggu Ini</span>
              <span>68%</span>
            </div>
            <div className="bar">
              <div className="bf" style={{ width: '68%' }}></div>
            </div>
            <div className="subs">
              <SubjectItem emoji="📐" title="Matematika" desc="Aljabar · 72%" bg="#EEF2FF" />
              <SubjectItem emoji="🔬" title="Sains" desc="Biologi · 55%" bg="#F0FDF4" />
              <SubjectItem emoji="🌍" title="Bahasa Ind." desc="Narasi · 83%" bg="#FFF7ED" />
              <SubjectItem emoji="🎵" title="Seni Budaya" desc="Musik · 40%" bg="#FDF4FF" />
            </div>
          </div>
          <div className="fbadge" style={{ marginTop: '8px', fontSize: '14px' }}>
            🎙️ <span>Text-to-Speech aktif</span>
          </div>
        </div>
      </div>

      {/* Features Strip */}
      <div className="fstrip">
        <FeatureCard 
          emoji="🧠" title="Pembelajaran Adaptif" 
          desc="Materi otomatis menyesuaikan performa belajarmu" bg="#EEE8FD" 
        />
        <FeatureCard 
          emoji="🔊" title="Text-to-Speech" 
          desc="Dengarkan materi kapan saja untuk aksesibilitas" bg="#EFF4FF" 
        />
        <FeatureCard 
          emoji="🎯" title="Pelacakan Progress" 
          desc="Pantau pertumbuhan belajar dengan grafik jelas" bg="#F0FDF4" 
        />
        <FeatureCard 
          emoji="🌙" title="Dark & High Contrast" 
          desc="Tampilan fleksibel untuk kenyamanan mata" bg="#FFF7ED" 
        />
      </div>

      {/* Steps Section */}
      <div className="sh">
        <div className="slabel">Cara Kerja</div>
        <h2>Tiga Langkah Mudah Menuju Prestasi</h2>
        <p>Dirancang agar siapa pun bisa langsung mulai tanpa kebingungan</p>
      </div>

      <div className="steps">
        <StepCard 
          num="01" emoji="👤" title="Buat Akun & Tes Awal" 
          desc="Daftar gratis dan ikuti tes singkat untuk menentukan level awalmu secara akurat." 
        />
        <StepCard 
          num="02" emoji="📚" title="Belajar Sesuai Levelmu" 
          desc="Sistem otomatis merekomendasikan materi yang pas. Tingkat kesulitan naik seiring kemajuanmu." 
        />
        <StepCard 
          num="03" emoji="🏆" title="Raih Badge & Level Up" 
          desc="Setiap pencapaian dihargai dengan badge dan XP. Pantau perjalananmu secara real-time." 
        />
      </div>

      {/* CTA Section */}
      <div className="cta">
        <h2>Mulai Perjalanan Belajarmu Hari Ini — Gratis!</h2>
        <p>Lebih dari 120.000 pelajar sudah merasakan manfaatnya. Sekarang giliran kamu.</p>
        <Link to="/register" className="bw" style={{ textDecoration: 'none', display: 'inline-block' }}>
            Daftar Gratis Sekarang →
        </Link>
      </div>
    </div>
  );
};

/* Sub-komponen pendukung */
const SubjectItem = ({ emoji, title, desc, bg }) => (
  <div className="sub">
    <div className="si" style={{ background: bg }}>{emoji}</div>
    <div>
      <div className="sn2">{title}</div>
      <div className="sp">{desc}</div>
    </div>
  </div>
);

const FeatureCard = ({ emoji, title, desc, bg }) => (
  <div className="fc">
    <div className="fi" style={{ background: bg }}>{emoji}</div>
    <div className="ft">{title}</div>
    <div className="fd">{desc}</div>
  </div>
);

const StepCard = ({ num, emoji, title, desc }) => (
  <div className="sc">
    <span className="snum">{num}</span>
    <div className="sic">{emoji}</div>
    <div className="stitle">{title}</div>
    <div className="sdesc">{desc}</div>
  </div>
);

export default LandingPage;