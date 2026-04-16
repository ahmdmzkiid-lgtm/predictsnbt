import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	13231001	PENDIDIKAN MATEMATIKA	Sarjana	36	282	Tidak Ada
2	13231002	PENDIDIKAN FISIKA	Sarjana	24	100	Tidak Ada
3	13231003	PENDIDIKAN KIMIA	Sarjana	29	116	Tidak Ada
4	13231004	PENDIDIKAN BIOLOGI	Sarjana	36	256	Tidak Ada
5	13231005	MATEMATIKA	Sarjana	30	240	Tidak Ada
6	13231006	FISIKA	Sarjana	30	151	Tidak Ada
7	13231007	KIMIA	Sarjana	30	300	Tidak Ada
8	13231008	BIOLOGI	Sarjana	36	377	Tidak Ada
9	13231009	PENDIDIKAN TEKNIK ELEKTRO	Sarjana	27	259	Tidak Ada
10	13231010	PENDIDIKAN TEKNIK MESIN	Sarjana	27	200	Tidak Ada
11	13231011	PENDIDIKAN TEKNIK BANGUNAN	Sarjana	27	216	Tidak Ada
12	13231012	ILMU KEOLAHRAGAAN	Sarjana	36	316	Olahraga
13	13231013	PENDIDIKAN TEKNIK INFORMATIKA DAN KOMPUTER	Sarjana	26	513	Tidak Ada
14	13231014	PENDIDIKAN TEKNIK ELEKTRONIKA	Sarjana	27	120	Tidak Ada
15	13231015	ILMU KOMPUTER	Sarjana	24	1437	Tidak Ada
16	13231016	STATISTIKA	Sarjana	24	444	Tidak Ada
17	13231017	REKAYASA KESELAMATAN KEBAKARAN	Sarjana	18	536	Tidak Ada
18	13231018	TEKNIK MESIN	Sarjana	27	926	Tidak Ada
19	13231019	SISTEM DAN TEKNOLOGI INFORMASI	Sarjana	18	1150	Tidak Ada
20	13231020	TEKNOLOGI PENDIDIKAN	Sarjana	41	282	Tidak Ada
21	13231021	PENDIDIKAN KHUSUS	Sarjana	45	253	Tidak Ada
22	13231022	MANAJEMEN PENDIDIKAN	Sarjana	45	540	Tidak Ada
23	13231023	PENDIDIKAN MASYARAKAT	Sarjana	45	396	Tidak Ada
24	13231024	PEND. GURU PAUD	Sarjana	36	400	Tidak Ada
25	13231025	BIMBINGAN & KONSELING	Sarjana	39	752	Tidak Ada
26	13231026	PENDIDIKAN GURU SEKOLAH DASAR	Sarjana	59	1442	Tidak Ada
27	13231027	PSIKOLOGI	Sarjana	134	3621	Tidak Ada
28	13231028	PENDIDIKAN BAHASA INDONESIA	Sarjana	36	441	Tidak Ada
29	13231029	SASTRA INDONESIA	Sarjana	36	507	Tidak Ada
30	13231030	PENDIDIKAN BAHASA INGGRIS	Sarjana	45	693	Tidak Ada
31	13231031	SASTRA INGGRIS	Sarjana	60	1259	Tidak Ada
32	13231032	PENDIDIKAN BAHASA PRANCIS	Sarjana	36	224	Tidak Ada
33	13231033	PENDIDIKAN BAHASA JERMAN	Sarjana	36	291	Tidak Ada
34	13231034	PENDIDIKAN BAHASA ARAB	Sarjana	60	547	Tidak Ada
35	13231035	PENDIDIKAN BAHASA JEPANG	Sarjana	36	617	Tidak Ada
36	13231036	PENDIDIKAN TARI	Sarjana	36	158	Tari
37	13231037	PENDIDIKAN MUSIK	Sarjana	23	121	Musik
38	13231038	PENDIDIKAN SENI RUPA	Sarjana	23	223	Seni Rupa, Desain, dan Kriya
39	13231039	PENDIDIKAN PANCASILA & KEWARGANEGARAAN	Sarjana	36	276	Tidak Ada
40	13231040	PENDIDIKAN GEOGRAFI	Sarjana	36	268	Tidak Ada
41	13231041	PENDIDIKAN SEJARAH	Sarjana	36	306	Tidak Ada
42	13231042	PENDIDIKAN AGAMA ISLAM	Sarjana	45	873	Tidak Ada
43	13231043	SOSIOLOGI	Sarjana	24	637	Tidak Ada
44	13231044	PENDIDIKAN SOSIOLOGI	Sarjana	36	421	Tidak Ada
45	13231045	PENDIDIKAN KESEJAHTERAAN KELUARGA	Sarjana	18	212	Tidak Ada
46	13231046	PENDIDIKAN JASMANI	Sarjana	89	374	Olahraga
47	13231047	PENDIDIKAN KEPELATIHAN OLAHRAGA	Sarjana	54	313	Olahraga
48	13231048	PENDIDIKAN EKONOMI	Sarjana	44	392	Tidak Ada
49	13231049	MANAJEMEN	Sarjana	71	2601	Tidak Ada
50	13231050	AKUNTANSI	Sarjana	59	2350	Tidak Ada
51	13231051	PENDIDIKAN ILMU PENGETAHUAN SOSIAL	Sarjana	36	267	Tidak Ada
52	13231052	PENDIDIKAN TATA BOGA	Sarjana	18	644	Tidak Ada
53	13231053	PENDIDIKAN TATA BUSANA	Sarjana	18	383	Tidak Ada
54	13231054	PENDIDIKAN TATA RIAS	Sarjana	27	598	Tidak Ada
55	13231055	PENDIDIKAN BISNIS	Sarjana	44	551	Tidak Ada
56	13231056	PENDIDIKAN BAHASA MANDARIN	Sarjana	27	346	Tidak Ada
57	13231057	PENDIDIKAN ADMINISTRASI PERKANTORAN	Sarjana	44	688	Tidak Ada
58	13231058	OLAHRAGA REKREASI	Sarjana	45	160	Olahraga
59	13231059	KEPELATIHAN KECABANGAN OLAHRAGA	Sarjana	41	239	Olahraga
60	13231060	ILMU KOMUNIKASI	Sarjana	24	2780	Tidak Ada
61	13231061	GEOGRAFI	Sarjana	30	484	Tidak Ada
62	13231062	BISNIS DIGITAL	Sarjana	54	2408	Tidak Ada
63	13231063	PENDIDIKAN AKUNTANSI	Sarjana	50	363	Tidak Ada
64	13231076	PERPUSTAKAAN DAN SAINS INFORMASI	Sarjana	24	460	Tidak Ada
65	13231077	ILMU HUKUM	Sarjana	30	1554	Tidak Ada
66	13231078	EKONOMI DAN KEUANGAN ISLAM	Sarjana	24		Tidak Ada
67	13231079	ILMU EKONOMI	Sarjana	24		Tidak Ada
68	13232064	HUBUNGAN MASYARAKAT DAN KOMUNIKASI DIGITAL	Sarjana Terapan	45	4684	Tidak Ada
69	13232065	USAHA PERJALANAN WISATA	Sarjana Terapan	36	1297	Tidak Ada
70	13232066	TEKNOLOGI REKAYASA OTOMASI	Sarjana Terapan	27	519	Tidak Ada
71	13232067	TEKNOLOGI REKAYASA MANUFAKTUR	Sarjana Terapan	18	415	Tidak Ada
72	13232068	TEKNOLOGI REKAYASA KONSTRUKSI BANGUNAN GEDUNG	Sarjana Terapan	24	632	Tidak Ada
73	13232069	MANAJEMEN PELABUHAN DAN LOGISTIK MARITIM	Sarjana Terapan	18	1333	Tidak Ada
74	13232070	SENI KULINER DAN PENGOLAHAN JASA MAKANAN	Sarjana Terapan	18	1638	Tidak Ada
75	13232071	DESAIN MODE	Sarjana Terapan	18	782	Tidak Ada
76	13232072	KOSMETIK DAN PERAWATAN KECANTIKAN	Sarjana Terapan	27	1447	Tidak Ada
77	13232073	PEMASARAN DIGITAL	Sarjana Terapan	44	1889	Tidak Ada
78	13232074	ADMINISTRASI PERKANTORAN DIGITAL	Sarjana Terapan	44	3198	Tidak Ada
79	13232075	AKUNTANSI SEKTOR PUBLIK	Sarjana Terapan	44	2158	Tidak Ada
`;

// Helper
const capitalize = (str) => {
    return str.replace('&', 'Dan').replace('/', ' / ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ').replace(' / ', '/');
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
        'rekayasa', 'keselamatan', 'kosmetik', 'kecantikan', 'kuliner', 'otomasi', 'manufaktur', 'konstruksi'
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
        console.log("Looking up Universitas Negeri Jakarta...");
        let univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Negeri Jakarta", mode: "insensitive" }
            }
        });

        if (!univ) {
            console.log("UNJ not found in DB! Exiting...");
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
