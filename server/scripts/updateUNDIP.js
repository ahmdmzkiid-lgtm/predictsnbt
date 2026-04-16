import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	13551001	KESEHATAN MASYARAKAT	Sarjana	123	2309	Tidak Ada
2	13551002	KEDOKTERAN	Sarjana	90	2042	Tidak Ada
3	13551003	KEPERAWATAN	Sarjana	83	1704	Tidak Ada
4	13551004	GIZI	Sarjana	53	1167	Tidak Ada
5	13551005	MATEMATIKA	Sarjana	66	394	Tidak Ada
6	13551006	BIOLOGI	Sarjana	63	450	Tidak Ada
7	13551007	KIMIA	Sarjana	63	421	Tidak Ada
8	13551008	FISIKA	Sarjana	63	272	Tidak Ada
9	13551009	STATISTIKA	Sarjana	66	716	Tidak Ada
10	13551010	INFORMATIKA	Sarjana	75	1776	Tidak Ada
11	13551011	MANAJEMEN SUMBERDAYA PERAIRAN	Sarjana	48	269	Tidak Ada
12	13551012	AKUAKULTUR	Sarjana	45	285	Tidak Ada
13	13551013	PERIKANAN TANGKAP	Sarjana	38	179	Tidak Ada
14	13551014	ILMU KELAUTAN	Sarjana	60	421	Tidak Ada
15	13551015	OCEANOGRAFI	Sarjana	57	374	Tidak Ada
16	13551016	TEKNOLOGI HASIL PERIKANAN	Sarjana	44	201	Tidak Ada
17	13551017	TEKNIK SIPIL	Sarjana	75	1836	Tidak Ada
18	13551018	ARSITEKTUR	Sarjana	66	1027	Tidak Ada
19	13551019	TEKNIK MESIN	Sarjana	69	1331	Tidak Ada
20	13551020	TEKNIK KIMIA	Sarjana	75	902	Tidak Ada
21	13551021	TEKNIK ELEKTRO	Sarjana	69	1181	Tidak Ada
22	13551022	PERENCANAAN WILAYAH DAN KOTA	Sarjana	75	838	Tidak Ada
23	13551023	TEKNIK INDUSTRI	Sarjana	72	1930	Tidak Ada
24	13551024	TEKNIK LINGKUNGAN	Sarjana	66	1329	Tidak Ada
25	13551025	TEKNIK PERKAPALAN	Sarjana	63	717	Tidak Ada
26	13551026	TEKNIK GEOLOGI	Sarjana	57	1426	Tidak Ada
27	13551027	TEKNIK GEODESI	Sarjana	60	838	Tidak Ada
28	13551028	TEKNIK KOMPUTER	Sarjana	63	1100	Tidak Ada
29	13551029	PETERNAKAN	Sarjana	105	956	Tidak Ada
30	13551030	TEKNOLOGI PANGAN	Sarjana	72	1296	Tidak Ada
31	13551031	AGROEKOTEKNOLOGI	Sarjana	66	787	Tidak Ada
32	13551032	AGRIBISNIS	Sarjana	66	892	Tidak Ada
33	13551033	KEDOKTERAN GIGI	Sarjana	15	986	Tidak Ada
34	13551034	FARMASI	Sarjana	30	1151	Tidak Ada
35	13551035	BIOTEKNOLOGI	Sarjana	42	621	Tidak Ada
36	13551036	SASTRA INDONESIA	Sarjana	77	483	Tidak Ada
37	13551037	SASTRA INGGRIS	Sarjana	65	821	Tidak Ada
38	13551038	SEJARAH	Sarjana	62	327	Tidak Ada
39	13551039	ILMU PERPUSTAKAAN	Sarjana	59	627	Tidak Ada
40	13551040	HUKUM	Sarjana	276	4204	Tidak Ada
41	13551041	MANAJEMEN	Sarjana	117	2006	Tidak Ada
42	13551042	EKONOMI	Sarjana	90	1034	Tidak Ada
43	13551043	AKUNTANSI	Sarjana	117	2387	Tidak Ada
44	13551044	ADMINISTRASI PUBLIK	Sarjana	75	1383	Tidak Ada
45	13551045	ADMINISTRASI BISNIS	Sarjana	84	2169	Tidak Ada
46	13551046	ILMU PEMERINTAHAN	Sarjana	78	973	Tidak Ada
47	13551047	ILMU KOMUNIKASI	Sarjana	84	1946	Tidak Ada
48	13551048	PSIKOLOGI	Sarjana	120	3327	Tidak Ada
49	13551049	BAHASA DAN KEBUDAYAAN JEPANG	Sarjana	59	600	Tidak Ada
50	13551050	HUBUNGAN INTERNASIONAL	Sarjana	63	1080	Tidak Ada
51	13551051	ANTROPOLOGI SOSIAL	Sarjana	60	604	Tidak Ada
52	13551052	EKONOMI ISLAM	Sarjana	54	475	Tidak Ada
53	13551053	ADMINISTRASI PUBLIK KAMPUS REMBANG	Sarjana	45	237	Tidak Ada
54	13551086	BISNIS DIGITAL	Sarjana	36	1873	Tidak Ada
55	13551087	KESELAMATAN DAN KESEHATAN KERJA	Sarjana	41	2565	Tidak Ada
56	13551088	AGRIBISNIS KAMPUS BATANG	Sarjana	30	101	Tidak Ada
57	13551089	TEKNOLOGI DAN BISNIS PERIKANAN DAN KELAUTAN	Sarjana	15	193	Tidak Ada
58	13551090	TEKNIK INDUSTRI KAMPUS BATANG	Sarjana	18		Tidak Ada
59	13552075	TEKNOLOGI REKAYASA KIMIA INDUSTRI	Sarjana Terapan	39	1526	Tidak Ada
60	13552076	TEKNOLOGI REKAYASA OTOMASI	Sarjana Terapan	39	671	Tidak Ada
61	13552077	REKAYASA PERANCANGAN MEKANIK	Sarjana Terapan	39	771	Tidak Ada
62	13552078	TEKNOLOGI REKAYASA KONSTRUKSI PERKAPALAN	Sarjana Terapan	36	721	Tidak Ada
63	13552079	TEKNIK LISTRIK INDUSTRI	Sarjana Terapan	39	905	Tidak Ada
64	13552080	PERENCANAAN TATA RUANG DAN PERTANAHAN	Sarjana Terapan	45	1620	Tidak Ada
65	13552081	TEKNIK INFRASTRUKTUR SIPIL DAN PERANCANGAN ARSITEKTUR	Sarjana Terapan	63	2640	Tidak Ada
66	13552082	AKUNTANSI PERPAJAKAN	Sarjana Terapan	129	4477	Tidak Ada
67	13552083	MANAJEMEN DAN ADMINISTRASI LOGISTIK	Sarjana Terapan	69	2991	Tidak Ada
68	13552084	BAHASA ASING TERAPAN	Sarjana Terapan	45	1687	Tidak Ada
69	13552085	INFORMASI DAN HUMAS	Sarjana Terapan	69	2966	Tidak Ada
`;

const capitalize = (str) => {
    return str.replace('&', 'Dan').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
};

const getRandomScore = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const determineCategory = (majorName) => {
    const nameStr = majorName.toLowerCase();
    const saintekKeywords = [
        'teknik', 'informatika', 'teknologi', 'komputer', 'kedokteran', 'keperawatan', 'kesehatan',
        'gizi', 'farmasi', 'biologi', 'fisika', 'kimia', 'matematika', 'arsitektur', 'agroteknologi',
        'agroekoteknologi', 'pertanian', 'kelautan', 'peternakan', 'akuakultur', 'mesin', 'elektro',
        'sipil', 'pangan', 'agribisnis', 'mekatronika', 'manufaktur', 'alam', 'statistika', 'statistik',
        'kebidanan', 'lingkungan', 'hutan', 'tanah', 'sains', 'olahraga', 'jasmani', 'keselamatan',
        'perikanan', 'bioteknologi', 'oceanografi', 'geodesi', 'geologi', 'perkapalan', 'listrik',
        'rekayasa', 'otomasi', 'infrastruktur', 'perencanaan', 'pertanahan'
    ];
    if (saintekKeywords.some(kw => nameStr.includes(kw))) {
        return 'SAINTEK';
    }
    return 'SOSHUM';
};

const parseData = () => {
    return rawData.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && /^\d+/.test(line))
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
        console.log("Looking up Universitas Diponegoro...");
        let univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Diponegoro", mode: "insensitive" }
            }
        });

        if (!univ) {
            console.log("UNDIP not found in DB! Exiting...");
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
                        estimatedUkt: 7500000
                    }
                });
                newCount++;
            }

            let actualApplicants = data.applicants;
            if (actualApplicants === 0 || isNaN(actualApplicants)) {
                actualApplicants = Math.floor(data.capacity * (Math.random() * 8 + 3));
            }

            const dummyScore = getRandomScore(530, 690);
            const tps = getRandomScore(510, dummyScore + 40);
            const litBi = getRandomScore(510, dummyScore + 40);
            const litBing = getRandomScore(510, dummyScore + 40);
            const pm = getRandomScore(510, dummyScore + 40);

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
