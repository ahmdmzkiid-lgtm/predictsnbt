import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	11121001	TEKNIK SIPIL	Sarjana	132	262	Tidak Ada
2	11121002	TEKNIK MESIN	Sarjana	120	221	Tidak Ada
3	11121003	TEKNIK KIMIA	Sarjana	100	126	Tidak Ada
4	11121004	TEKNIK ELEKTRO	Sarjana	80	151	Tidak Ada
5	11121005	TEKNIK INDUSTRI	Sarjana	100	379	Tidak Ada
6	11121006	TEKNIK INFORMATIKA	Sarjana	118	562	Tidak Ada
7	11121007	TEKNIK ARSITEKTUR	Sarjana	60	73	Tidak Ada
8	11121008	AGROEKOTEKNOLOGI	Sarjana	126	229	Tidak Ada
9	11121009	AGRIBISNIS	Sarjana	106	207	Tidak Ada
10	11121010	AKUAKULTUR	Sarjana	46	26	Tidak Ada
11	11121011	KEDOKTERAN	Sarjana	56	1230	Tidak Ada
12	11121012	PENDIDIKAN FISIKA	Sarjana	48	33	Tidak Ada
13	11121013	PENDIDIKAN KIMIA	Sarjana	48	34	Tidak Ada
14	11121014	PENDIDIKAN MATEMATIKA	Sarjana	48	89	Tidak Ada
15	11121015	PENDIDIKAN VOKASIONAL TEKNIK MESIN	Sarjana	30	21	Tidak Ada
16	11121016	SISTEM INFORMASI	Sarjana	80	203	Tidak Ada
17	11121017	ILMU KELAUTAN	Sarjana	46	47	Tidak Ada
18	11121018	TEKNIK MATERIAL	Sarjana	40	44	Tidak Ada
19	11121019	TEKNIK LOGISTIK	Sarjana	40	46	Tidak Ada
20	11121020	MANAJEMEN	Sarjana	166	379	Tidak Ada
21	11121021	AKUNTANSI	Sarjana	130	236	Tidak Ada
22	11121022	ILMU EKONOMI & STUDI PEMBANGUNAN	Sarjana	84	76	Tidak Ada
23	11121023	ADMINISTRASI PUBLIK	Sarjana	108	220	Tidak Ada
24	11121024	SOSIOLOGI	Sarjana	80	101	Tidak Ada
25	11121025	ILMU POLITIK	Sarjana	80	54	Tidak Ada
26	11121026	ANTROPOLOGI	Sarjana	40	30	Tidak Ada
27	11121027	ILMU KOMUNIKASI	Sarjana	112	266	Tidak Ada
28	11121028	HUKUM	Sarjana	200	385	Tidak Ada
29	11121029	EKONOMI SYARIAH	Sarjana	88	105	Tidak Ada
30	11121030	PSIKOLOGI	Sarjana	72	382	Tidak Ada
31	11121031	PENDIDIKAN BAHASA INDONESIA	Sarjana	78	258	Tidak Ada
32	11121032	ADMINISTRASI BISNIS	Sarjana	60	210	Tidak Ada
33	11121033	KEWIRUSAHAAN	Sarjana	54	72	Tidak Ada
34	11121036	PENDIDIKAN ILMU PENGETAHUAN ALAM	Sarjana	24		Tidak Ada
35	11121037	PENDIDIKAN VOKASIONAL REKAYASA ELEKTRO	Sarjana	24		Tidak Ada
36	11121038	BIOTEKNOLOGI	Sarjana	36		Tidak Ada
37	11121039	PERENCANAAN WILAYAH DAN KOTA	Sarjana	24		Tidak Ada
38	11121040	TEKNIK LINGKUNGAN	Sarjana	24		Tidak Ada
39	11123034	KEPERAWATAN	Diploma Tiga	46	953	Tidak Ada
`;

// Helper
const capitalize = (str) => {
    return str.replace('&', 'Dan').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
};

const getRandomScore = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const determineCategory = (majorName) => {
    const nameStr = majorName.toLowerCase();
    const saintekKeywords = [
        'teknik', 'informatika', 'sistem informasi', 'kedokteran', 'keperawatan', 
        'kesehatan', 'gizi', 'farmasi', 'fisioterapi', 'sains', 'biologi', 'akuakultur',
        'hewan', 'fisika', 'kimia', 'matematika', 'arsitektur', 'agroekoteknologi',
        'pertanian', 'kelautan', 'perikanan', 'geofisika', 'statistika', 'kehutanan', 'alam', 'bioteknologi', 'logistik'
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
                const name = capitalize(parts[2].trim());
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
        console.log("Looking up Universitas Malikussaleh...");
        let unimal = await prisma.university.findFirst({
            where: {
                name: { contains: "Malikussaleh", mode: "insensitive" }
            }
        });

        if (!unimal) {
            console.log("UNIMAL not found in DB! Exiting...");
            return;
        }

        console.log(`Found University: ${unimal.name} (ID: ${unimal.id})`);

        const parsedData = parseData();
        console.log(`Parsed ${parsedData.length} records to process.`);

        const activeYear = 2024;
        let updateCount = 0;
        let newCount = 0;

        for (const data of parsedData) {
            let existingMajor = await prisma.major.findFirst({
                where: {
                    universityId: unimal.id,
                    name: { equals: data.name, mode: "insensitive" },
                    degree: data.degree
                }
            });

            if (!existingMajor) {
                console.log(`[NEW] Creating major: ${data.degree} ${data.name}`);
                const category = determineCategory(data.name);
                
                existingMajor = await prisma.major.create({
                    data: {
                        universityId: unimal.id,
                        name: data.name,
                        category: category,
                        accreditation: "Baik Sekali", // Safe default
                        degree: data.degree,
                        estimatedUkt: 3500000
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
