import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	13631001	TEKNIK GEOLOGI	Sarjana	161	2777	Tidak Ada
2	13631002	TEKNIK PERTAMBANGAN	Sarjana	129	4322	Tidak Ada
3	13631003	TEKNIK PERMINYAKAN	Sarjana	106	2734	Tidak Ada
4	13631004	TEKNIK LINGKUNGAN	Sarjana	99	1619	Tidak Ada
5	13631005	TEKNIK GEOFISIKA	Sarjana	66	784	Tidak Ada
6	13631006	TEKNIK KIMIA	Sarjana	137	1087	Tidak Ada
7	13631007	TEKNIK INDUSTRI	Sarjana	139	2377	Tidak Ada
8	13631008	TEKNIK INFORMATIKA	Sarjana	130	1589	Tidak Ada
9	13631009	AGROTEKNOLOGI	Sarjana	173	1065	Tidak Ada
10	13631010	AGRIBISNIS	Sarjana	133	1083	Tidak Ada
11	13631011	METALURGI	Sarjana	68	1334	Tidak Ada
12	13631012	ILMU TANAH	Sarjana	86	595	Tidak Ada
13	13631013	SISTEM INFORMASI	Sarjana	101	1140	Tidak Ada
14	13631014	TEKNIK GEOMATIKA	Sarjana	62	457	Tidak Ada
15	13631015	MANAJEMEN	Sarjana	354	2832	Tidak Ada
16	13631016	AKUNTANSI	Sarjana	216	2005	Tidak Ada
17	13631017	EKONOMI PEMBANGUNAN	Sarjana	192	1191	Tidak Ada
18	13631018	ILMU HUBUNGAN INTERNASIONAL	Sarjana	137	868	Tidak Ada
19	13631019	ILMU ADMINISTRASI BISNIS	Sarjana	138	1641	Tidak Ada
20	13631020	ILMU KOMUNIKASI	Sarjana	139	1928	Tidak Ada
21	13631021	HUBUNGAN MASYARAKAT	Sarjana	111	1241	Tidak Ada
22	13633022	TEKNIK KIMIA	Diploma Tiga	60	2615	Tidak Ada
`;

const capitalize = (str) => {
    return str.replace('&', 'Dan').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
};

const getRandomScore = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const determineCategory = (majorName) => {
    const nameStr = majorName.toLowerCase();
    const saintekKeywords = [
        'teknik', 'informatika', 'teknologi', 'komputer', 'sistem informasi',
        'kimia', 'geologi', 'pertambangan', 'perminyakan', 'lingkungan',
        'geofisika', 'industri', 'agroteknologi', 'agribisnis', 'metalurgi',
        'tanah', 'geomatika'
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
        console.log("Looking up UPN Veteran Yogyakarta...");
        // Try multiple name variants
        let univ = await prisma.university.findFirst({
            where: { name: { contains: "Veteran Yogyakarta", mode: "insensitive" } }
        });
        if (!univ) {
            univ = await prisma.university.findFirst({
                where: { name: { contains: "Pembangunan Nasional", mode: "insensitive" }, AND: { name: { contains: "Yogyakarta", mode: "insensitive" } } }
            });
        }
        if (!univ) {
            univ = await prisma.university.findFirst({
                where: { name: { contains: "UPNVY", mode: "insensitive" } }
            });
        }

        if (!univ) {
            console.log("UPN Veteran Yogyakarta not found in DB!");
            // List similar universities
            const similar = await prisma.university.findMany({
                where: { name: { contains: "Pembangunan", mode: "insensitive" } },
                select: { id: true, name: true }
            });
            console.log("Similar universities found:", similar);
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
                        estimatedUkt: 5000000
                    }
                });
                newCount++;
            }

            let actualApplicants = data.applicants;
            if (actualApplicants === 0 || isNaN(actualApplicants)) {
                actualApplicants = Math.floor(data.capacity * (Math.random() * 7 + 3));
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
