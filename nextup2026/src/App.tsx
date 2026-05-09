import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface TimelineItem {
  date: string;
  title: string;
  desc: string;
  side: "left" | "right";
}

interface Category {
  title: string;
  desc: string;
}

interface FAQItem {
  q: string;
  a: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const timelineItems: TimelineItem[] = [
  {
    date: "5 Mei",
    title: "Registrasi Peserta",
    desc: "Pendaftaran peserta kompetisi dibuka untuk umum.",
    side: "left",
  },
  {
    date: "12 Jun",
    title: "Penutupan Registrasi dan Pengumpulan Karya",
    desc: "Peserta wajib mengumpulkan karya sebelum batas waktu.",
    side: "right",
  },
  {
    date: "4 Jul",
    title: "Pengumuman Lolos Abstrak",
    desc: "Hasil seleksi abstrak diumumkan kepada peserta.",
    side: "left",
  },
  {
    date: "17 Jul",
    title: "Pengumpulan Full Paper",
    desc: "Pengumpulan full paper bagi peserta yang lolos abstrak.",
    side: "right",
  },
  {
    date: "22 Jul",
    title: "Pengumuman Finalis",
    desc: "Daftar finalis yang lolos ke babak final diumumkan.",
    side: "left",
  },
  {
    date: "26 Jun",
    title: "Technical Meeting",
    desc: "Pertemuan teknis bagi seluruh finalis.",
    side: "right",
  },
  {
    date: "1 Jul",
    title: "Final (OFFLINE)",
    desc: "Babak final dilaksanakan secara offline di lokasi acara.",
    side: "left",
  },
  {
    date: "8 Jul",
    title: "Awarding",
    desc: "Pengumuman pemenang dan penyerahan penghargaan.",
    side: "right",
  },
];

const categories: Category[] = [
  {
    title: "Business Plan Competition",
    desc: "Tunjukkan kemampuan bisnis kamu dengan membuat rencana usaha yang inovatif dan berdampak.",
  },
  {
    title: "Paper Competition",
    desc: "Tuangkan ide dan penelitian kamu dalam karya tulis ilmiah yang berkualitas.",
  },
  {
    title: "Infographic Poster Competition",
    desc: "Sampaikan informasi penting secara visual melalui desain poster yang menarik.",
  },
  {
    title: "Essay Competition",
    desc: "Ekspresikan gagasan dan argumen kamu dalam bentuk esai yang tajam dan berbobot.",
  },
];

const faqItems: FAQItem[] = [
  {
    q: "Siapa saja yang bisa mendaftar ke NEXT UP?",
    a: "NEXT UP terbuka untuk mahasiswa aktif D3/D4/S1 dari seluruh Indonesia. Setiap tim dapat terdiri dari 2-3 orang.",
  },
  {
    q: "Berapa biaya pendaftaran NEXT UP?",
    a: "Biaya pendaftaran bervariasi tergantung kategori lomba. Silakan cek halaman pendaftaran untuk informasi lebih lanjut.",
  },
  {
    q: "Bagaimana cara mendaftar?",
    a: "Klik tombol Daftar Sekarang, isi formulir pendaftaran, pilih kategori lomba, dan unggah berkas yang diperlukan.",
  },
  {
    q: "Apakah peserta dari luar kota ditanggung akomodasinya?",
    a: "Akomodasi tidak ditanggung panitia. Namun kami menyediakan informasi penginapan terdekat di website ini.",
  },
  {
    q: "Kapan pengumuman pemenang diumumkan?",
    a: "Pemenang akan diumumkan pada tanggal 8 Juli saat acara Awarding berlangsung.",
  },
  {
    q: "Bolehkah satu orang mengikuti lebih dari satu kategori?",
    a: "Boleh, selama persyaratan masing-masing kategori terpenuhi dan tidak ada jadwal yang bentrok.",
  },
];

// ─── ImgPlaceholder ───────────────────────────────────────────────────────────
// Cara ganti ke gambar asli:
//   Hapus seluruh <ImgPlaceholder ... /> dan ganti dengan:
//   <img src="/assets/nama-file.png" alt="..." width={...} height={...} className="..." />
const ImgPlaceholder = ({
  width = 100,
  height = 100,
  label = "Image",
  className = "",
  style = {},
}: {
  width?: number;
  height?: number;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`flex flex-col items-center justify-center bg-white/30 border-2 border-dashed border-white/60 rounded-2xl text-white/80 text-xs font-bold text-center leading-tight ${className}`}
    style={{ width, height, ...style }}
  >
    <span className="text-xl mb-1">🖼️</span>
    <span>{label}</span>
  </div>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = ["Home", "About", "Timeline", "FAQ", "Contact"];

  return (
    // Pill navbar mengambang di atas hero — persis seperti mockup
    <nav className="absolute top-4 left-4 right-4 z-50 bg-white rounded-full px-6 md:px-10 py-3 flex items-center justify-between shadow-lg">
      {
        <img
          src="/src/assets/logo-nextup-hijau.png"
          alt="Next Up"
          className="h-8"
        /> /* LOGO
          ─ Versi teks sementara (persis huruf "next↑up" warna hijau seperti mockup).
          ─ Jika punya file PNG logo: hapus <div> ini, ganti dengan:
            <img src="/assets/logo-nextup.png" alt="Next Up" className="h-8" />
      */
      }
      {/* Links desktop */}
      <ul className="hidden md:flex gap-8 text-sm font-semibold text-gray-700">
        {links.map((l) => (
          <li key={l}>
            <a
              href={`#${l.toLowerCase()}`}
              className="hover:text-teal-600 transition-colors"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>

      {/* Tombol Daftar */}
      <a
        href="#pendaftaran"
        className="hidden md:inline-block text-white text-sm font-bold px-7 py-2.5 rounded-full transition-colors"
        style={{ background: "#2b4a3c" }}
      >
        Daftar
      </a>

      {/* Hamburger mobile */}
      <button
        className="md:hidden text-gray-700 text-lg"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      {/* Dropdown mobile */}
      {menuOpen && (
        <div className="md:hidden absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-xl px-6 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className="text-sm font-semibold text-gray-700 hover:text-teal-600"
            >
              {l}
            </a>
          ))}
          <a
            href="#pendaftaran"
            style={{ background: "#2b4a3c" }}
            className="text-white text-center py-2.5 rounded-full font-bold text-sm"
          >
            Daftar
          </a>
        </div>
      )}
    </nav>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => (
  <section
    id="home"
    className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    style={{
      background:
        "linear-gradient(135deg, #c2ece0 0%, #9ddfcf 25%, #69cfb8 55%, #3bbf97 100%)",
    }}
  >
    <Navbar />

    {/* ────────────────────────────────────────────────
        ILUSTRASI FLOATING
        Setiap blok di bawah ini adalah PLACEHOLDER.
        Cara menggantinya dengan gambar asli:

        1. Hapus <div className="absolute ..."> beserta <ImgPlaceholder /> di dalamnya
        2. Ganti dengan tag <img> seperti contoh komentar di masing-masing blok
    ──────────────────────────────────────────────── */}

    {/* Kiri atas — Buku / Dokumen */}
    {/* <img src="/assets/illus-book.png" alt="" className="absolute pointer-events-none" style={{ top: 90, left: 130, width: 96, transform: "rotate(-12deg)" }} /> */}
    <div
      className="absolute pointer-events-none"
      style={{ top: 90, left: 130, transform: "rotate(-12deg)" }}
    >
      <ImgPlaceholder width={96} height={90} label="Illus Buku" />
    </div>

    {/* Kiri bawah — Tas / Koper */}
    {/* <img src="/assets/illus-bag.png" alt="" className="absolute pointer-events-none" style={{ bottom: 120, left: 80, width: 110, transform: "rotate(-6deg)" }} /> */}
    <div
      className="absolute pointer-events-none"
      style={{ bottom: 120, left: 80, transform: "rotate(-6deg)" }}
    >
      <ImgPlaceholder width={110} height={100} label="Illus Tas" />
    </div>

    {/* Kanan atas — Palet warna (bulat) */}
    {/* <img src="/assets/illus-palette.png" alt="" className="absolute pointer-events-none" style={{ top: 80, right: 110, width: 110, transform: "rotate(8deg)" }} /> */}
    <div
      className="absolute pointer-events-none"
      style={{ top: 80, right: 110, transform: "rotate(8deg)" }}
    >
      <ImgPlaceholder
        width={110}
        height={110}
        label="Illus Palet"
        style={{ borderRadius: "50%" }}
      />
    </div>

    {/* Kanan bawah — Pensil */}
    {/* <img src="/assets/illus-pen.png" alt="" className="absolute pointer-events-none" style={{ bottom: 130, right: 120, width: 80, transform: "rotate(15deg)" }} /> */}
    <div
      className="absolute pointer-events-none"
      style={{ bottom: 130, right: 120, transform: "rotate(15deg)" }}
    >
      <ImgPlaceholder width={80} height={80} label="Illus Pensil" />
    </div>

    {/* ── Konten tengah ── */}
    <div className="relative z-10 flex flex-col items-center px-6 pt-24 pb-16">
      {/* Eyebrow label */}
      <p
        style={{
          fontSize: 13,
          fontWeight: 700,
          color: "#1a5c42",
          letterSpacing: "0.5px",
          marginBottom: 8,
        }}
      >
        Next Up! 2026
      </p>

      {/* Judul besar "NEXT UP"
          ─ Jika punya file PNG judul: ganti <h1> ini dengan:
            <img src="/assets/title-nextup.png" alt="NEXT UP" style={{ width: "min(600px, 80vw)", marginBottom: 16 }} />
      */}
      <h1
        style={{
          fontFamily: "'Nunito', 'Poppins', 'Arial Black', sans-serif",
          fontSize: "clamp(72px, 14vw, 120px)",
          fontWeight: 900,
          color: "white",
          lineHeight: 1,
          letterSpacing: "-2px",
          WebkitTextStroke: "3px rgba(255,255,255,0.45)",
          textShadow:
            "0 2px 0 rgba(255,255,255,0.2), 0 6px 24px rgba(0,0,0,0.07)",
          marginBottom: 16,
          userSelect: "none",
        }}
      >
        NEXT UP
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 17,
          fontWeight: 800,
          color: "#1a4d38",
          marginBottom: 10,
        }}
      >
        New Era Experience To Unleash Potential! 2026
      </p>

      {/* Deskripsi */}
      <p
        style={{
          fontSize: 14,
          color: "#2d6b52",
          maxWidth: 500,
          lineHeight: 1.7,
          marginBottom: 28,
        }}
      >
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua labore et dolore
      </p>

      {/* CTA Buttons */}
      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <a
          href="#pendaftaran"
          style={{
            background: "#2b4a3c",
            color: "white",
            padding: "14px 32px",
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Daftar Sekarang
        </a>
        <a
          href="#timeline"
          style={{
            background: "white",
            color: "#2b4a3c",
            border: "2px solid #2b4a3c",
            padding: "14px 32px",
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Lihat Timeline
        </a>
      </div>
    </div>
  </section>
);

// ─── About ────────────────────────────────────────────────────────────────────
const About = () => (
  <section id="about" className="py-20 bg-white px-6">
    <div className="max-w-6xl mx-auto">
      <span className="inline-block bg-teal-100 text-teal-700 text-xs font-bold px-4 py-1 rounded-full mb-6">
        Tentang Event
      </span>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Next Up! 2026
          </h2>
          <p className="text-gray-500 mb-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim.
          </p>
          <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-xl mb-6">
            <p className="text-sm font-bold text-teal-800 mb-1">Tema:</p>
            <p className="text-teal-700 italic font-semibold">
              "Sustainable Living for a Resilient Future: Innovating Solutions
              for a Changing World"
            </p>
          </div>
          <p className="text-sm text-gray-400 mb-3 font-semibold">
            Diselenggarakan oleh:
          </p>
          {/* Ganti kotak abu ini dengan: <img src="/assets/logo-sponsor-1.png" className="h-8" /> */}
          <div className="flex gap-3 flex-wrap">
            {["Sponsor 1", "Sponsor 2", "Sponsor 3"].map((s) => (
              <div
                key={s}
                className="w-20 h-10 bg-gray-100 border border-dashed border-gray-300 rounded-lg flex items-center justify-center text-xs text-gray-400 font-semibold"
              >
                {s}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-bold text-gray-700 mb-4">
            Kenapa Harus Ikut?
          </p>
          <div className="flex flex-col gap-4">
            {[
              {
                icon: "🏆",
                title: "Lorem ipsum",
                desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
              },
              {
                icon: "🤝",
                title: "Lorem ipsum",
                desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
              },
              {
                icon: "🎖️",
                title: "Lorem ipsum",
                desc: "Lorem ipsum dolor sit amet consectetur adipiscing elit.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="flex gap-4 items-start p-4 bg-teal-50 rounded-2xl"
              >
                <span className="text-3xl">{item.icon}</span>
                <div>
                  <p className="font-bold text-gray-800 text-sm">
                    {item.title}
                  </p>
                  <p className="text-gray-500 text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── Timeline ─────────────────────────────────────────────────────────────────
const Timeline = () => (
  <section
    id="timeline"
    className="py-20 px-6"
    style={{ background: "linear-gradient(180deg,#f0faf6,#e0f5ee)" }}
  >
    <div className="max-w-4xl mx-auto text-center mb-12">
      <span className="inline-block bg-teal-600 text-white text-xs font-bold px-4 py-1 rounded-full mb-4">
        Timeline
      </span>
      <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
        Jadwal Kegiatan
      </h2>
      <p className="text-gray-500 text-sm">
        Rangkaian acara NEXT UP dari pendaftaran hingga pengumuman pemenang.
      </p>
    </div>
    <div className="relative max-w-3xl mx-auto">
      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-teal-300 -translate-x-1/2" />
      <div className="flex flex-col gap-10">
        {timelineItems.map((item, i) => (
          <div
            key={i}
            className={`relative flex items-center gap-6 ${item.side === "right" ? "flex-row-reverse" : ""}`}
          >
            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-teal-500 rounded-full border-4 border-white shadow z-10" />
            <div className="w-5/12">
              <div className="bg-white rounded-2xl shadow-sm border border-teal-100 p-4">
                <p className="text-xs font-bold text-teal-600 mb-1">
                  {item.date}
                </p>
                <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
              </div>
            </div>
            <div className="w-5/12" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Categories ───────────────────────────────────────────────────────────────
const Categories = () => (
  <section id="pendaftaran" className="py-20 bg-white px-6">
    <div className="max-w-6xl mx-auto text-center mb-12">
      <span className="inline-block bg-teal-100 text-teal-700 text-xs font-bold px-4 py-1 rounded-full mb-4">
        Pendaftaran
      </span>
      <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
        Kategori Lomba
      </h2>
      <p className="text-gray-500 text-sm">
        Pilih Lomba yang ingin kamu ikuti. Pendaftaran terbuka, jangan sampai
        ketinggalan!
      </p>
    </div>
    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
      {categories.map((cat, i) => (
        <div
          key={i}
          className="flex items-start gap-4 p-6 bg-teal-50 rounded-2xl border border-teal-100 hover:shadow-md transition-shadow"
        >
          {/* Ganti dengan: <img src={`/assets/cat-icon-${i+1}.png`} className="w-20 h-20 rounded-xl flex-shrink-0" /> */}
          <div className="w-20 h-20 flex-shrink-0 bg-white/70 border-2 border-dashed border-teal-300 rounded-xl flex flex-col items-center justify-center text-xs text-teal-400 font-semibold">
            🖼️
            <br />
            Icon {i + 1}
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-1">{cat.title}</h3>
            <p className="text-gray-500 text-sm mb-4">{cat.desc}</p>
            <div className="flex gap-2">
              <a
                href="#"
                className="bg-teal-600 text-white text-xs px-4 py-2 rounded-full font-semibold hover:bg-teal-700 transition-colors"
              >
                Daftar Sekarang
              </a>
              <a
                href="#"
                className="border border-teal-600 text-teal-700 text-xs px-4 py-2 rounded-full font-semibold hover:bg-teal-50 transition-colors"
              >
                Lihat Guidebook
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section
      id="faq"
      className="py-20 px-6"
      style={{ background: "linear-gradient(180deg,#f0faf6,#e0f5ee)" }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block bg-teal-600 text-white text-xs font-bold px-4 py-1 rounded-full mb-4">
            FAQ
          </span>
          <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
            Pertanyaan yang Sering Ditanyakan
          </h2>
          <p className="text-gray-500 text-sm">
            Temukan jawaban untuk pertanyaan populer seputar NEXT UP
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {faqItems.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl border border-teal-100 overflow-hidden"
            >
              <button
                className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-800 text-sm hover:bg-teal-50 transition-colors"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {item.q}
                <span className="text-teal-600 text-xl ml-4 flex-shrink-0">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <div className="px-6 pb-4 pt-3 text-gray-500 text-sm leading-relaxed border-t border-teal-50">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Contact ──────────────────────────────────────────────────────────────────
const Contact = () => (
  <section id="contact" className="py-20 bg-white px-6">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
        Hubungi Kami
      </h2>
      <p className="text-gray-500 text-sm mb-12">
        Punya pertanyaan? Jangan ragu untuk menghubungi tim panitia NEXT UP.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: "Email", value: "info@nextup.com" },
          { label: "Whatsapp", value: "+62 812-3456-7890" },
          { label: "Lokasi", value: "Fakultas Teknik, Universitas..." },
        ].map((c, i) => (
          <div
            key={i}
            className="flex flex-col items-center gap-3 p-6 bg-teal-50 rounded-2xl border border-teal-100"
          >
            {/* Ganti dengan: <img src={`/assets/icon-${c.label.toLowerCase()}.png`} className="w-14 h-14" /> */}
            <div className="w-14 h-14 bg-white/70 border-2 border-dashed border-teal-300 rounded-full flex items-center justify-center text-xs text-teal-400 font-semibold">
              🖼️
            </div>
            <p className="font-bold text-gray-800 text-sm">{c.label}</p>
            <p className="text-teal-600 text-sm">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer
    style={{ background: "#2b4a3c" }}
    className="text-white text-center py-6 text-sm"
  >
    © 2026 Next Up! All rights reserved.
  </footer>
);

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <div
      className="antialiased"
      style={{ fontFamily: "'Nunito', 'Poppins', sans-serif" }}
    >
      <Hero />
      <About />
      <Timeline />
      <Categories />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
}
