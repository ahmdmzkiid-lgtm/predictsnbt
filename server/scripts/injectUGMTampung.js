import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const dataString = `
1. Agronomi — 24
2. Akuakultur — 23
3. Akuntansi — 45
4. Antropologi Budaya — 30
5. Arkeologi — 21
6. Arsitektur — 24
7. Bahasa dan Kebudayaan Jepang — 18
8. Bahasa dan Kebudayaan Korea — 18
9. Bahasa dan Sastra Prancis — 14
10. Bahasa dan Sastra Indonesia — 30
11. Bahasa, Sastra, dan Budaya Jawa — 15
12. Biologi — 68
13. Ekonomi Pertanian dan Agribisnis — 27
14. Elektronika dan Instrumentasi — 27
15. Farmasi — 72
16. Filsafat — 45
17. Fisika — 21
18. Geofisika — 21
19. Geografi Lingkungan — 35
20. Gizi — 30
21. Higiene Gigi — 17
22. Hukum — 96
23. Ilmu Aktuaria — 17
24. Ilmu dan Industri Peternakan — 90
25. Ilmu Ekonomi — 30
26. Ilmu Hubungan Internasional — 24
27. Ilmu Keperawatan — 36
28. Ilmu Komputer — 27
29. Ilmu Komunikasi — 24
30. Ilmu Tanah — 23
31. Kartografi dan Penginderaan Jauh — 30
32. Kedokteran — 53
33. Kedokteran Gigi — 45
34. Kedokteran Hewan — 60
35. Kehutanan — 90
36. Kimia — 45
37. Manajemen — 45
38. Manajemen dan Kebijakan Publik — 24
39. Manajemen Sumberdaya Akuatik — 23
40. Matematika — 20
41. Mikrobiologi Pertanian — 11
42. Pariwisata — 21
43. Pembangunan Sosial dan Kesejahteraan — 24
44. Pembangunan Wilayah — 24
45. Penyuluhan dan Komunikasi Pertanian — 9
46. Perencanaan Wilayah dan Kota — 23
47. Politik dan Pemerintahan — 24
48. Proteksi Tanaman — 23
49. Psikologi — 68
50. Sastra Arab — 21
51. Sastra Inggris — 21
52. Sejarah — 18
53. Sosiologi — 24
54. Statistika — 20
55. Teknik Biomedis — 18
56. Teknik Elektro — 35
57. Teknik Fisika — 36
58. Teknik Geodesi — 35
59. Teknik Geologi — 36
60. Teknik Industri — 36
61. Teknik Infrastruktur Lingkungan — 15
62. Teknik Kimia — 42
63. Teknik Mesin — 51
64. Teknik Nuklir — 15
65. Teknik Pertanian — 29
66. Teknik Sipil — 33
67. Teknik Sumber Daya Air — 15
68. Teknologi Hasil Perikanan — 23
69. Teknologi Industri Pertanian — 30
70. Teknologi Informasi — 29
71. Teknologi Pangan dan Hasil Pertanian — 33
72. Akuntansi Sektor Publik (Terapan) — 30
73. Bahasa Inggris (Terapan) — 23
74. Bahasa Jepang untuk Komunikasi Bisnis dan Profesional — 18
75. Bisnis Perjalanan Wisata — 27
76. Manajemen dan Penilaian Properti — 30
77. Manajemen Informasi Kesehatan — 36
78. Pembangunan Ekonomi Kewilayahan — 30
79. Pengelolaan Arsip dan Rekaman Informasi — 23
80. Pengelolaan Hutan — 27
81. Pengembangan Produk Agroindustri — 27
82. Perbankan — 36
83. Sistem Informasi Geografis — 21
84. Teknik Pengelolaan dan Pemeliharaan Infrastruktur Sipil — 22
85. Teknik Pengelolaan dan Perawatan Alat Berat — 23
86. Teknologi Rekayasa Elektro — 27
87. Teknologi Rekayasa Instrumentasi dan Kontrol — 22
88. Teknologi Rekayasa Internet — 29
89. Teknologi Rekayasa Mesin — 23
90. Teknologi Rekayasa Pelaksanaan Bangunan Sipil — 17
91. Teknologi Rekayasa Perangkat Lunak — 29
92. Teknologi Survei dan Pemetaan Dasar — 21
93. Teknologi Veteriner — 27
`;

