import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	13851001	AGRIBISNIS	Sarjana	114	646	Tidak Ada
2	13851002	AGROTEKNOLOGI	Sarjana	116	622	Tidak Ada
3	13851003	TEKNIK KIMIA	Sarjana	120	639	Tidak Ada
4	13851004	TEKNIK INDUSTRI	Sarjana	120	1341	Tidak Ada
5	13851005	TEKNOLOGI PANGAN	Sarjana	78	850	Tidak Ada
6	13851006	INFORMATIKA	Sarjana	140	742	Tidak Ada
7	13851007	SISTEM INFORMASI	Sarjana	120	769	Tidak Ada
8	13851008	ARSITEKTUR	Sarjana	74	475	Tidak Ada
9	13851009	TEKNIK LINGKUNGAN	Sarjana	80	900	Tidak Ada
10	13851010	TEKNIK SIPIL	Sarjana	80	778	Tidak Ada
11	13851011	DESAIN KOMUNIKASI VISUAL	Sarjana	74	372	Seni Rupa, Desain, dan Kriya
12	13851012	SAINS DATA	Sarjana	60	384	Tidak Ada
13	13851013	TEKNIK MESIN	Sarjana	60	626	Tidak Ada
14	13851014	EKONOMI PEMBANGUNAN	Sarjana	120	610	Tidak Ada
15	13851015	MANAJEMEN	Sarjana	220	1243	Tidak Ada
16	13851016	AKUNTANSI	Sarjana	178	1087	Tidak Ada
17	13851017	ADMINISTRASI PUBLIK	Sarjana	140	1013	Tidak Ada
18	13851018	ADMINISTRASI BISNIS	Sarjana	140	1269	Tidak Ada
19	13851019	ILMU KOMUNIKASI	Sarjana	160	1302	Tidak Ada
20	13851020	HUBUNGAN INTERNASIONAL	Sarjana	72	417	Tidak Ada
21	13851021	HUKUM	Sarjana	158	1038	Tidak Ada
22	13851022	PARIWISATA	Sarjana	60	478	Tidak Ada
23	13851023	KEWIRAUSAHAAN	Sarjana	52	469	Tidak Ada
24	13851024	FISIKA	Sarjana	32	41	Tidak Ada
25	13851025	DESAIN INTERIOR	Sarjana	36	127	Seni Rupa, Desain, dan Kriya
26	13851026	LINGUISTIK INDONESIA	Sarjana	24	128	Tidak Ada
27	13851027	BISNIS DIGITAL	Sarjana	32	646	Tidak Ada
28	13851029	KEDOKTERAN	Sarjana	40	590	Tidak Ada
29	13852028	BAHASA INGGRIS UNTUK KOMUNIKASI BISNIS DAN PROFESIONAL	Sarjana Terapan	24	915	Tidak Ada
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
        'sipil', 'pangan', 'statistika', 'lingkungan', 'sains', 'olahraga', 'geofisika', 'nanoteknologi',
        'data', 'sistem informasi'
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
        console.log("Looking up UPN Veteran Jawa Timur...");
        let univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Veteran Jawa Timur", mode: "insensitive" }
            }
        });

        if (!univ) {
            console.log("UPNVJT not found in DB! Trying alternative match...");
            univ = await prisma.university.findFirst({
                where: { name: { contains: "Veteran", mode: "insensitive" }, AND: { name: { contains: "Jawa Timur", mode: "insensitive" } } }
            });
        }

        if (!univ) {
            console.log("UPNVJT not found in DB! Exiting...");
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
