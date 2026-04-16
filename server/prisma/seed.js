import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// ====================== ALL 125 INDONESIAN STATE UNIVERSITIES ======================
const universities = [
  // Java
  { name: "Universitas Indonesia", city: "Depok", province: "Jawa Barat" },
  { name: "Universitas Gadjah Mada", city: "Yogyakarta", province: "DI Yogyakarta" },
  { name: "Institut Teknologi Bandung", city: "Bandung", province: "Jawa Barat" },
  { name: "Institut Pertanian Bogor", city: "Bogor", province: "Jawa Barat" },
  { name: "Universitas Airlangga", city: "Surabaya", province: "Jawa Timur" },
  { name: "Institut Teknologi Sepuluh Nopember", city: "Surabaya", province: "Jawa Timur" },
  { name: "Universitas Diponegoro", city: "Semarang", province: "Jawa Tengah" },
  { name: "Universitas Padjadjaran", city: "Bandung", province: "Jawa Barat" },
  { name: "Universitas Brawijaya", city: "Malang", province: "Jawa Timur" },
  { name: "Universitas Sebelas Maret", city: "Surakarta", province: "Jawa Tengah" },
  { name: "Universitas Negeri Semarang", city: "Semarang", province: "Jawa Tengah" },
  { name: "Universitas Jenderal Soedirman", city: "Purwokerto", province: "Jawa Tengah" },
  { name: "Universitas Negeri Yogyakarta", city: "Yogyakarta", province: "DI Yogyakarta" },
  { name: "Universitas Negeri Surabaya", city: "Surabaya", province: "Jawa Timur" },
  { name: "Universitas Negeri Malang", city: "Malang", province: "Jawa Timur" },
  { name: "Universitas Negeri Jakarta", city: "Jakarta", province: "DKI Jakarta" },
  { name: "Universitas Jember", city: "Jember", province: "Jawa Timur" },
  { name: "Universitas Trunojoyo Madura", city: "Bangkalan", province: "Jawa Timur" },
  { name: "Universitas Tidar", city: "Magelang", province: "Jawa Tengah" },
  { name: "Universitas Sultan Ageng Tirtayasa", city: "Serang", province: "Banten" },
  { name: "Universitas Pendidikan Indonesia", city: "Bandung", province: "Jawa Barat" },
  { name: "Universitas Singaperbangsa Karawang", city: "Karawang", province: "Jawa Barat" },
  { name: "Universitas Siliwangi", city: "Tasikmalaya", province: "Jawa Barat" },
  { name: "Universitas Pembangunan Nasional Veteran Jakarta", city: "Jakarta", province: "DKI Jakarta" },
  { name: "Universitas Pembangunan Nasional Veteran Jawa Timur", city: "Surabaya", province: "Jawa Timur" },
  { name: "Universitas Pembangunan Nasional Veteran Yogyakarta", city: "Yogyakarta", province: "DI Yogyakarta" },
  { name: "Politeknik Negeri Jakarta", city: "Jakarta", province: "DKI Jakarta" },
  { name: "Politeknik Negeri Bandung", city: "Bandung", province: "Jawa Barat" },
  { name: "Politeknik Negeri Semarang", city: "Semarang", province: "Jawa Tengah" },
  { name: "Politeknik Negeri Malang", city: "Malang", province: "Jawa Timur" },
  { name: "Politeknik Elektronika Negeri Surabaya", city: "Surabaya", province: "Jawa Timur" },
  { name: "Politeknik Negeri Jember", city: "Jember", province: "Jawa Timur" },
  { name: "Politeknik Negeri Banyuwangi", city: "Banyuwangi", province: "Jawa Timur" },
  { name: "Politeknik Negeri Madiun", city: "Madiun", province: "Jawa Timur" },
  { name: "Politeknik Negeri Cilacap", city: "Cilacap", province: "Jawa Tengah" },
  { name: "Politeknik Negeri Subang", city: "Subang", province: "Jawa Barat" },
  // Sumatra
  { name: "Universitas Sumatera Utara", city: "Medan", province: "Sumatera Utara" },
  { name: "Universitas Andalas", city: "Padang", province: "Sumatera Barat" },
  { name: "Universitas Sriwijaya", city: "Palembang", province: "Sumatera Selatan" },
  { name: "Universitas Riau", city: "Pekanbaru", province: "Riau" },
  { name: "Universitas Lampung", city: "Bandar Lampung", province: "Lampung" },
  { name: "Universitas Syiah Kuala", city: "Banda Aceh", province: "Aceh" },
  { name: "Universitas Negeri Medan", city: "Medan", province: "Sumatera Utara" },
  { name: "Universitas Negeri Padang", city: "Padang", province: "Sumatera Barat" },
  { name: "Universitas Jambi", city: "Jambi", province: "Jambi" },
  { name: "Universitas Bengkulu", city: "Bengkulu", province: "Bengkulu" },
  { name: "Universitas Bangka Belitung", city: "Pangkalpinang", province: "Bangka Belitung" },
  { name: "Universitas Maritim Raja Ali Haji", city: "Tanjungpinang", province: "Kepulauan Riau" },
  { name: "Universitas Malikussaleh", city: "Lhokseumawe", province: "Aceh" },
  { name: "Universitas Teuku Umar", city: "Meulaboh", province: "Aceh" },
  { name: "Universitas Samudra", city: "Langsa", province: "Aceh" },
  { name: "Institut Teknologi Sumatera", city: "Lampung Selatan", province: "Lampung" },
  { name: "Politeknik Negeri Medan", city: "Medan", province: "Sumatera Utara" },
  { name: "Politeknik Negeri Padang", city: "Padang", province: "Sumatera Barat" },
  { name: "Politeknik Negeri Sriwijaya", city: "Palembang", province: "Sumatera Selatan" },
  { name: "Politeknik Negeri Lampung", city: "Bandar Lampung", province: "Lampung" },
  { name: "Politeknik Negeri Lhokseumawe", city: "Lhokseumawe", province: "Aceh" },
  { name: "Politeknik Negeri Bengkalis", city: "Bengkalis", province: "Riau" },
  { name: "Politeknik Negeri Batam", city: "Batam", province: "Kepulauan Riau" },
  // Kalimantan
  { name: "Universitas Tanjungpura", city: "Pontianak", province: "Kalimantan Barat" },
  { name: "Universitas Lambung Mangkurat", city: "Banjarmasin", province: "Kalimantan Selatan" },
  { name: "Universitas Mulawarman", city: "Samarinda", province: "Kalimantan Timur" },
  { name: "Universitas Palangka Raya", city: "Palangka Raya", province: "Kalimantan Tengah" },
  { name: "Universitas Borneo Tarakan", city: "Tarakan", province: "Kalimantan Utara" },
  { name: "Institut Teknologi Kalimantan", city: "Balikpapan", province: "Kalimantan Timur" },
  { name: "Politeknik Negeri Pontianak", city: "Pontianak", province: "Kalimantan Barat" },
  { name: "Politeknik Negeri Banjarmasin", city: "Banjarmasin", province: "Kalimantan Selatan" },
  { name: "Politeknik Negeri Samarinda", city: "Samarinda", province: "Kalimantan Timur" },
  { name: "Politeknik Negeri Ketapang", city: "Ketapang", province: "Kalimantan Barat" },
  { name: "Politeknik Negeri Tanah Laut", city: "Pelaihari", province: "Kalimantan Selatan" },
  // Sulawesi
  { name: "Universitas Hasanuddin", city: "Makassar", province: "Sulawesi Selatan" },
  { name: "Universitas Sam Ratulangi", city: "Manado", province: "Sulawesi Utara" },
  { name: "Universitas Tadulako", city: "Palu", province: "Sulawesi Tengah" },
  { name: "Universitas Halu Oleo", city: "Kendari", province: "Sulawesi Tenggara" },
  { name: "Universitas Negeri Makassar", city: "Makassar", province: "Sulawesi Selatan" },
  { name: "Universitas Negeri Manado", city: "Manado", province: "Sulawesi Utara" },
  { name: "Universitas Negeri Gorontalo", city: "Gorontalo", province: "Gorontalo" },
  { name: "Universitas Sulawesi Barat", city: "Majene", province: "Sulawesi Barat" },
  { name: "Politeknik Negeri Ujung Pandang", city: "Makassar", province: "Sulawesi Selatan" },
  { name: "Politeknik Negeri Manado", city: "Manado", province: "Sulawesi Utara" },
  { name: "Politeknik Pertanian Negeri Pangkep", city: "Pangkep", province: "Sulawesi Selatan" },
  // Bali, NTB, NTT
  { name: "Universitas Udayana", city: "Denpasar", province: "Bali" },
  { name: "Universitas Pendidikan Ganesha", city: "Singaraja", province: "Bali" },
  { name: "Universitas Mataram", city: "Mataram", province: "Nusa Tenggara Barat" },
  { name: "Universitas Nusa Cendana", city: "Kupang", province: "Nusa Tenggara Timur" },
  { name: "Universitas Timor", city: "Kefamenanu", province: "Nusa Tenggara Timur" },
  { name: "Politeknik Negeri Bali", city: "Badung", province: "Bali" },
  { name: "Politeknik Negeri Kupang", city: "Kupang", province: "Nusa Tenggara Timur" },
  // Maluku & Papua
  { name: "Universitas Pattimura", city: "Ambon", province: "Maluku" },
  { name: "Universitas Khairun", city: "Ternate", province: "Maluku Utara" },
  { name: "Universitas Cenderawasih", city: "Jayapura", province: "Papua" },
  { name: "Universitas Musamus", city: "Merauke", province: "Papua" },
  { name: "Universitas Papua", city: "Manokwari", province: "Papua Barat" },
  { name: "Politeknik Negeri Ambon", city: "Ambon", province: "Maluku" },
  // Special / National
  { name: "Universitas Pertahanan", city: "Bogor", province: "Jawa Barat" },
  { name: "Universitas Terbuka", city: "Tangerang Selatan", province: "Banten" },
  { name: "Institut Seni Indonesia Yogyakarta", city: "Yogyakarta", province: "DI Yogyakarta" },
  { name: "Institut Seni Indonesia Surakarta", city: "Surakarta", province: "Jawa Tengah" },
  { name: "Institut Seni Indonesia Denpasar", city: "Denpasar", province: "Bali" },
  { name: "Institut Seni Budaya Indonesia Bandung", city: "Bandung", province: "Jawa Barat" },
  { name: "Institut Seni Budaya Indonesia Tanah Papua", city: "Jayapura", province: "Papua" },
  { name: "Institut Seni Budaya Indonesia Aceh", city: "Banda Aceh", province: "Aceh" },
  { name: "Politeknik Negeri Media Kreatif", city: "Jakarta", province: "DKI Jakarta" },
  { name: "Politeknik Manufaktur Negeri Bandung", city: "Bandung", province: "Jawa Barat" },
  { name: "Politeknik Perkapalan Negeri Surabaya", city: "Surabaya", province: "Jawa Timur" },
  { name: "Politeknik Kesehatan Kemenkes Jakarta", city: "Jakarta", province: "DKI Jakarta" },
  { name: "Politeknik Negeri Nunukan", city: "Nunukan", province: "Kalimantan Utara" },
  { name: "Politeknik Negeri Fakfak", city: "Fakfak", province: "Papua Barat" },
  { name: "Politeknik Negeri Sambas", city: "Sambas", province: "Kalimantan Barat" },
  { name: "Politeknik Negeri Indramayu", city: "Indramayu", province: "Jawa Barat" },
  { name: "Politeknik Negeri Madura", city: "Sampang", province: "Jawa Timur" },
  { name: "Universitas Pertamina", city: "Jakarta", province: "DKI Jakarta" },
  { name: "Universitas Negeri Surakarta", city: "Surakarta", province: "Jawa Tengah" },
  { name: "Politeknik Negeri Balikpapan", city: "Balikpapan", province: "Kalimantan Timur" },
  { name: "Politeknik Negeri Nusa Utara", city: "Tahuna", province: "Sulawesi Utara" },
  { name: "Institut Teknologi Telkom Purwokerto", city: "Purwokerto", province: "Jawa Tengah" },
  { name: "Politeknik Negeri Padang Panjang", city: "Padang Panjang", province: "Sumatera Barat" },
  { name: "Universitas Sultan Agung Semarang", city: "Semarang", province: "Jawa Tengah" },
  { name: "Politeknik Negeri Bitung", city: "Bitung", province: "Sulawesi Utara" },
  { name: "Politeknik Negeri Palu", city: "Palu", province: "Sulawesi Tengah" },
  { name: "Politeknik Negeri Kendari", city: "Kendari", province: "Sulawesi Tenggara" },
  { name: "Politeknik Negeri Gorontalo", city: "Gorontalo", province: "Gorontalo" },
  { name: "Politeknik Negeri Pangandaran", city: "Pangandaran", province: "Jawa Barat" },
];

