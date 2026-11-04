import { hacktiv8Credential } from '@/data/certificates';

/**
 * Work & education timeline (source: CV Insay Razy).
 * `tech` is optional — leave it out for non-technical roles.
 */
// IT Staff role at PT BPRS Hikmah Bahari — held twice: first in a 2-person IT team,
// then (after the Customer Services rotation) as the sole IT staff member.
const bprsItStaff = {
  role: { en: 'IT Staff / Software Developer', id: 'IT Staff / Software Developer' },
  company: 'PT BPRS Hikmah Bahari',
  type: { en: 'Full-time', id: 'Full-time' },
  kind: 'work',
  location: { en: 'Tegal, Indonesia', id: 'Tegal, Indonesia' },
  description: {
    en: 'Designing, building, implementing and maintaining internal applications while keeping the bank’s servers, databases, network and IT infrastructure running reliably.',
    id: 'Merancang, membangun, mengimplementasikan, dan memelihara aplikasi internal sekaligus menjaga server, database, jaringan, dan infrastruktur TI bank tetap berjalan optimal.',
  },
  achievements: {
    en: [
      'Design, develop, implement and maintain internal applications using JavaScript, Node.js, Express.js, SQL Server, REST API and the Laravel PHP framework.',
      'Develop new features, perform maintenance and troubleshoot applications and websites according to the company’s operational needs.',
      'Manage servers, databases, networks and IT infrastructure to keep systems running optimally.',
      'Monitor, back up and restore the Core Banking System database.',
      'Provide technical support, troubleshooting and hardware/software maintenance for other divisions.',
      'Coordinate with vendors and users on system implementation, development and issue resolution.',
    ],
    id: [
      'Merancang, mengembangkan, mengimplementasikan, dan memelihara aplikasi internal menggunakan JavaScript, Node.js, Express.js, SQL Server, REST API, dan PHP Framework Laravel.',
      'Mengembangkan fitur baru, melakukan maintenance, serta troubleshooting aplikasi dan website sesuai kebutuhan operasional perusahaan.',
      'Mengelola server, database, jaringan, dan infrastruktur TI untuk memastikan sistem berjalan optimal.',
      'Melakukan monitoring, backup, dan restore database Core Banking System.',
      'Memberikan dukungan teknis, troubleshooting, serta pemeliharaan perangkat keras dan perangkat lunak kepada divisi lain.',
      'Berkoordinasi dengan vendor dan pengguna dalam implementasi, pengembangan, serta penyelesaian kendala sistem.',
    ],
  },
  tech: ['JavaScript', 'Node.js', 'Express.js', 'Laravel', 'PHP', 'SQL Server', 'REST API'],
};

