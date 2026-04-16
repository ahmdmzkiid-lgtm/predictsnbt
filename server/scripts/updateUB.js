import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	13721001	MANAJEMEN SUMBERDAYA PERAIRAN	Sarjana	54	262	Tidak Ada
2	13721002	BUDIDAYA PERAIRAN	Sarjana	54	276	Tidak Ada
3	13721003	TEKNIK SIPIL	Sarjana	56	1238	Tidak Ada
4	13721004	TEKNIK MESIN	Sarjana	66	1087	Tidak Ada
5	13721005	TEKNIK ELEKTRO	Sarjana	66	1005	Tidak Ada
6	13721006	ARSITEKTUR	Sarjana	56	891	Tidak Ada
7	13721007	TEKNIK PENGAIRAN	Sarjana	56	390	Tidak Ada
8	13721008	KEDOKTERAN	Sarjana	96	3295	Tidak Ada
9	13721009	TEKNOLOGI PANGAN	Sarjana	75	1157	Tidak Ada
10	13721010	BIOLOGI	Sarjana	56	354	Tidak Ada
11	13721011	FISIKA	Sarjana	33	127	Tidak Ada
12	13721012	KIMIA	Sarjana	63	373	Tidak Ada
13	13721013	MATEMATIKA	Sarjana	60	233	Tidak Ada
14	13721014	PEMANFAATAN SUMBERDAYA PERIKANAN	Sarjana	57	167	Tidak Ada
15	13721015	TEKNOLOGI HASIL PERIKANAN	Sarjana	60	179	Tidak Ada
16	13721016	AGROBISNIS PERIKANAN	Sarjana	54	296	Tidak Ada
17	13721017	TEKNIK PERTANIAN DAN BIOSISTEM	Sarjana	50	427	Tidak Ada
18	13721018	STATISTIKA	Sarjana	63	664	Tidak Ada
19	13721019	PERENCANAAN WILAYAH DAN KOTA	Sarjana	56	859	Tidak Ada
20	13721020	TEKNIK INDUSTRI PERTANIAN	Sarjana	105	777	Tidak Ada
21	13721021	ILMU KEPERAWATAN	Sarjana	66	1102	Tidak Ada
22	13721023	ILMU GIZI	Sarjana	54	1243	Tidak Ada
23	13721024	TEKNIK INDUSTRI	Sarjana	66	1670	Tidak Ada
24	13721025	TEKNIK INFORMATIKA	Sarjana	84	1951	Tidak Ada
25	13721026	AGROEKOTEKNOLOGI	Sarjana	269	1565	Tidak Ada
26	13721027	AGRIBISNIS	Sarjana	156	1296	Tidak Ada
27	13721028	PETERNAKAN	Sarjana	239	1251	Tidak Ada
28	13721029	PENDIDIKAN DOKTER HEWAN	Sarjana	72	757	Tidak Ada
29	13721030	PENDIDIKAN DOKTER GIGI	Sarjana	50	1532	Tidak Ada
30	13721031	ILMU KELAUTAN	Sarjana	54	347	Tidak Ada
31	13721032	KEBIDANAN	Sarjana	48	586	Tidak Ada
32	13721033	FARMASI	Sarjana	54	1695	Tidak Ada
33	13721035	TEKNIK KOMPUTER	Sarjana	60	699	Tidak Ada
34	13721036	SISTEM INFORMASI	Sarjana	84	1353	Tidak Ada
35	13721037	TEKNIK KIMIA	Sarjana	45	675	Tidak Ada
36	13721038	INSTRUMENTASI	Sarjana	34	189	Tidak Ada
37	13721039	TEKNIK GEOFISIKA	Sarjana	29	453	Tidak Ada
38	13721040	BIOTEKNOLOGI	Sarjana	54	620	Tidak Ada
39	13721042	TEKNOLOGI BIOPROSES	Sarjana	38	351	Tidak Ada
40	13721043	TEKNIK LINGKUNGAN	Sarjana	60	1036	Tidak Ada
41	13721046	PENDIDIKAN TEKNOLOGI INFORMASI	Sarjana	54	244	Tidak Ada
42	13721047	TEKNOLOGI INFORMASI	Sarjana	60	749	Tidak Ada
43	13721048	AGROEKOTEKNOLOGI PSDKU KEDIRI	Sarjana	56	255	Tidak Ada
44	13721049	AGRIBISNIS PSDKU KEDIRI	Sarjana	56	322	Tidak Ada
45	13721050	PETERNAKAN PSDKU KEDIRI	Sarjana	56	230	Tidak Ada
46	13721051	AKUAKULTUR PSDKU KEDIRI	Sarjana	56	110	Tidak Ada
47	13721052	SOSIAL EKONOMI PERIKANAN PSDKU KEDIRI	Sarjana	56	101	Tidak Ada
48	13721053	KEHUTANAN	Sarjana	30	638	Tidak Ada
49	13721054	ILMU AKTUARIA	Sarjana	30	308	Tidak Ada
50	13721056	ILMU HUKUM	Sarjana	200	3147	Tidak Ada
51	13721057	EKONOMI PEMBANGUNAN	Sarjana	53	617	Tidak Ada
52	13721058	ADMINISTRASI PUBLIK	Sarjana	123	1744	Tidak Ada
53	13721059	ADMINISTRASI BISNIS	Sarjana	140	2504	Tidak Ada
54	13721060	MANAJEMEN	Sarjana	113	1969	Tidak Ada
55	13721061	AKUNTANSI	Sarjana	141	1933	Tidak Ada
56	13721062	SOSIOLOGI	Sarjana	63	563	Tidak Ada
57	13721063	ILMU KOMUNIKASI	Sarjana	84	2187	Tidak Ada
58	13721064	PSIKOLOGI	Sarjana	87	2358	Tidak Ada
59	13721065	HUBUNGAN INTERNASIONAL	Sarjana	75	1103	Tidak Ada
60	13721066	SASTRA INGGRIS	Sarjana	87	842	Tidak Ada
61	13721067	SASTRA JEPANG	Sarjana	57	539	Tidak Ada
62	13721068	BAHASA DAN SASTRA PRANCIS	Sarjana	33	154	Tidak Ada
63	13721069	ILMU POLITIK	Sarjana	54	631	Tidak Ada
64	13721070	ILMU PEMERINTAHAN	Sarjana	54	658	Tidak Ada
65	13721072	PERPAJAKAN	Sarjana	83	1180	Tidak Ada
66	13721075	EKONOMI ISLAM	Sarjana	47	437	Tidak Ada
67	13721076	EKONOMI KEUANGAN DAN PERBANKAN	Sarjana	71	921	Tidak Ada
68	13721077	ILMU PERPUSTAKAAN	Sarjana	33	350	Tidak Ada
69	13721078	PARIWISATA	Sarjana	50	899	Tidak Ada
70	13721080	PENDIDIKAN BAHASA INGGRIS	Sarjana	68	374	Tidak Ada
71	13721081	PENDIDIKAN BAHASA JEPANG	Sarjana	27	177	Tidak Ada
72	13721082	PENDIDIKAN BAHASA DAN SASTRA INDONESIA	Sarjana	42	284	Tidak Ada
73	13721085	ADMINISTRASI PENDIDIKAN	Sarjana	33	233	Tidak Ada
74	13721086	SENI RUPA MURNI	Sarjana	26	70	Seni Rupa, Desain, dan Kriya
75	13721087	SASTRA CINA	Sarjana	38	634	Tidak Ada
76	13721088	ANTROPOLOGI	Sarjana	35	357	Tidak Ada
77	13721089	KEWIRAUSAHAAN	Sarjana	32	810	Tidak Ada
78	13721094	SAINS DATA	Sarjana	21	416	Tidak Ada
79	13721095	BIOINFORMATIKA	Sarjana	18	94	Tidak Ada
80	13721096	INDUSTRI PETERNAKAN CERDAS	Sarjana	30	147	Tidak Ada
81	13722055	DESAIN GRAFIS	Sarjana Terapan	63	785	Seni Rupa, Desain, dan Kriya
82	13722090	MANAJEMEN PERHOTELAN	Sarjana Terapan	80	1551	Tidak Ada
83	13723091	KEUANGAN DAN PERBANKAN	Diploma Tiga	105	3121	Tidak Ada
84	13723092	ADMINISTRASI BISNIS	Diploma Tiga	110	5018	Tidak Ada
85	13723093	TEKNOLOGI INFORMASI	Diploma Tiga	111	3793	Tidak Ada
`;

const capitalize = (str) => {
    return str.replace('&', 'Dan').replace('BHS', 'Bahasa').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
};

const getRandomScore = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const determineCategory = (majorName) => {
    const nameStr = majorName.toLowerCase();
    const saintekKeywords = [
        'teknik', 'informatika', 'teknologi', 'komputer', 'kedokteran', 'keperawatan', 'kesehatan',
        'gizi', 'farmasi', 'biologi', 'fisika', 'kimia', 'matematika', 'arsitektur', 'agroteknologi',
        'agroekoteknologi', 'pertanian', 'kelautan', 'peternakan', 'akuakultur', 'mesin', 'elektro',
        'sipil', 'pangan', 'statistika', 'lingkungan', 'sains', 'olahraga', 'kebidanan', 'bioteknologi',
        'perikanan', 'perairan', 'budidaya', 'instrumentasi', 'geofisika', 'kehutanan', 'bioinformatika',
        'bioproses', 'pengairan', 'agrobisnis', 'sosial ekonomi'
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
        console.log("Looking up Universitas Brawijaya...");
        let univ = await prisma.university.findFirst({
            where: { name: { contains: "Brawijaya", mode: "insensitive" } }
        });

        if (!univ) {
            console.log("UB not found in DB! Exiting...");
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
                        estimatedUkt: 7000000
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
