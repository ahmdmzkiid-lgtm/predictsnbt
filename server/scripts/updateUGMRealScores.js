import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `Kedokteran	S1	743.01
Farmasi	S1	719.85
Teknik Sipil	S1	714.67
Teknologi Informasi	S1	712.25
Gizi Kesehatan	S1	711.80
Kedokteran Gigi	S1	707.64
Ilmu Komputer	S1	699.65
Arsitektur	S1	697.77
Ilmu Keperawatan	S1	696.38
Teknik Industri	S1	694.22
Kehutanan	S1	693.66
Teknik Mesin	S1	669.12
Kedokteran Hewan	S1	663.40
Teknologi Pangan Dan Hasil Pertanian	S1	659.66
Statistika	S1	655.89
Ilmu Dan Industri Peternakan	S1	654.32
Manajemen Informasi Kesehatan	D4	653.88
Teknik Kimia	S1	653.70
Perencanaan Wilayah Dan Kota	S1	653.56
Teknik Elektro	S1	650.36
Biologi	S1	644.87
Ekonomi Pertanian Dan Agribisnis	S1	642.86
Teknik Geologi	S1	642.35
Teknik Geodesi	S1	641.59
Ilmu Aktuaria	S1	640.11
Matematika	S1	639.46
Teknik Biomedis	S1	637.02
Higiene Gigi	S1	636.74
Geografi Lingkungan	S1	636.54
Kimia	S1	633.45
Teknologi Rekayasa Perangkat Lunak	D4	632.96
Teknik Pertanian	S1	632.39
Teknik Nuklir	S1	632.18
Teknologi Industri Pertanian	S1	632.14
Teknik Fisika	S1	630.90
Agronomi	D4	630.32
Elektronika Dan Instrumentasi	S1	629.87
Kartografi Dan Penginderaan Jauh	S1	629.00
Pembangunan Wilayah	S1	626.25
Ilmu Tanah	S1	625.79
Teknik Pengelolaan Dan Pemeliharaan Infrastruktur Sipil	D4	625.49
Geofisika	S1	619.19
Proteksi Tanaman (Ilmu Hama Dan Penyakit Tumbuhan)	S1	609.69
Akuakultur (Budidaya Perikanan)	S1	608.42
Teknologi Rekayasa Pelaksanaan Bangunan Sipil	D4	608.31
Teknologi Hasil Perikanan	S1	605.03
Teknologi Rekayasa Mesin	D4	604.79
Mikrobiologi Pertanian	S1	603.97
Teknologi Rekayasa Internet	D4	593.44
Fisika	S1	592.65
Penyuluhan Dan Komunikasi Pertanian	S1	592.09
Manajemen Sumberdaya Akuatik (Manajemen Sumber Daya Perikanan)	S1	590.32
Teknologi Rekayasa Elektro	D4	588.71
Teknik Pengelolaan Dan Perawatan Alat Berat	D4	586.36
Pengelolaan Hutan	D4	586.22
Pengembangan Produk Agroindustri	D4	586.06
Sistem Informasi Geografis	D4	584.93
Teknologi Survei Dan Pemetaan Dasar	D4	584.32
Teknologi Veteriner	D4	577.32
Teknologi Rekayasa Instrumentasi Dan Kontrol	D4	571.20
Psikologi	S1	744.11
Hukum	S1	741.52
Manajemen	S1	737.75
Akuntansi	S1	715.64
Ilmu Komunikasi	S1	715.55
Ilmu Hubungan Internasional	S1	715.19
Bahasa Dan Kebudayaan Korea	S1	696.01
Pariwisata	S1	677.01
Ilmu Ekonomi	S1	674.49
Filsafat	S1	672.96
Sastra Inggris	S1	671.51
Manajemen Dan Kebijakan Publik	S1	669.16
Pembangunan Sosial Dan Kesejahteraan	S1	662.01
Pengelolaan Arsip Dan Rekaman Informasi	D4	659.10
Sosiologi	S1	656.35
Politik Dan Pemerintahan	S1	654.76
Antropologi Budaya	S1	648.45
Bisnis Perjalanan Wisata	D4	642.01
Sastra Jepang	S1	640.77
Bahasa Dan Sastra Indonesia	S1	637.55
Sastra Arab	S1	637.39
Arkeologi	S1	635.79
Perbankan	D4	633.44
Akuntansi Sektor Publik	D4	633.27
Pembangunan Ekonomi Kewilayahan	D4	632.60
Sejarah	S1	631.84
Manajemen Dan Penilaian Properti	D4	631.16
Bahasa Inggris	D4	621.17
Sastra Prancis	S1	591.50
Sastra Jawa	S1	591.34`;