export const experiences = [
  {
    ...bprsItStaff,
    id: 'bprs-it-current',
    type: { en: 'Full-time · Sole IT Staff', id: 'Full-time · Staf IT Tunggal' },
    period: { en: 'Feb 2026 — Present', id: 'Feb 2026 — Sekarang' },
    description: {
      en: 'Returned to the IT division after the Customer Services rotation and now run it on my own — fully responsible for the bank’s applications, systems and IT infrastructure, with one colleague as backup when I am away.',
      id: 'Kembali ke divisi IT setelah rotasi Customer Services dan kini menjalankannya seorang diri — bertanggung jawab penuh atas aplikasi, sistem, dan infrastruktur TI bank, dengan satu rekan sebagai backup saat saya tidak masuk.',
    },
    achievements: {
      en: [
        'Sole IT staff member: own every IT need of the company end-to-end, with one colleague covering only when I am absent.',
        ...bprsItStaff.achievements.en,
      ],
      id: [
        'Menjadi satu-satunya staf IT: menangani seluruh kebutuhan TI perusahaan secara end-to-end, dengan satu rekan yang hanya membackup saat saya tidak masuk.',
        ...bprsItStaff.achievements.id,
      ],
    },
  },
  {
    id: 'bprs-cs',
    role: { en: 'Customer Services', id: 'Customer Services' },
    company: 'PT BPRS Hikmah Bahari',
    type: { en: 'Full-time', id: 'Full-time' },
    kind: 'work',
    location: { en: 'Tegal, Indonesia', id: 'Tegal, Indonesia' },
    period: { en: 'Jun 2025 — Feb 2026', id: 'Jun 2025 — Feb 2026' },
    description: {
      en: 'Served customers on the front line of banking operations, from account opening to transactions and administration.',
      id: 'Melayani nasabah di garda depan operasional perbankan, mulai dari pembukaan rekening hingga transaksi dan administrasi.',
    },
    achievements: {
      en: [
        'Served customers with account opening, transactions and banking administration.',
        'Handled customer information requests and resolved issues according to company service standards.',
        'Coordinated with other divisions to keep operational processes running effectively.',
      ],
      id: [
        'Memberikan pelayanan kepada nasabah terkait pembukaan rekening, transaksi, dan administrasi perbankan.',
        'Menangani kebutuhan informasi dan penyelesaian permasalahan nasabah sesuai standar pelayanan perusahaan.',
        'Berkoordinasi dengan berbagai divisi untuk memastikan proses operasional berjalan efektif.',
      ],
    },
  },
  {
    ...bprsItStaff,
    id: 'bprs-it-early',
    type: { en: 'Full-time · 2-person IT team', id: 'Full-time · Tim IT 2 orang' },
    period: { en: 'Jul 2023 — Jun 2025', id: 'Jul 2023 — Jun 2025' },
    description: {
      en: 'Part of a two-person IT division, sharing responsibility for building and maintaining internal applications and keeping the bank’s servers, databases, network and IT infrastructure running reliably.',
      id: 'Bagian dari divisi IT beranggotakan 2 orang, berbagi tanggung jawab membangun dan memelihara aplikasi internal serta menjaga server, database, jaringan, dan infrastruktur TI bank tetap berjalan optimal.',
    },
  },
  {
    id: 'hacktiv8',
    role: {
      en: 'Full Stack JavaScript Immersive Program',
      id: 'Full Stack JavaScript Immersive Program',
    },
    company: 'Hacktiv8 Indonesia',
    type: { en: 'Bootcamp · Graduate', id: 'Bootcamp · Lulus' },
    kind: 'education',
    location: { en: 'Jakarta Selatan, Indonesia', id: 'Jakarta Selatan, Indonesia' },
    period: { en: 'Dec 2022 — Apr 2023', id: 'Des 2022 — Apr 2023' },
    description: {
      en: 'Graduated from an intensive, project-based fullstack JavaScript bootcamp covering modern JavaScript, Node.js, Express, PostgreSQL, React, REST APIs, testing and team collaboration.',
      id: 'Lulus dari bootcamp fullstack JavaScript intensif berbasis project yang mencakup JavaScript modern, Node.js, Express, PostgreSQL, React, REST API, testing, dan kolaborasi tim.',
    },
    achievements: {
      en: [
        'Completed the full curriculum and graduated with an official certificate and transcript of grades.',
        'Built fullstack applications individually and in teams, including a final group project.',
      ],
      id: [
        'Menyelesaikan seluruh kurikulum dan lulus dengan sertifikat serta transkrip nilai resmi.',
        'Membangun aplikasi fullstack secara individu maupun tim, termasuk final project kelompok.',
      ],
    },
    tech: ['JavaScript', 'Node.js', 'Express', 'PostgreSQL', 'React', 'REST API'],
    links: [
      { label: { en: 'Certificate', id: 'Sertifikat' }, href: hacktiv8Credential.certificateUrl },
      {
        label: { en: 'Transcript', id: 'Transkrip Nilai' },
        href: hacktiv8Credential.transcriptUrl,
      },
    ],
  },
  {
    id: 'polihasnur',
    role: {
      en: 'Diploma III (D3) in Computer Engineering',
      id: 'Diploma III (D3) Teknik Komputer',
    },
    company: 'Politeknik Harapan Bersama Tegal',
    type: { en: 'Education · GPA 3.39', id: 'Pendidikan · IPK 3.39' },
    kind: 'education',
    location: { en: 'Tegal, Indonesia', id: 'Tegal, Indonesia' },
    period: { en: '2018 — 2021', id: '2018 — 2021' },
    description: {
      en: 'Studied computer engineering fundamentals — programming, networking, hardware and web development.',
      id: 'Mempelajari dasar-dasar teknik komputer — pemrograman, jaringan, perangkat keras, dan pengembangan web.',
    },
    achievements: {
      en: ['Final project: IoT web monitoring of server-room temperature and humidity.'],
      id: ['Proyek akhir: Web Monitoring Suhu dan Kelembaban Ruang Server berbasis IoT.'],
    },
    tech: ['IoT', 'Web Monitoring'],
  },
];