// ====================== DEPARTMENTS PER TIER ======================
const topTierMajors = [
  // Saintek
  { name: "Kedokteran", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 680, ukt: 15000000 },
  { name: "Teknik Informatika", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 630, ukt: 8000000 },
  { name: "Teknik Elektro", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 610, ukt: 7500000 },
  { name: "Teknik Mesin", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 600, ukt: 7500000 },
  { name: "Teknik Sipil", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 590, ukt: 7500000 },
  { name: "Farmasi", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 620, ukt: 9000000 },
  { name: "Kedokteran Gigi", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 660, ukt: 14000000 },
  { name: "Arsitektur", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 580, ukt: 7000000 },
  { name: "Biologi", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 540, ukt: 6000000 },
  { name: "Kimia", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 530, ukt: 6000000 },
  { name: "Fisika", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 520, ukt: 6000000 },
  { name: "Matematika", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 530, ukt: 5500000 },
  { name: "Sistem Informasi", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 610, ukt: 7500000 },
  { name: "Teknik Kimia", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 590, ukt: 7500000 },
  { name: "Teknik Industri", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 600, ukt: 7500000 },
  // Soshum
  { name: "Hukum", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 600, ukt: 7000000 },
  { name: "Manajemen", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 620, ukt: 7500000 },
  { name: "Akuntansi", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 630, ukt: 7500000 },
  { name: "Ilmu Komunikasi", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 610, ukt: 7000000 },
  { name: "Hubungan Internasional", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 610, ukt: 7000000 },
  { name: "Ilmu Politik", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 570, ukt: 6000000 },
  { name: "Psikologi", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 620, ukt: 8000000 },
  { name: "Ekonomi Pembangunan", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 580, ukt: 6500000 },
  { name: "Administrasi Publik", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 570, ukt: 6000000 },
  { name: "Sastra Inggris", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 560, ukt: 5500000 },
];