const nameAliases = {
    "gizi kesehatan": "gizi",
    "proteksi tanaman (ilmu hama dan penyakit tumbuhan)": "proteksi tanaman",
    "akuakultur (budidaya perikanan)": "akuakultur",
    "manajemen sumberdaya akuatik (manajemen sumber daya perikanan)": "manajemen sumberdaya akuatik",
    "sastra jepang": "bahasa dan kebudayaan jepang",
    "sastra prancis": "bahasa dan sastra prancis",
    "sastra jawa": "bahasa, sastra, dan budaya jawa",
    "akuntansi sektor publik": "akuntansi sektor publik (terapan)",
    "bahasa inggris": "bahasa inggris (terapan)",
    "bahasa jepang": "bahasa jepang untuk komunikasi bisnis dan profesional",
    "teknologi pangan dan hasil pertanian": "teknologi pangan dan hasil pertanian",
    "ilmu dan industri peternakan": "ilmu dan industri peternakan",
    "manajemen informasi kesehatan": "manajemen informasi kesehatan",
    "perencanaan wilayah dan kota": "perencanaan wilayah dan kota",
    "ekonomi pertanian dan agribisnis": "ekonomi pertanian dan agribisnis",
    "teknologi rekayasa perangkat lunak": "teknologi rekayasa perangkat lunak",
    "teknologi industri pertanian": "teknologi industri pertanian",
    "elektronika dan instrumentasi": "elektronika dan instrumentasi",
    "kartografi dan penginderaan jauh": "kartografi dan penginderaan jauh",
    "teknik pengelolaan dan pemeliharaan infrastruktur sipil": "teknik pengelolaan dan pemeliharaan infrastruktur sipil",
    "teknologi rekayasa pelaksanaan bangunan sipil": "teknologi rekayasa pelaksanaan bangunan sipil",
    "teknologi hasil perikanan": "teknologi hasil perikanan",
    "teknologi rekayasa mesin": "teknologi rekayasa mesin",
    "mikrobiologi pertanian": "mikrobiologi pertanian",
    "teknologi rekayasa internet": "teknologi rekayasa internet",
    "penyuluhan dan komunikasi pertanian": "penyuluhan dan komunikasi pertanian",
    "teknologi rekayasa elektro": "teknologi rekayasa elektro",
    "teknik pengelolaan dan perawatan alat berat": "teknik pengelolaan dan perawatan alat berat",
    "pengelolaan hutan": "pengelolaan hutan",
    "pengembangan produk agroindustri": "pengembangan produk agroindustri",
    "sistem informasi geografis": "sistem informasi geografis",
    "teknologi survei dan pemetaan dasar": "teknologi survei dan pemetaan dasar",
    "teknologi veteriner": "teknologi veteriner",
    "teknologi rekayasa instrumentasi dan kontrol": "teknologi rekayasa instrumentasi dan kontrol",
    "bahasa dan kebudayaan korea": "bahasa dan kebudayaan korea",
    "manajemen dan kebijakan publik": "manajemen dan kebijakan publik",
    "pembangunan sosial dan kesejahteraan": "pembangunan sosial dan kesejahteraan",
    "pengelolaan arsip dan rekaman informasi": "pengelolaan arsip dan rekaman informasi",
    "politik dan pemerintahan": "politik dan pemerintahan",
    "antropologi budaya": "antropologi budaya",
    "bisnis perjalanan wisata": "bisnis perjalanan wisata",
    "bahasa dan sastra indonesia": "bahasa dan sastra indonesia",
    "sastra arab": "sastra arab",
    "pembangunan ekonomi kewilayahan": "pembangunan ekonomi kewilayahan",
    "manajemen dan penilaian properti": "manajemen dan penilaian properti",
};

const parseData = () => {
    return rawData.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0)
        .map(line => {
            const parts = line.split('\t');
            if (parts.length >= 3) {
                const searchName = parts[0].trim().toLowerCase();
                const score = parseFloat(parts[2].trim());
                return {
                    name: parts[0].trim(),
                    searchName: nameAliases[searchName] || searchName,
                    degree: parts[1].trim(),
                    score: score
                };
            }
            return null;
        })
        .filter(item => item !== null && !isNaN(item.score));
};

async function main() {
    try {
        console.log("Looking up Universitas Gadjah Mada...");
        const ugm = await prisma.university.findFirst({
            where: {
                name: { contains: "Gadjah", mode: "insensitive" }
            }
        });

        if (!ugm) {
            console.log("UGM not found!");
            return;
        }

        console.log(`Found University: ${ugm.name} (ID: ${ugm.id})`);

        // Fetch Majors including sorted statistics
        const ugmMajors = await prisma.major.findMany({
            where: { universityId: ugm.id },
            include: { 
                statistics: {
                    orderBy: { year: 'desc' }
                } 
            }
        });

        const parsedData = parseData();
        console.log(`Parsed ${parsedData.length} records...`);

        let updateCount = 0;
        let notFound = [];

        for (const data of parsedData) {
            // Find EXACT match first
            const major = ugmMajors.find(m => m.name.toLowerCase() === data.searchName);

            if (major) {
                if (major.statistics && major.statistics.length > 0) {
                    // Update the latest one (which is at index 0 because of the desc sort order)
                    const stat = major.statistics[0];
                    await prisma.statistic.update({
                        where: { id: stat.id },
                        data: { minScore: data.score }
                    });
                    console.log(`[UPDATE LATEST YEAR ${stat.year}] ${major.name} -> ${data.score}`);
                    updateCount++;
                } else {
                    console.log(`[PASS] No statistics record found for ${major.name}`);
                }
            } else {
                notFound.push(data.name);
            }
        }

        console.log(`\nSummary:`);
        console.log(`Updated ${updateCount} records automatically.`);
        if (notFound.length > 0) {
            console.log(`Could not find a match for ${notFound.length} majors:`);
            console.log(notFound.join(', '));
        }

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
