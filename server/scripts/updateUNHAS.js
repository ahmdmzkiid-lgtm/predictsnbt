import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	17111001	MATEMATIKA	Sarjana	44	124	Tidak Ada
2	17111002	FISIKA	Sarjana	44	79	Tidak Ada
3	17111003	KESEHATAN MASYARAKAT	Sarjana	175	1961	Tidak Ada
4	17111004	FARMASI	Sarjana	90	1746	Tidak Ada
5	17111005	KIMIA	Sarjana	55	214	Tidak Ada
6	17111006	BIOLOGI	Sarjana	66	216	Tidak Ada
7	17111007	PENDIDIKAN DOKTER	Sarjana	132	3172	Tidak Ada
8	17111008	AGROTEKNOLOGI	Sarjana	110	470	Tidak Ada
9	17111009	ILMU DAN TEKNOLOGI PANGAN	Sarjana	70	408	Tidak Ada
10	17111010	AGRIBISNIS	Sarjana	95	576	Tidak Ada
11	17111011	TEKNIK PERTANIAN	Sarjana	67	311	Tidak Ada
12	17111012	TEKNIK SIPIL	Sarjana	76	1137	Tidak Ada
13	17111013	TEKNIK MESIN	Sarjana	65	585	Tidak Ada
14	17111014	TEKNIK ELEKTRO	Sarjana	95	746	Tidak Ada
15	17111015	TEKNIK PERKAPALAN	Sarjana	55	334	Tidak Ada
16	17111016	TEKNIK GEOLOGI	Sarjana	65	914	Tidak Ada
17	17111017	PENDIDIKAN DOKTER GIGI	Sarjana	80	1895	Tidak Ada
18	17111018	TEKNIK ARSITEKTUR	Sarjana	60	497	Tidak Ada
19	17111019	KEHUTANAN	Sarjana	162	677	Tidak Ada
20	17111020	GEOFISIKA	Sarjana	55	189	Tidak Ada
21	17111021	STATISTIKA	Sarjana	44	312	Tidak Ada
22	17111022	ILMU GIZI	Sarjana	75	997	Tidak Ada
23	17111023	ILMU KELAUTAN	Sarjana	122	224	Tidak Ada
24	17111024	BUDIDAYA PERAIRAN	Sarjana	60	86	Tidak Ada
25	17111025	MANAJEMEN SUMBERDAYA PERAIRAN	Sarjana	64	116	Tidak Ada
26	17111026	PEMANFAATAN SUMBERDAYA PERIKANAN	Sarjana	47	68	Tidak Ada
27	17111027	AGROBISNIS PERIKANAN	Sarjana	76	143	Tidak Ada
28	17111028	ILMU KEPERAWATAN	Sarjana	87	1062	Tidak Ada
29	17111029	PETERNAKAN	Sarjana	225	387	Tidak Ada
30	17111030	TEKNIK KELAUTAN	Sarjana	77	191	Tidak Ada
31	17111031	TEKNIK INDUSTRI	Sarjana	60	1043	Tidak Ada
32	17111032	TEKNIK SISTEM PERKAPALAN	Sarjana	62	196	Tidak Ada
33	17111033	PERENCANAAN WILAYAH DAN KOTA	Sarjana	50	388	Tidak Ada
34	17111034	TEKNIK PERTAMBANGAN	Sarjana	58	2065	Tidak Ada
35	17111035	TEKNIK INFORMATIKA	Sarjana	64	1961	Tidak Ada
36	17111036	FISIOTERAPI	Sarjana	47	606	Tidak Ada
37	17111037	TEKNIK LINGKUNGAN	Sarjana	65	621	Tidak Ada
38	17111038	KEDOKTERAN HEWAN	Sarjana	65	550	Tidak Ada
39	17111039	PSIKOLOGI	Sarjana	53	1095	Tidak Ada
40	17111040	SISTEM INFORMASI	Sarjana	58	833	Tidak Ada
41	17111041	ILMU AKTUARIA	Sarjana	53	247	Tidak Ada
42	17111042	REKAYASA KEHUTANAN	Sarjana	54	113	Tidak Ada
43	17111045	ILMU TANAH	Sarjana	85	170	Tidak Ada
44	17111046	PROTEKSI TANAMAN	Sarjana	82	133	Tidak Ada
45	17111047	KONSERVASI HUTAN	Sarjana	43	78	Tidak Ada
46	17111048	TEKNOLOGI HASIL PERIKANAN	Sarjana	47	62	Tidak Ada
47	17111054	MANAJEMEN	Sarjana	154	1739	Tidak Ada
48	17111055	ILMU HUKUM	Sarjana	178	2477	Tidak Ada
49	17111056	ILMU POLITIK	Sarjana	46	306	Tidak Ada
50	17111057	ANTROPOLOGI	Sarjana	62	161	Tidak Ada
51	17111058	ILMU SEJARAH	Sarjana	46	131	Tidak Ada
52	17111059	ILMU KOMUNIKASI	Sarjana	71	1062	Tidak Ada
53	17111060	SOSIOLOGI	Sarjana	71	219	Tidak Ada
54	17111061	AKUNTANSI	Sarjana	130	1326	Tidak Ada
55	17111062	ILMU PEMERINTAHAN	Sarjana	65	437	Tidak Ada
56	17111063	ILMU HUBUNGAN INTERNASIONAL	Sarjana	70	667	Tidak Ada
57	17111064	ADMINISTRASI PUBLIK	Sarjana	60	761	Tidak Ada
58	17111065	SASTRA INDONESIA	Sarjana	75	218	Tidak Ada
59	17111066	SASTRA DAERAH	Sarjana	17	26	Tidak Ada
60	17111067	SASTRA ARAB	Sarjana	45	183	Tidak Ada
61	17111068	SASTRA INGGRIS	Sarjana	99	517	Tidak Ada
62	17111069	SASTRA PERANCIS	Sarjana	17	39	Tidak Ada
63	17111070	ARKEOLOGI	Sarjana	60	144	Tidak Ada
64	17111071	SASTRA JEPANG	Sarjana	84	267	Tidak Ada
65	17111072	EKONOMI PEMBANGUNAN	Sarjana	135	553	Tidak Ada
66	17111073	HUKUM ADMINISTRASI NEGARA	Sarjana	36	613	Tidak Ada
67	17111074	BAHASA MANDARIN DAN KEBUDAYAAN TIONGKOK	Sarjana	68	313	Tidak Ada
68	17111077	PARIWISATA	Sarjana	54	360	Tidak Ada
69	17111080	EKONOMI DAN BISNIS ISLAM	Sarjana	38	340	Tidak Ada
70	17111081	TEKNOLOGI INDUSTRI PERTANIAN	Sarjana	45	159	Tidak Ada
71	17111084	TEKNIK GEODESI	Sarjana	36	121	Tidak Ada
72	17111085	TEKNIK METALURGI DAN MATERIAL	Sarjana	40	508	Tidak Ada
73	17111087	PEMULIAAN DAN BIOTEKNOLOGI TANAMAN	Sarjana	17	0	Tidak Ada
74	17111088	PEMBANGUNAN PERTANIAN	Sarjana	17	0	Tidak Ada
75	17111089	ILMU PERPUSTAKAAN DAN SAINS INFORMASI	Sarjana	26	0	Tidak Ada
76	17112043	TEKNOLOGI PRODUKSI TERNAK	Sarjana Terapan	24	70	Tidak Ada
77	17112044	TEKNOLOGI PRODUKSI TANAMAN PANGAN	Sarjana Terapan	26	232	Tidak Ada
78	17112049	AGRIBISNIS PANGAN	Sarjana Terapan	39	631	Tidak Ada
79	17112050	TEKNOLOGI PAKAN TERNAK	Sarjana Terapan	24	93	Tidak Ada
80	17112051	AGRIBISNIS PETERNAKAN	Sarjana Terapan	34	306	Tidak Ada
81	17112052	TERAPI GIGI	Sarjana Terapan	32	1132	Tidak Ada
82	17112053	BUDI DAYA LAUT DAN PANTAI	Sarjana Terapan	20	175	Tidak Ada
83	17112075	DESTINASI PARIWISATA	Sarjana Terapan	27	739	Tidak Ada
84	17112078	TEKNOLOGI AKUAKULTUR DAN PASCA PANEN PERIKANAN	Sarjana Terapan	31	80	Tidak Ada
85	17112079	PARAMEDIK VETERINER	Sarjana Terapan	33	178	Tidak Ada
86	17112082	TEKNOLOGI METALURGI EKSTRAKSI	Sarjana Terapan	21	626	Tidak Ada
87	17112083	PENGINDERAAN JAUH DAN SISTEM INFORMASI GEOGRAFIS	Sarjana Terapan	43	300	Tidak Ada
88	17112086	KOMUNIKASI DIGITAL	Sarjana Terapan	15	0	Tidak Ada
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
        'sipil', 'pangan', 'statistika', 'lingkungan', 'sains', 'olahraga', 'geofisika', 'robotika',
        'artifisial', 'perangkat lunak', 'bio', 'aktuaria', 'geomatika', 'transportasi', 'perkapalan',
        'lepas pantai', 'instrumentasi', 'rekayasa', 'manufaktur', 'energi', 'otomasi', 'fisioterapi',
        'perairan', 'kehutanan', 'veteriner', 'penginderaan jauh', 'gis', 'terapi gigi', 'metalurgi'
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
        console.log("Looking up Universitas Hasanuddin...");
        let univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Hasanuddin", mode: "insensitive" }
            }
        });

        if (!univ) {
            console.log("UNHAS not found in DB! Exiting...");
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
                        estimatedUkt: 6000000
                    }
                });
                newCount++;
            }

            let actualApplicants = data.applicants;
            if (actualApplicants === 0 || isNaN(actualApplicants)) {
                actualApplicants = Math.floor(data.capacity * (Math.random() * 8 + 3));
            }

            const dummyScore = getRandomScore(500, 680);
            const tps = getRandomScore(480, dummyScore + 40);
            const litBi = getRandomScore(480, dummyScore + 40);
            const litBing = getRandomScore(480, dummyScore + 40);
            const pm = getRandomScore(480, dummyScore + 40);

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