const midTierMajors = [
  { name: "Teknik Lingkungan", category: "SAINTEK", accreditation: "B", degree: "S1", baseScore: 530, ukt: 6500000 },
  { name: "Teknik Geologi", category: "SAINTEK", accreditation: "B", degree: "S1", baseScore: 520, ukt: 6500000 },
  { name: "Agroteknologi", category: "SAINTEK", accreditation: "B", degree: "S1", baseScore: 480, ukt: 5000000 },
  { name: "Peternakan", category: "SAINTEK", accreditation: "B", degree: "S1", baseScore: 460, ukt: 5000000 },
  { name: "Teknologi Pangan", category: "SAINTEK", accreditation: "B", degree: "S1", baseScore: 510, ukt: 6000000 },
  { name: "Statistika", category: "SAINTEK", accreditation: "B", degree: "S1", baseScore: 550, ukt: 6000000 },
  { name: "Teknik Perkapalan", category: "SAINTEK", accreditation: "B", degree: "S1", baseScore: 530, ukt: 7000000 },
  { name: "Ilmu Kelautan", category: "SAINTEK", accreditation: "B", degree: "S1", baseScore: 470, ukt: 5500000 },
  { name: "Kehutanan", category: "SAINTEK", accreditation: "B", degree: "S1", baseScore: 460, ukt: 5000000 },
  { name: "Geografi", category: "SAINTEK", accreditation: "B", degree: "S1", baseScore: 490, ukt: 5500000 },
  { name: "Ilmu Administrasi Bisnis", category: "SOSHUM", accreditation: "B", degree: "S1", baseScore: 550, ukt: 6000000 },
  { name: "Sosiologi", category: "SOSHUM", accreditation: "B", degree: "S1", baseScore: 520, ukt: 5500000 },
  { name: "Ilmu Sejarah", category: "SOSHUM", accreditation: "B", degree: "S1", baseScore: 490, ukt: 5000000 },
  { name: "Sastra Indonesia", category: "SOSHUM", accreditation: "B", degree: "S1", baseScore: 500, ukt: 5000000 },
  { name: "Antropologi", category: "SOSHUM", accreditation: "B", degree: "S1", baseScore: 480, ukt: 5000000 },
];

