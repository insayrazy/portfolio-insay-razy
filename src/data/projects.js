import { BarChart3, Building2, ClipboardList, FileText } from 'lucide-react'
import cashRatioDashboard from '@/assets/images/projects/cash-ratio-dashboard.png'
import cashRatioLogin from '@/assets/images/projects/cash-ratio-login.png'
import cashRatioTunggakan from '@/assets/images/projects/cash-ratio-tunggakan.png'
import comproBerita from '@/assets/images/projects/compro-berita.webp'
import comproHero from '@/assets/images/projects/compro-hero.webp'
import comproKeunggulan from '@/assets/images/projects/compro-keunggulan.png'
import comproProduk from '@/assets/images/projects/compro-produk.webp'
import comproTentang from '@/assets/images/projects/compro-tentang.webp'
import pelatihanBiaya from '@/assets/images/projects/pelatihan-biaya.png'
import pelatihanDashboard from '@/assets/images/projects/pelatihan-dashboard.png'
import pelatihanLanding from '@/assets/images/projects/pelatihan-landing.webp'
import pelatihanLaporan from '@/assets/images/projects/pelatihan-laporan.png'
import pelatihanLogin from '@/assets/images/projects/pelatihan-login.png'
import pelatihanMaster from '@/assets/images/projects/pelatihan-master.png'
import sertifDashboard from '@/assets/images/projects/sertif-dashboard.png'
import sertifDetail from '@/assets/images/projects/sertif-detail.png'
import sertifInput from '@/assets/images/projects/sertif-input.png'
import sertifLogin from '@/assets/images/projects/sertif-login.png'
import sertifRiwayat from '@/assets/images/projects/sertif-riwayat.png'

/**
 * Projects built at PT BPRS Hikmah Bahari.
 * - `images`    optional screenshots ({ src, caption }) — the first one is the card
 *               thumbnail and all of them open in the gallery. Without images a
 *               generated preview is rendered from `icon` + `gradient`.
 *               Only use screenshots with sensitive figures masked.
 * - `liveUrl`   only for public sites. Internal apps are shown as case studies
 *               without a link so their login pages are not advertised.
 * - `githubUrl` optional; omitted for private company repositories.
 * - `internal`  true for staff-only apps (rendered as a case study).
 * - `role` / `outcome` optional case-study details.
 */
export const projectCategories = [
  { id: 'All', label: { en: 'All', id: 'Semua' } },
  { id: 'Fullstack', label: { en: 'Fullstack', id: 'Fullstack' } },
  { id: 'Frontend', label: { en: 'Frontend', id: 'Frontend' } },
  { id: 'Backend', label: { en: 'Backend', id: 'Backend' } },
]

const fullstackRole = {
  en: 'Fullstack developer — requirements gathering with users, database design, frontend & backend development, deployment and ongoing maintenance.',
  id: 'Fullstack developer — analisis kebutuhan bersama pengguna, desain database, pengembangan frontend & backend, deployment, dan maintenance berkelanjutan.',
}

