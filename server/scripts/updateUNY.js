import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	13621001	PENDIDIKAN MATEMATIKA	Sarjana	24	346	Tidak Ada
2	13621002	PENDIDIKAN FISIKA	Sarjana	24	101	Tidak Ada
3	13621003	PENDIDIKAN KIMIA	Sarjana	24	157	Tidak Ada
4	13621004	PENDIDIKAN BIOLOGI	Sarjana	29	284	Tidak Ada
5	13621005	PENDIDIKAN TEKNIK ELEKTRONIKA	Sarjana	12	90	Tidak Ada
6	13621006	PENDIDIKAN TEKNIK OTOMOTIF	Sarjana	29	247	Tidak Ada
7	13621007	PENDIDIKAN TEKNIK MESIN	Sarjana	24	282	Tidak Ada
8	13621008	PENDIDIKAN TEKNIK ELEKTRO	Sarjana	24	152	Tidak Ada
9	13621009	PENDIDIKAN TEKNIK SIPIL DAN PERENCANAAN	Sarjana	24	233	Tidak Ada
10	13621010	MATEMATIKA	Sarjana	24	208	Tidak Ada
11	13621011	FISIKA	Sarjana	24	108	Tidak Ada
12	13621012	KIMIA	Sarjana	24	238	Tidak Ada
13	13621013	BIOLOGI	Sarjana	24	246	Tidak Ada
14	13621014	PENDIDIKAN TEKNIK MEKATRONIKA	Sarjana	24	103	Tidak Ada
15	13621015	PENDIDIKAN TEKNIK INFORMATIKA	Sarjana	26	782	Tidak Ada
16	13621016	PENDIDIKAN IPA	Sarjana	36	214	Tidak Ada
17	13621017	ILMU KEOLAHRAGAAN	Sarjana	36	353	Olahraga
18	13621018	STATISTIKA	Sarjana	24	313	Tidak Ada
19	13621019	PENDIDIKAN JASMANI KESEHATAN DAN REKREASI	Sarjana	60	837	Olahraga
20	13621020	PENDIDIKAN KEPELATIHAN OLAHRAGA	Sarjana	60	546	Olahraga
21	13621021	PENDIDIKAN JASMANI SEKOLAH DASAR	Sarjana	36	293	Olahraga
22	13621022	TEKNIK ELEKTRO	Sarjana	24	680	Tidak Ada
23	13621023	TEKNOLOGI INFORMASI	Sarjana	36	1156	Tidak Ada
24	13621024	TEKNIK MANUFAKTUR	Sarjana	24	321	Tidak Ada
25	13621025	TEKNIK SIPIL	Sarjana	41	1168	Tidak Ada
26	13621026	MANAJEMEN PENDIDIKAN	Sarjana	24	321	Tidak Ada
27	13621027	BIMBINGAN DAN KONSELING	Sarjana	36	930	Tidak Ada
28	13621028	TEKNOLOGI PENDIDIKAN	Sarjana	24	228	Tidak Ada
29	13621029	PENDIDIKAN LUAR BIASA	Sarjana	36	303	Tidak Ada
30	13621030	PENDIDIKAN LUAR SEKOLAH	Sarjana	24	167	Tidak Ada
31	13621031	PENDIDIKAN KRIYA	Sarjana	24	58	Seni Rupa, Desain, dan Kriya
32	13621032	PENDIDIKAN KEWARGANEGARAAN	Sarjana	24	289	Tidak Ada
33	13621033	PENDIDIKAN SEJARAH	Sarjana	36	290	Tidak Ada
34	13621034	PENDIDIKAN GEOGRAFI	Sarjana	24	252	Tidak Ada
35	13621037	PENDIDIKAN TEKNIK BUSANA	Sarjana	24	446	Tidak Ada
36	13621038	PENDIDIKAN TEKNIK BOGA	Sarjana	29	708	Tidak Ada
37	13621039	PENDIDIKAN ADMINISTRASI PERKANTORAN	Sarjana	36	471	Tidak Ada
38	13621040	PENDIDIKAN AKUNTANSI	Sarjana	36	315	Tidak Ada
39	13621041	PENDIDIKAN EKONOMI	Sarjana	41	317	Tidak Ada
40	13621042	MANAJEMEN	Sarjana	77	2624	Tidak Ada
41	13621043	ILMU SEJARAH	Sarjana	24	318	Tidak Ada
42	13621044	AKUNTANSI	Sarjana	48	1662	Tidak Ada
43	13621045	PENDIDIKAN SOSIOLOGI	Sarjana	24	367	Tidak Ada
44	13621046	PENDIDIKAN IPS	Sarjana	33	275	Tidak Ada
45	13621047	ADMINISTRASI PUBLIK	Sarjana	50	1483	Tidak Ada
46	13621048	KEBIJAKAN PENDIDIKAN	Sarjana	24	257	Tidak Ada
47	13621049	PENDIDIKAN GURU SEKOLAH DASAR	Sarjana	77	1686	Tidak Ada
48	13621050	PENDIDIKAN GURU PAUD	Sarjana	24	260	Tidak Ada
49	13621052	PENDIDIKAN BAHASA INGGRIS	Sarjana	77	726	Tidak Ada
50	13621053	PENDIDIKAN BAHASA JERMAN	Sarjana	24	155	Tidak Ada
51	13621054	PENDIDIKAN BAHASA PRANCIS	Sarjana	24	104	Tidak Ada
52	13621055	PENDIDIKAN SENI RUPA	Sarjana	24	121	Seni Rupa, Desain, dan Kriya
53	13621056	SASTRA INDONESIA	Sarjana	36	396	Tidak Ada
54	13621057	SASTRA INGGRIS	Sarjana	36	725	Tidak Ada
55	13621058	PENDIDIKAN SENI TARI	Sarjana	24	165	Tari
56	13621059	PENDIDIKAN SENI MUSIK	Sarjana	24	136	Musik
57	13621060	PENDIDIKAN BAHASA DAN SASTRA INDONESIA	Sarjana	71	779	Tidak Ada
58	13621061	PENDIDIKAN BAHASA JAWA	Sarjana	54	321	Tidak Ada
59	13621062	ILMU KOMUNIKASI	Sarjana	59	1968	Tidak Ada
60	13621063	PSIKOLOGI	Sarjana	71	2651	Tidak Ada
61	13621075	ARSITEKTUR	Sarjana	12	534	Tidak Ada
62	13621090	TEKNIK INDUSTRI	Sarjana	41	1223	Tidak Ada
63	13621091	PARIWISATA	Sarjana	36	1346	Tidak Ada
64	13621092	ILMU POLITIK	Sarjana	24	317	Tidak Ada
65	13621093	ILMU HUKUM	Sarjana	36	1706	Tidak Ada
66	13621094	KEDOKTERAN	Sarjana	15	1419	Tidak Ada
67	13621095	DESAIN KOMUNIKASI VISUAL	Sarjana	24	385	Seni Rupa, Desain, dan Kriya
68	13621096	PENDIDIKAN AGAMA ISLAM	Sarjana	24		Tidak Ada
69	13622076	TATA BUSANA	Sarjana Terapan	24	824	Tidak Ada
70	13622077	TATA RIAS DAN KECANTIKAN	Sarjana Terapan	36	1135	Tidak Ada
71	13622078	TEKNIK ELEKTRONIKA	Sarjana Terapan	24	480	Tidak Ada
72	13622079	AKUNTANSI	Sarjana Terapan	36	2636	Tidak Ada
73	13622080	TEKNIK ELEKTRO	Sarjana Terapan	12	978	Tidak Ada
74	13622081	MANAJEMEN PEMASARAN	Sarjana Terapan	36	2407	Tidak Ada
75	13622082	TEKNIK MESIN	Sarjana Terapan	12	1265	Tidak Ada
76	13622083	TEKNIK SIPIL	Sarjana Terapan	12	2085	Tidak Ada
77	13622084	TATA BOGA	Sarjana Terapan	33	2394	Tidak Ada
78	13622085	MESIN OTOMOTIF	Sarjana Terapan	12	806	Tidak Ada
79	13622086	ADMINISTRASI PERKANTORAN	Sarjana Terapan	36	3482	Tidak Ada
80	13622087	PENGOBATAN TRADISIONAL INDONESIA	Sarjana Terapan	12	374	Tidak Ada
81	13622088	PENGELOLAAN USAHA REKREASI	Sarjana Terapan	12	724	Tidak Ada
82	13622089	PROMOSI KESEHATAN	Sarjana Terapan	12	981	Tidak Ada
`;

const capitalize = (str) => {
    return str.replace('&', 'Dan').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
};

const getRandomScore = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const determineCategory = (majorName) => {
    const nameStr = majorName.toLowerCase();
    const saintekKeywords = [
        'teknik', 'informatika', 'teknologi', 'komputer', 'kedokteran', 'keperawatan', 'kesehatan',
        'gizi', 'farmasi', 'biologi', 'fisika', 'kimia', 'matematika', 'arsitektur', 'pertanian',
        'kelautan', 'peternakan', 'akuakultur', 'mesin', 'elektro', 'sipil', 'pangan', 'statistika',
        'statistik', 'lingkungan', 'sains', 'olahraga', 'jasmani', 'manufaktur', 'mekatronika',
        'elektronika', 'otomotif', 'ipa', 'geografi', 'promosi'
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
        console.log("Looking up Universitas Negeri Yogyakarta...");
        let univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Negeri Yogyakarta", mode: "insensitive" }
            }
        });

        if (!univ) {
            console.log("UNY not found in DB! Exiting...");
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
                        estimatedUkt: 5500000
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
