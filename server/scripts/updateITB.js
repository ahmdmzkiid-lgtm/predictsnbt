import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	13321001	FAKULTAS ILMU DAN TEKNOLOGI KEBUMIAN (FITB)	Sarjana	130	2703	Tidak Ada
2	13321002	FAKULTAS TEKNIK PERTAMBANGAN DAN PERMINYAKAN (FTTM)	Sarjana	115	4975	Tidak Ada
3	13321005	SEKOLAH FARMASI (SF)	Sarjana	56	1138	Tidak Ada
4	13321006	SEKOLAH ILMU DAN TEKNOLOGI HAYATI - SAINS (SITH-S)	Sarjana	42	413	Tidak Ada
5	13321009	FAKULTAS TEKNIK MESIN DAN DIRGANTARA (FTMD)	Sarjana	100	2586	Tidak Ada
6	13321012	SEKOLAH ILMU DAN TEKNOLOGI HAYATI - REKAYASA (SITH-R)	Sarjana	75	788	Tidak Ada
7	13321015	FAKULTAS TEKNOLOGI INDUSTRI - KAMPUS CIREBON (FTI-C)	Sarjana	33	567	Tidak Ada
8	13321017	FAKULTAS TEKNIK PERTAMBANGAN DAN PERMINYAKAN - KAMPUS CIREBON (FTTM-C)	Sarjana	30	1584	Tidak Ada
9	13321018	FAKULTAS ILMU DAN TEKNOLOGI KEBUMIAN - KAMPUS CIREBON (FITB-C)	Sarjana	30	373	Tidak Ada
10	13321019	FAKULTAS MATEMATIKA DAN ILMU PENGETAHUAN ALAM - MATEMATIKA (FMIPA-M)	Sarjana	60	609	Tidak Ada
11	13321020	FAKULTAS MATEMATIKA DAN ILMU PENGETAHUAN ALAM - IPA (FMIPA-IPA)	Sarjana	98	901	Tidak Ada
12	13321021	SEKOLAH TEKNIK ELEKTRO DAN INFORMATIKA - KOMPUTASI (STEI-K)	Sarjana	67	3526	Tidak Ada
13	13321022	SEKOLAH TEKNIK ELEKTRO DAN INFORMATIKA - REKAYASA (STEI-R)	Sarjana	75	1802	Tidak Ada
14	13321023	FAKULTAS SENIRUPA DAN DESAIN (FSRD)	Sarjana	110	1840	Seni Rupa, Desain, dan Kriya
15	13321024	SEKOLAH BISNIS DAN MANAJEMEN (SBM)	Sarjana	55	2483	Tidak Ada
16	13321025	FAKULTAS SENIRUPA DAN DESAIN - KAMPUS CIREBON (FSRD-C)	Sarjana	51	369	Seni Rupa, Desain, dan Kriya
17	13321026	FAKULTAS TEKNIK SIPIL DAN LINGKUNGAN - INFRASTRUKTUR SIPIL, LINGKUNGAN, DAN KELAUTAN	Sarjana	90	1554	Tidak Ada
18	13321027	FAKULTAS TEKNIK SIPIL DAN LINGKUNGAN - INFRASTRUKTUR SUMBER DAYA AIR DAN SANITASI LINGKUNGAN	Sarjana	40	1173	Tidak Ada
19	13321028	FAKULTAS TEKNOLOGI INDUSTRI - SISTEM DAN PROSES (FTI-SP)	Sarjana	105	1485	Tidak Ada
20	13321029	FAKULTAS TEKNOLOGI INDUSTRI - REKAYASA INDUSTRI (FTI-RI)	Sarjana	55	1406	Tidak Ada
21	13321034	SEKOLAH ILMU DAN TEKNOLOGI HAYATI - KAMPUS CIREBON (SITH-C)	Sarjana	18	176	Tidak Ada
22	13321036	ARSITEKTUR	Sarjana	28		Tidak Ada
23	13321037	PERENCANAAN WILAYAH DAN KOTA	Sarjana	35		Tidak Ada
24	13321038	PERENCANAAN WILAYAH DAN KOTA - KAMPUS CIREBON	Sarjana	30		Tidak Ada
`;

// Helper
const capitalize = (str) => {
    let cap = str.replace('&', 'Dan').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    // Handle acronyms in parentheses or after hyphens
    cap = cap.replace(/\(([a-z\-]+)\)/gi, (m, p1) => "(" + p1.toUpperCase() + ")");
    return cap;
};

const getRandomScore = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const determineCategory = (majorName) => {
    const nameStr = majorName.toLowerCase();
    const soshumKeywords = ['senirupa', 'desain', 'bisnis', 'manajemen', 'fsrd', 'sbm'];
    
    if (soshumKeywords.some(kw => nameStr.includes(kw))) {
        return 'SOSHUM';
    }
    return 'SAINTEK';
}

const parseData = () => {
    return rawData.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && /^\d+/.test(line)) // Must start with a number
        .map(line => {
            const parts = line.split('\t');
            if (parts.length >= 5) {
                const degreeRaw = parts[3].trim();
                const degree = degreeRaw === 'Sarjana' ? 'S1' : (degreeRaw === 'Diploma Tiga' ? 'D3' : 'D4');
                let name = capitalize(parts[2].trim());
                return {
                    name,
                    degree,
                    capacity: parseInt(parts[4].trim(), 10) || 0,
                    applicants: parts.length > 5 && parts[5].trim() !== '' ? parseInt(parts[5].trim(), 10) : 0
                };
            }
            return null;
        })
        .filter(item => item !== null);
};

async function main() {
    try {
        console.log("Looking up Institut Teknologi Bandung...");
        let univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Institut Teknologi Bandung", mode: "insensitive" }
            }
        });

        if (!univ) {
            console.log("ITB not found in DB! Exiting...");
            return;
        }

        console.log(`Found University: ${univ.name} (ID: ${univ.id})`);

        const parsedData = parseData();
        console.log(`Parsed ${parsedData.length} records to process.`);

        const activeYear = 2024;
        let updateCount = 0;
        let newCount = 0;

        for (const data of parsedData) {
            let existingMajor = await prisma.major.findFirst({
                where: {
                    universityId: univ.id,
                    name: { equals: data.name, mode: "insensitive" },
                    degree: data.degree
                }
            });

            if (!existingMajor) {
                console.log(`[NEW] Creating major: ${data.degree} ${data.name}`);
                const category = determineCategory(data.name);
                
                existingMajor = await prisma.major.create({
                    data: {
                        universityId: univ.id,
                        name: data.name,
                        category: category,
                        accreditation: "Unggul",
                        degree: data.degree,
                        estimatedUkt: 12500000 // ITB high tier
                    }
                });
                newCount++;
            }

            // If applicants are missing (0/NaN) we generate a realistic figure
            let actualApplicants = data.applicants;
            if (actualApplicants === 0 || isNaN(actualApplicants)) {
                actualApplicants = Math.floor(data.capacity * (Math.random() * 8 + 3));
            }
            
            const dummyScore = getRandomScore(600, 710);
            const tps = getRandomScore(580, dummyScore + 40);
            const litBi = getRandomScore(580, dummyScore + 40);
            const litBing = getRandomScore(580, dummyScore + 40);
            const pm = getRandomScore(580, dummyScore + 40);

            // Check if stat exists
            const existingStat = await prisma.statistic.findUnique({
                where: {
                    majorId_year: { majorId: existingMajor.id, year: activeYear }
                }
            });

            if (existingStat) {
                await prisma.statistic.update({
                    where: { id: existingStat.id },
                    data: { 
                        capacity: data.capacity,
                        applicants: actualApplicants > 0 ? actualApplicants : existingStat.applicants,
                        minScore: existingStat.minScore > 0 ? existingStat.minScore : dummyScore
                    }
                });
                console.log(`[UPDATE] ${data.degree} ${data.name} -> Cap: ${data.capacity}, App: ${actualApplicants}`);
            } else {
                await prisma.statistic.create({
                    data: {
                        majorId: existingMajor.id,
                        year: activeYear,
                        capacity: data.capacity,
                        applicants: actualApplicants,
                        minScore: dummyScore,
                        tpsScore: tps,
                        litBiScore: litBi,
                        litBingScore: litBing,
                        pmScore: pm
                    }
                });
                console.log(`[INSERT STAT] ${data.degree} ${data.name} -> Cap: ${data.capacity}, App: ${actualApplicants}`);
            }
            updateCount++;
        }

        console.log(`\nSummary: Processed ${updateCount} records (Created ${newCount} new majors).`);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
