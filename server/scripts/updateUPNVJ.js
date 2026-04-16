import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	13241001	TEKNIK MESIN	Sarjana	70	1000	Tidak Ada
2	13241002	TEKNIK PERKAPALAN	Sarjana	35	658	Tidak Ada
3	13241003	TEKNIK INDUSTRI	Sarjana	70	1744	Tidak Ada
4	13241004	INFORMATIKA	Sarjana	105	1442	Tidak Ada
5	13241005	SISTEM INFORMASI	Sarjana	105	1844	Tidak Ada
6	13241006	KEDOKTERAN	Sarjana	103	2138	Tidak Ada
7	13241007	KEPERAWATAN	Sarjana	70	1407	Tidak Ada
8	13241008	KESEHATAN MASYARAKAT	Sarjana	105	2063	Tidak Ada
9	13241009	GIZI	Sarjana	70	1165	Tidak Ada
10	13241010	TEKNIK ELEKTRO	Sarjana	60	761	Tidak Ada
11	13241011	FARMASI	Sarjana	30	1126	Tidak Ada
12	13241012	FISIOTERAPI	Sarjana	35	880	Tidak Ada
13	13241013	MANAJEMEN	Sarjana	160	2386	Tidak Ada
14	13241014	AKUNTANSI	Sarjana	160	2254	Tidak Ada
15	13241015	HUBUNGAN INTERNASIONAL	Sarjana	120	1264	Tidak Ada
16	13241016	ILMU KOMUNIKASI	Sarjana	180	3832	Tidak Ada
17	13241017	HUKUM	Sarjana	240	2762	Tidak Ada
18	13241018	EKONOMI PEMBANGUNAN	Sarjana	60	1085	Tidak Ada
19	13241019	EKONOMI SYARIAH	Sarjana	60	760	Tidak Ada
20	13241020	ILMU POLITIK	Sarjana	100	928	Tidak Ada
21	13241028	SAINS INFORMASI	Sarjana	60	651	Tidak Ada
22	13241029	KAJIAN FILM, TELEVISI, DAN MEDIA	Sarjana	20	974	Tidak Ada
23	13241030	SAINS DATA	Sarjana	18	334	Tidak Ada
24	13241031	BIOLOGI	Sarjana	15		Tidak Ada
25	13241032	HUKUM BISNIS	Sarjana	40		Tidak Ada
26	13243021	KEPERAWATAN	Diploma Tiga	35	3162	Tidak Ada
27	13243022	FISIOTERAPI	Diploma Tiga	35	3007	Tidak Ada
28	13243024	SISTEM INFORMASI	Diploma Tiga	70	3829	Tidak Ada
29	13243025	PERBANKAN DAN KEUANGAN	Diploma Tiga	60	2578	Tidak Ada
30	13243026	AKUNTANSI	Diploma Tiga	60	2606	Tidak Ada
`;

// Helper
const capitalize = (str) => {
    return str.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
};

const getRandomScore = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const determineCategory = (majorName) => {
    const nameStr = majorName.toLowerCase();
    const saintekKeywords = [
        'teknik', 'informatika', 'sistem informasi', 'kedokteran', 'keperawatan', 
        'kesehatan', 'gizi', 'farmasi', 'fisioterapi', 'sains', 'biologi'
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
            if (parts.length >= 5) { // Needs at least up to Daya Tampung
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
        console.log("Looking up UPN Veteran Jakarta...");
        let upn = await prisma.university.findFirst({
            where: {
                name: { contains: "Pembangunan Nasional", mode: "insensitive" },
                AND: { name: { contains: "Jakarta", mode: "insensitive" } }
            }
        });

        if (!upn) {
            console.log("Not found with full name, trying 'UPN' and 'Jakarta'");
            upn = await prisma.university.findFirst({
                where: {
                    name: { contains: "UPN", mode: "insensitive" },
                    AND: { name: { contains: "Jakarta", mode: "insensitive" } }
                }
            });
        }
        
        if (!upn) {
            // Try one more pattern
            upn = await prisma.university.findFirst({
                where: {
                    name: { contains: "Veteran Jakarta", mode: "insensitive" }
                }
            });
        }

        if (!upn) {
            console.log("UPNVJ not found in DB! Exiting...");
            return;
        }

        console.log(`Found University: ${upn.name} (ID: ${upn.id})`);

        const parsedData = parseData();
        console.log(`Parsed ${parsedData.length} records to process.`);

        const activeYear = 2024;
        let updateCount = 0;
        let newCount = 0;

        for (const data of parsedData) {
            let existingMajor = await prisma.major.findFirst({
                where: {
                    universityId: upn.id,
                    name: { equals: data.name, mode: "insensitive" },
                    degree: data.degree
                }
            });

            if (!existingMajor) {
                console.log(`[NEW] Creating major: ${data.degree} ${data.name}`);
                const category = determineCategory(data.name);
                
                existingMajor = await prisma.major.create({
                    data: {
                        universityId: upn.id,
                        name: data.name,
                        category: category,
                        accreditation: "Baik Sekali", // Safe default
                        degree: data.degree,
                        estimatedUkt: 6000000
                    }
                });
                newCount++;
            }

            // Upsert statistic
            // If new, generate random score
            const dummyScore = getRandomScore(550, 680);
            const tps = getRandomScore(530, dummyScore + 40);
            const litBi = getRandomScore(530, dummyScore + 40);
            const litBing = getRandomScore(530, dummyScore + 40);
            const pm = getRandomScore(530, dummyScore + 40);
            
            // For applicants that were empty (Biologi, Hukum Bisnis)
            let actualApplicants = data.applicants;
            if (actualApplicants === 0 || isNaN(actualApplicants)) {
                actualApplicants = Math.floor(data.capacity * (Math.random() * 10 + 5)); // 5-15x capacity
            }

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