const educationMajors = [
  { name: "Pendidikan Matematika", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 510, ukt: 5000000 },
  { name: "Pendidikan Fisika", category: "SAINTEK", accreditation: "B", degree: "S1", baseScore: 470, ukt: 4500000 },
  { name: "Pendidikan Biologi", category: "SAINTEK", accreditation: "B", degree: "S1", baseScore: 480, ukt: 4500000 },
  { name: "Pendidikan Kimia", category: "SAINTEK", accreditation: "B", degree: "S1", baseScore: 470, ukt: 4500000 },
  { name: "Pendidikan Bahasa Indonesia", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 500, ukt: 4500000 },
  { name: "Pendidikan Bahasa Inggris", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 520, ukt: 5000000 },
  { name: "Pendidikan Guru Sekolah Dasar", category: "CAMPURAN", accreditation: "A", degree: "S1", baseScore: 510, ukt: 4500000 },
  { name: "Pendidikan Ekonomi", category: "SOSHUM", accreditation: "B", degree: "S1", baseScore: 480, ukt: 4500000 },
  { name: "Pendidikan Pancasila dan Kewarganegaraan", category: "SOSHUM", accreditation: "B", degree: "S1", baseScore: 460, ukt: 4000000 },
  { name: "Bimbingan dan Konseling", category: "SOSHUM", accreditation: "B", degree: "S1", baseScore: 490, ukt: 4500000 },
];