// Parse user input
const parseData = () => {
    return dataString.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
            const match = line.match(/^\d+\.\s+(.+?)\s+—\s+(\d+)$/);
            if (match) {
                return {
                    name: match[1].trim(),
                    capacity: parseInt(match[2], 10)
                };
            }
            return null;
        })
        .filter(item => item !== null);
};

const determineCategory = (majorName) => {
    const nameStr = majorName.toLowerCase();
    
    const saintekKeywords = [
        'agronomi', 'akuakultur', 'biologi', 'pertanian', 'elektronika', 'farmasi', 
        'fisika', 'geofisika', 'gizi', 'higiene', 'kedokteran', 'kehutanan', 'kimia', 
        'matematika', 'mikrobiologi', 'teknik', 'teknologi', 'sistem informasi', 'geografi',
        'aktuaria', 'keperawatan', 'komputer', 'tanah', 'penginderaan', 'hewan', 'akuatik', 
        'proteksi', 'statistika', 'veteriner', 'pemetaan'
    ];
    
    if (saintekKeywords.some(kw => nameStr.includes(kw))) {
        return 'SAINTEK';
    }
    
    return 'SOSHUM';
}

async function main() {
    try {
        console.log("Looking up Universitas Gadjah Mada...");
        let ugm = await prisma.university.findFirst({
            where: {
                name: {
                    contains: "Gadjah",
                    mode: "insensitive"
                }
            }
        });

        if (!ugm) {
            console.log("UGM not found! Searching for alternative names...");
            const allUnivs = await prisma.university.findMany();
            console.log("Available universities:", allUnivs.map(u => u.name).slice(0, 10));
            return;
        }

        console.log(`Found University: ${ugm.name} (ID: ${ugm.id})`);

        // Check latest year in statistics to know which year to update
        const sampleStat = await prisma.statistic.findFirst({
            orderBy: {
                year: 'desc'
            }
        });
        const targetYear = sampleStat ? sampleStat.year : 2024;
        console.log(`Using Year: ${targetYear} for updates`);

        const parsedMajors = parseData();
        console.log(`Parsed ${parsedMajors.length} majors to update/insert`);

        for (const major of parsedMajors) {
            // Find existing major
            let existingMajor = await prisma.major.findFirst({
                where: {
                    universityId: ugm.id,
                    name: {
                        equals: major.name,
                        mode: "insensitive"
                    }
                }
            });

            if (!existingMajor) {
                console.log(`[NEW] Creating major: ${major.name}`);
                const category = determineCategory(major.name);
                existingMajor = await prisma.major.create({
                    data: {
                        universityId: ugm.id,
                        name: major.name,
                        category: category,
                        accreditation: "B", // Default
                        degree: major.name.includes("(Terapan)") ? "D4" : "S1",
                        estimatedUkt: 5000000
                    }
                });
            }

            console.log(`[-] Updating capacity for ${existingMajor.name} -> ${major.capacity}`);
            
            // Upsert statistic
            await prisma.statistic.upsert({
                where: {
                    majorId_year: {
                        majorId: existingMajor.id,
                        year: targetYear
                    }
                },
                update: {
                    capacity: major.capacity
                },
                create: {
                    majorId: existingMajor.id,
                    year: targetYear,
                    capacity: major.capacity,
                    applicants: 0, // default
                    minScore: 0
                }
            });
        }
        
        console.log("Successfully updated all UGM capacities!");

    } catch (error) {
        console.error("Error setting UGM capacity:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
