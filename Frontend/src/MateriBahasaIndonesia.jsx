import { useLocation, useParams } from "react-router-dom";

const MateriDetail = () => {
  const { state } = useLocation();
  const { id } = useParams();

  return (
    <div style={{ padding: "20px" }}>
      {/* DATA DARI HALAMAN SEBELUMNYA */}
      <h2>{state?.title || "Materi Bahasa Indonesia"}</h2>
      <p>Topik: {state?.topic || "Bahasa Indonesia"}</p>
      <p>ID: {id}</p>

      <hr />

      {/* ISI MATERI */}
      <h1>Modul Belajar Mandiri Bahasa Indonesia</h1>

      <h2>Jenjang Sekolah Dasar (SD)</h2>
      <p><strong>Fokus:</strong> Literasi Dasar dan Tata Bahasa Utama</p>

      <h3>Membaca dan Pemahaman Isi</h3>
      <p><strong>Membaca Nyaring:</strong> Melatih kemampuan vokal dengan memperhatikan lafal, intonasi, dan jeda.</p>
      <p><strong>Pemahaman Bacaan (5W+1H):</strong> Apa, Siapa, Di mana, Kapan, Mengapa, Bagaimana.</p>

      <h3>Aturan Penulisan dan Kosakata</h3>
      <p><strong>Struktur S-P-O-K:</strong> Subjek, Predikat, Objek, Keterangan.</p>
      <p><strong>Huruf Kapital:</strong> Awal kalimat, nama orang, hari, bulan, tempat.</p>
      <p><strong>Sinonim & Antonim:</strong> Persamaan dan lawan kata.</p>

      <h3>Apresiasi Sastra</h3>
      <p>Dongeng, pantun, dan menulis karangan.</p>

      <hr />

      <h2>Jenjang SMP</h2>
      <p><strong>Fokus:</strong> Analisis Struktur dan Jenis Teks</p>

      <h3>Teks Deskripsi & Narasi</h3>
      <p>Deskripsi menggambarkan objek secara detail, narasi fantasi memiliki orientasi, komplikasi, dan resolusi.</p>

      <h3>Teks Prosedur & Observasi</h3>
      <p>Langkah-langkah membuat sesuatu dan laporan hasil pengamatan.</p>

      <h3>Komunikasi</h3>
      <p>Berita, iklan, slogan, dan eksposisi.</p>

      <h3>Sastra</h3>
      <p>Pantun, syair, dan gurindam.</p>

      <hr />

      <h2>Jenjang SMA/SMK</h2>
      <p><strong>Fokus:</strong> Komunikasi Profesional dan Analisis</p>

      <h3>Komunikasi Profesional</h3>
      <p>Negosiasi dan surat lamaran pekerjaan.</p>

      <h3>Analisis Kritis</h3>
      <p>Anekdot, eksplanasi, dan resensi karya.</p>

      <h3>Penulisan</h3>
      <p>Karya ilmiah, kritik, dan esai.</p>
    </div>
  );
};

export default MateriDetail;