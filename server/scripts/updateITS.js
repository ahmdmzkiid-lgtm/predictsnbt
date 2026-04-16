import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	13821001	FISIKA	Sarjana	68	193	Tidak Ada
2	13821002	MATEMATIKA	Sarjana	80	284	Tidak Ada
3	13821003	STATISTIKA	Sarjana	60	525	Tidak Ada
4	13821004	KIMIA	Sarjana	80	383	Tidak Ada
5	13821005	BIOLOGI	Sarjana	48	262	Tidak Ada
6	13821006	TEKNIK MESIN	Sarjana	60	1506	Tidak Ada
7	13821007	TEKNIK ELEKTRO	Sarjana	72	1488	Tidak Ada
8	13821008	TEKNIK KIMIA	Sarjana	60	886	Tidak Ada
9	13821009	TEKNIK FISIKA	Sarjana	80	486	Tidak Ada
10	13821010	TEKNIK INDUSTRI	Sarjana	60	1515	Tidak Ada
11	13821011	TEKNIK MATERIAL	Sarjana	60	932	Tidak Ada
12	13821012	TEKNIK SIPIL	Sarjana	59	1350	Tidak Ada
13	13821013	ARSITEKTUR	Sarjana	36	678	Tidak Ada
14	13821014	TEKNIK LINGKUNGAN	Sarjana	39	816	Tidak Ada
15	13821015	TEKNIK GEOMATIKA	Sarjana	39	463	Tidak Ada
16	13821016	PERENCANAAN WILAYAH DAN KOTA	Sarjana	51	610	Tidak Ada
17	13821017	TEKNIK PERKAPALAN	Sarjana	54	733	Tidak Ada
18	13821018	TEKNIK KELAUTAN	Sarjana	54	626	Tidak Ada
19	13821019	TEKNIK SISTEM PERKAPALAN	Sarjana	63	612	Tidak Ada
20	13821020	TEKNIK INFORMATIKA	Sarjana	84	2253	Tidak Ada
21	13821021	SISTEM INFORMASI	Sarjana	63	1090	Tidak Ada
22	13821022	DESAIN PRODUK INDUSTRI	Sarjana	48	290	Seni Rupa, Desain, dan Kriya
23	13821023	TEKNIK TRANSPORTASI LAUT	Sarjana	36	319	Tidak Ada
24	13821024	TEKNIK SISTEM PERKAPALAN (GELAR GANDA ITS-JERMAN)	Sarjana	27	227	Tidak Ada
25	13821025	TEKNIK KOMPUTER	Sarjana	42	671	Tidak Ada
26	13821027	TEKNIK GEOFISIKA	Sarjana	30	446	Tidak Ada
27	13821028	DESAIN INTERIOR	Sarjana	36	240	Seni Rupa, Desain, dan Kriya
28	13821029	TEKNIK BIOMEDIK	Sarjana	36	544	Tidak Ada
29	13821030	SAINS AKTUARIA	Sarjana	36	335	Tidak Ada
30	13821031	TEKNOLOGI INFORMASI	Sarjana	50	622	Tidak Ada
31	13821032	DESAIN KOMUNIKASI VISUAL	Sarjana	48	665	Seni Rupa, Desain, dan Kriya
32	13821041	TEKNIK LEPAS PANTAI	Sarjana	36	712	Tidak Ada
33	13821042	TEKNIK PANGAN	Sarjana	24	431	Tidak Ada
34	13821043	MANAJEMEN BISNIS	Sarjana	36	938	Tidak Ada
35	13821044	STUDI PEMBANGUNAN	Sarjana	54	374	Tidak Ada
36	13821045	TEKNIK TELEKOMUNIKASI	Sarjana	24	298	Tidak Ada
37	13821046	TEKNOLOGI KEDOKTERAN	Sarjana	36	497	Tidak Ada
38	13821047	SAINS ANALITIK DAN INSTRUMENTASI KIMIA	Sarjana	24	167	Tidak Ada
39	13821048	KEDOKTERAN	Sarjana	15	546	Tidak Ada
40	13821049	SAINS DATA	Sarjana	15	256	Tidak Ada
41	13821050	INOVASI DIGITAL	Sarjana	15	242	Tidak Ada
42	13821051	REKAYASA KECERDASAN ARTIFISIAL	Sarjana	18	552	Tidak Ada
43	13821052	REKAYASA PERANGKAT LUNAK	Sarjana	18	324	Tidak Ada
44	13821053	BISNIS DIGITAL	Sarjana	18	783	Tidak Ada
45	13821054	REKAYASA KESELAMATAN PROSES	Sarjana	15	346	Tidak Ada
46	13821056	SAINS KOMUNIKASI	Sarjana	18	149	Tidak Ada
47	13821057	BIOTEKNOLOGI	Sarjana	16	231	Tidak Ada
48	13821058	TEKNIK PERTAMBANGAN	Sarjana	15		Tidak Ada
49	13822033	TEKNIK SIPIL	Sarjana Terapan	42	2432	Tidak Ada
50	13822034	TEKNOLOGI REKAYASA KONSTRUKSI BANGUNAN AIR	Sarjana Terapan	42	473	Tidak Ada
51	13822035	TEKNOLOGI REKAYASA MANUFAKTUR	Sarjana Terapan	42	658	Tidak Ada
52	13822036	TEKNOLOGI REKAYASA KONVERSI ENERGI	Sarjana Terapan	42	793	Tidak Ada
53	13822037	TEKNOLOGI REKAYASA OTOMASI	Sarjana Terapan	56	729	Tidak Ada
54	13822038	TEKNOLOGI REKAYASA KIMIA INDUSTRI	Sarjana Terapan	56	1384	Tidak Ada
55	13822039	TEKNOLOGI REKAYASA INSTRUMENTASI	Sarjana Terapan	56	680	Tidak Ada
56	13822040	STATISTIKA BISNIS	Sarjana Terapan	56	1396	Tidak Ada
57	13822055	ANALITIKA LOGISTIK TERAPAN	Sarjana Terapan	16	291	Tidak Ada
`;

const capitalize = (str) => {
    return str.replace('&', 'Dan').replace('TEK.', 'Teknik').replace('SIST', 'Sistem').replace('GLR', 'Gelar').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
};

const getRandomScore = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const determineCategory = (majorName) => {
    const nameStr = majorName.toLowerCase();
    const saintekKeywords = [
        'teknik', 'informatika', 'teknologi', 'komputer', 'kedokteran', 'keperawatan', 'kesehatan',
        'gizi', 'farmasi', 'biologi', 'fisika', 'kimia', 'matematika', 'arsitektur', 'agroteknologi',
        'agroekoteknologi', 'pertanian', 'kelautan', 'peternakan', 'akuakultur', 'mesin', 'elektro',
        'sipil', 'pangan', 'statistika', 'lingkungan', 'sains', 'olahraga', 'geofisika', 'robotika',
        'artifisial', 'perangkat lunak', 'bio', 'aktuaria', 'geomatika', 'transportasi', 'perkapalan',
        'lepas pantai', 'instrumentasi', 'rekayasa', 'manufaktur', 'energi', 'otomasi'
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
        console.log("Looking up Institut Teknologi Sepuluh Nopember...");
        let univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Sepuluh Nopember", mode: "insensitive" }
            }
        });

        if (!univ) {
            console.log("ITS not found in DB! Exiting...");
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
                        estimatedUkt: 8500000
                    }
                });
                newCount++;
            }

            let actualApplicants = data.applicants;
            if (actualApplicants === 0 || isNaN(actualApplicants)) {
                actualApplicants = Math.floor(data.capacity * (Math.random() * 9 + 4));
            }

            const dummyScore = getRandomScore(550, 720); // ITS has very high passing grades
            const tps = getRandomScore(530, dummyScore + 40);
            const litBi = getRandomScore(530, dummyScore + 40);
            const litBing = getRandomScore(530, dummyScore + 40);
            const pm = getRandomScore(530, dummyScore + 40);

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
