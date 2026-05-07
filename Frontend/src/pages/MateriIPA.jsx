import { useLocation, useParams, useNavigate } from "react-router-dom";
import { useApp } from '../App';
import "./MateriDetail.css";

const IPAMateriDetail = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="materi-container">

      {/* HEADER */}
      <div className="materi-header-card">
        <h2 className="materi-title">
          {state?.title || "Materi IPA"}
        </h2>
        <p className="materi-meta">Topik: {state?.topic || "Ilmu Pengetahuan Alam"}</p>
        <p className="materi-meta">ID: {id}</p>
      </div>

      <hr />

      {/* ================= SD ================= */}
      <h1 className="section-main">TINGKAT SD: IPA (Kurikulum Merdeka)</h1>

      <h3 className="sub-title">1. Makhluk Hidup & Lingkungan</h3>
      <p className="content-text">
        Bagian tumbuhan: akar (menyerap air), batang (penopang), daun (fotosintesis), bunga (perkembangbiakan).
      </p>

      <h3 className="sub-title">2. Fotosintesis</h3>
      <p className="content-text">
        Proses tumbuhan membuat makanan menggunakan cahaya matahari, air (H₂O), dan karbon dioksida (CO₂).
      </p>

      <h3 className="sub-title">3. Wujud Benda</h3>
      <p className="content-text">
        Padat (bentuk tetap), cair (mengikuti wadah), gas (mengisi ruangan).
      </p>

      <hr />

      {/* ================= SMP ================= */}
      <h1 className="section-main">TINGKAT SMP: IPA TERPADU</h1>

      <h3 className="sub-title">1. Zat & Perubahannya</h3>
      <p className="content-text">
        Perubahan fisika: tidak menghasilkan zat baru (es mencair). Perubahan kimia: menghasilkan zat baru (besi berkarat).
      </p>

      <h3 className="sub-title">2. Hukum Newton</h3>
      <p className="content-text">
        Hukum I: ΣF = 0 (benda diam tetap diam). Hukum II: F = m × a. Hukum III: aksi = reaksi.
      </p>

      <hr />

      {/* ================= SMA ================= */}
      <h1 className="section-main">TINGKAT SMA: FISIKA, KIMIA, BIOLOGI</h1>

      {/* FISIKA */}
      <h2 className="section-title">A. Fisika</h2>

      <h3 className="sub-title">Gerak Lurus Berubah Beraturan (GLBB)</h3>
      <p className="content-text">vₜ = v₀ + at</p>

      <h3 className="sub-title">Listrik Statis</h3>
      <p className="content-text">F = k (q₁q₂ / r²)</p>

      <h3 className="sub-title">Termodinamika</h3>
      <p className="content-text">Hukum kekekalan energi dalam sistem gas.</p>

      {/* KIMIA */}
      <h2 className="section-title">B. Kimia</h2>

      <h3 className="sub-title">Konsep Mol</h3>
      <p className="content-text">n = massa / (Ar atau Mr)</p>

      <h3 className="sub-title">Asam Basa</h3>
      <p className="content-text">
        Asam: pH {'<'} 7 (melepas H⁺). Basa: pH {'>'} 7 (melepas OH⁻).
      </p>

      {/* ➕ TAMBAHAN KIMIA */}
      <h3 className="sub-title">Ikatan Kimia</h3>
      <p className="content-text">
        Ikatan ionik terjadi melalui serah terima elektron, sedangkan ikatan kovalen terjadi karena pemakaian elektron bersama.
      </p>

      {/* BIOLOGI */}
      <h2 className="section-title">C. Biologi</h2>

      <h3 className="sub-title">Sel</h3>
      <p className="content-text">
        Unit terkecil kehidupan. Mitokondria (energi), Nukleus (DNA), Ribosom (protein).
      </p>

      <h3 className="sub-title">Hukum Mendel</h3>
      <p className="content-text">
        Persilangan monohibrid (1 sifat) dan dihibrid (2 sifat).
      </p>

      <h3 className="sub-title">Virus</h3>
      <p className="content-text">
        Organisme aseluler yang hanya bisa berkembang di dalam sel inang.
      </p>

      {/* ➕ TAMBAHAN BIOLOGI */}
      <h3 className="sub-title">Proses Fotosintesis (Detail)</h3>
      <p className="content-text">
        Matahari adalah sumber energi utama fotosintesis. Tumbuhan menyerap CO₂ dan H₂O untuk menghasilkan glukosa.
      </p>
      <p className="content-text">
        Oksigen dilepaskan sebagai produk sampingan fotosintesis.
      </p>
      <p className="content-text">
        Glukosa digunakan sebagai sumber energi untuk pertumbuhan.
      </p>

      <h3 className="sub-title">Sistem Pencernaan Manusia</h3>
      <p className="content-text">
        Mulut (mekanik & amilase), kerongkongan, lambung (HCl & pepsin), usus halus (penyerapan), usus besar, anus.
      </p>

      <h3 className="sub-title">Sel Hewan</h3>
      <p className="content-text">
        Sel hewan adalah sel eukariotik yang memiliki inti sel bermembran dan tidak memiliki dinding sel maupun kloroplas.
      </p>

      <hr />

      {/* ================= SEL DETAIL ================= */}
      <h2 className="section-title">Struktur Sel (Penjelasan Organel)</h2>

      <p className="content-text">
        Inti sel (nukleus) mengontrol aktivitas sel dan menyimpan DNA.
      </p>

      <p className="content-text">
        Retikulum endoplasma (ER) membantu produksi protein.
      </p>

      <p className="content-text">
        Aparatus Golgi memproses dan mengemas protein dan lipid.
      </p>

      <p className="content-text">
        Mitokondria menghasilkan energi (ATP).
      </p>

      <p className="content-text">
        Dinding sel hanya ada pada tumbuhan.
      </p>

      <p className="content-text">
        Vakuola menyimpan air dan nutrisi.
      </p>

      <p className="content-text">
        Kloroplas melakukan fotosintesis.
      </p>

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

export default IPAMateriDetail;