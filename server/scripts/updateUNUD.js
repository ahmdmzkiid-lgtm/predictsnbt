import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	16111001	KEDOKTERAN	Sarjana	130	2092	Tidak Ada
2	16111002	KEDOKTERAN HEWAN	Sarjana	90	590	Tidak Ada
3	16111003	ARSITEKTUR	Sarjana	80	434	Tidak Ada
4	16111004	TEKNIK SIPIL	Sarjana	105	575	Tidak Ada
5	16111005	TEKNOLOGI PANGAN	Sarjana	44	306	Tidak Ada
6	16111006	TEKNOLOGI INDUSTRI PERTANIAN	Sarjana	40	96	Tidak Ada
7	16111007	TEKNIK PERTANIAN DAN BIOSISTEM	Sarjana	32	131	Tidak Ada
8	16111008	BIOLOGI	Sarjana	28	72	Tidak Ada
9	16111009	KIMIA	Sarjana	28	77	Tidak Ada
10	16111010	FISIKA	Sarjana	40	52	Tidak Ada
11	16111011	TEKNIK MESIN	Sarjana	72	282	Tidak Ada
12	16111012	TEKNIK ELEKTRO	Sarjana	64	279	Tidak Ada
13	16111013	AGRIBISNIS	Sarjana	105	284	Tidak Ada
14	16111014	AGROEKOTEKNOLOGI	Sarjana	95	214	Tidak Ada
15	16111015	PETERNAKAN	Sarjana	80	151	Tidak Ada
16	16111016	MATEMATIKA	Sarjana	36	74	Tidak Ada
17	16111017	ILMU KESEHATAN MASYARAKAT	Sarjana	72	662	Tidak Ada
18	16111018	FARMASI	Sarjana	57	920	Tidak Ada
19	16111019	KEPERAWATAN	Sarjana	48	592	Tidak Ada
20	16111020	INFORMATIKA	Sarjana	76	615	Tidak Ada
21	16111021	TEKNOLOGI INFORMASI	Sarjana	97	599	Tidak Ada
22	16111022	FISIOTERAPI	Sarjana	32	459	Tidak Ada
23	16111023	ILMU KELAUTAN	Sarjana	60	134	Tidak Ada
24	16111024	ARSITEKTUR LANSKAP	Sarjana	20	63	Tidak Ada
25	16111025	MANAJEMEN SUMBER DAYA PERAIRAN	Sarjana	60	91	Tidak Ada
26	16111026	KEDOKTERAN GIGI	Sarjana	48	882	Tidak Ada
27	16111027	TEKNIK LINGKUNGAN	Sarjana	60	295	Tidak Ada
28	16111028	TEKNIK INDUSTRI	Sarjana	60	423	Tidak Ada
29	16111029	ARKEOLOGI	Sarjana	24	90	Tidak Ada
30	16111030	ANTROPOLOGI BUDAYA	Sarjana	24	82	Tidak Ada
31	16111031	ILMU SEJARAH	Sarjana	24	50	Tidak Ada
32	16111032	ILMU HUKUM	Sarjana	297	1524	Tidak Ada
33	16111033	EKONOMI	Sarjana	150	414	Tidak Ada
34	16111034	AKUNTANSI	Sarjana	200	1041	Tidak Ada
35	16111035	MANAJEMEN	Sarjana	213	1389	Tidak Ada
36	16111036	SASTRA INDONESIA	Sarjana	28	71	Tidak Ada
37	16111037	SASTRA INGGRIS	Sarjana	105	451	Tidak Ada
38	16111038	SASTRA JAWA KUNO	Sarjana	10	20	Tidak Ada
39	16111039	SASTRA BALI	Sarjana	16	10	Tidak Ada
40	16111040	SASTRA JEPANG	Sarjana	40	143	Tidak Ada
41	16111042	PARIWISATA	Sarjana	90	1041	Tidak Ada
42	16111043	INDUSTRI PERJALANAN WISATA	Sarjana	60	227	Tidak Ada
43	16111044	HUBUNGAN INTERNASIONAL	Sarjana	48	517	Tidak Ada
44	16111045	SOSIOLOGI	Sarjana	48	154	Tidak Ada
45	16111046	PSIKOLOGI	Sarjana	67	910	Tidak Ada
46	16111047	ADMINISTRASI PUBLIK	Sarjana	49	418	Tidak Ada
47	16111048	ILMU KOMUNIKASI	Sarjana	49	689	Tidak Ada
48	16111049	ILMU POLITIK	Sarjana	48	182	Tidak Ada
49	16111053	AKUAKULTUR	Sarjana	35	16	Tidak Ada
50	16111054	PERPUSTAKAAN DAN SAINS INFORMASI	Sarjana	16	0	Tidak Ada
51	16112041	PENGELOLAAN PERHOTELAN	Sarjana Terapan	60	811	Tidak Ada
52	16113050	PERPUSTAKAAN	Diploma Tiga	13	259	Tidak Ada
53	16113051	PERPAJAKAN	Diploma Tiga	28	1104	Tidak Ada
54	16113052	AKUNTANSI	Diploma Tiga	28	775	Tidak Ada
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
        'artifisial', 'perangkat lunak', 'bio', 'aktuaria', 'geomatika', 'transportasi', 'perkapalan',
        'lepas pantai', 'instrumentasi', 'rekayasa', 'manufaktur', 'energi', 'otomasi', 'fisioterapi',
        'perairan', 'biosistem'
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
        console.log("Looking up Universitas Udayana...");
        let univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Udayana", mode: "insensitive" }
            }
        });

        if (!univ) {
            console.log("UNUD not found in DB! Exiting...");
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
