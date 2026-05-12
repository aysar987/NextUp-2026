import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ─── Assets ───────────────────────────────────────────────────────────────────
// Navbar & Hero
import logoHijau from "./assets/landing-page-(home)/logo-nextup-hijau.png";
import businessCase from "./assets/landing-page-(home)/business-case.png";
import paper from "./assets/landing-page-(home)/paper.png";
import paintIcon from "./assets/landing-page-(home)/paint-icon.png";
import pencil from "./assets/landing-page-(home)/pencil.png";
import logoMain from "./assets/logo-nextup-main.png";

// About
import mascotSora from "./assets/about/mascot-sora.png";
import maranuu from "./assets/about/MARANUU-MARANUUUU.png";
import brainIcon from "./assets/about/Brain.png";
import growthIcon from "./assets/about/growth.png";
import trophyIcon from "./assets/about/Trophy.png";

// Categories
import businessSuitCase from "./assets/Daftar/business-suit-case-ijo.png";
import paperIjo from "./assets/Daftar/paper-ijo.png";
import paintIjo from "./assets/Daftar/paint-ijo.png";
import pencilIjo from "./assets/Daftar/pencil-ijo.png";

// Contact
import letter from "./assets/contact/Letter.png";
import whatsappIcon from "./assets/contact/WhatsApp.png";
import location from "./assets/contact/Location.png";

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
    date: "13 Mei",
    title: "Registrasi Peserta",
    desc: "Pendaftaran peserta kompetisi dibuka untuk umum.",
    side: "left",
  },
  {
    date: "31 Mei",
    title: "Penutupan Registrasi dan Pengumpulan Karya",
    desc: "Peserta wajib mengumpulkan karya sebelum batas waktu.",
    side: "right",
  },
  {
    date: "3 Jun",
    title: "Pengumuman Lolos Abstrak",
    desc: "Hasil seleksi abstrak diumumkan kepada peserta.",
    side: "left",
  },
  {
    date: "14 Jun",
    title: "Pengumpulan Full Paper",
    desc: "Pengumpulan full paper bagi peserta yang lolos abstrak.",
    side: "right",
  },
  {
    date: "20 Jun",
    title: "Pengumuman Finalis",
    desc: "Daftar finalis yang lolos ke babak final diumumkan.",
    side: "left",
  },
  {
    date: "23 Jun",
    title: "Technical Meeting",
    desc: "Pertemuan teknis bagi seluruh finalis.",
    side: "right",
  },
  {
    date: "29 Jun",
    title: "Final (OFFLINE)",
    desc: "Babak final dilaksanakan secara offline di lokasi acara.",
    side: "left",
  },
  {
    date: "30 Jun",
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

// ─── Komponen Animasi Scroll ──────────────────────────────────────────────────
const FadeInScroll = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }} // Mulai dari transparan dan agak ke bawah (50px)
      whileInView={{ opacity: 1, y: 0 }} // Muncul dan naik ke posisi asli saat di-scroll
      viewport={{ once: true, amount: 0.2 }} // once: true (animasi 1x saja), amount: 0.2 (kelihatan 20% baru animasi jalan)
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// ─── Navbar ───────────────────────────────────────────────────────────────────
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const links = ["Home", "About", "Timeline", "FAQ", "Contact"];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const smoothScrollTo = (element: HTMLElement, duration: number = 1000) => {
    const targetPosition = element.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    const ease = (t: number, b: number, c: number, d: number) => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    requestAnimationFrame(animation);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      smoothScrollTo(element);
    }
  };

  return (
    // Pill navbar mengambang di atas hero — persis seperti mockup
    <nav
      className={`fixed top-4 z-50 bg-white/95 backdrop-blur-xl rounded-full px-6 md:px-10 flex items-center justify-between shadow-lg transition-all duration-300 ${isScrolled ? "left-8 right-8 md:left-16 md:right-16 py-2" : "left-4 right-4 py-3"} max-w-[calc(100vw-1rem)] mx-auto`}
    >
      {<img src={logoHijau} alt="Nt Up" className="h-8" />}
      {/* Links desktop */}
      <ul className="hidden md:flex gap-8 text-sm font-semibold text-gray-700">
        {links.map((l) => (
          <li key={l}>
            <a
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(l.toLowerCase());
              }}
              className="hover:text-teal-600 transition-colors duration-200 active:scale-95 cursor-pointer"
            >
              {l}
            </a>
          </li>
        ))}
      </ul>

      {/* Tombol Daftar */}
      <a
        href="#pendaftaran"
        className="hidden md:inline-flex items-center justify-center text-white text-sm font-bold px-7 py-2.5 rounded-full transition-all duration-200 active:scale-95"
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
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(l.toLowerCase());
                setMenuOpen(false);
              }}
              className="text-sm font-semibold text-gray-700 hover:text-teal-600 cursor-pointer"
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
        ILUSTRASI FLOATING (Responsif & Dianimasikan)
    ──────────────────────────────────────────────── */}

    {/* Kiri atas — Business Case */}
    <motion.div
      className="absolute pointer-events-none top-32 -left-8 opacity-30 md:top-[140px] md:left-[130px] md:opacity-100"
      style={{ transform: "rotate(-12deg)" }}
      animate={{
        y: [0, -15, 0],
        rotate: [-12, -8, -12],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      <img src={businessCase} alt="bisnis" className="w-24 md:w-[160px]" />
    </motion.div>

    {/* Kiri bawah — Paper */}
    <motion.div
      className="absolute pointer-events-none bottom-28 -left-6 opacity-30 md:bottom-[120px] md:left-[120px] md:opacity-100"
      style={{ transform: "rotate(-6deg)" }}
      animate={{
        y: [0, -20, 0],
        rotate: [-6, -2, -6],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5, // Diberi delay agar tidak bergerak bersamaan dengan tas
      }}
    >
      <img src={paper} alt="paper" className="w-20 md:w-[130px]" />
    </motion.div>

    {/* Kanan atas — Paint Icon */}
    <motion.div
      className="absolute pointer-events-none top-40 -right-10 opacity-30 md:top-[170px] md:right-[150px] lg:right-[200px] md:opacity-100"
      style={{ transform: "rotate(8deg)" }}
      animate={{
        y: [0, -12, 0],
        rotate: [8, 12, 8],
      }}
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.2,
      }}
    >
      <img
        src={paintIcon}
        alt="Palette Illustration"
        className="w-28 md:w-[160px]"
      />
    </motion.div>

    {/* Kanan bawah — Pencil */}
    <motion.div
      className="absolute pointer-events-none bottom-36 -right-6 opacity-30 md:bottom-[140px] md:right-[120px] md:opacity-100"
      style={{ transform: "rotate(0deg)" }}
      animate={{
        y: [0, -18, 0],
        rotate: [0, 5, 0],
      }}
      transition={{
        duration: 3.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.7,
      }}
    >
      <img
        src={pencil}
        alt="Pencil Illustration"
        className="w-16 md:w-[110px]"
      />
    </motion.div>

    {/* ── Konten tengah (Dianimasikan Muncul dari Bawah) ── */}
    <motion.div
      className="relative z-10 flex flex-col items-center px-6 pt-32 pb-16 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
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

      {/* Judul besar "NEXT UP" */}
      <img
        src={logoMain}
        alt="NEXT UP"
        className="w-[85vw] md:w-[600px] max-w-full mb-4"
      />

      {/* Subtitle */}
      <p className="text-[15px] md:text-[17px] font-extrabold text-[#1a4d38] mb-3 md:mb-5 leading-snug">
        New Era Experience To Unleash Potential! 2026
      </p>

      {/* Deskripsi */}
      <p className="text-[13px] md:text-[14px] text-[#2d6b52] max-w-[900px] leading-[1.7] mb-8">
        Ajang kompetisi dan inovasi tingkat nasional yang menjadi wadah bagi
        mahasiswa untuk mengembangkan ide kreatif dan solusi berkelanjutan
        terhadap berbagai tantangan dunia nyata.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center w-full px-4 sm:px-0">
        <a
          href="#pendaftaran"
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-[#2b4a3c] px-8 py-3.5 text-sm font-bold text-white transition-all duration-300 active:scale-95 hover:-translate-y-1 hover:shadow-xl hover:bg-[#1a3127]"
        >
          Daftar Sekarang
        </a>
        <a
          href="#timeline"
          className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border-2 border-[#2b4a3c] bg-white px-8 py-3.5 text-sm font-bold text-[#2b4a3c] transition-all duration-300 active:scale-95 hover:-translate-y-1 hover:shadow-xl hover:bg-teal-50"
        >
          Lihat Timeline
        </a>
      </div>
    </motion.div>
  </section>
);

// ─── About ────────────────────────────────────────────────────────────────────
const About = () => (
  <section id="about" className="py-20 bg-white px-6">
    <FadeInScroll>
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
              NEXT UP! 2026 merupakan ajang kompetisi dan inovasi tingkat
              nasional yang menjadi wadah bagi mahasiswa untuk mengembangkan ide
              kreatif dan solusi berkelanjutan terhadap berbagai tantangan dunia
              nyata. Melalui berbagai cabang lomba, peserta diharapkan mampu
              berpikir kritis, inovatif, dan berkontribusi bagi masa depan yang
              lebih tangguh
            </p>
            <div className="flex gap-4 items-start mb-6">
              <img
                src={mascotSora}
                alt="Mascot Sora"
                className="w-30 h-50 flex-shrink-0"
              />
              <div className="bg-teal-50 border-l-4 border-teal-500 p-4 rounded-r-xl flex-1">
                <p className="text-sm font-bold text-teal-800 mb-1">Tema:</p>
                <p className="text-teal-700 italic font-semibold">
                  "Sustainable Living for a Resilient Future: Innovating
                  Solutions for a Changing World"
                </p>
              </div>
            </div>
            {/* Ganti kotak abu ini dengan: <img src="/assets/logo-sponsor-1.png" className="h-8" /> */}
            <img src={maranuu} alt="Maranuu Maranu" className="h-20" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-700 mb-4">
              Kenapa Harus Ikut?
            </p>
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: "🏆",
                  title: "Expand Your Innovation",
                  desc: "Kembangkan ide dan solusi kreatif melalui kompetisi yang inspiratif dan kompetitif.",
                },
                {
                  icon: "🤝",
                  title: "Build Connections",
                  desc: "Bertemu dengan mahasiswa, mentor, dan inovator dari berbagai daerah di Indonesia.",
                },
                {
                  icon: "🎖️",
                  title: "Achieve & Grow",
                  desc: "Dapatkan pengalaman, prestasi, serta peluang pengembangan diri melalui NEXT UP! 2026.",
                },
              ].map((item, i) => {
                const iconImages = [brainIcon, growthIcon, trophyIcon];
                return (
                  <div
                    key={i}
                    className="flex gap-4 items-start p-4 bg-teal-50 rounded-2xl"
                  >
                    <img
                      src={iconImages[i]}
                      alt={item.title}
                      className="w-12 h-12"
                    />
                    <div>
                      <p className="font-bold text-gray-800 text-sm">
                        {item.title}
                      </p>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </FadeInScroll>
  </section>
);

// ─── Timeline ─────────────────────────────────────────────────────────────────
const Timeline = () => (
  <section
    id="timeline"
    className="py-20 px-6"
    style={{ background: "linear-gradient(180deg,#f0faf6,#e0f5ee)" }}
  >
    <FadeInScroll>
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
                  <p className="font-bold text-gray-800 text-sm">
                    {item.title}
                  </p>
                  <p className="text-gray-400 text-xs mt-1">{item.desc}</p>
                </div>
              </div>
              <div className="w-5/12" />
            </div>
          ))}
        </div>
      </div>
    </FadeInScroll>
  </section>
);