const politeknikMajors = [
  { name: "Teknik Mesin", category: "SAINTEK", accreditation: "B", degree: "D4", baseScore: 450, ukt: 5000000 },
  { name: "Teknik Elektro", category: "SAINTEK", accreditation: "B", degree: "D4", baseScore: 460, ukt: 5000000 },
  { name: "Teknik Sipil", category: "SAINTEK", accreditation: "B", degree: "D4", baseScore: 440, ukt: 5000000 },
  { name: "Teknik Informatika", category: "SAINTEK", accreditation: "B", degree: "D4", baseScore: 480, ukt: 5500000 },
  { name: "Akuntansi", category: "SOSHUM", accreditation: "B", degree: "D4", baseScore: 470, ukt: 5000000 },
  { name: "Administrasi Bisnis", category: "SOSHUM", accreditation: "B", degree: "D4", baseScore: 450, ukt: 4500000 },
  { name: "Teknik Kimia", category: "SAINTEK", accreditation: "B", degree: "D3", baseScore: 420, ukt: 4500000 },
  { name: "Teknik Listrik", category: "SAINTEK", accreditation: "B", degree: "D3", baseScore: 410, ukt: 4500000 },
];

const artMajors = [
  { name: "Seni Rupa Murni", category: "CAMPURAN", accreditation: "A", degree: "S1", baseScore: 450, ukt: 5000000 },
  { name: "Desain Komunikasi Visual", category: "CAMPURAN", accreditation: "A", degree: "S1", baseScore: 500, ukt: 5500000 },
  { name: "Seni Musik", category: "CAMPURAN", accreditation: "B", degree: "S1", baseScore: 440, ukt: 5000000 },
  { name: "Seni Tari", category: "CAMPURAN", accreditation: "B", degree: "S1", baseScore: 420, ukt: 4500000 },
  { name: "Seni Karawitan", category: "CAMPURAN", accreditation: "B", degree: "S1", baseScore: 400, ukt: 4500000 },
  { name: "Desain Interior", category: "CAMPURAN", accreditation: "B", degree: "S1", baseScore: 470, ukt: 5000000 },
];

