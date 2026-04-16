import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	11111001	PENDIDIKAN DOKTER HEWAN	Sarjana	84	488	Tidak Ada
2	11111002	TEKNIK SIPIL	Sarjana	98	736	Tidak Ada
3	11111003	TEKNIK MESIN	Sarjana	42	311	Tidak Ada
4	11111004	TEKNIK KIMIA	Sarjana	63	208	Tidak Ada
5	11111005	ARSITEKTUR	Sarjana	56	282	Tidak Ada
6	11111006	TEKNIK ELEKTRO	Sarjana	56	349	Tidak Ada
7	11111007	AGROTEKNOLOGI	Sarjana	42	248	Tidak Ada
8	11111008	AGRIBISNIS	Sarjana	56	379	Tidak Ada
9	11111009	PETERNAKAN	Sarjana	51	141	Tidak Ada
10	11111010	TEKNOLOGI PANGAN DAN HASIL PERTANIAN	Sarjana	56	175	Tidak Ada
11	11111011	TEKNIK PERTANIAN	Sarjana	49	268	Tidak Ada
12	11111012	PENDIDIKAN BIOLOGI	Sarjana	42	224	Tidak Ada
13	11111013	PENDIDIKAN MATEMATIKA	Sarjana	42	186	Tidak Ada
14	11111014	PENDIDIKAN FISIKA	Sarjana	42	53	Tidak Ada
15	11111015	PENDIDIKAN KIMIA	Sarjana	42	70	Tidak Ada
16	11111016	PENDIDIKAN DOKTER	Sarjana	88	1882	Tidak Ada
17	11111017	ILMU KEPERAWATAN	Sarjana	126	1299	Tidak Ada
18	11111018	PENDIDIKAN DOKTER GIGI	Sarjana	35	969	Tidak Ada
19	11111019	MATEMATIKA	Sarjana	28	79	Tidak Ada
20	11111020	FISIKA	Sarjana	28	45	Tidak Ada
21	11111021	KIMIA	Sarjana	28	80	Tidak Ada
22	11111022	BIOLOGI	Sarjana	28	142	Tidak Ada
23	11111023	ILMU KELAUTAN	Sarjana	56	153	Tidak Ada
24	11111024	BUDIDAYA PERAIRAN	Sarjana	56	100	Tidak Ada
25	11111025	TEKNIK INDUSTRI	Sarjana	42	566	Tidak Ada
26	11111026	INFORMATIKA	Sarjana	42	1295	Tidak Ada
27	11111027	FARMASI	Sarjana	32	1406	Tidak Ada
28	11111028	TEKNIK GEOFISIKA	Sarjana	28	116	Tidak Ada
29	11111029	TEKNIK PERTAMBANGAN	Sarjana	42	966	Tidak Ada
30	11111030	STATISTIKA	Sarjana	42	262	Tidak Ada
31	11111031	PEMANFAATAN SUMBERDAYA PERIKANAN	Sarjana	42	79	Tidak Ada
32	11111032	ILMU TANAH	Sarjana	42	87	Tidak Ada
33	11111033	TEKNIK GEOLOGI	Sarjana	28	264	Tidak Ada
34	11111034	AGROTEKNOLOGI (PSDKU GAYO LUES)	Sarjana	14	15	Tidak Ada
35	11111035	PENDIDIKAN BIOLOGI (PDSKU GAYO LUES)	Sarjana	14	9	Tidak Ada
36	11111036	KEHUTANAN (PSDKU GAYO LUES)	Sarjana	21	19	Tidak Ada
37	11111037	PROTEKSI TANAMAN	Sarjana	28	55	Tidak Ada
38	11111038	PERENCANAAN WILAYAH DAN KOTA	Sarjana	42	415	Tidak Ada
39	11111039	KEHUTANAN	Sarjana	42	218	Tidak Ada
40	11111040	TEKNIK KOMPUTER	Sarjana	56	891	Tidak Ada
41	11111041	EKONOMI PEMBANGUNAN	Sarjana	56	397	Tidak Ada
42	11111042	MANAJEMEN	Sarjana	70	1306	Tidak Ada
43	11111043	AKUNTANSI	Sarjana	70	863	Tidak Ada
44	11111044	ILMU HUKUM	Sarjana	196	1826	Tidak Ada
45	11111045	PENDIDIKAN PANCASILA DAN KEWARGANEGARAAN	Sarjana	49	400	Tidak Ada
46	11111046	PENDIDIKAN SEJARAH	Sarjana	42	241	Tidak Ada
47	11111047	PENDIDIKAN EKONOMI	Sarjana	56	190	Tidak Ada
48	11111048	PENDIDIKAN GEOGRAFI	Sarjana	56	184	Tidak Ada
49	11111049	PENDIDIKAN BAHASA INDONESIA	Sarjana	56	453	Tidak Ada
50	11111050	PENDIDIKAN BAHASA INGGRIS	Sarjana	56	471	Tidak Ada
51	11111051	PENDIDIKAN SENI DRAMA TARI DAN MUSIK	Sarjana	42	111	Sendratasik
52	11111052	PENDIDIKAN KESEJAHTERAAN KELUARGA	Sarjana	56	362	Tidak Ada
53	11111053	PEND. JASMANI KESEHATAN DAN REKREASI	Sarjana	70	312	Olahraga
54	11111054	BIMBINGAN KONSELING	Sarjana	53	1071	Tidak Ada
55	11111055	PENDIDIKAN GURU SEKOLAH DASAR	Sarjana	81	1066	Tidak Ada
56	11111056	PSIKOLOGI	Sarjana	28	700	Tidak Ada
57	11111057	ILMU POLITIK	Sarjana	61	197	Tidak Ada
58	11111058	SOSIOLOGI	Sarjana	47	186	Tidak Ada
59	11111059	ILMU KOMUNIKASI	Sarjana	63	780	Tidak Ada
60	11111060	PENDIDIKAN GURU PAUD	Sarjana	49	309	Tidak Ada
61	11111061	ILMU PEMERINTAHAN	Sarjana	63	450	Tidak Ada
62	11111062	EKONOMI ISLAM	Sarjana	56	321	Tidak Ada
63	11111063	MANAJEMEN (PSDKU GAYO LUES)	Sarjana	28	10	Tidak Ada
64	11111078	TEKNOLOGI INDUSTRI HASIL PERIKANAN	Sarjana	18	74	Tidak Ada
65	11111079	BISNIS DIGITAL	Sarjana	28		Tidak Ada
66	11111080	TEKNIK SUMBER DAYA AIR	Sarjana	21		Tidak Ada
67	11111081	TEKNIK PERMINYAKAN	Sarjana	21		Tidak Ada
68	11111082	TEKNIK LINGKUNGAN	Sarjana	21		Tidak Ada
69	11112065	AKUNTANSI PERPAJAKAN	Sarjana Terapan	28	1648	Tidak Ada
70	11113064	KESEHATAN HEWAN	Diploma Tiga	11	446	Tidak Ada
71	11113066	MANAJEMEN AGRIBISNIS	Diploma Tiga	35	826	Tidak Ada
72	11113067	TEKNIK LISTRIK	Diploma Tiga	14	304	Tidak Ada
73	11113068	BUDIDAYA PETERNAKAN	Diploma Tiga	21	416	Tidak Ada
74	11113069	TEKNIK MESIN	Diploma Tiga	14	368	Tidak Ada
75	11113071	TEKNIK SIPIL	Diploma Tiga	28	848	Tidak Ada
76	11113072	SEKRETARI	Diploma Tiga	14	402	Tidak Ada
77	11113073	MANAJEMEN PERUSAHAAN	Diploma Tiga	14	991	Tidak Ada
78	11113075	AKUNTANSI	Diploma Tiga	28	981	Tidak Ada
79	11113076	KEUANGAN DAN PERBANKAN	Diploma Tiga	28	1194	Tidak Ada
80	11113077	MANAJEMEN INFORMATIKA	Diploma Tiga	28	1539	Tidak Ada
`;

// Helper
const capitalize = (str) => {
    return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
};

const getRandomScore = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const determineCategory = (majorName) => {
    const nameStr = majorName.toLowerCase();
    const saintekKeywords = [
        'teknik', 'informatika', 'sistem informasi', 'kedokteran', 'keperawatan', 
        'kesehatan', 'gizi', 'farmasi', 'fisioterapi', 'sains', 'biologi',
        'hewan', 'fisika', 'kimia', 'matematika', 'arsitektur', 'agroteknologi',
        'pertanian', 'kelautan', 'perikanan', 'geofisika', 'statistika', 'kehutanan'
    ];
    if (saintekKeywords.some(kw => nameStr.includes(kw))) {
        return 'SAINTEK';
    }
    return 'SOSHUM';
}

const parseData = () => {
    return rawData.split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && /^\d+/.test(line)) // Must start with a number
        .map(line => {
            const parts = line.split('\t');
            if (parts.length >= 5) {
                const degreeRaw = parts[3].trim();
                const degree = degreeRaw === 'Sarjana' ? 'S1' : (degreeRaw === 'Diploma Tiga' ? 'D3' : 'D4'); // Sarjana Terapan -> D4
                const name = capitalize(parts[2].trim());
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
        console.log("Looking up Universitas Syiah Kuala...");
        let usk = await prisma.university.findFirst({
            where: {
                name: { contains: "Syiah Kuala", mode: "insensitive" }
            }
        });

        if (!usk) {
            console.log("USK not found in DB! Exiting...");
            return;
        }

        console.log(`Found University: ${usk.name} (ID: ${usk.id})`);

        const parsedData = parseData();
        console.log(`Parsed ${parsedData.length} records to process.`);

        const activeYear = 2024;
        let updateCount = 0;
        let newCount = 0;

        for (const data of parsedData) {
            let existingMajor = await prisma.major.findFirst({
                where: {
                    universityId: usk.id,
                    name: { equals: data.name, mode: "insensitive" },
                    degree: data.degree
                }
            });

            if (!existingMajor) {
                // Try alias logic or minor difference handling if needed
                // e.g. "Ilmu Hukum" vs "Hukum", but typically we just create it
                console.log(`[NEW] Creating major: ${data.degree} ${data.name}`);
                const category = determineCategory(data.name);
                
                existingMajor = await prisma.major.create({
                    data: {
                        universityId: usk.id,
                        name: data.name,
                        category: category,
                        accreditation: "Baik Sekali", // Safe default
                        degree: data.degree,
                        estimatedUkt: 5000000
                    }
                });
                newCount++;
            }

            // If applicants are missing (0/NaN) we generate a realistic figure
            let actualApplicants = data.applicants;
            if (actualApplicants === 0 || isNaN(actualApplicants)) {
                actualApplicants = Math.floor(data.capacity * (Math.random() * 8 + 3));
            }
            
            const dummyScore = getRandomScore(520, 680);
            const tps = getRandomScore(500, dummyScore + 40);
            const litBi = getRandomScore(500, dummyScore + 40);
            const litBing = getRandomScore(500, dummyScore + 40);
            const pm = getRandomScore(500, dummyScore + 40);

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
