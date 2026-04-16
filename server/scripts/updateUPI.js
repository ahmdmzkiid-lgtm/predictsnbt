import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	13341001	PENDIDIKAN MATEMATIKA	Sarjana	44	376	Tidak Ada
2	13341002	PENDIDIKAN FISIKA	Sarjana	30	107	Tidak Ada
3	13341003	PENDIDIKAN BIOLOGI	Sarjana	40	361	Tidak Ada
4	13341004	PENDIDIKAN KIMIA	Sarjana	46	236	Tidak Ada
5	13341005	PENDIDIKAN ILMU KOMPUTER	Sarjana	75	386	Tidak Ada
6	13341006	MATEMATIKA	Sarjana	40	342	Tidak Ada
7	13341007	FISIKA	Sarjana	32	153	Tidak Ada
8	13341008	BIOLOGI	Sarjana	40	398	Tidak Ada
9	13341009	KIMIA	Sarjana	45	374	Tidak Ada
10	13341010	ILMU KOMPUTER	Sarjana	40	1097	Tidak Ada
11	13341011	PENDIDIKAN TEKNIK ARSITEKTUR	Sarjana	51	210	Tidak Ada
12	13341012	PENDIDIKAN TEKNIK BANGUNAN	Sarjana	31	162	Tidak Ada
13	13341013	PENDIDIKAN TEKNIK ELEKTRO	Sarjana	51	181	Tidak Ada
14	13341014	PENDIDIKAN TEKNIK MESIN	Sarjana	46	292	Tidak Ada
15	13341015	ILMU KEOLAHRAGAAN	Sarjana	67	448	Olahraga
16	13341016	TEKNIK ELEKTRO	Sarjana	40	686	Tidak Ada
17	13341017	PENDIDIKAN TEKNOLOGI AGRO INDUSTRI	Sarjana	35	313	Tidak Ada
18	13341018	TEKNIK SIPIL	Sarjana	46	872	Tidak Ada
19	13341019	PENDIDIKAN ILMU PENGETAHUAN ALAM	Sarjana	17	166	Tidak Ada
20	13341020	ARSITEKTUR	Sarjana	31	659	Tidak Ada
21	13341021	PENDIDIKAN KELAUTAN DAN PERIKANAN KAMPUS SERANG	Sarjana	50	95	Tidak Ada
22	13341022	PENDIDIKAN MULTIMEDIA KAMPUS CIBIRU	Sarjana	44	310	Tidak Ada
23	13341023	PENDIDIKAN SISTEM DAN TEKNOLOGI INFORMASI KAMPUS PURWAKARTA	Sarjana	52	195	Tidak Ada
24	13341024	PENDIDIKAN TEKNIK OTOMOTIF	Sarjana	56	176	Tidak Ada
25	13341025	SISTEM INFORMASI KELAUTAN KAMPUS SERANG	Sarjana	58	112	Tidak Ada
26	13341026	KEPELATIHAN FISIK OLAHRAGA	Sarjana	41	267	Olahraga
27	13341027	REKAYASA PERANGKAT LUNAK (KAMPUS UPI CIBIRU)	Sarjana	69	447	Tidak Ada
28	13341028	SISTEM TELEKOMUNIKASI (KAMPUS UPI PURWAKARTA)	Sarjana	67	226	Tidak Ada
29	13341029	KEPERAWATAN - KAMPUS SUMEDANG	Sarjana	64	925	Tidak Ada
30	13341030	TEKNIK LOGISTIK	Sarjana	40	401	Tidak Ada
31	13341031	PENDIDIKAN TEKNIK OTOMASI INDUSTRI DAN ROBOTIKA	Sarjana	38	194	Tidak Ada
32	13341032	TEKNIK KOMPUTER - KAMPUS CIBIRU	Sarjana	75	492	Tidak Ada
33	13341033	LOGISTIK KELAUTAN - KAMPUS SERANG	Sarjana	60	233	Tidak Ada
34	13341034	GIZI	Sarjana	41	1122	Tidak Ada
35	13341035	MEKATRONIKA DAN KECERDASAN BUATAN - KAMPUS UPI DI PURWAKARTA	Sarjana	48	274	Tidak Ada
36	13341037	KEPERAWATAN	Sarjana	53	1367	Tidak Ada
37	13341038	ADMINISTRASI PENDIDIKAN	Sarjana	44	501	Tidak Ada
38	13341039	BIMBINGAN DAN KONSELING	Sarjana	36	1146	Tidak Ada
39	13341040	PENDIDIKAN MASYARAKAT	Sarjana	38	327	Tidak Ada
40	13341041	PENDIDIKAN KHUSUS	Sarjana	55	302	Tidak Ada
41	13341042	TEKNOLOGI PENDIDIKAN	Sarjana	53	287	Tidak Ada
42	13341043	PSIKOLOGI	Sarjana	76	2783	Tidak Ada
43	13341044	PKN	Sarjana	41	255	Tidak Ada
44	13341045	PENDIDIKAN SEJARAH	Sarjana	46	396	Tidak Ada
45	13341046	PENDIDIKAN GEOGRAFI	Sarjana	64	279	Tidak Ada
46	13341047	ILMU PENDIDIKAN AGAMA ISLAM	Sarjana	40	756	Tidak Ada
47	13341048	MANAJEMEN RESORT DAN LEISURE	Sarjana	41	582	Tidak Ada
48	13341049	MANAJEMEN PEMASARAN PARIWISATA	Sarjana	36	786	Tidak Ada
49	13341050	MANAJEMEN INDUSTRI KATERING	Sarjana	46	492	Tidak Ada
50	13341051	PENDIDIKAN BHS.DAN SASTRA INDONESIA	Sarjana	36	509	Tidak Ada
51	13341052	PENDIDIKAN BAHASA SUNDA	Sarjana	45	315	Tidak Ada
52	13341053	PENDIDIKAN BAHASA INGGRIS	Sarjana	55	720	Tidak Ada
53	13341054	PENDIDIKAN BAHASA ARAB	Sarjana	54	456	Tidak Ada
54	13341055	PENDIDIKAN BAHASA JEPANG	Sarjana	55	593	Tidak Ada
55	13341056	PENDIDIKAN BAHASA JERMAN	Sarjana	30	246	Tidak Ada
56	13341057	PENDIDIKAN BAHASA PERANCIS	Sarjana	52	194	Tidak Ada
57	13341058	PENDIDIKAN SENI RUPA DAN KERAJINAN	Sarjana	57	207	Seni Rupa, Desain, dan Kriya
58	13341059	PENDIDIKAN SENI TARI	Sarjana	68	183	Tari
59	13341060	PENDIDIKAN SENI MUSIK	Sarjana	48	214	Musik
60	13341061	BAHASA DAN SASTRA INGGRIS	Sarjana	48	1045	Tidak Ada
61	13341062	BAHASA DAN SASTRA INDONESIA	Sarjana	60	585	Tidak Ada
62	13341063	PENDIDIKAN KESEJAHTERAAN KELUARGA	Sarjana	40	260	Tidak Ada
63	13341064	PENDIDIKAN TATA BOGA	Sarjana	44	1118	Tidak Ada
64	13341065	PENDIDIKAN TATA BUSANA	Sarjana	40	456	Tidak Ada
65	13341066	PENDIDIKAN KEPELATIHAN OLAHRAGA	Sarjana	60	435	Olahraga
66	13341067	PEND. JASMANI KESEHATAN & REKREASI (PJKR)	Sarjana	119	753	Olahraga
67	13341068	PENDIDIKAN AKUNTANSI	Sarjana	60	494	Tidak Ada
68	13341069	PENDIDIKAN BISNIS	Sarjana	60	600	Tidak Ada
69	13341070	PENDIDIKAN MANAJEMEN PERKANTORAN	Sarjana	76	650	Tidak Ada
70	13341071	PENDIDIKAN EKONOMI	Sarjana	59	331	Tidak Ada
71	13341072	MANAJEMEN	Sarjana	60	1655	Tidak Ada
72	13341073	AKUNTANSI	Sarjana	60	1415	Tidak Ada
73	13341074	PERPUSTAKAAN DAN SAINS INFORMASI	Sarjana	38	361	Tidak Ada
74	13341075	PENDIDIKAN IPS	Sarjana	46	283	Tidak Ada
75	13341076	PENDIDIKAN SOSIOLOGI	Sarjana	52	444	Tidak Ada
76	13341077	PGSD PEND. JASMANI KAMPUS BUMI SILIWANGI	Sarjana	62	195	Olahraga
77	13341078	PGSD KAMPUS CIBIRU	Sarjana	105	988	Tidak Ada
78	13341079	PGPAUD KAMPUS CIBIRU	Sarjana	85	249	Tidak Ada
79	13341080	PGSD KAMPUS SUMEDANG	Sarjana	83	785	Tidak Ada
80	13341081	PGSD PENDIDIKAN JASMANI KAMPUS SUMEDANG	Sarjana	84	156	Olahraga
81	13341082	PGSD KAMPUS PURWAKARTA	Sarjana	80	513	Tidak Ada
82	13341083	PGSD KAMPUS TASIKMALAYA	Sarjana	86	871	Tidak Ada
83	13341084	PGSD KAMPUS SERANG	Sarjana	120	444	Tidak Ada
84	13341085	PGSD KAMPUS BUMI SILIWANGI	Sarjana	82	1068	Tidak Ada
85	13341086	PGPAUD KAMPUS BUMI SILIWANGI	Sarjana	59	228	Tidak Ada
86	13341087	ILMU KOMUNIKASI	Sarjana	35	1741	Tidak Ada
87	13341088	PGPAUD KAMPUS SERANG	Sarjana	50	77	Tidak Ada
88	13341089	ILMU EKONOMI DAN KEUANGAN ISLAM	Sarjana	50	547	Tidak Ada
89	13341090	PGPAUD KAMPUS TASIKMALAYA	Sarjana	57	169	Tidak Ada
90	13341091	PGPAUD KAMPUS PURWAKARTA	Sarjana	70	120	Tidak Ada
91	13341092	PENDIDIKAN BAHASA KOREA	Sarjana	36	431	Tidak Ada
92	13341093	KEWIRAUSAHAAN KAMPUS TASIKMALAYA	Sarjana	52	307	Tidak Ada
93	13341094	SAINS INFORMASI GEOGRAFI	Sarjana	58	436	Tidak Ada
94	13341095	DESAIN KOMUNIKASI VISUAL	Sarjana	62	1015	Seni Rupa, Desain, dan Kriya
95	13341096	PENDIDIKAN PARIWISATA	Sarjana	41	518	Tidak Ada
96	13341097	FILM DAN TELEVISI	Sarjana	30	474	Film dan Televisi
97	13341098	BISNIS DIGITAL (KAMPUS UPI TASIKMALAYA)	Sarjana	44	733	Tidak Ada
98	13341099	MUSIK	Sarjana	35	169	Musik
99	13341100	INDUSTRI PARIWISATA KAMPUS SUMEDANG	Sarjana	96	541	Tidak Ada
100	13341101	DESAIN PRODUK INDUSTRI - KAMPUS UPI DI TASIKMALAYA	Sarjana	36	88	Seni Rupa, Desain, dan Kriya
101	13341106	KEDOKTERAN	Sarjana	15	695	Tidak Ada
102	13341107	TEKNOLOGI PANGAN	Sarjana	15	641	Tidak Ada
103	13341108	TEKNIK ENERGI TERBARUKAN	Sarjana	24	323	Tidak Ada
104	13341109	TEKNIK KIMIA	Sarjana	16	311	Tidak Ada
105	13341110	ILMU HUKUM	Sarjana	40	1258	Tidak Ada
106	13342036	SURVEI PEMETAAN DAN INFORMASI GEOGRAFIS	Sarjana Terapan	44	1344	Tidak Ada
`;

// Helper
const capitalize = (str) => {
    let cap = str.replace('&', 'Dan').replace('BHS.DAN', 'Bahasa Dan').replace(/\./g, '').replace('/', ' / ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ').replace(' / ', '/');
    cap = cap.replace(/\b(pgsd|paud|pgpaud|pjkr|pkn|ips|upi)\b/gi, (m) => m.toUpperCase());
    cap = cap.replace(/\(([a-z\-]+)\)/gi, (m, p1) => "(" + p1.toUpperCase() + ")");
    return cap;
};

const getRandomScore = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const determineCategory = (majorName) => {
    const nameStr = majorName.toLowerCase();
    const saintekKeywords = [
        'teknik', 'keteknikan', 'informatika', 'informasi', 'komputer', 'kedokteran', 'keperawatan', 
        'kesehatan', 'gizi', 'farmasi', 'fisioterapi', 'sains', 'biologi', 'akuakultur', 'kebidanan', 'biomedis',
        'hewan', 'fisika', 'kimia', 'matematika', 'arsitektur', 'agroekoteknologi', 'agroteknologi',
        'pertanian', 'kelautan', 'perikanan', 'geofisika', 'statistika', 'kehutanan', 'alam', 'bioteknologi', 'logistik', 'peternakan',
        'mesin', 'bangunan', 'elektro', 'otomotif', 'ipa', 'olahraga', 'tata boga', 'tata busana', 'tata rias', 'nutrisi', 'pakan',
        'rekayasa', 'keselamatan', 'kosmetik', 'kecantikan', 'kuliner', 'otomasi', 'manufaktur', 'konstruksi', 'mekatronika', 'kecerdasan', 'pemetaan'
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
        console.log("Looking up Universitas Pendidikan Indonesia...");
        let univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Pendidikan Indonesia", mode: "insensitive" }
            }
        });

        if (!univ) {
            console.log("UPI not found in DB! Exiting...");
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
