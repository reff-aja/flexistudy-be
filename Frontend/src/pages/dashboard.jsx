import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import './dashboard.css';

const SUBJECTS = [
  { id: 1, emoji: '📐', title: 'Matematika', topic: 'Aljabar Linear', progress: 72, xp: 340, color: '#EEF2FF' },
  { id: 2, emoji: '🔬', title: 'Sains', topic: 'Biologi Sel', progress: 55, xp: 210, color: '#F0FDF4' },
  { id: 3, emoji: '🌍', title: 'Bahasa Indonesia', topic: 'Teks Narasi', progress: 83, xp: 410, color: '#FFF7ED' },
  { id: 4, emoji: '🎵', title: 'Seni Budaya', topic: 'Musik Tradisional', progress: 40, xp: 150, color: '#FDF4FF' },
  { id: 5, emoji: '🌐', title: 'Bahasa Inggris', topic: 'Reading Comprehension', progress: 61, xp: 290, color: '#F0F9FF' },
  { id: 6, emoji: '📜', title: 'Sejarah', topic: 'Kemerdekaan RI', progress: 90, xp: 460, color: '#FFF1F2' },
];

const ACTIVITIES = [
  { emoji: '✅', text: 'Menyelesaikan latihan Aljabar — Bab 3', time: '2 jam lalu', xp: '+20 XP' },
  { emoji: '🏆', text: 'Naik ke Level 3!', time: '1 hari lalu', xp: '+50 XP' },
  { emoji: '📖', text: 'Membaca materi Biologi Sel', time: '1 hari lalu', xp: '+10 XP' },
  { emoji: '⭐', text: 'Streak 7 hari berturut-turut', time: '2 hari lalu', xp: '+30 XP' },
];

const QUIZ_QUESTIONS = [
  { q: 'Apa hasil dari 3x + 5 = 20?', options: ['x = 4', 'x = 5', 'x = 6', 'x = 3'], ans: 1 },
  { q: 'Organel sel yang berfungsi sebagai pusat kendali adalah?', options: ['Mitokondria', 'Nukleus', 'Ribosom', 'Lisosom'], ans: 1 },
  { q: 'Siapa proklamator kemerdekaan RI?', options: ['Tan Malaka', 'Sjahrir', 'Soekarno-Hatta', 'Soedirman'], ans: 2 },
];

