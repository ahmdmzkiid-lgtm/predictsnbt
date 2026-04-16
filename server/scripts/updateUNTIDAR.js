import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	13521001	AGROTEKNOLOGI	Sarjana	75	408	Tidak Ada
2	13521002	TEKNIK SIPIL	Sarjana	88	493	Tidak Ada
3	13521003	TEKNIK MESIN	Sarjana	88	442	Tidak Ada
4	13521004	TEKNIK ELEKTRO	Sarjana	66	270	Tidak Ada
5	13521005	PETERNAKAN	Sarjana	75	365	Tidak Ada
6	13521006	PENDIDIKAN ILMU PENGETAHUAN ALAM	Sarjana	96	191	Tidak Ada
7	13521007	PENDIDIKAN BIOLOGI	Sarjana	72	211	Tidak Ada
8	13521008	PENDIDIKAN MATEMATIKA	Sarjana	96	209	Tidak Ada
9	13521009	AKUAKULTUR	Sarjana	75	169	Tidak Ada
10	13521010	EKONOMI PEMBANGUNAN	Sarjana	120	537	Tidak Ada
11	13521011	ILMU ADMINISTRASI NEGARA	Sarjana	138	591	Tidak Ada
12	13521012	PENDIDIKAN BAHASA INGGRIS	Sarjana	120	342	Tidak Ada
13	13521013	PENDIDIKAN BAHASA DAN SASTRA INDONESIA	Sarjana	120	533	Tidak Ada
14	13521014	HUKUM	Sarjana	138	552	Tidak Ada
15	13521015	MANAJEMEN	Sarjana	120	802	Tidak Ada
16	13521016	ILMU KOMUNIKASI	Sarjana	127	772	Tidak Ada
17	13521017	AKUNTANSI	Sarjana	120	596	Tidak Ada
18	13521020	PARIWISATA	Sarjana	69	535	Tidak Ada
19	13521021	TEKNOLOGI PANGAN	Sarjana	50	481	Tidak Ada
20	13521022	TEKNOLOGI INFORMASI	Sarjana	44	437	Tidak Ada
21	13521023	TEKNIK MEKATRONIKA	Sarjana	44	121	Tidak Ada
22	13521024	TEKNIK INDUSTRI	Sarjana	44	473	Tidak Ada
23	13521025	AGRIBISNIS	Sarjana	50	398	Tidak Ada
24	13521026	GIZI	Sarjana	50	669	Tidak Ada
25	13521029	PENDIDIKAN PANCASILA DAN KEWARGANEGARAAN	Sarjana	70		Tidak Ada
26	13522019	TEKNOLOGI REKAYASA PERANCANGAN MANUFAKTUR	Sarjana Terapan	33	494	Tidak Ada
27	13522027	AKUNTANSI PERPAJAKAN	Sarjana Terapan	60	1269	Tidak Ada
28	13523018	AKUNTANSI	Diploma Tiga	70	1647	Tidak Ada
29	13523028	FARMASI	Diploma Tiga	40	2155	Tidak Ada
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
        'pertanian', 'kelautan', 'peternakan', 'akuakultur', 'mesin', 'elektro', 'sipil', 'pangan',
        'agribisnis', 'mekatronika', 'manufaktur', 'alam'
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
        console.log("Looking up Universitas Tidar...");
        let univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Tidar", mode: "insensitive" }
            }
        });

        if (!univ) {
            console.log("UNTIDAR not found in DB! Exiting...");
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
                        accreditation: "Baik Sekali",
                        degree: data.degree,
                        estimatedUkt: 4500000
                    }
                });
                newCount++;
            }

            let actualApplicants = data.applicants;
            if (actualApplicants === 0 || isNaN(actualApplicants)) {
                actualApplicants = Math.floor(data.capacity * (Math.random() * 6 + 2));
            }

            const dummyScore = getRandomScore(490, 640);
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