// ====================== UI EXACT MAJORS ======================
const uiMajors = [
  // FK
  { name: "Pendidikan Dokter", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 710, ukt: 15000000 },
  // FKG
  { name: "Pendidikan Dokter Gigi", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 680, ukt: 14000000 },
  // FF
  { name: "Farmasi", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 630, ukt: 9000000 },
  // FKM
  { name: "Kesehatan Masyarakat", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 600, ukt: 8000000 },
  { name: "Studi Gizi", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 620, ukt: 8000000 },
  { name: "Keselamatan dan Kesehatan Kerja (K3)", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 590, ukt: 8000000 },
  { name: "Kesehatan Lingkungan", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 580, ukt: 8000000 },
  // FIK
  { name: "Ilmu Keperawatan", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 560, ukt: 7500000 },
  // FMIPA
  { name: "Matematika", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 570, ukt: 6500000 },
  { name: "Fisika", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 540, ukt: 6500000 },
  { name: "Kimia", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 550, ukt: 6500000 },
  { name: "Biologi", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 560, ukt: 6500000 },
  { name: "Geografi", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 540, ukt: 6500000 },
  { name: "Statistika", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 600, ukt: 6500000 },
  { name: "Aktuaria", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 650, ukt: 6500000 },
  { name: "Geofisika", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 540, ukt: 6500000 },
  // FT
  { name: "Teknik Sipil", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 600, ukt: 7500000 },
  { name: "Teknik Mesin", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 610, ukt: 7500000 },
  { name: "Teknik Elektro", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 620, ukt: 7500000 },
  { name: "Teknik Metalurgi dan Material", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 590, ukt: 7500000 },
  { name: "Arsitektur", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 600, ukt: 7500000 },
  { name: "Teknik Kimia", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 610, ukt: 7500000 },
  { name: "Teknik Industri", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 640, ukt: 7500000 },
  { name: "Teknik Perkapalan", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 580, ukt: 7500000 },
  { name: "Teknik Lingkungan", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 590, ukt: 7500000 },
  { name: "Teknik Komputer", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 650, ukt: 7500000 },
  { name: "Arsitektur Interior", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 580, ukt: 7500000 },
  { name: "Teknik Biomedis", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 630, ukt: 7500000 },
  // Fasilkom
  { name: "Ilmu Komputer", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 690, ukt: 8000000 },
  { name: "Sistem Informasi", category: "SAINTEK", accreditation: "A", degree: "S1", baseScore: 670, ukt: 8000000 },
  // FH
  { name: "Ilmu Hukum", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 640, ukt: 7500000 },
  // FEB
  { name: "Ilmu Ekonomi", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 630, ukt: 8500000 },
  { name: "Manajemen", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 650, ukt: 8500000 },
  { name: "Akuntansi", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 650, ukt: 8500000 },
  { name: "Ilmu Ekonomi Islam", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 610, ukt: 8500000 },
  { name: "Bisnis Islam", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 610, ukt: 8500000 },
  // FIB
  { name: "Arkeologi", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 560, ukt: 6500000 },
  { name: "Ilmu Filsafat", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 550, ukt: 6500000 },
  { name: "Ilmu Perpustakaan", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 570, ukt: 6500000 },
  { name: "Ilmu Sejarah", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 540, ukt: 6500000 },
  { name: "Bahasa dan Kebudayaan Korea", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 600, ukt: 6500000 },
  { name: "Sastra Arab", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 560, ukt: 6500000 },
  { name: "Sastra Belanda", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 550, ukt: 6500000 },
  { name: "Sastra Cina", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 560, ukt: 6500000 },
  { name: "Sastra Indonesia", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 570, ukt: 6500000 },
  { name: "Sastra Inggris", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 610, ukt: 6500000 },
  { name: "Sastra Jawa", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 530, ukt: 6500000 },
  { name: "Sastra Jepang", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 590, ukt: 6500000 },
  { name: "Sastra Jerman", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 560, ukt: 6500000 },
  { name: "Sastra Perancis", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 570, ukt: 6500000 },
  { name: "Sastra Rusia", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 560, ukt: 6500000 },
  // FPsi
  { name: "Psikologi", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 660, ukt: 8000000 },
  // FISIP
  { name: "Ilmu Komunikasi", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 660, ukt: 7500000 },
  { name: "Ilmu Politik", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 600, ukt: 7500000 },
  { name: "Ilmu Hubungan Internasional", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 650, ukt: 7500000 },
  { name: "Kriminologi", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 610, ukt: 7500000 },
  { name: "Sosiologi", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 580, ukt: 7500000 },
  { name: "Antropologi Sosial", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 570, ukt: 7500000 },
  { name: "Ilmu Kesejahteraan Sosial", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 590, ukt: 7500000 },
  // FIA
  { name: "Ilmu Administrasi Negara", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 620, ukt: 7500000 },
  { name: "Ilmu Administrasi Niaga", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 630, ukt: 7500000 },
  { name: "Ilmu Administrasi Fiskal", category: "SOSHUM", accreditation: "A", degree: "S1", baseScore: 630, ukt: 7500000 },
  // Vokasi
  { name: "Administrasi Asuransi & Aktuaria", category: "SOSHUM", accreditation: "A", degree: "D4", baseScore: 550, ukt: 6500000 },
  { name: "Administrasi Keuangan & Perbankan", category: "SOSHUM", accreditation: "A", degree: "D4", baseScore: 570, ukt: 6500000 },
  { name: "Administrasi Perkantoran", category: "SOSHUM", accreditation: "A", degree: "D4", baseScore: 540, ukt: 6500000 },
  { name: "Administrasi Perpajakan", category: "SOSHUM", accreditation: "A", degree: "D4", baseScore: 560, ukt: 6500000 },
  { name: "Administrasi Rumah Sakit", category: "SOSHUM", accreditation: "A", degree: "D4", baseScore: 560, ukt: 6500000 },
  { name: "Akuntansi", category: "SOSHUM", accreditation: "A", degree: "D4", baseScore: 580, ukt: 6500000 },
  { name: "Bisnis Kreatif", category: "SOSHUM", accreditation: "A", degree: "D4", baseScore: 570, ukt: 6500000 },
  { name: "Fisioterapi", category: "SAINTEK", accreditation: "A", degree: "D4", baseScore: 580, ukt: 6500000 },
  { name: "Hubungan Masyarakat", category: "SOSHUM", accreditation: "A", degree: "D4", baseScore: 570, ukt: 6500000 },
  { name: "Penyiaran Multimedia", category: "SOSHUM", accreditation: "A", degree: "D4", baseScore: 560, ukt: 6500000 },
  { name: "Periklanan Kreatif", category: "SOSHUM", accreditation: "A", degree: "D4", baseScore: 560, ukt: 6500000 },
  { name: "Produksi Media", category: "SOSHUM", accreditation: "A", degree: "D4", baseScore: 560, ukt: 6500000 },
  { name: "Terapi Okupasi", category: "SAINTEK", accreditation: "A", degree: "D4", baseScore: 550, ukt: 6500000 },
  { name: "Pariwisata", category: "SOSHUM", accreditation: "A", degree: "D4", baseScore: 550, ukt: 6500000 }
];

