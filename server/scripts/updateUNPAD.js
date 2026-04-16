import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	13331001	PENDIDIKAN DOKTER	Sarjana	100	2944	Tidak Ada
2	13331002	MATEMATIKA	Sarjana	45	352	Tidak Ada
3	13331003	KIMIA	Sarjana	40	483	Tidak Ada
4	13331004	FISIKA	Sarjana	45	233	Tidak Ada
5	13331005	BIOLOGI	Sarjana	53	480	Tidak Ada
6	13331006	STATISTIKA	Sarjana	46	685	Tidak Ada
7	13331007	AGROTEKNOLOGI	Sarjana	134	1297	Tidak Ada
8	13331008	AGRIBISNIS	Sarjana	58	1020	Tidak Ada
9	13331009	PENDIDIKAN DOKTER GIGI	Sarjana	46	1428	Tidak Ada
10	13331010	ILMU PETERNAKAN	Sarjana	161	1126	Tidak Ada
11	13331011	PERIKANAN	Sarjana	92	572	Tidak Ada
12	13331012	ILMU KEPERAWATAN	Sarjana	82	1885	Tidak Ada
13	13331013	ILMU KELAUTAN	Sarjana	58	707	Tidak Ada
14	13331014	TEKNOLOGI PANGAN	Sarjana	58	1494	Tidak Ada
15	13331015	TEKNIK PERTANIAN	Sarjana	48	701	Tidak Ada
16	13331016	FARMASI	Sarjana	75	2408	Tidak Ada
17	13331017	TEKNIK GEOLOGI	Sarjana	76	2388	Tidak Ada
18	13331018	PSIKOLOGI	Sarjana	71	3089	Tidak Ada
19	13331019	GEOFISIKA	Sarjana	22	516	Tidak Ada
20	13331020	TEKNIK INFORMATIKA	Sarjana	35	2487	Tidak Ada
21	13331021	TEKNOLOGI INDUSTRI PERTANIAN	Sarjana	28	599	Tidak Ada
22	13331022	TEKNIK ELEKTRO	Sarjana	42	1095	Tidak Ada
23	13331023	KEDOKTERAN HEWAN	Sarjana	18	495	Tidak Ada
24	13331028	ILMU AKTUARIA	Sarjana	19	396	Tidak Ada
25	13331030	PERIKANAN PSDKU PANGANDARAN	Sarjana	30	144	Tidak Ada
26	13331031	PETERNAKAN PSDKU PANGANDARAN	Sarjana	18	123	Tidak Ada
27	13331032	KEPERAWATAN PSDKU PANGANDARAN	Sarjana	23	299	Tidak Ada
28	13331033	ILMU HUKUM	Sarjana	132	4054	Tidak Ada
29	13331034	AKUNTANSI	Sarjana	48	2019	Tidak Ada
30	13331035	ILMU EKONOMI	Sarjana	41	825	Tidak Ada
31	13331036	MANAJEMEN	Sarjana	50	2230	Tidak Ada
32	13331037	ADMINISTRASI PUBLIK	Sarjana	40	1407	Tidak Ada
33	13331038	ILMU HUBUNGAN INTERNASIONAL	Sarjana	42	1468	Tidak Ada
34	13331039	ILMU KESEJAHTERAAN SOSIAL	Sarjana	23	609	Tidak Ada
35	13331040	ILMU PEMERINTAHAN	Sarjana	29	704	Tidak Ada
36	13331041	ANTROPOLOGI	Sarjana	18	544	Tidak Ada
37	13331042	ILMU ADMINISTRASI BISNIS	Sarjana	45	1757	Tidak Ada
38	13331043	SASTRA INDONESIA	Sarjana	37	572	Tidak Ada
39	13331044	SASTRA SUNDA	Sarjana	30	268	Tidak Ada
40	13331045	ILMU SEJARAH	Sarjana	50	392	Tidak Ada
41	13331046	SASTRA INGGRIS	Sarjana	42	1139	Tidak Ada
42	13331047	SASTRA PERANCIS	Sarjana	30	310	Tidak Ada
43	13331048	SASTRA JEPANG	Sarjana	39	834	Tidak Ada
44	13331049	SASTRA RUSIA	Sarjana	27	174	Tidak Ada
45	13331050	SASTRA JERMAN	Sarjana	25	390	Tidak Ada
46	13331051	SASTRA ARAB	Sarjana	50	485	Tidak Ada
47	13331052	ILMU KOMUNIKASI	Sarjana	46	2459	Tidak Ada
48	13331053	PERPUSTAKAAN DAN SAINS INFORMASI	Sarjana	41	512	Tidak Ada
49	13331054	SOSIOLOGI	Sarjana	19	552	Tidak Ada
50	13331055	ILMU POLITIK	Sarjana	23	573	Tidak Ada
51	13331056	HUBUNGAN MASYARAKAT	Sarjana	40	1012	Tidak Ada
52	13331057	EKONOMI ISLAM	Sarjana	50	650	Tidak Ada
53	13331058	MANAJEMEN KOMUNIKASI	Sarjana	47	1106	Tidak Ada
54	13331059	JURNALISTIK	Sarjana	47	747	Tidak Ada
55	13331060	TELEVISI DAN FILM	Sarjana	47	1096	Tidak Ada
56	13331064	BISNIS DIGITAL	Sarjana	37	2089	Tidak Ada
57	13331065	ADMINISTRASI BISNIS PSDKU PANGANDARAN	Sarjana	18	312	Tidak Ada
58	13331066	ILMU KOMUNIKASI PSDKU PANGANDARAN	Sarjana	21	252	Tidak Ada
59	13331081	REKAYASA KOSMETIK	Sarjana	18		Tidak Ada
60	13332067	AKUNTANSI PERPAJAKAN	Sarjana Terapan	45	2562	Tidak Ada
61	13332068	AKUNTANSI SEKTOR PUBLIK	Sarjana Terapan	39	1630	Tidak Ada
62	13332069	BISNIS INTERNASIONAL	Sarjana Terapan	30	2542	Tidak Ada
63	13332070	PEMASARAN DIGITAL	Sarjana Terapan	19	1546	Tidak Ada
64	13332071	KEBIDANAN	Sarjana Terapan	15	2187	Tidak Ada
65	13332072	TEKNOLOGI INDUSTRI KIMIA	Sarjana Terapan	18	1639	Tidak Ada
66	13332073	AGROTEKNOPRENEUR	Sarjana Terapan	33	1201	Tidak Ada
67	13332074	ADMINISTRASI KEUANGAN PUBLIK	Sarjana Terapan	27	1661	Tidak Ada
68	13332075	ADMINISTRASI PEMERINTAHAN	Sarjana Terapan	22	1835	Tidak Ada
69	13332076	BISNIS LOGISTIK	Sarjana Terapan	24	1155	Tidak Ada
70	13332077	KEARSIPAN DIGITAL	Sarjana Terapan	15	1068	Tidak Ada
71	13332078	BAHASA DAN BUDAYA TIONGKOK	Sarjana Terapan	16	910	Tidak Ada
72	13332079	MANAJEMEN PRODUKSI MEDIA	Sarjana Terapan	38	1968	Tidak Ada
73	13332080	PARIWISATA BAHARI	Sarjana Terapan	52	1499	Tidak Ada
`;

// Helper
const capitalize = (str) => {
    let cap = str.replace('&', 'Dan').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    // Upper case specific acronyms
    cap = cap.replace(/Psdku/g, 'PSDKU');
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
        console.log("Looking up Universitas Padjajaran...");
        let univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Padjadjaran", mode: "insensitive" }
            }
        });
        if (!univ) {
            univ = await prisma.university.findFirst({
                where: {
                    name: { contains: "Padjajaran", mode: "insensitive" }
                }
            });
        }

        if (!univ) {
            console.log("UNPAD not found in DB! Exiting...");
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
                        estimatedUkt: 6500000
                    }
                });
                newCount++;
            }

            // If applicants are missing (0/NaN) we generate a realistic figure
            let actualApplicants = data.applicants;
            if (actualApplicants === 0 || isNaN(actualApplicants)) {
                actualApplicants = Math.floor(data.capacity * (Math.random() * 8 + 3));
            }
            
            const dummyScore = getRandomScore(570, 690);
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
