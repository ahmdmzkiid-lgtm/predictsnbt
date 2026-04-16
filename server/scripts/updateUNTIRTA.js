import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	13111001	TEKNIK MESIN	Sarjana	121	553	Tidak Ada
2	13111002	TEKNIK ELEKTRO	Sarjana	121	559	Tidak Ada
3	13111003	TEKNIK INDUSTRI	Sarjana	121	1192	Tidak Ada
4	13111004	TEKNIK METALURGI	Sarjana	69	770	Tidak Ada
5	13111005	TEKNIK KIMIA	Sarjana	121	505	Tidak Ada
6	13111006	TEKNIK SIPIL	Sarjana	121	592	Tidak Ada
7	13111007	AGRIBISNIS	Sarjana	179	590	Tidak Ada
8	13111008	AGROEKOTEKNOLOGI	Sarjana	198	502	Tidak Ada
9	13111009	ILMU PERIKANAN	Sarjana	135	207	Tidak Ada
10	13111010	PENDIDIKAN BIOLOGI	Sarjana	110	232	Tidak Ada
11	13111011	PENDIDIKAN MATEMATIKA	Sarjana	157	211	Tidak Ada
12	13111012	PENDIDIKAN VOKASIONAL TEKNIK ELEKTRO	Sarjana	66	115	Tidak Ada
13	13111013	PENDIDIKAN VOKASIONAL TEKNIK MESIN	Sarjana	69	93	Tidak Ada
14	13111014	PENDIDIKAN FISIKA	Sarjana	69	95	Tidak Ada
15	13111015	PENDIDIKAN KIMIA	Sarjana	99	100	Tidak Ada
16	13111016	PENDIDIKAN IPA	Sarjana	77	99	Tidak Ada
17	13111017	TEKNOLOGI PANGAN	Sarjana	113	696	Tidak Ada
18	13111018	ILMU KEOLAHRAGAAN	Sarjana	44	96	Olahraga
19	13111019	GIZI	Sarjana	47	619	Tidak Ada
20	13111020	KEDOKTERAN	Sarjana	28	818	Tidak Ada
21	13111021	INFORMATIKA	Sarjana	97	852	Tidak Ada
22	13111022	KEPERAWATAN	Sarjana	53	787	Tidak Ada
23	13111023	ILMU KELAUTAN	Sarjana	97	226	Tidak Ada
24	13111024	HUKUM	Sarjana	380	1144	Tidak Ada
25	13111025	MANAJEMEN	Sarjana	182	1069	Tidak Ada
26	13111026	AKUNTANSI	Sarjana	182	950	Tidak Ada
27	13111027	EKONOMI PEMBANGUNAN	Sarjana	138	536	Tidak Ada
28	13111028	ADMINISTRASI PUBLIK	Sarjana	163	879	Tidak Ada
29	13111029	ILMU KOMUNIKASI	Sarjana	196	1206	Tidak Ada
30	13111030	PENDIDIKAN NON FORMAL	Sarjana	83	91	Tidak Ada
31	13111031	PENDIDIKAN BAHASA INDONESIA	Sarjana	165	331	Tidak Ada
32	13111032	PENDIDIKAN BAHASA INGGRIS	Sarjana	143	431	Tidak Ada
33	13111033	PENDIDIKAN GURU SEKOLAH DASAR	Sarjana	99	602	Tidak Ada
34	13111034	PENDIDIKAN GURU PENDIDIKAN ANAK USIA DINI	Sarjana	116	161	Tidak Ada
35	13111035	EKONOMI SYARIAH	Sarjana	138	331	Tidak Ada
36	13111036	PENDIDIKAN SOSIOLOGI	Sarjana	83	227	Tidak Ada
37	13111037	PENDIDIKAN SEJARAH	Sarjana	83	179	Tidak Ada
38	13111038	PENDIDIKAN PANCASILA DAN KEWARGANEGARAAN	Sarjana	83	161	Tidak Ada
39	13111039	PENDIDIKAN SENI PERTUNJUKAN	Sarjana	66	43	Sendratasik
40	13111040	BIMBINGAN DAN KONSELING	Sarjana	94	590	Tidak Ada
41	13111041	PENDIDIKAN KHUSUS	Sarjana	72	101	Tidak Ada
42	13111042	ILMU PEMERINTAHAN	Sarjana	135	532	Tidak Ada
43	13111049	PETERNAKAN	Sarjana	97	177	Tidak Ada
44	13111050	STATISTIKA	Sarjana	44	177	Tidak Ada
45	13113044	AKUNTANSI	Diploma Tiga	83	1115	Tidak Ada
46	13113045	PERBANKAN DAN KEUANGAN	Diploma Tiga	83	1275	Tidak Ada
47	13113047	MANAJEMEN PEMASARAN	Diploma Tiga	83	1447	Tidak Ada
48	13113048	ADMINISTRASI PAJAK	Diploma Tiga	83	1295	Tidak Ada
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
        'ipa', 'perikanan', 'metalurgi'
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
        console.log("Looking up Universitas Sultan Ageng Tirtayasa...");
        let univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Sultan Ageng Tirtayasa", mode: "insensitive" }
            }
        });

        if (!univ) {
            console.log("UNTIRTA not found in DB! Exiting...");
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

            const dummyScore = getRandomScore(490, 660);
            const tps = getRandomScore(470, dummyScore + 40);
            const litBi = getRandomScore(470, dummyScore + 40);
            const litBing = getRandomScore(470, dummyScore + 40);
            const pm = getRandomScore(470, dummyScore + 40);

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
