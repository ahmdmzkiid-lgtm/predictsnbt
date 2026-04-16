import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	13561001	PENDIDIKAN MATEMATIKA	Sarjana	59	423	Tidak Ada
2	13561002	PENDIDIKAN FISIKA	Sarjana	42	113	Tidak Ada
3	13561003	PENDIDIKAN KIMIA	Sarjana	42	147	Tidak Ada
4	13561004	PENDIDIKAN BIOLOGI	Sarjana	41	329	Tidak Ada
5	13561005	PENDIDIKAN TEKNIK BANGUNAN	Sarjana	27	126	Tidak Ada
6	13561006	PENDIDIKAN TEKNIK MESIN	Sarjana	27	164	Tidak Ada
7	13561007	PENDIDIKAN TEKNIK ELEKTRO	Sarjana	27	125	Tidak Ada
8	13561008	ILMU KEOLAHRAGAAN	Sarjana	38	226	Olahraga
9	13561009	MATEMATIKA	Sarjana	27	159	Tidak Ada
10	13561010	FISIKA	Sarjana	36	107	Tidak Ada
11	13561011	KIMIA	Sarjana	30	238	Tidak Ada
12	13561012	BIOLOGI	Sarjana	30	257	Tidak Ada
13	13561013	KESEHATAN MASYARAKAT	Sarjana	87	2017	Tidak Ada
14	13561014	PENDIDIKAN IPA	Sarjana	35	204	Tidak Ada
15	13561015	PENDIDIKAN TEKNIK INFORMATIKA DAN KOMPUTER	Sarjana	36	365	Tidak Ada
16	13561016	TEKNIK ARSITEKTUR	Sarjana	50	556	Tidak Ada
17	13561017	PENDIDIKAN TEKNIK OTOMOTIF	Sarjana	27	179	Tidak Ada
18	13561018	TEKNIK KIMIA	Sarjana	50	381	Tidak Ada
19	13561019	TEKNIK MESIN	Sarjana	58	971	Tidak Ada
20	13561020	TEKNIK SIPIL	Sarjana	58	980	Tidak Ada
21	13561021	TEKNIK INFORMATIKA	Sarjana	59	1362	Tidak Ada
22	13561022	TEKNIK ELEKTRO	Sarjana	50	700	Tidak Ada
23	13561023	GIZI	Sarjana	57	937	Tidak Ada
24	13561024	SISTEM INFORMASI	Sarjana	35	761	Tidak Ada
25	13561025	ILMU LINGKUNGAN	Sarjana	32	429	Tidak Ada
26	13561026	FARMASI	Sarjana	46	1238	Tidak Ada
27	13561027	TEKNIK KOMPUTER	Sarjana	20	429	Tidak Ada
28	13561028	BIMBINGAN DAN KONSELING	Sarjana	47	761	Tidak Ada
29	13561029	TEKNOLOGI PENDIDIKAN	Sarjana	36	198	Tidak Ada
30	13561030	PENDIDIKAN NON FORMAL	Sarjana	30	72	Tidak Ada
31	13561031	PENDIDIKAN PANCASILA DAN KEWARGANEGARAAN	Sarjana	45	325	Tidak Ada
32	13561032	PENDIDIKAN GEOGRAFI	Sarjana	30	213	Tidak Ada
33	13561033	PENDIDIKAN SEJARAH	Sarjana	30	191	Tidak Ada
34	13561034	PENDIDIKAN JASMANI KESEHATAN DAN REKREASI	Sarjana	88	810	Olahraga
35	13561035	PENDIDIKAN KEPELATIHAN OLAHRAGA	Sarjana	65	421	Olahraga
36	13561036	PENDIDIKAN TATA BOGA	Sarjana	35	574	Tidak Ada
37	13561037	PENDIDIKAN TATA BUSANA	Sarjana	30	335	Tidak Ada
38	13561038	PENDIDIKAN SOSIOLOGI DAN ANTROPOLOGI	Sarjana	45	373	Tidak Ada
39	13561039	EKONOMI PEMBANGUNAN	Sarjana	95	815	Tidak Ada
40	13561040	MANAJEMEN	Sarjana	149	2011	Tidak Ada
41	13561041	PSIKOLOGI	Sarjana	72	1471	Tidak Ada
42	13561042	GEOGRAFI	Sarjana	73	397	Tidak Ada
43	13561043	ILMU HUKUM	Sarjana	283	2329	Tidak Ada
44	13561044	AKUNTANSI	Sarjana	131	1788	Tidak Ada
45	13561045	SENI RUPA	Sarjana	45	143	Seni Rupa, Desain, dan Kriya
46	13561046	PENDIDIKAN AKUNTANSI	Sarjana	41	211	Tidak Ada
47	13561047	PENDIDIKAN EKONOMI	Sarjana	46	487	Tidak Ada
48	13561048	PENDIDIKAN ADMINISTRASI PERKANTORAN	Sarjana	38	437	Tidak Ada
49	13561049	PENDIDIKAN BAHASA DAN SASTRA INDONESIA	Sarjana	65	653	Tidak Ada
50	13561050	PENDIDIKAN BAHASA INGGRIS	Sarjana	65	561	Tidak Ada
51	13561051	PENDIDIKAN BAHASA PRANCIS	Sarjana	24	42	Tidak Ada
52	13561052	PENDIDIKAN SENI RUPA	Sarjana	32	76	Seni Rupa, Desain, dan Kriya
53	13561053	SASTRA INDONESIA	Sarjana	30	268	Tidak Ada
54	13561054	SASTRA INGGRIS	Sarjana	59	576	Tidak Ada
55	13561055	SASTRA PRANCIS	Sarjana	36	119	Tidak Ada
56	13561056	ILMU SEJARAH	Sarjana	30	208	Tidak Ada
57	13561057	SASTRA JAWA	Sarjana	15	75	Tidak Ada
58	13561058	PENDIDIKAN BAHASA DAN SASTRA JAWA	Sarjana	35	207	Tidak Ada
59	13561059	PENDIDIKAN SENI TARI	Sarjana	27	116	Tari
60	13561060	PENDIDIKAN SENI MUSIK	Sarjana	30	94	Musik
61	13561061	PENDIDIKAN BAHASA JEPANG	Sarjana	40	282	Tidak Ada
62	13561062	PENDIDIKAN BAHASA ARAB	Sarjana	27	187	Tidak Ada
63	13561063	PENDIDIKAN GURU SEKOLAH DASAR	Sarjana	180	1919	Tidak Ada
64	13561064	PENDIDIKAN GURU PAUD	Sarjana	39	214	Tidak Ada
65	13561065	PENDIDIKAN TATA KECANTIKAN	Sarjana	35	432	Tidak Ada
66	13561066	PENDIDIKAN BAHASA MANDARIN	Sarjana	18	193	Tidak Ada
67	13561067	ILMU POLITIK	Sarjana	80	430	Tidak Ada
68	13561068	PENDIDIKAN JASMANI SEKOLAH DASAR	Sarjana	30	232	Olahraga
69	13561070	PENDIDIKAN ILMU PENGETAHUAN SOSIAL	Sarjana	45	215	Tidak Ada
70	13561071	PENDIDIKAN KESEJAHTERAAN KELUARGA	Sarjana	15	112	Tidak Ada
71	13561074	STATISTIKA DAN SAINS DATA	Sarjana	29	296	Tidak Ada
72	13561075	EKONOMI DAN KEUANGAN ISLAM	Sarjana	29	295	Tidak Ada
73	13561076	KEDOKTERAN	Sarjana	15	722	Tidak Ada
74	13561077	ILMU KOMUNIKASI	Sarjana	41	1478	Tidak Ada
75	13561078	KEDOKTERAN HEWAN	Sarjana	15		Tidak Ada
76	13563072	DESAIN KOMUNIKASI VISUAL	Diploma Tiga	20	757	Seni Rupa, Desain, dan Kriya
77	13563073	STATISTIKA TERAPAN DAN KOMPUTASI	Diploma Tiga	12	1249	Tidak Ada
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
        'statistik', 'lingkungan', 'sains', 'olahraga', 'jasmani', 'keselamatan', 'geografi', 'ipa'
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
        console.log("Looking up Universitas Negeri Semarang...");
        let univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Negeri Semarang", mode: "insensitive" }
            }
        });

        if (!univ) {
            console.log("UNNES not found in DB! Exiting...");
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
                actualApplicants = Math.floor(data.capacity * (Math.random() * 7 + 3));
            }

            const dummyScore = getRandomScore(500, 660);
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