// ─── Categories ───────────────────────────────────────────────────────────────
const Categories = () => {
  const registrationLinks = [
    "https://s.unhas.ac.id/RegistrasiBusinessPlanCompetitionNEXTUP2026",
    "https://s.unhas.ac.id/RegistrasiPaperCompetitionNEXTUP2026",
    "https://s.unhas.ac.id/RegistrasiInfografisCompetitionNEXTUP2026",
    "https://s.unhas.ac.id/RegistrasiEssayCompetitionNEXTUP2026",
  ];
  const guidebookLinks = [
    "https://drive.google.com/drive/folders/1K0MrBQyY2YUuCHsWa7pAtlQ4B6xeLBA9?usp=sharing",
    "https://drive.google.com/drive/folders/1kipR-hg9ViFg2L7p3UevzTUptHMTKooq?usp=sharing",
    "https://drive.google.com/drive/folders/162CgHCF1TnRGxnwfHz5P4qRAKQt3bVU6?usp=sharing",
    "https://drive.google.com/drive/folders/16DD6sHxTYyJFAdDlrm-bdNTSN4178-Yt?usp=sharing",
  ];
  return (
    <section id="pendaftaran" className="py-20 bg-white px-6">
      <FadeInScroll>
        <div className="max-w-6xl mx-auto text-center mb-12">
          <span className="inline-block bg-teal-100 text-teal-700 text-xs font-bold px-4 py-1 rounded-full mb-4">
            Pendaftaran
          </span>
          <h2 className="text-4xl font-extrabold text-gray-800 mb-2">
            Kategori Lomba
          </h2>
          <p className="text-gray-500 text-sm">
            Pilih Lomba yang ingin kamu ikuti. Pendaftaran terbuka, jangan
            sampai ketinggalan!
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {categories.map((cat, i) => {
            const categoryImages = [
              businessSuitCase,
              paperIjo,
              paintIjo,
              pencilIjo,
            ];
            return (
              <div
                key={i}
                className="flex items-start gap-4 p-6 bg-teal-50 rounded-2xl border border-teal-100 hover:shadow-md transition-shadow"
              >
                <img
                  src={categoryImages[i]}
                  alt={cat.title}
                  className="w-20 h-20 rounded-xl flex-shrink-0"
                />
                <div>
                  <h3 className="font-bold text-gray-800 mb-1">{cat.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{cat.desc}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <a
                      href={registrationLinks[i]}
                      className="inline-flex w-full sm:w-auto items-center justify-center rounded-full bg-teal-600 px-4 py-2 text-xs font-semibold text-white transition-all duration-300 active:scale-95 hover:scale-110 hover:shadow-lg hover:bg-teal-700"
                    >
                      Daftar Sekarang
                    </a>
                    <a
                      href={guidebookLinks[i]}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex w-full sm:w-auto items-center justify-center rounded-full border border-teal-600 px-4 py-2 text-xs font-semibold text-teal-700 transition-all duration-300 active:scale-95 hover:scale-110 hover:shadow-lg hover:bg-teal-50"
                    >
                      Lihat Guidebook
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </FadeInScroll>
    </section>
  );
};

// ─── FAQ ──────────────────────────────────────────────────────────────────────
// ─── FAQ ──────────────────────────────────────────────────────────────────────
const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section
      id="faq"
      className="py-20 px-6 overflow-hidden"
      style={{ background: "linear-gradient(180deg,#f0faf6,#e0f5ee)" }}
    >
      <FadeInScroll>
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
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-800 text-sm transition-all duration-300 hover:bg-teal-50 hover:shadow-md"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  {item.q}

                  {/* Animasi rotasi pada ikon + / - */}
                  <motion.span
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="text-teal-600 text-xl ml-4 flex-shrink-0"
                  >
                    {open === i ? "−" : "+"}
                  </motion.span>
                </button>

                {/* AnimatePresence menangani animasi saat elemen unmount (menghilang) */}
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      {/* Konten jawaban ditaruh di dalam bungkus motion agar padding tidak loncat */}
                      <div className="px-6 pb-4 pt-3 text-gray-500 text-sm leading-relaxed border-t border-teal-50">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </FadeInScroll>
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
          { label: "Email", value: "nextupftuh@gmail.com" },
          {
            label: "Whatsapp",
            value: "(Rena) +62 852-1326-3606 \n (Lisa) +62 857 5767 8579",
          },
          {
            label: "Lokasi",
            value: "Fakultas Teknik, \n Universitas Hasanuddin",
          },
        ].map((c, i) => {
          const contactImages = [letter, whatsappIcon, location];
          return (
            <div
              key={i}
              className="flex flex-col items-center gap-3 p-6 bg-teal-50 rounded-2xl border border-teal-100"
            >
              <img src={contactImages[i]} alt={c.label} className="w-14 h-14" />
              <p className="font-bold text-gray-800 text-sm">{c.label}</p>
              <p className="text-teal-600 text-sm whitespace-pre-line">
                {c.value}
              </p>
            </div>
          );
        })}
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