export const projects = [
  {
    id: 'cash-ratio-monitoring',
    title: {
      en: 'Cash Ratio & Customer Arrears Monitoring',
      id: 'Monitoring Cash Ratio & Tunggakan Nasabah',
    },
    category: 'Fullstack',
    company: 'PT BPRS Hikmah Bahari',
    internal: true,
    featured: true,
    description: {
      en: 'Internal dashboard for monitoring the bank’s cash ratio and customer arrears across all offices (Head Office, Batang, Purwokerto): outstanding per branch, NPF, collectibility distribution, and an arrears list filterable by account officer, product, collectibility and days overdue — with Excel export.',
      id: 'Dashboard internal untuk memantau cash ratio dan tunggakan nasabah di seluruh kantor (Pusat, Batang, Purwokerto): outstanding per cabang, NPF, distribusi kolektibilitas, serta daftar tunggakan yang bisa difilter berdasarkan AO, produk, kolektibilitas, dan hari tunggakan — lengkap dengan export Excel.',
    },
    role: fullstackRole,
    outcome: {
      en: 'Management monitors cash ratio and arrears from one dashboard instead of compiling reports manually.',
      id: 'Manajemen memantau cash ratio dan tunggakan dari satu dashboard, tanpa perlu merekap laporan secara manual.',
    },
    stack: {
      frontend: ['JavaScript (ES6)', 'React 18', 'Create React App', 'CoreUI React v4.5', 'React Select', 'Chart.js', 'Axios', 'React Router DOM', 'Redux'],
      backend: ['Node.js', 'Express.js', 'mssql (SQL Server)', 'REST API', 'JWT'],
    },
    tech: ['React 18', 'CoreUI', 'Redux', 'Chart.js', 'Node.js', 'Express.js', 'SQL Server', 'JWT'],
    images: [
      { src: cashRatioDashboard, caption: { en: 'Dashboard — outstanding & NPF per branch', id: 'Dashboard — outstanding & NPF per kantor' } },
      { src: cashRatioTunggakan, caption: { en: 'Arrears across all offices with filters & Excel export', id: 'Tunggakan seluruh kantor dengan filter & export Excel' } },
      { src: cashRatioLogin, caption: { en: 'JWT-secured login', id: 'Halaman login dengan autentikasi JWT' } },
    ],
    icon: BarChart3,
    gradient: ['#22D3EE', '#3B82F6'],
  },
  {
    id: 'company-profile',
    title: { en: 'Company Profile Website', id: 'Website Company Profile' },
    category: 'Frontend',
    company: 'PT BPRS Hikmah Bahari',
    internal: false,
    featured: true,
    description: {
      en: 'Official public website of PT BPRS Hikmah Bahari: hero landing, company profile, savings/deposit/financing product catalogue, financial reports, news & announcements, contact and a floating WhatsApp button — fully responsive.',
      id: 'Website resmi PT BPRS Hikmah Bahari: landing hero, profil perusahaan, katalog produk tabungan/deposito/pembiayaan, laporan keuangan, berita & pengumuman, kontak, serta tombol WhatsApp melayang — sepenuhnya responsif.',
    },
    role: {
      en: 'Built the website from scratch — page structure and UI design, frontend development, content integration, deployment and ongoing maintenance.',
      id: 'Membangun website dari awal — perancangan struktur halaman dan UI, pengembangan frontend, integrasi konten, deployment, dan maintenance berkelanjutan.',
    },
    outcome: {
      en: 'The bank now has a modern, responsive official website where the public can explore products, read reports and news, and contact the bank directly via WhatsApp.',
      id: 'Bank kini memiliki website resmi yang modern dan responsif, tempat masyarakat dapat melihat produk, membaca laporan dan berita, serta menghubungi bank langsung via WhatsApp.',
    },
    tech: ['React', 'Vite', 'JavaScript'],
    images: [
      { src: comproHero, caption: { en: 'Hero landing page', id: 'Halaman utama (hero)' } },
      { src: comproTentang, caption: { en: 'About the company', id: 'Tentang perusahaan' } },
      { src: comproProduk, caption: { en: 'Product catalogue — savings, deposits & financing', id: 'Katalog produk — tabungan, deposito & pembiayaan' } },
      { src: comproKeunggulan, caption: { en: 'Why choose the bank', id: 'Mengapa memilih bank' } },
      { src: comproBerita, caption: { en: 'News & information', id: 'Berita & informasi' } },
    ],
    icon: Building2,
    gradient: ['#10B981', '#06B6D4'],
    liveUrl: 'https://hikmahbahari.com',
  },
  {
    id: 'sertif-input',
    title: { en: 'Certificate Input Transactions', id: 'Transaksi Input Sertif' },
    category: 'Fullstack',
    company: 'PT BPRS Hikmah Bahari',
    internal: true,
    featured: true,
    description: {
      en: 'Internal web application for processing certification disbursements per branch: search contracts, review customer balances and installments, choose the term (1–3 months), record installments to the bank, transfers to customers and companion accounts — with a full history and Excel export.',
      id: 'Aplikasi web internal untuk memproses pencairan sertifikasi per cabang: cari kontrak, tinjau saldo dan angsuran nasabah, pilih termin (1–3 bulan), catat angsuran ke bank, transfer ke nasabah, dan rekening pendamping — lengkap dengan riwayat dan export Excel.',
    },
    // Existing application — continued development, not built from scratch.
    role: {
      en: 'Continued development of an existing application — adding and improving features, fixing bugs and maintaining it in line with operational needs.',
      id: 'Melanjutkan pengembangan aplikasi yang sudah ada — menambah dan menyempurnakan fitur, memperbaiki bug, serta melakukan maintenance sesuai kebutuhan operasional.',
    },
    outcome: {
      en: 'The application keeps running reliably and evolves with the bank’s certification process, so transactions stay consistently recorded and traceable.',
      id: 'Aplikasi tetap berjalan stabil dan berkembang mengikuti proses sertifikasi bank, sehingga transaksi tetap tercatat konsisten dan mudah ditelusuri.',
    },
    stack: {
      frontend: ['HTML', 'CSS', 'JavaScript', 'Livewire v3'],
      backend: ['PHP', 'Laravel 11', 'MySQL', 'REST API'],
    },
    tech: ['Laravel 11', 'Livewire v3', 'PHP', 'MySQL', 'REST API', 'JavaScript'],
    images: [
      { src: sertifDashboard, caption: { en: 'Dashboard — monthly certification realisation per branch', id: 'Dashboard — realisasi sertif turun per cabang bulan ini' } },
      { src: sertifInput, caption: { en: 'Pending contracts to process (data masked)', id: 'Daftar kontrak yang perlu diproses (data disamarkan)' } },
      { src: sertifDetail, caption: { en: 'Certification detail form with term selection (data masked)', id: 'Form detail sertifikasi dengan pilihan termin (data disamarkan)' } },
      { src: sertifRiwayat, caption: { en: 'Certification history with pagination & Excel export (data masked)', id: 'Riwayat sertif dengan pagination & export Excel (data disamarkan)' } },
      { src: sertifLogin, caption: { en: 'Login page', id: 'Halaman login' } },
    ],
    icon: FileText,
    gradient: ['#8B5CF6', '#6366F1'],
  },
  {
    id: 'training-resume',
    title: { en: 'Training Resume Submission', id: 'Website Isi Resume Pelatihan' },
    category: 'Fullstack',
    company: 'PT BPRS Hikmah Bahari',
    internal: true,
    featured: true,
    description: {
      en: 'Employee training management system: staff submit training resumes from their phone or laptop, while admins manage the training master (type, organiser, speakers, schedule, hours, costs with breakdown, and mandatory participants by division), monitor a dashboard per month, type, division and organiser, and export PDF/Excel reports and cost recaps — with user, division & role management, activity log, backup/import and dark mode.',
      id: 'Sistem manajemen pelatihan karyawan: karyawan mengisi resume pelatihan dari HP atau laptop, sementara admin mengelola master pelatihan (jenis, penyelenggara, pemateri, jadwal, jam, biaya beserta rincian, dan peserta wajib per divisi), memantau dashboard per bulan, jenis, divisi, dan penyelenggara, serta mengunduh laporan PDF/Excel dan rekap biaya — dilengkapi kelola user, divisi & jabatan, activity log, backup/import data, dan dark mode.',
    },
    role: fullstackRole,
    outcome: {
      en: 'Training resumes from every employee are collected in one place and easy for management to review.',
      id: 'Resume pelatihan seluruh karyawan terkumpul di satu tempat dan mudah ditinjau oleh manajemen.',
    },
    stack: {
      frontend: ['React', 'Tailwind CSS'],
      backend: ['Node.js', 'Express.js', 'Prisma'],
    },
    tech: ['React', 'Tailwind CSS', 'Node.js', 'Express.js', 'Prisma'],
    images: [
      { src: pelatihanDashboard, caption: { en: 'Training dashboard with filters by year, month and division', id: 'Dashboard pelatihan dengan filter tahun, bulan, dan divisi' } },
      { src: pelatihanMaster, caption: { en: 'Training master form — type, organiser, speakers and schedule', id: 'Form master pelatihan — jenis, penyelenggara, pemateri, dan jadwal' } },
      { src: pelatihanBiaya, caption: { en: 'Training costs with breakdown and mandatory participants', id: 'Biaya pelatihan dengan rincian dan peserta wajib' } },
      { src: pelatihanLaporan, caption: { en: 'PDF/Excel reports and cost recap', id: 'Laporan PDF/Excel dan rekap biaya' } },
      { src: pelatihanLanding, caption: { en: 'Landing page — responsive for phone and laptop', id: 'Landing page — responsif untuk HP dan laptop' } },
      { src: pelatihanLogin, caption: { en: 'Login page', id: 'Halaman login' } },
    ],
    icon: ClipboardList,
    gradient: ['#F59E0B', '#EF4444'],
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