const Dashboard = () => {
  const { user, logout, darkMode, setDarkMode, ttsEnabled, setTtsEnabled, highContrast, setHighContrast, speak } = useApp();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('beranda');
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);
  const [ttsText, setTtsText] = useState('');
  const [ttsReading, setTtsReading] = useState(false);

  const totalXP = user?.xp || 125;
  const level = user?.level || 3;
  const nextLevelXP = level * 200;
  const xpPercent = Math.min(100, Math.round((totalXP / nextLevelXP) * 100));
  const initials = (user?.name || 'U').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const weekProgress = Math.round(SUBJECTS.reduce((a, s) => a + s.progress, 0) / SUBJECTS.length);

  const handleAnswer = (i) => {
    if (quizAnswered !== null) return;
    const correct = i === QUIZ_QUESTIONS[quizIdx].ans;
    setQuizAnswered(i);
    if (correct) {
      setQuizScore(s => s + 1);
      speak('Benar! Bagus sekali!');
    } else {
      speak(`Salah. Jawaban yang benar adalah ${QUIZ_QUESTIONS[quizIdx].options[QUIZ_QUESTIONS[quizIdx].ans]}`);
    }
  };

  const nextQuestion = () => {
    if (quizIdx + 1 >= QUIZ_QUESTIONS.length) {
      setQuizDone(true);
      speak(`Kuis selesai! Kamu menjawab benar ${quizScore + (quizAnswered === QUIZ_QUESTIONS[quizIdx].ans ? 1 : 0)} dari ${QUIZ_QUESTIONS.length} soal.`);
    } else {
      setQuizIdx(i => i + 1);
      setQuizAnswered(null);
    }
  };

  const resetQuiz = () => { setQuizIdx(0); setQuizAnswered(null); setQuizScore(0); setQuizDone(false); };

  const handleTTSRead = () => {
    if (!ttsText.trim()) { speak('Ketik teks terlebih dahulu.'); return; }
    setTtsReading(true);
    const utt = new SpeechSynthesisUtterance(ttsText);
    utt.lang = 'id-ID';
    utt.rate = 0.92;
    utt.onend = () => setTtsReading(false);
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utt);
  };

  const stopTTS = () => { window.speechSynthesis.cancel(); setTtsReading(false); };

  return (
    <div className="dash-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sb-logo">
          <div className="li">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1L11.5 4V10L7 13L2.5 10V4L7 1Z" stroke="#fff" strokeWidth="1.5"/>
              <circle cx="7" cy="7" r="2" fill="#fff"/>
            </svg>
          </div>
          <span className="ln">Flexi<span>Study</span></span>
        </div>

        <nav className="sb-nav">
          {[
            ['beranda', '🏠', 'Beranda'],
            ['materi', '📚', 'Materi'],
            ['kuis', '🧪', 'Kuis'],
            ['tts', '🔊', 'Text-to-Speech'],
            ['pengaturan', '⚙️', 'Pengaturan'],
          ].map(([id, icon, label]) => (
            <button
              key={id}
              className={`sb-item${activeTab === id ? ' active' : ''}`}
              onClick={() => { setActiveTab(id); speak(label); }}
            >
              <span>{icon}</span> {label}
            </button>
          ))}
        </nav>

        <div className="sb-user">
          <div className="sb-av">{initials}</div>
          <div>
            <div className="sb-name">{user?.name}</div>
            <div className="sb-kelas">{user?.kelas}</div>
          </div>
          <button className="sb-logout" onClick={() => { logout(); navigate('/'); }} title="Keluar">↩</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dash-main">
        {/* Header */}
        <div className="dash-header">
          <div>
            <div className="dash-greeting">Halo, {user?.name?.split(' ')[0]}! 👋</div>
            <div className="dash-sub">Ayo lanjutkan belajar hari ini</div>
          </div>
          <div className="dash-header-right">
            <button className={`nb-icon${darkMode ? ' active' : ''}`} onClick={() => setDarkMode(v => !v)} title="Dark Mode">
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button className={`nb-icon${highContrast ? ' active' : ''}`} onClick={() => setHighContrast(v => !v)} title="High Contrast">🔆</button>
            <button className={`nb-icon${ttsEnabled ? ' active' : ''}`} onClick={() => setTtsEnabled(v => !v)} title="TTS">
              {ttsEnabled ? '🔊' : '🔇'}
            </button>
            <Link to="/" className="dash-home-btn">← Beranda</Link>
          </div>
        </div>

        {/* TAB: BERANDA */}
        {activeTab === 'beranda' && (
          <div className="tab-content">
            {/* Stats Row */}
            <div className="stat-row">
              <StatCard icon="⚡" label="Total XP" value={totalXP} />
              <StatCard icon="🏅" label="Level" value={level} />
              <StatCard icon="🔥" label="Streak" value="7 hari" />
              <StatCard icon="📊" label="Progress Minggu" value={`${weekProgress}%`} />
            </div>

            {/* XP Bar */}
            <div className="xp-card">
              <div className="xp-row">
                <span className="xp-label">Level {level} → Level {level + 1}</span>
                <span className="xp-val">{totalXP} / {nextLevelXP} XP</span>
              </div>
              <div className="xp-bar"><div className="xp-fill" style={{ width: `${xpPercent}%` }}></div></div>
              <div className="xp-hint">Butuh {nextLevelXP - totalXP} XP lagi untuk naik level!</div>
            </div>

            {/* Subject Progress */}
            <div className="section-title">📚 Progress Mata Pelajaran</div>
            <div className="subject-grid">
              {SUBJECTS.map(s => (
                <div key={s.id} className="subj-card" onClick={() => speak(`${s.title}. ${s.topic}. Progress ${s.progress} persen.`)}>
                  <div className="subj-head">
                    <div className="subj-icon" style={{ background: s.color }}>{s.emoji}</div>
                    <div>
                      <div className="subj-title">{s.title}</div>
                      <div className="subj-topic">{s.topic}</div>
                    </div>
                    <div className="subj-xp">+{s.xp} XP</div>
                  </div>
                  <div className="bar" style={{ marginBottom: 0 }}>
                    <div className="bf" style={{ width: `${s.progress}%` }}></div>
                  </div>
                  <div className="subj-pct">{s.progress}%</div>
                </div>
              ))}
            </div>

            {/* Activity */}
            <div className="section-title">🕐 Aktivitas Terbaru</div>
            <div className="activity-list">
              {ACTIVITIES.map((a, i) => (
                <div key={i} className="act-item">
                  <span className="act-icon">{a.emoji}</span>
                  <span className="act-text">{a.text}</span>
                  <span className="act-time">{a.time}</span>
                  <span className="act-xp">{a.xp}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: MATERI */}
        {activeTab === 'materi' && (
          <div className="tab-content">
            <div className="section-title">📚 Semua Mata Pelajaran</div>
            <div className="subject-grid">
              {SUBJECTS.map(s => (
                <div key={s.id} className="subj-card full" onClick={() => speak(`Membuka materi ${s.title}. Topik: ${s.topic}`)}>
                  <div className="subj-head">
                    <div className="subj-icon" style={{ background: s.color }}>{s.emoji}</div>
                    <div style={{ flex: 1 }}>
                      <div className="subj-title">{s.title}</div>
                      <div className="subj-topic">{s.topic}</div>
                    </div>
                  </div>
                  <div className="bar"><div className="bf" style={{ width: `${s.progress}%` }}></div></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--ts)', marginTop: '4px' }}>
                    <span>Progress: {s.progress}%</span>
                    <span>{s.xp} XP</span>
                  </div>
                  <button className="subj-btn" onClick={e => { e.stopPropagation(); speak(`Melanjutkan materi ${s.title}`); }}>
                    Lanjutkan →
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: KUIS */}
        {activeTab === 'kuis' && (
          <div className="tab-content">
            <div className="section-title">🧪 Kuis Harian</div>
            <div className="quiz-wrap">
              {quizDone ? (
                <div className="quiz-done">
                  <div className="qd-emoji">🏆</div>
                  <div className="qd-title">Kuis Selesai!</div>
                  <div className="qd-score">Skor kamu: {quizScore} / {QUIZ_QUESTIONS.length}</div>
                  <div className="qd-xp">+{quizScore * 20} XP didapat!</div>
                  <button className="btn-full" style={{ maxWidth: '200px', margin: '0 auto' }} onClick={resetQuiz}>
                    Ulangi Kuis
                  </button>
                </div>
              ) : (
                <>
                  <div className="quiz-progress">
                    Soal {quizIdx + 1} dari {QUIZ_QUESTIONS.length}
                  </div>
                  <div className="bar" style={{ marginBottom: '20px' }}>
                    <div className="bf" style={{ width: `${((quizIdx) / QUIZ_QUESTIONS.length) * 100}%` }}></div>
                  </div>
                  <div className="quiz-q" onClick={() => speak(QUIZ_QUESTIONS[quizIdx].q)}>
                    {QUIZ_QUESTIONS[quizIdx].q}
                    <span className="quiz-tts">🔊</span>
                  </div>
                  <div className="quiz-opts">
                    {QUIZ_QUESTIONS[quizIdx].options.map((opt, i) => {
                      let cls = 'quiz-opt';
                      if (quizAnswered !== null) {
                        if (i === QUIZ_QUESTIONS[quizIdx].ans) cls += ' correct';
                        else if (i === quizAnswered) cls += ' wrong';
                      }
                      return (
                        <button key={i} className={cls} onClick={() => handleAnswer(i)}>
                          <span className="opt-letter">{String.fromCharCode(65 + i)}</span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {quizAnswered !== null && (
                    <button className="btn-full" onClick={nextQuestion}>
                      {quizIdx + 1 >= QUIZ_QUESTIONS.length ? 'Lihat Hasil' : 'Soal Berikutnya →'}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )}

        {/* TAB: TTS */}
        {activeTab === 'tts' && (
          <div className="tab-content">
            <div className="section-title">🔊 Text-to-Speech</div>
            <div className="tts-card">
              <div className="tts-status">
                Status TTS:{' '}
                <span style={{ color: ttsEnabled ? 'var(--green)' : 'var(--red)', fontWeight: 700 }}>
                  {ttsEnabled ? 'Aktif ✓' : 'Nonaktif ✗'}
                </span>
              </div>
              <button
                className="btn-full"
                style={{ maxWidth: '200px', marginBottom: '20px', background: ttsEnabled ? 'var(--red)' : 'var(--p)' }}
                onClick={() => setTtsEnabled(v => !v)}
              >
                {ttsEnabled ? '🔇 Nonaktifkan TTS' : '🔊 Aktifkan TTS'}
              </button>

              <label className="tts-label">Ketik teks untuk dibacakan:</label>
              <textarea
                className="tts-input"
                placeholder="Ketik atau paste teks di sini, lalu klik Baca..."
                value={ttsText}
                onChange={e => setTtsText(e.target.value)}
                rows={5}
              />
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <button className="btn-full" style={{ flex: 1 }} onClick={handleTTSRead} disabled={ttsReading}>
                  {ttsReading ? '⏳ Sedang membaca...' : '▶️ Baca'}
                </button>
                <button className="btn-full" style={{ flex: 1, background: 'var(--s)', color: 'var(--t)', border: '1.5px solid var(--border)' }} onClick={stopTTS}>
                  ⏹ Stop
                </button>
              </div>

              <div className="tts-examples">
                <div className="tts-ex-title">Contoh teks cepat:</div>
                {[
                  'FlexiStudy adalah platform belajar adaptif nomor satu di Indonesia.',
                  'Selamat belajar! Semangat meraih prestasi terbaik.',
                  'Matematika bab aljabar: tiga x ditambah lima sama dengan dua puluh.',
                ].map((t, i) => (
                  <div key={i} className="tts-ex-item" onClick={() => { setTtsText(t); speak(t); }}>
                    💬 {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: PENGATURAN */}
        {activeTab === 'pengaturan' && (
          <div className="tab-content">
            <div className="section-title">⚙️ Pengaturan</div>
            <div className="settings-card">
              <div className="setting-group">
                <div className="setting-group-title">Tampilan</div>

                <SettingRow
                  icon="🌙"
                  label="Mode Gelap"
                  desc="Aktifkan tampilan gelap untuk kenyamanan mata"
                  checked={darkMode}
                  onChange={() => setDarkMode(v => !v)}
                />
                <SettingRow
                  icon="🔆"
                  label="Kontras Tinggi"
                  desc="Tingkatkan kontras untuk aksesibilitas visual"
                  checked={highContrast}
                  onChange={() => setHighContrast(v => !v)}
                />
              </div>

              <div className="setting-group">
                <div className="setting-group-title">Aksesibilitas</div>
                <SettingRow
                  icon="🔊"
                  label="Text-to-Speech"
                  desc="Bacakan teks dan konten halaman secara otomatis"
                  checked={ttsEnabled}
                  onChange={() => setTtsEnabled(v => !v)}
                />
              </div>

              <div className="setting-group">
                <div className="setting-group-title">Akun</div>
                <div className="account-info">
                  <div className="acc-row"><span>Nama</span><strong>{user?.name}</strong></div>
                  <div className="acc-row"><span>Email</span><strong>{user?.email}</strong></div>
                  <div className="acc-row"><span>Kelas</span><strong>{user?.kelas}</strong></div>
                  <div className="acc-row"><span>Level</span><strong>{user?.level || 3}</strong></div>
                  <div className="acc-row"><span>Total XP</span><strong>{user?.xp || 125} XP</strong></div>
                </div>
                <button
                  className="btn-full"
                  style={{ background: 'var(--red)', marginTop: '16px' }}
                  onClick={() => { speak('Sampai jumpa!'); logout(); navigate('/'); }}
                >
                  Keluar dari Akun
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="stat-card">
    <div className="stat-icon">{icon}</div>
    <div className="stat-value">{value}</div>
    <div className="stat-label">{label}</div>
  </div>
);

const SettingRow = ({ icon, label, desc, checked, onChange }) => (
  <div className="setting-row">
    <div className="setting-icon">{icon}</div>
    <div className="setting-info">
      <div className="setting-label">{label}</div>
      <div className="setting-desc">{desc}</div>
    </div>
    <button className={`toggle${checked ? ' on' : ''}`} onClick={onChange}>
      <div className="toggle-knob"></div>
    </button>
  </div>
);

export default Dashboard;