// Classify universities for department assignment
function getUniversityTier(name) {
  const top = ["Universitas Indonesia", "Universitas Gadjah Mada", "Institut Teknologi Bandung", "Institut Pertanian Bogor", "Universitas Airlangga", "Institut Teknologi Sepuluh Nopember", "Universitas Diponegoro", "Universitas Padjadjaran", "Universitas Brawijaya", "Universitas Hasanuddin", "Universitas Sumatera Utara", "Universitas Andalas", "Universitas Sriwijaya", "Universitas Udayana", "Universitas Sebelas Maret"];
  const mid = ["Universitas Negeri Semarang", "Universitas Negeri Yogyakarta", "Universitas Negeri Surabaya", "Universitas Negeri Malang", "Universitas Negeri Jakarta", "Universitas Pendidikan Indonesia", "Universitas Negeri Medan", "Universitas Negeri Padang", "Universitas Negeri Makassar", "Universitas Negeri Manado", "Universitas Negeri Gorontalo", "Universitas Negeri Surakarta"];
  const politeknik = name.startsWith("Politeknik");
  const art = name.startsWith("Institut Seni");

  if (politeknik) return "politeknik";
  if (art) return "art";
  if (top.includes(name)) return "top";
  if (mid.includes(name)) return "education";
  return "mid";
}

