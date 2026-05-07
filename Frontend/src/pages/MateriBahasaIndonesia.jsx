import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useApp } from '../App';
import "./MateriDetail.css";

const MateriDetail = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="materi-container">

      {/* HEADER */}
      <div className="materi-header-card">
        <h2 className="materi-title">{state?.title || "Materi Bahasa Indonesia"}</h2>
        <p className="materi-meta">Topik: {state?.topic || "Bahasa Indonesia"}</p>
        <p className="materi-meta">ID: {id}</p>
      </div>

      <hr />

      {/* ISI MATERI */}
      <h1 className="section-main">Modul Belajar Mandiri Bahasa Indonesia</h1>

      <h1 className="section-main">Jenjang Sekolah Dasar (SD)</h1>
      <p className="content-text"><strong>Fokus:</strong> Literasi Dasar dan Tata Bahasa Utama</p>

      <h3 className="sub-title">Membaca dan Pemahaman Isi</h3>
      <p className="content-text"><strong>Membaca Nyaring:</strong> Melatih kemampuan vokal dengan memperhatikan lafal, intonasi, dan jeda.</p>
      <p className="content-text"><strong>Pemahaman Bacaan (5W+1H):</strong> Apa, Siapa, Di mana, Kapan, Mengapa, Bagaimana.</p>

      <h3 className="sub-title">Aturan Penulisan dan Kosakata</h3>
      <p className="content-text"><strong>Struktur S-P-O-K:</strong> Subjek, Predikat, Objek, Keterangan.</p>
      <p className="content-text"><strong>Huruf Kapital:</strong> Awal kalimat, nama orang, hari, bulan, tempat.</p>
      <p className="content-text"><strong>Sinonim & Antonim:</strong> Persamaan dan lawan kata.</p>

      <h3 className="sub-title">Apresiasi Sastra</h3>
      <p className="content-text">Dongeng, pantun, dan menulis karangan.</p>

      <hr />

      <h1 className="section-main">Jenjang SMP</h1>
      <p className="content-text"><strong>Fokus:</strong> Analisis Struktur dan Jenis Teks</p>

      <h3 className="sub-title">Teks Deskripsi & Narasi</h3>
      <p className="content-text">Deskripsi menggambarkan objek secara detail, narasi fantasi memiliki orientasi, komplikasi, dan resolusi.</p>

      <h3 className="sub-title">Teks Prosedur & Observasi</h3>
      <p className="content-text">Langkah-langkah membuat sesuatu dan laporan hasil pengamatan.</p>

      <h3 className="sub-title">Komunikasi</h3>
      <p className="content-text">Berita, iklan, slogan, dan eksposisi.</p>

      <h3 className="sub-title">Sastra</h3>
      <p className="content-text">Pantun, syair, dan gurindam.</p>

      <hr />

      <h1 className="section-main">Jenjang SMA/SMK</h1>
      <p className="content-text"><strong>Fokus:</strong> Komunikasi Profesional dan Analisis</p>

      <h3 className="sub-title">Komunikasi Profesional</h3>
      <p className="content-text">Negosiasi dan surat lamaran pekerjaan.</p>

      <h3 className="sub-title">Analisis Kritis</h3>
      <p className="content-text">Anekdot, eksplanasi, dan resensi karya.</p>

      <h3 className="sub-title">Penulisan</h3>
      <p className="content-text">Karya ilmiah, kritik, dan esai.</p>

      {/* NAVIGATION BOTTOM */}
      <div className="materi-nav-bottom">
        <button className="btn-nav btn-back" onClick={() => navigate('/dashboard')}>
          <span className="btn-nav-icon">←</span> Kembali
        </button>
        <button className="btn-nav btn-next" onClick={() => navigate('/dashboard')}>
          Lanjutkan <span className="btn-nav-icon">→</span>
        </button>
      </div>

    </div>
  );
};

export default MateriDetail;