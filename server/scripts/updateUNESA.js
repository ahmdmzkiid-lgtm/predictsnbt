import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	13831001	PENDIDIKAN MATEMATIKA	Sarjana	125	405	Tidak Ada
2	13831002	PENDIDIKAN FISIKA	Sarjana	65	149	Tidak Ada
3	13831003	PENDIDIKAN KIMIA	Sarjana	70	227	Tidak Ada
4	13831004	PENDIDIKAN BIOLOGI	Sarjana	115	452	Tidak Ada
5	13831005	MATEMATIKA	Sarjana	93	287	Tidak Ada
6	13831006	FISIKA	Sarjana	45	138	Tidak Ada
7	13831007	KIMIA	Sarjana	65	320	Tidak Ada
8	13831008	BIOLOGI	Sarjana	82	444	Tidak Ada
9	13831009	PENDIDIKAN ILMU PENGETAHUAN ALAM	Sarjana	105	405	Tidak Ada
10	13831010	PENDIDIKAN TEKNIK ELEKTRO	Sarjana	60	172	Tidak Ada
11	13831011	PENDIDIKAN TEKNIK MESIN	Sarjana	60	177	Tidak Ada
12	13831012	PENDIDIKAN TEKNIK BANGUNAN	Sarjana	51	162	Tidak Ada
13	13831013	ILMU KEOLAHRAGAAN	Sarjana	87	286	Olahraga
14	13831014	TEKNIK SIPIL	Sarjana	105	1177	Tidak Ada
15	13831015	PENDIDIKAN TEKNOLOGI INFORMASI	Sarjana	100	286	Tidak Ada
16	13831016	TEKNIK ELEKTRO	Sarjana	85	889	Tidak Ada
17	13831017	TEKNIK MESIN	Sarjana	90	1068	Tidak Ada
18	13831018	SISTEM INFORMASI	Sarjana	85	1005	Tidak Ada
19	13831019	TEKNIK INFORMATIKA	Sarjana	85	1364	Tidak Ada
20	13831020	GIZI	Sarjana	60	1399	Tidak Ada
21	13831027	BIMBINGAN DAN KONSELING	Sarjana	105	907	Tidak Ada
22	13831028	TEKNOLOGI PENDIDIKAN	Sarjana	90	343	Tidak Ada
23	13831029	PENDIDIKAN LUAR SEKOLAH	Sarjana	74	125	Tidak Ada
24	13831030	PENDIDIKAN LUAR BIASA	Sarjana	60	217	Tidak Ada
25	13831031	PENDIDIKAN GURU SEKOLAH DASAR	Sarjana	144	1772	Tidak Ada
26	13831032	PSIKOLOGI	Sarjana	171	2633	Tidak Ada
27	13831033	PENDIDIKAN GURU PENDIDIKAN ANAK USIA DINI	Sarjana	120	376	Tidak Ada
28	13831034	PENDIDIKAN BAHASA DAN SASTRA INDONESIA	Sarjana	105	749	Tidak Ada
29	13831035	PENDIDIKAN BAHASA INGGRIS	Sarjana	110	715	Tidak Ada
30	13831036	PENDIDIKAN BAHASA JERMAN	Sarjana	30	117	Tidak Ada
31	13831037	PENDIDIKAN BAHASA JEPANG	Sarjana	110	499	Tidak Ada
32	13831038	PENDIDIKAN BAHASA DAN SASTRA JAWA	Sarjana	50	259	Tidak Ada
33	13831039	PENDIDIKAN SENI RUPA	Sarjana	45	150	Seni Rupa, Desain, dan Kriya
34	13831040	PENDIDIKAN SENI DRAMA, TARI, DAN MUSIK	Sarjana	45	129	Sendratasik
35	13831041	SASTRA INDONESIA	Sarjana	100	417	Tidak Ada
36	13831042	SASTRA INGGRIS	Sarjana	90	721	Tidak Ada
37	13831043	SASTRA JERMAN	Sarjana	49	180	Tidak Ada
38	13831044	PENDIDIKAN PANCASILA DAN KEWARGANEGARAAN	Sarjana	85	361	Tidak Ada
39	13831045	PENDIDIKAN GEOGRAFI	Sarjana	90	353	Tidak Ada
40	13831046	PENDIDIKAN SEJARAH	Sarjana	90	332	Tidak Ada
41	13831047	SOSIOLOGI	Sarjana	120	656	Tidak Ada
42	13831048	ILMU ADMINISTRASI NEGARA	Sarjana	105	1145	Tidak Ada
43	13831050	PENDIDIKAN JASMANI, KESEHATAN, DAN REKREASI	Sarjana	106	760	Olahraga
44	13831051	PENDIDIKAN KEPELATIHAN OLAHRAGA	Sarjana	138	618	Olahraga
45	13831052	PENDIDIKAN EKONOMI	Sarjana	80	303	Tidak Ada
46	13831053	MANAJEMEN	Sarjana	104	1970	Tidak Ada
47	13831054	AKUNTANSI	Sarjana	117	1552	Tidak Ada
48	13831055	PENDIDIKAN TATA RIAS	Sarjana	70	602	Tidak Ada
49	13831056	MANAJEMEN PENDIDIKAN	Sarjana	120	440	Tidak Ada
50	13831057	ILMU HUKUM	Sarjana	161	1842	Tidak Ada
51	13831058	PENDIDIKAN BAHASA MANDARIN	Sarjana	65	332	Tidak Ada
52	13831059	PENDIDIKAN TATA BOGA	Sarjana	125	602	Tidak Ada
53	13831060	PENDIDIKAN TATA BUSANA	Sarjana	110	366	Tidak Ada
54	13831061	PENDIDIKAN AKUNTANSI	Sarjana	80	367	Tidak Ada
55	13831062	PENDIDIKAN BISNIS	Sarjana	55	321	Tidak Ada
56	13831063	PENDIDIKAN ADMINISTRASI PERKANTORAN	Sarjana	130	686	Tidak Ada
57	13831064	ILMU KOMUNIKASI	Sarjana	90	1712	Tidak Ada
58	13831065	MUSIK	Sarjana	40	84	Musik
59	13831066	DESAIN KOMUNIKASI VISUAL	Sarjana	80	746	Seni Rupa, Desain, dan Kriya
60	13831067	SENI RUPA MURNI	Sarjana	27	73	Seni Rupa, Desain, dan Kriya
61	13831068	EKONOMI ISLAM	Sarjana	122	561	Tidak Ada
62	13831069	PENDIDIKAN IPS	Sarjana	90	356	Tidak Ada
63	13831070	EKONOMI	Sarjana	120	838	Tidak Ada
64	13831075	BISNIS DIGITAL	Sarjana	155	1621	Tidak Ada
65	13831087	SAINS DATA	Sarjana	63	722	Tidak Ada
66	13831088	MANAJEMEN OLAHRAGA	Sarjana	40	131	Olahraga
67	13831089	ILMU POLITIK	Sarjana	95	450	Tidak Ada
68	13831090	KEDOKTERAN	Sarjana	15	767	Tidak Ada
69	13831091	PENDIDIKAN JASMANI, KESEHATAN, DAN REKREASI (UNESA KAMPUS MAGETAN)	Sarjana	41	223	Olahraga
70	13831092	PENDIDIKAN GURU SEKOLAH DASAR (UNESA KAMPUS MAGETAN)	Sarjana	60	633	Tidak Ada
71	13831093	PENDIDIKAN MATEMATIKA (UNESA KAMPUS MAGETAN)	Sarjana	39	161	Tidak Ada
72	13831094	ILMU HUKUM (UNESA KAMPUS MAGETAN)	Sarjana	81	417	Tidak Ada
73	13831095	ILMU KOMUNIKASI (UNESA KAMPUS MAGETAN)	Sarjana	65	479	Tidak Ada
74	13831096	MANAJEMEN (UNESA KAMPUS MAGETAN)	Sarjana	65	601	Tidak Ada
75	13831097	SASTRA INGGRIS (UNESA KAMPUS MAGETAN)	Sarjana	35	165	Tidak Ada
76	13831098	PENDIDIKAN TATA RIAS (UNESA KAMPUS MAGETAN)	Sarjana	30	186	Tidak Ada
77	13831099	MASASE	Sarjana	40	38	Olahraga
78	13831101	FISIOTERAPI	Sarjana	15	674	Tidak Ada
79	13831102	KEBIDANAN	Sarjana	16	301	Tidak Ada
80	13831103	KEPERAWATAN	Sarjana	16	984	Tidak Ada
81	13831104	HUBUNGAN INTERNASIONAL	Sarjana	55	538	Tidak Ada
82	13831105	PERENCANAAN WILAYAH DAN KOTA	Sarjana	45	453	Tidak Ada
83	13831106	SAINS AKTUARIA	Sarjana	50	123	Tidak Ada
84	13831109	PENDIDIKAN GURU PENDIDIKAN ANAK USIA DINI (KAMPUS KABUPATEN MAGETAN)	Sarjana	20	48	Tidak Ada
85	13831110	TEKNOLOGI PENDIDIKAN (KAMPUS KABUPATEN MAGETAN)	Sarjana	35	78	Tidak Ada
86	13831111	BIMBINGAN DAN KONSELING (KAMPUS KABUPATEN MAGETAN)	Sarjana	35	316	Tidak Ada
87	13831112	PENDIDIKAN KEPELATIHAN OLAHRAGA (KAMPUS KABUPATEN MAGETAN)	Sarjana	35	88	Olahraga
88	13831113	PENDIDIKAN BAHASA DAN SASTRA INDONESIA (KAMPUS KABUPATEN MAGETAN)	Sarjana	40	219	Tidak Ada
89	13831115	TEKNOLOGI PANGAN DAN HASIL PERTANIAN	Sarjana	35	507	Tidak Ada
90	13831116	AKUAKULTUR	Sarjana	35	92	Tidak Ada
91	13831117	PARIWISATA	Sarjana	30	537	Tidak Ada
92	13831118	FILM DAN ANIMASI	Sarjana	30	84	Film dan Televisi
93	13831119	BIOSAINS HEWAN	Sarjana	35	59	Tidak Ada
94	13831120	AGRIBISNIS DIGITAL	Sarjana	30	289	Tidak Ada
95	13831121	KECERDASAN ARTIFISIAL	Sarjana	30	210	Tidak Ada
96	13831122	ILMU ADMINISTRASI NEGARA (PSDKU MAGETAN)	Sarjana	41	343	Tidak Ada
97	13831123	AKUNTANSI (KAMPUS KABUPATEN MAGETAN)	Sarjana	33	229	Tidak Ada
98	13831124	KEDOKTERAN GIGI	Sarjana	8		Tidak Ada
99	13831125	BIOTEKNOLOGI	Sarjana	30		Tidak Ada
100	13831126	PENDIDIKAN VOKASIONAL TEKNOLOGI OTOMOTIF	Sarjana	20		Tidak Ada
101	13831127	TEKNIK METALURGI	Sarjana	20		Tidak Ada
102	13831128	TEKNIK PERTAMBANGAN	Sarjana	20		Tidak Ada
103	13831129	SAINS INFORMASI GEOGRAFI	Sarjana	26		Tidak Ada
104	13831130	GEOFISIKA	Sarjana	26		Tidak Ada
105	13832021	MANAJEMEN INFORMATIKA	Sarjana Terapan	66	1668	Tidak Ada
106	13832022	TEKNIK MESIN	Sarjana Terapan	40	991	Tidak Ada
107	13832023	TEKNIK SIPIL	Sarjana Terapan	57	1715	Tidak Ada
108	13832024	TRANSPORTASI	Sarjana Terapan	46	487	Tidak Ada
109	13832025	KEPELATIHAN OLAHRAGA	Sarjana Terapan	42	619	Olahraga
110	13832026	TEKNIK LISTRIK	Sarjana Terapan	45	478	Tidak Ada
111	13832071	DESAIN GRAFIS	Sarjana Terapan	35	613	Seni Rupa, Desain, dan Kriya
112	13832072	ADMINISTRASI NEGARA	Sarjana Terapan	75	4281	Tidak Ada
113	13832073	TATA BOGA	Sarjana Terapan	75	1847	Tidak Ada
114	13832074	TATA BUSANA	Sarjana Terapan	75	700	Tidak Ada
115	13832107	TEKNOLOGI REKAYASA OTOMOTIF	Sarjana Terapan	50	221	Tidak Ada
116	13832108	PRODUKSI MEDIA	Sarjana Terapan	50	1090	Tidak Ada
117	13832114	ANALISIS PERFORMA OLAHRAGA	Sarjana Terapan	42	95	Olahraga
118	13832131	ARSITEKTUR BANGUNAN GEDUNG	Sarjana Terapan	25		Tidak Ada
119	13832132	REKAYASA MULTIMEDIA EDUKASI DIGITAL	Sarjana Terapan	22		Tidak Ada
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
        'sipil', 'pangan', 'statistika', 'lingkungan', 'sains', 'olahraga', 'jasmani', 'kebidanan', 'bioteknologi',
        'perikanan', 'perairan', 'budidaya', 'instrumentasi', 'geofisika', 'kehutanan', 'bioinformatika',
        'bioproses', 'pengairan', 'agrobisnis', 'metalurgi', 'pertambangan', 'geografi', 'fisioterapi',
        'aktuaria', 'ipa', 'bimsa'
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
        console.log("Looking up Universitas Negeri Surabaya...");
        let univ = await prisma.university.findFirst({
            where: { name: { contains: "Negeri Surabaya", mode: "insensitive" } }
        });

        if (!univ) {
            console.log("UNESA not found in DB! Trying alternative match...");
            univ = await prisma.university.findFirst({
              where: { name: { contains: "Surabaya", mode: "insensitive" }, NOT: { name: { contains: "Airlangga", mode: "insensitive" } } }
            });
        }

        if (!univ) {
            console.log("UNESA not found in DB! Exiting...");
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

            const dummyScore = getRandomScore(480, 650);
            const tps = getRandomScore(460, dummyScore + 40);
            const litBi = getRandomScore(460, dummyScore + 40);
            const litBing = getRandomScore(460, dummyScore + 40);
            const pm = getRandomScore(460, dummyScore + 40);

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
