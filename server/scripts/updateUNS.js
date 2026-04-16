import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	13531001	KEDOKTERAN	Sarjana	72	2520	Tidak Ada
2	13531002	PSIKOLOGI	Sarjana	90	2094	Tidak Ada
3	13531003	AGROTEKNOLOGI / AGROEKOTEKNOLOGI	Sarjana	54	801	Tidak Ada
4	13531004	AGRIBISNIS	Sarjana	48	860	Tidak Ada
5	13531005	PETERNAKAN	Sarjana	75	836	Tidak Ada
6	13531006	ILMU DAN TEKNOLOGI PANGAN	Sarjana	36	1018	Tidak Ada
7	13531007	TEKNIK SIPIL	Sarjana	54	1519	Tidak Ada
8	13531008	ARSITEKTUR	Sarjana	39	644	Tidak Ada
9	13531009	TEKNIK INDUSTRI	Sarjana	39	1366	Tidak Ada
10	13531010	TEKNIK MESIN	Sarjana	48	1223	Tidak Ada
11	13531011	TEKNIK KIMIA	Sarjana	36	559	Tidak Ada
12	13531012	MATEMATIKA	Sarjana	53	295	Tidak Ada
13	13531013	FISIKA	Sarjana	45	179	Tidak Ada
14	13531014	KIMIA	Sarjana	27	261	Tidak Ada
15	13531015	BIOLOGI	Sarjana	27	282	Tidak Ada
16	13531016	PERENCANAAN WILAYAH DAN KOTA (PWK)	Sarjana	33	705	Tidak Ada
17	13531017	INFORMATIKA	Sarjana	45	1579	Tidak Ada
18	13531018	PENDIDIKAN FISIKA	Sarjana	45	124	Tidak Ada
19	13531019	PENDIDIKAN KIMIA	Sarjana	50	215	Tidak Ada
20	13531020	PENDIDIKAN BIOLOGI	Sarjana	30	343	Tidak Ada
21	13531021	PENDIDIKAN MATEMATIKA	Sarjana	30	317	Tidak Ada
22	13531022	PENDIDIKAN TEKNIK MESIN	Sarjana	45	201	Tidak Ada
23	13531023	PENDIDIKAN TEKNIK BANGUNAN	Sarjana	45	179	Tidak Ada
24	13531024	PENDIDIKAN TEKNIK INFORMATIKA Dan Komputer	Sarjana	27	433	Tidak Ada
25	13531025	ILMU TANAH	Sarjana	39	454	Tidak Ada
26	13531026	PENYULUHAN DAN KOMUNIKASI PERTANIAN	Sarjana	36	381	Tidak Ada
27	13531027	FARMASI	Sarjana	24	1386	Tidak Ada
28	13531028	TEKNIK ELEKTRO	Sarjana	24	828	Tidak Ada
29	13531029	STATISTIKA	Sarjana	33	399	Tidak Ada
30	13531030	PENDIDIKAN IPA	Sarjana	24	206	Tidak Ada
31	13531031	ILMU LINGKUNGAN	Sarjana	27	514	Tidak Ada
32	13531032	PENGELOLAAN HUTAN	Sarjana	30	492	Tidak Ada
33	13531034	KEBIDANAN	Sarjana	21	413	Tidak Ada
34	13531035	ILMU ADMINISTRASI NEGARA	Sarjana	44	1058	Tidak Ada
35	13531036	ILMU KOMUNIKASI	Sarjana	42	1652	Tidak Ada
36	13531037	SOSIOLOGI	Sarjana	45	619	Tidak Ada
37	13531038	ILMU HUKUM	Sarjana	180	2827	Tidak Ada
38	13531039	EKONOMI PEMBANGUNAN	Sarjana	54	919	Tidak Ada
39	13531040	MANAJEMEN	Sarjana	60	2036	Tidak Ada
40	13531041	AKUNTANSI	Sarjana	53	1681	Tidak Ada
41	13531042	ILMU SEJARAH	Sarjana	26	272	Tidak Ada
42	13531043	SASTRA INDONESIA	Sarjana	26	304	Tidak Ada
43	13531044	SASTRA INGGRIS	Sarjana	27	613	Tidak Ada
44	13531045	SASTRA DAERAH UNTUK SASTRA JAWA	Sarjana	43	150	Tidak Ada
45	13531046	DESAIN MODE	Sarjana	30	78	Seni Rupa, Desain, dan Kriya
46	13531047	SENI RUPA	Sarjana	30	62	Seni Rupa, Desain, dan Kriya
47	13531048	DESAIN INTERIOR	Sarjana	27	215	Seni Rupa, Desain, dan Kriya
48	13531049	DESAIN KOMUNIKASI VISUAL	Sarjana	45	694	Seni Rupa, Desain, dan Kriya
49	13531050	PENDIDIKAN SEJARAH	Sarjana	27	227	Tidak Ada
50	13531051	PENDIDIKAN GEOGRAFI	Sarjana	27	238	Tidak Ada
51	13531052	PENDIDIKAN PANCASILA Dan KEWARGANEGARAAN	Sarjana	27	271	Tidak Ada
52	13531053	PENDIDIKAN LUAR BIASA	Sarjana	24	246	Tidak Ada
53	13531054	PENDIDIKAN JASMANI KESEHATAN Dan REKREASI	Sarjana	48	548	Olahraga
54	13531055	PENDIDIKAN KEPELATIHAN OLAHRAGA	Sarjana	50	466	Olahraga
55	13531057	PENDIDIKAN BAHASA SASTRA INDONESIA Dan DAERAH	Sarjana	27	502	Tidak Ada
56	13531058	PENDIDIKAN BAHASA INGGRIS	Sarjana	27	546	Tidak Ada
57	13531059	PENDIDIKAN SENI RUPA	Sarjana	40	93	Seni Rupa, Desain, dan Kriya
58	13531060	PENDIDIKAN SOSIOLOGI ANTROPOLOGI	Sarjana	24	309	Tidak Ada
59	13531061	PENDIDIKAN GURU SEKOLAH DASAR SURAKARTA	Sarjana	65	1331	Tidak Ada
60	13531062	BIMBINGAN DAN KONSELING	Sarjana	27	725	Tidak Ada
61	13531063	PENDIDIKAN GURU PAUD	Sarjana	24	204	Tidak Ada
62	13531064	SASTRA ARAB	Sarjana	26	262	Tidak Ada
63	13531065	PENDIDIKAN BAHASA JAWA	Sarjana	27	248	Tidak Ada
64	13531066	PENDIDIKAN GURU SEKOLAH DASAR KEBUMEN	Sarjana	36	427	Tidak Ada
65	13531067	HUBUNGAN INTERNASIONAL	Sarjana	27	594	Tidak Ada
66	13531068	PENDIDIKAN AKUNTANSI	Sarjana	27	294	Tidak Ada
67	13531069	PENDIDIKAN ADMINISTRASI PERKANTORAN	Sarjana	30	432	Tidak Ada
68	13531070	PENDIDIKAN EKONOMI	Sarjana	36	349	Tidak Ada
69	13531094	TEKNOLOGI PENDIDIKAN	Sarjana	30	233	Tidak Ada
70	13531095	BAHASA MANDARIN DAN KEBUDAYAAN TIONGKOK	Sarjana	23	418	Tidak Ada
71	13531096	BISNIS DIGITAL	Sarjana	41	1860	Tidak Ada
72	13531097	SAINS DATA	Sarjana	18	441	Tidak Ada
73	13531104	ILMU ADMINISTRASI NEGARA KAMPUS KEBUMEN	Sarjana	40	160	Tidak Ada
74	13531105	INFORMATIKA KAMPUS KEBUMEN	Sarjana	25	110	Tidak Ada
75	13531106	PROTEKSI TANAMAN	Sarjana	40	198	Tidak Ada
76	13532033	KESELAMATAN DAN KESEHATAN KERJA	Sarjana Terapan	41	5660	Tidak Ada
77	13532071	DEMOGRAFI DAN PENCATATAN SIPIL	Sarjana Terapan	45	1924	Tidak Ada
78	13532098	KEPERAWATAN ANESTESIOLOGI	Sarjana Terapan	23	4427	Tidak Ada
79	13532099	TEKNOLOGI REKAYASA MANUFAKTUR	Sarjana Terapan	30	807	Tidak Ada
80	13532100	PEMASARAN DIGITAL	Sarjana Terapan	35	2690	Tidak Ada
81	13532101	PERBANKAN DAN KEUANGAN DIGITAL	Sarjana Terapan	40	2240	Tidak Ada
82	13532107	BAHASA MANDARIN UNTUK KOMUNIKASI BISNIS DAN PROFESIONAL	Sarjana Terapan	30	819	Tidak Ada
83	13532108	MANAJEMEN KONSTRUKSI	Sarjana Terapan	27		Tidak Ada
84	13532109	BAHASA INGGRIS UNTUK KOMUNIKASI BISNIS DAN PROFESIONAL	Sarjana Terapan	21		Tidak Ada
85	13532110	MANAJEMEN BISNIS	Sarjana Terapan	21		Tidak Ada
86	13532111	DESAIN MEDIA DIGITAL	Sarjana Terapan	18		Seni Rupa, Desain, dan Kriya
87	13532112	MANAJEMEN PERDAGANGAN INTERNASIONAL	Sarjana Terapan	27		Tidak Ada
88	13533072	AKUNTANSI	Diploma Tiga	27	2705	Tidak Ada
89	13533073	KEBIDANAN	Diploma Tiga	27	1754	Tidak Ada
90	13533078	PERPAJAKAN	Diploma Tiga	27	2883	Tidak Ada
91	13533081	USAHA PERJALANAN WISATA	Diploma Tiga	27	1502	Tidak Ada
92	13533082	AGRIBISNIS	Diploma Tiga	39	3140	Tidak Ada
93	13533083	TEKNIK KIMIA	Diploma Tiga	15	1162	Tidak Ada
94	13533089	FARMASI	Diploma Tiga	26	4952	Tidak Ada
95	13533090	BUDI DAYA TERNAK	Diploma Tiga	18	1520	Tidak Ada
96	13533091	MANAJEMEN ADMINISTRASI	Diploma Tiga	27	3881	Tidak Ada
97	13533102	TEKNIK INFORMATIKA KAMPUS MADIUN	Diploma Tiga	30	347	Tidak Ada
98	13533103	AKUNTANSI KAMPUS MADIUN	Diploma Tiga	30	256	Tidak Ada
`;

const capitalize = (str) => {
    return str.replace(/\//g, ' / ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ').replace(' / ', '/');
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
        'anestesiologi', 'demografi', 'perencanaan', 'proteksi'
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
        console.log("Looking up Universitas Sebelas Maret...");
        let univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Sebelas Maret", mode: "insensitive" }
            }
        });

        if (!univ) {
            console.log("UNS not found in DB! Exiting...");
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

            const dummyScore = getRandomScore(520, 680);
            const tps = getRandomScore(500, dummyScore + 40);
            const litBi = getRandomScore(500, dummyScore + 40);
            const litBing = getRandomScore(500, dummyScore + 40);
            const pm = getRandomScore(500, dummyScore + 40);

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
