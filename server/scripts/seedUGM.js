import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const saintekS1 = [
  "Arsitektur", "Teknik Sipil", "Teknik Mesin", "Teknik Elektro", "Teknik Kimia", 
  "Teknik Industri", "Teknik Fisika", "Teknik Geodesi", "Teknik Geologi", 
  "Perencanaan Wilayah dan Kota", "Teknologi Informasi", "Teknik Biomedis", 
  "Matematika", "Fisika", "Kimia", "Ilmu Komputer", "Statistika", "Geofisika", 
  "Elektronika dan Instrumentasi", "Ilmu Aktuaria", "Biologi", "Farmasi", 
  "Kedokteran", "Ilmu Keperawatan", "Kesehatan Masyarakat", "Gizi", "Kedokteran Gigi", 
  "Kedokteran Hewan", "Agronomi", "Proteksi Tanaman", "Ilmu Tanah", "Mikrobiologi Pertanian", 
  "Teknologi Pangan dan Hasil Pertanian", "Teknik Pertanian", "Teknologi Industri Pertanian", 
  "Ilmu dan Industri Peternakan", "Kehutanan", "Perikanan / Ilmu Kelautan", 
  "Geografi Lingkungan", "Kartografi dan Penginderaan Jauh", "Pembangunan Wilayah"
];

const soshumS1 = [
  "Manajemen", "Akuntansi", "Ilmu Ekonomi", "Ilmu Hukum", "Ilmu Hubungan Internasional", 
  "Ilmu Komunikasi", "Sosiologi", "Politik dan Pemerintahan", "Manajemen dan Kebijakan Publik", 
  "Pembangunan Sosial dan Kesejahteraan", "Psikologi", "Filsafat", "Sastra Indonesia", 
  "Sastra Inggris", "Sastra Jepang", "Sastra Arab", "Sastra Prancis", "Sastra Jawa", 
  "Bahasa dan Kebudayaan Korea", "Antropologi Budaya", "Arkeologi", "Sejarah", "Pariwisata"
];

const vokasiD4 = [
  "Akuntansi Sektor Publik", "Manajemen dan Penilaian Properti", "Pembangunan Ekonomi Kewilayahan", 
  "Bahasa Inggris", "Bisnis Perjalanan Wisata", "Manajemen Informasi Kesehatan", 
  "Teknologi Rekayasa Internet", "Teknologi Rekayasa Perangkat Lunak", "Teknologi Rekayasa Elektro", 
  "Teknologi Rekayasa Mesin", "Teknologi Rekayasa Pelaksanaan Bangunan Sipil", 
  "Sistem Informasi Geografis", "Pengelolaan Arsip dan Rekaman Informasi", "Perbankan", 
  "Akuntansi", "Manajemen"
];

const d3 = [
  "Akuntansi", "Perbankan", "Manajemen", "Bahasa Inggris", "Pariwisata", 
  "Kearsipan", "Sistem Informasi Geografis", "Rekam Medis"
];

function isSaintek(name) {
  return /teknologi|teknik|internet|geografis|informasi|medis|kesehatan|arsitektur|sipil|mesin|elektro|fisika|kimia|biologi|matematika|statistika|tanaman|hewan|pertanian|peternakan|kehutanan|perikanan/i.test(name);
}

const uktMax = 6000000;
const uktMin = 3000000;

function getRandomStats(baseScore) {
  const years = [2022, 2023, 2024];
  return years.map((y, i) => {
    const minScore = baseScore + (Math.random() * 20 - 10) + (i * 10);
    return {
      year: y,
      minScore: Math.round(minScore * 100) / 100,
      applicants: Math.floor(Math.random() * 2000) + 500,
      capacity: Math.floor(Math.random() * 80) + 30,
      tpsScore: Math.min(1000, Math.round((minScore + (Math.random() * 40 - 20)) * 100) / 100),
      pmScore: Math.min(1000, Math.round((minScore + (Math.random() * 60 - 30)) * 100) / 100),
      litBiScore: Math.min(1000, Math.round((minScore + (Math.random() * 30 - 15)) * 100) / 100),
      litBingScore: Math.min(1000, Math.round((minScore + (Math.random() * 50 - 25)) * 100) / 100),
    };
  });
}

async function run() {
  console.log("Seeding authentic UGM Data...");
  const ugm = await prisma.university.findFirst({
    where: { name: 'Universitas Gadjah Mada' },
  });

  if (!ugm) {
    console.error("UGM not found. Run standard seed first.");
    return;
  }

  const existingMajors = await prisma.major.findMany({ where: { universityId: ugm.id } });
  const existingMajorIds = existingMajors.map(m => m.id);

  console.log(`Deleting ${existingMajorIds.length} generic UGM majors...`);
  await prisma.statistic.deleteMany({ where: { majorId: { in: existingMajorIds } } });
  await prisma.major.deleteMany({ where: { universityId: ugm.id } });

  const allToInsert = [];

  saintekS1.forEach(name => allToInsert.push({ name, category: 'SAINTEK', degree: 'S1', accreditation: 'Unggul' }));
  soshumS1.forEach(name => allToInsert.push({ name, category: 'SOSHUM', degree: 'S1', accreditation: 'Unggul' }));
  
  vokasiD4.forEach(name => allToInsert.push({ name, category: isSaintek(name) ? 'SAINTEK' : 'SOSHUM', degree: 'D4', accreditation: 'Unggul' }));
  d3.forEach(name => allToInsert.push({ name, category: isSaintek(name) ? 'SAINTEK' : 'SOSHUM', degree: 'D3', accreditation: 'Unggul' }));

  let insertedCount = 0;
  for (const mData of allToInsert) {
    const baseScore = mData.category === 'SAINTEK' ? 655 : 620;
    
    await prisma.major.create({
      data: {
        universityId: ugm.id,
        name: mData.name,
        category: mData.category,
        accreditation: mData.accreditation,
        degree: mData.degree,
        estimatedUkt: Math.floor(Math.random() * (uktMax - uktMin) + uktMin),
        statistics: {
          create: getRandomStats(baseScore)
        }
      }
    });

    insertedCount++;
  }

  console.log(`Successfully recreated UGM with ${insertedCount} authentic majors!`);
  await prisma.$disconnect();
}

run();
