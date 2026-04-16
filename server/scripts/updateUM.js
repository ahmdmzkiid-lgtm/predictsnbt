import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	13731001	PENDIDIKAN MATEMATIKA	Sarjana	86	332	Tidak Ada
2	13731002	PENDIDIKAN FISIKA	Sarjana	71	121	Tidak Ada
3	13731003	PENDIDIKAN KIMIA	Sarjana	66	192	Tidak Ada
4	13731004	PENDIDIKAN BIOLOGI	Sarjana	50	373	Tidak Ada
5	13731005	PENDIDIKAN TEKNIK MESIN	Sarjana	66	178	Tidak Ada
6	13731006	PENDIDIKAN TEKNIK BANGUNAN	Sarjana	54	143	Tidak Ada
7	13731007	PENDIDIKAN TEKNIK INFORMATIKA	Sarjana	42	351	Tidak Ada
8	13731008	PENDIDIKAN TEKNIK OTOMOTIF	Sarjana	55	181	Tidak Ada
9	13731009	ILMU KEOLAHRAGAAN	Sarjana	60	240	Olahraga
10	13731010	MATEMATIKA	Sarjana	76	221	Tidak Ada
11	13731011	FISIKA	Sarjana	71	123	Tidak Ada
12	13731012	KIMIA	Sarjana	59	298	Tidak Ada
13	13731013	BIOLOGI	Sarjana	46	299	Tidak Ada
14	13731014	PENDIDIKAN TEKNIK ELEKTRO	Sarjana	42	151	Tidak Ada
15	13731015	TEKNIK SIPIL	Sarjana	52	846	Tidak Ada
16	13731016	PENDIDIKAN ILMU PENGETAHUAN ALAM	Sarjana	80	351	Tidak Ada
17	13731017	KESEHATAN MASYARAKAT	Sarjana	130	1797	Tidak Ada
18	13731018	TEKNIK MESIN	Sarjana	43	851	Tidak Ada
19	13731019	TEKNIK ELEKTRO	Sarjana	43	633	Tidak Ada
20	13731020	TEKNIK INFORMATIKA	Sarjana	43	1396	Tidak Ada
21	13731021	TEKNIK INDUSTRI	Sarjana	43	1026	Tidak Ada
22	13731022	BIOTEKNOLOGI	Sarjana	27	393	Tidak Ada
23	13731028	BIMBINGAN DAN KONSELING	Sarjana	70	731	Tidak Ada
24	13731029	PENDIDIKAN JASMANI, KESEHATAN, DAN REKREASI	Sarjana	90	552	Olahraga
25	13731030	TEKNOLOGI PENDIDIKAN	Sarjana	70	257	Tidak Ada
26	13731031	PENDIDIKAN NONFORMAL	Sarjana	71	128	Tidak Ada
27	13731032	MANAJEMEN PENDIDIKAN	Sarjana	74	431	Tidak Ada
28	13731033	PENDIDIKAN GURU SEKOLAH DASAR	Sarjana	140	1417	Tidak Ada
29	13731034	PENDIDIKAN GURU PEND. ANAK USIA DINI	Sarjana	60	225	Tidak Ada
30	13731035	PENDIDIKAN PANCASILA DAN KEWARGANEGARAAN	Sarjana	82	349	Tidak Ada
31	13731036	PEND. BAHASA, SASTRA INDONESIA & DAERAH	Sarjana	63	481	Tidak Ada
32	13731037	PENDIDIKAN BAHASA INGGRIS	Sarjana	55	577	Tidak Ada
33	13731038	PENDIDIKAN BAHASA ARAB	Sarjana	74	350	Tidak Ada
34	13731039	PENDIDIKAN SENI RUPA	Sarjana	55	157	Seni Rupa, Desain, dan Kriya
35	13731040	PENDIDIKAN BAHASA JERMAN	Sarjana	42	163	Tidak Ada
36	13731041	PENDIDIKAN SENI PERTUNJUKAN	Sarjana	58	116	Sendratasik
37	13731042	PENDIDIKAN SEJARAH	Sarjana	75	262	Tidak Ada
38	13731043	PENDIDIKAN EKONOMI	Sarjana	56	315	Tidak Ada
39	13731044	PENDIDIKAN BISNIS	Sarjana	42	199	Tidak Ada
40	13731045	PENDIDIKAN ADMINISTRASI PERKANTORAN	Sarjana	56	542	Tidak Ada
41	13731046	PENDIDIKAN AKUNTANSI	Sarjana	48	259	Tidak Ada
42	13731047	PENDIDIKAN TATA BOGA	Sarjana	42	439	Tidak Ada
43	13731048	PENDIDIKAN TATA BUSANA	Sarjana	44	344	Tidak Ada
44	13731049	PSIKOLOGI	Sarjana	130	2172	Tidak Ada
45	13731050	BAHASA DAN SASTRA INDONESIA	Sarjana	56	407	Tidak Ada
46	13731051	BAHASA DAN SASTRA INGGRIS	Sarjana	46	614	Tidak Ada
47	13731052	SEJARAH	Sarjana	35	220	Tidak Ada
48	13731053	DESAIN KOMUNIKASI VISUAL	Sarjana	72	700	Seni Rupa, Desain, dan Kriya
49	13731054	AKUNTANSI	Sarjana	94	1240	Tidak Ada
50	13731055	EKONOMI DAN STUDI PEMBANGUNAN	Sarjana	65	644	Tidak Ada
51	13731056	MANAJEMEN	Sarjana	105	1770	Tidak Ada
52	13731057	PENDIDIKAN KHUSUS	Sarjana	58	222	Tidak Ada
53	13731058	PENDIDIKAN GEOGRAFI	Sarjana	72	283	Tidak Ada
54	13731059	PENDIDIKAN BAHASA MANDARIN	Sarjana	36	236	Tidak Ada
55	13731060	PENDIDIKAN ILMU PENGETAHUAN SOSIAL	Sarjana	53	299	Tidak Ada
56	13731061	PENDIDIKAN KEPELATIHAN OLAHRAGA	Sarjana	66	349	Olahraga
57	13731062	GEOGRAFI	Sarjana	62	358	Tidak Ada
58	13731063	PENDIDIKAN SOSIOLOGI	Sarjana	65	427	Tidak Ada
59	13731064	ILMU PERPUSTAKAAN	Sarjana	50	310	Tidak Ada
60	13731083	GIZI	Sarjana	31	755	Tidak Ada
61	13731084	ILMU KOMUNIKASI	Sarjana	61	1263	Tidak Ada
62	13731085	KEDOKTERAN	Sarjana	16	745	Tidak Ada
63	13731086	KEPERAWATAN	Sarjana	16	762	Tidak Ada
64	13731087	KEBIDANAN	Sarjana	16	272	Tidak Ada
65	13731088	HUKUM	Sarjana	63	984	Tidak Ada
66	13731089	PARIWISATA	Sarjana	44	837	Tidak Ada
67	13731090	ARSITEKTUR	Sarjana	33	332	Tidak Ada
68	13731091	TEKNIK LINGKUNGAN	Sarjana	26	458	Tidak Ada
69	13731092	SAINS AKTUARIA	Sarjana	40	158	Tidak Ada
70	13732024	TEKNOLOGI REKAYASA OTOMOTIF	Sarjana Terapan	38	318	Tidak Ada
71	13732025	TEKNOLOGI REKAYASA DAN PEMELIHARAAN BANGUNAN SIPIL	Sarjana Terapan	46	872	Tidak Ada
72	13732026	TEKNOLOGI REKAYASA PEMBANGKIT ENERGI	Sarjana Terapan	35	375	Tidak Ada
73	13732027	TEKNOLOGI REKAYASA SISTEM ELEKTRONIKA	Sarjana Terapan	37	386	Tidak Ada
74	13732065	PERPUSTAKAAN DIGITAL	Sarjana Terapan	37	880	Tidak Ada
75	13732066	ANIMASI	Sarjana Terapan	58	318	Seni Rupa, Desain, dan Kriya
76	13732067	MANAJEMEN PEMASARAN	Sarjana Terapan	50	2519	Tidak Ada
77	13732068	AKUNTANSI	Sarjana Terapan	50	2479	Tidak Ada
78	13732069	TATA BOGA	Sarjana Terapan	41	1428	Tidak Ada
79	13732070	DESAIN MODE	Sarjana Terapan	40	127	Seni Rupa, Desain, dan Kriya
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
        'sipil', 'pangan', 'statistika', 'lingkungan', 'sains', 'olahraga', 'jasmani', 'manufaktur', 'mekatronika',
        'elektronika', 'otomotif', 'ipa', 'geografi', 'promosi', 'bioteknologi', 'aktuaria', 'kebidanan'
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
        console.log("Looking up Universitas Negeri Malang...");
        let univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Negeri Malang", mode: "insensitive" }
            }
        });

        if (!univ) {
            console.log("UM not found in DB! Exiting...");
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
                        estimatedUkt: 5000000
                    }
                });
                newCount++;
            }

            let actualApplicants = data.applicants;
            if (actualApplicants === 0 || isNaN(actualApplicants)) {
                actualApplicants = Math.floor(data.capacity * (Math.random() * 8 + 3));
            }

            const dummyScore = getRandomScore(510, 670);
            const tps = getRandomScore(490, dummyScore + 40);
            const litBi = getRandomScore(490, dummyScore + 40);
            const litBing = getRandomScore(490, dummyScore + 40);
            const pm = getRandomScore(490, dummyScore + 40);

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