function getMajorsForUniversity(name) {
  if (name === "Universitas Indonesia") {
    return uiMajors;
  }
  
  const tier = getUniversityTier(name);
  let selected = [];

  switch (tier) {
    case "top":
      // top universities get all top-tier + some mid-tier
      selected = [...topTierMajors, ...midTierMajors.slice(0, 8)];
      break;
    case "education":
      // education-focused universities
      selected = [...educationMajors, ...topTierMajors.slice(0, 6), ...midTierMajors.slice(0, 4)];
      break;
    case "mid":
      // mid-tier universities get subset
      selected = [...topTierMajors.slice(0, 10), ...midTierMajors.slice(0, 6)];
      break;
    case "politeknik":
      selected = [...politeknikMajors];
      break;
    case "art":
      selected = [...artMajors];
      break;
  }

  return selected;
}

// Generate statistics for a major
function generateStats(baseScore, year, uniTier) {
  const tierMultiplier = uniTier === "top" ? 1.0 : uniTier === "education" ? 0.9 : uniTier === "politeknik" ? 0.92 : uniTier === "art" ? 0.85 : 0.85;
  const yearOffset = (year - 2022) * (Math.random() * 8 + 2); // scores increase slightly per year
  const noise = (Math.random() - 0.5) * 30;

  const minScore = Math.round((baseScore * tierMultiplier + yearOffset + noise) * 100) / 100;
  const capacity = Math.floor(30 + Math.random() * 120);
  const ratio = 3 + Math.random() * 15;
  const applicants = Math.floor(capacity * ratio);

  // Subtest breakdown (each out of 1000, exactly averaging to minScore)
  const tps = Math.round((minScore + (Math.random() - 0.5) * 40) * 100) / 100;
  const litBi = Math.round((minScore + (Math.random() - 0.5) * 40) * 100) / 100;
  const litBing = Math.round((minScore + (Math.random() - 0.5) * 40) * 100) / 100;
  const pm = Math.round((minScore * 4 - tps - litBi - litBing) * 100) / 100;

  return {
    year,
    minScore: Math.max(400, minScore),
    applicants,
    capacity,
    tpsScore: Math.max(100, tps),
    litBiScore: Math.max(80, litBi),
    litBingScore: Math.max(80, litBing),
    pmScore: Math.max(100, pm),
  };
}

async function main() {
  console.log("🌱 Starting seed...");

  // Clean existing data
  await prisma.bookmark.deleteMany();
  await prisma.statistic.deleteMany();
  await prisma.major.deleteMany();
  await prisma.university.deleteMany();
  await prisma.user.deleteMany();

  // Create admin user
  const adminHash = await bcrypt.hash("admin123", 10);
  await prisma.user.create({
    data: {
      name: "Administrator",
      email: "admin@snbt.id",
      passwordHash: adminHash,
      role: "ADMIN",
    },
  });
  console.log("✅ Admin user created: admin@snbt.id / admin123");

  // Create demo user
  const userHash = await bcrypt.hash("user123", 10);
  await prisma.user.create({
    data: {
      name: "Demo User",
      email: "user@snbt.id",
      passwordHash: userHash,
      role: "USER",
    },
  });
  console.log("✅ Demo user created: user@snbt.id / user123");

  let totalMajors = 0;
  let totalStats = 0;

  for (const uni of universities) {
    const uniTier = getUniversityTier(uni.name);
    const createdUni = await prisma.university.create({
      data: {
        name: uni.name,
        city: uni.city,
        province: uni.province,
      },
    });

    const majors = getMajorsForUniversity(uni.name);

    for (const major of majors) {
      const createdMajor = await prisma.major.create({
        data: {
          universityId: createdUni.id,
          name: major.name,
          category: major.category,
          accreditation: major.accreditation,
          degree: major.degree,
          estimatedUkt: major.ukt,
        },
      });

      // Generate 3 years of statistics
      for (const year of [2022, 2023, 2024]) {
        const stats = generateStats(major.baseScore, year, uniTier);
        await prisma.statistic.create({
          data: {
            majorId: createdMajor.id,
            ...stats,
          },
        });
        totalStats++;
      }
      totalMajors++;
    }

    console.log(`  📍 ${uni.name} — ${majors.length} majors`);
  }

  console.log(`\n🎉 Seed complete!`);
  console.log(`   Universities: ${universities.length}`);
  console.log(`   Majors: ${totalMajors}`);
  console.log(`   Statistics: ${totalStats}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
