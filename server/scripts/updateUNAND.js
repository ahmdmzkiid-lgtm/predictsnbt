import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	11411001	AGRIBISNIS	Sarjana	80	668	Tidak Ada
2	11411002	AGROTEKNOLOGI	Sarjana	100	625	Tidak Ada
3	11411003	KEDOKTERAN	Sarjana	88	2074	Tidak Ada
4	11411004	KEPERAWATAN	Sarjana	63	1183	Tidak Ada
5	11411005	KESEHATAN MASYARAKAT	Sarjana	75	1445	Tidak Ada
6	11411006	KEDOKTERAN GIGI	Sarjana	30	1065	Tidak Ada
7	11411007	KIMIA	Sarjana	50	226	Tidak Ada
8	11411008	BIOLOGI	Sarjana	50	204	Tidak Ada
9	11411009	MATEMATIKA	Sarjana	50	126	Tidak Ada
10	11411010	FISIKA	Sarjana	50	80	Tidak Ada
11	11411011	TEKNIK KOMPUTER	Sarjana	50	662	Tidak Ada
12	11411012	PETERNAKAN	Sarjana	160	522	Tidak Ada
13	11411013	TEKNIK MESIN	Sarjana	60	884	Tidak Ada
14	11411014	TEKNIK SIPIL	Sarjana	70	1045	Tidak Ada
15	11411015	TEKNIK INDUSTRI	Sarjana	50	1372	Tidak Ada
16	11411016	TEKNIK LINGKUNGAN	Sarjana	64	899	Tidak Ada
17	11411017	TEKNIK ELEKTRO	Sarjana	70	815	Tidak Ada
18	11411018	FARMASI	Sarjana	70	2024	Tidak Ada
19	11411019	TEKNIK PERTANIAN DAN BIOSISTEM	Sarjana	56	341	Tidak Ada
20	11411020	TEKNOLOGI PANGAN DAN HASIL PERTANIAN	Sarjana	49	463	Tidak Ada
21	11411021	SISTEM INFORMASI	Sarjana	48	989	Tidak Ada
22	11411022	PSIKOLOGI	Sarjana	52	888	Tidak Ada
23	11411023	ILMU TANAH	Sarjana	55	215	Tidak Ada
24	11411024	AGROEKOTEKNOLOGI	Sarjana	50	179	Tidak Ada
25	11411025	PETERNAKAN ( KAMPUS II PAYAKUMBUH)	Sarjana	55	131	Tidak Ada
26	11411026	KEBIDANAN	Sarjana	35	551	Tidak Ada
27	11411027	GIZI	Sarjana	52	1027	Tidak Ada
28	11411028	PROTEKSI TANAMAN	Sarjana	75	175	Tidak Ada
29	11411029	PENYULUHAN PERTANIAN	Sarjana	22	132	Tidak Ada
30	11411030	TEKNOLOGI INDUSTRI PERTANIAN	Sarjana	40	263	Tidak Ada
31	11411031	ILMU BIOMEDIS	Sarjana	20	535	Tidak Ada
32	11411032	EKONOMI	Sarjana	65	489	Tidak Ada
33	11411033	HUKUM	Sarjana	224	2248	Tidak Ada
34	11411034	SEJARAH	Sarjana	50	129	Tidak Ada
35	11411035	SOSIOLOGI	Sarjana	45	262	Tidak Ada
36	11411036	ANTROPOLOGI SOSIAL	Sarjana	40	199	Tidak Ada
37	11411037	MANAJEMEN	Sarjana	90	1329	Tidak Ada
38	11411038	AKUNTANSI	Sarjana	90	1168	Tidak Ada
39	11411039	ILMU POLITIK	Sarjana	45	266	Tidak Ada
40	11411040	ADMINISTRASI PUBLIK	Sarjana	47	866	Tidak Ada
41	11411041	SASTRA INDONESIA	Sarjana	48	137	Tidak Ada
42	11411042	SASTRA INGGRIS	Sarjana	60	326	Tidak Ada
43	11411043	SASTRA MINANGKABAU	Sarjana	45	65	Tidak Ada
44	11411044	SASTRA JEPANG	Sarjana	45	229	Tidak Ada
45	11411045	HUBUNGAN INTERNASIONAL	Sarjana	45	453	Tidak Ada
46	11411046	ILMU KOMUNIKASI	Sarjana	60	963	Tidak Ada
47	11411047	MANAJEMEN (KAMPUS 2 PAYAKUMBUH)	Sarjana	47	225	Tidak Ada
48	11411048	EKONOMI PEMBANGUNAN (KAMPUS PAYAKUMBUH)	Sarjana	41	160	Tidak Ada
49	11411053	INFORMATIKA	Sarjana	38	819	Tidak Ada
50	11411054	ARSITEKTUR	Sarjana	14	252	Tidak Ada
51	11411055	EKONOMI ISLAM	Sarjana	20	128	Tidak Ada
52	11411056	KEWIRAUSAHAAN	Sarjana	20	290	Tidak Ada
53	11411057	STATISTIKA DAN SAINS DATA	Sarjana	20	204	Tidak Ada
54	11411058	ARKEOLOGI	Sarjana	30		Tidak Ada
55	11411059	NUTRISI DAN TEKNOLOGI PAKAN TERNAK	Sarjana	20		Tidak Ada
56	11413049	AKUNTANSI	Diploma Tiga	47	1703	Tidak Ada
57	11413050	ADMINISTRASI PERKANTORAN	Diploma Tiga	25	2252	Tidak Ada
58	11413051	PERBANKAN DAN KEUANGAN	Diploma Tiga	45	1801	Tidak Ada
59	11413052	MANAJEMEN PEMASARAN	Diploma Tiga	33	1214	Tidak Ada
`;

// Helper
const capitalize = (str) => {
    return str.replace('&', 'Dan').replace('/', ' / ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ').replace(' / ', '/');
};

const getRandomScore = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const determineCategory = (majorName) => {
    const nameStr = majorName.toLowerCase();
    const saintekKeywords = [
        'teknik', 'keteknikan', 'informatika', 'informasi', 'komputer', 'kedokteran', 'keperawatan', 
        'kesehatan', 'gizi', 'farmasi', 'fisioterapi', 'sains', 'biologi', 'akuakultur', 'kebidanan', 'biomedis',
        'hewan', 'fisika', 'kimia', 'matematika', 'arsitektur', 'agroekoteknologi', 'agroteknologi',
        'pertanian', 'kelautan', 'perikanan', 'geofisika', 'statistika', 'kehutanan', 'alam', 'bioteknologi', 'logistik', 'peternakan',
        'mesin', 'bangunan', 'elektro', 'otomotif', 'ipa', 'olahraga', 'tata boga', 'tata busana', 'tata rias', 'nutrisi', 'pakan'
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
        console.log("Looking up Universitas Andalas...");
        let univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Andalas", mode: "insensitive" }
            }
        });

        if (!univ) {
            console.log("UNAND not found in DB! Exiting...");
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
                        estimatedUkt: 4000000
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
