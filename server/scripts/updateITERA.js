import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	11921001	TEKNIK GEOMATIKA	Sarjana	90	157	Tidak Ada
2	11921002	TEKNIK ELEKTRO	Sarjana	102	567	Tidak Ada
3	11921003	PERENCANAAN WILAYAH DAN KOTA	Sarjana	126	436	Tidak Ada
4	11921004	TEKNIK GEOFISIKA	Sarjana	120	410	Tidak Ada
5	11921005	TEKNIK SIPIL	Sarjana	117	750	Tidak Ada
6	11921006	TEKNIK INFORMATIKA	Sarjana	126	1195	Tidak Ada
7	11921007	FISIKA	Sarjana	45	42	Tidak Ada
8	11921008	ARSITEKTUR	Sarjana	90	486	Tidak Ada
9	11921009	TEKNIK LINGKUNGAN	Sarjana	87	625	Tidak Ada
10	11921010	TEKNIK GEOLOGI	Sarjana	75	745	Tidak Ada
11	11921011	MATEMATIKA	Sarjana	60	98	Tidak Ada
12	11921012	TEKNIK MESIN	Sarjana	72	511	Tidak Ada
13	11921013	BIOLOGI	Sarjana	60	159	Tidak Ada
14	11921014	TEKNIK INDUSTRI	Sarjana	102	1081	Tidak Ada
15	11921015	FARMASI	Sarjana	105	1437	Tidak Ada
16	11921016	TEKNIK KIMIA	Sarjana	93	319	Tidak Ada
17	11921017	KIMIA	Sarjana	60	128	Tidak Ada
18	11921018	TEKNIK FISIKA	Sarjana	57	68	Tidak Ada
19	11921019	TEKNIK KELAUTAN	Sarjana	57	170	Tidak Ada
20	11921020	SAINS ATMOSFIR DAN KEPLANETAN	Sarjana	69	65	Tidak Ada
21	11921021	TEKNIK BIOSISTEM	Sarjana	75	122	Tidak Ada
22	11921022	TEKNOLOGI INDUSTRI PERTANIAN	Sarjana	87	315	Tidak Ada
23	11921023	TEKNIK SISTEM ENERGI	Sarjana	60	191	Tidak Ada
24	11921024	TEKNOLOGI PANGAN	Sarjana	87	552	Tidak Ada
25	11921025	TEKNIK MATERIAL	Sarjana	75	233	Tidak Ada
26	11921026	TEKNIK PERTAMBANGAN	Sarjana	111	1724	Tidak Ada
27	11921027	ARSITEKTUR LANSKAP	Sarjana	60	98	Tidak Ada
28	11921028	DESAIN KOMUNIKASI VISUAL	Sarjana	75	213	Seni Rupa, Desain, dan Kriya
29	11921029	TEKNIK TELEKOMUNIKASI	Sarjana	57	219	Tidak Ada
30	11921030	SAINS AKTUARIA	Sarjana	78	152	Tidak Ada
31	11921031	REKAYASA KEHUTANAN	Sarjana	78	149	Tidak Ada
32	11921032	TEKNIK BIOMEDIS	Sarjana	87	531	Tidak Ada
33	11921033	SAINS LINGKUNGAN KELAUTAN	Sarjana	45	57	Tidak Ada
34	11921034	SAINS DATA	Sarjana	78	236	Tidak Ada
35	11921035	TEKNIK PERKERETAAPIAN	Sarjana	54	447	Tidak Ada
36	11921036	REKAYASA TATA KELOLA AIR TERPADU	Sarjana	54	99	Tidak Ada
37	11921037	REKAYASA INSTRUMENTASI DAN AUTOMASI	Sarjana	63	111	Tidak Ada
38	11921038	REKAYASA MINYAK DAN GAS	Sarjana	57	466	Tidak Ada
39	11921039	REKAYASA KOSMETIK	Sarjana	63	421	Tidak Ada
40	11921040	PARIWISATA	Sarjana	54	314	Tidak Ada
41	11921041	REKAYASA KEOLAHRAGAAN	Sarjana	45	79	Tidak Ada
`;

// Helper
const capitalize = (str) => {
    return str.replace('&', 'Dan').replace('/', ' / ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ').replace(' / ', '/');
};

const getRandomScore = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const determineCategory = (majorName) => {
    const nameStr = majorName.toLowerCase();
    const soshumKeywords = ['pariwisata', 'desain komunikasi visual', 'hukum', 'akuntansi', 'manajemen', 'administrasi', 'komunikasi'];
    
    if (soshumKeywords.some(kw => nameStr.includes(kw))) {
        return 'SOSHUM';
    }
    return 'SAINTEK';
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
        console.log("Looking up Institut Teknologi Sumatera...");
        let univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Institut Teknologi Sumatera", mode: "insensitive" }
            }
        });

        if (!univ) {
            console.log("ITERA not found in DB! Exiting...");
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
