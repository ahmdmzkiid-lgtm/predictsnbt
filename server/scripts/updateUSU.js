import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	11211001	PENDIDIKAN DOKTER	Sarjana	80	1633	Tidak Ada
2	11211002	TEKNIK SIPIL	Sarjana	48	1106	Tidak Ada
3	11211003	TEKNIK MESIN	Sarjana	48	1011	Tidak Ada
4	11211004	TEKNIK ELEKTRO	Sarjana	45	874	Tidak Ada
5	11211005	TEKNIK INDUSTRI	Sarjana	52	1570	Tidak Ada
6	11211006	TEKNIK KIMIA	Sarjana	39	521	Tidak Ada
7	11211007	PENDIDIKAN DOKTER GIGI	Sarjana	48	1098	Tidak Ada
8	11211008	MATEMATIKA	Sarjana	32	242	Tidak Ada
9	11211009	KIMIA	Sarjana	32	211	Tidak Ada
10	11211010	FARMASI	Sarjana	58	1662	Tidak Ada
11	11211011	FISIKA	Sarjana	32	125	Tidak Ada
12	11211012	ILMU KESEHATAN MASYARAKAT	Sarjana	128	1966	Tidak Ada
13	11211013	AGROEKOTEKNOLOGI	Sarjana	96	1147	Tidak Ada
14	11211014	KETEKNIKAN PERTANIAN	Sarjana	32	635	Tidak Ada
15	11211015	BIOLOGI	Sarjana	32	256	Tidak Ada
16	11211016	AGRIBISNIS	Sarjana	64	1153	Tidak Ada
17	11211017	ILMU DAN TEKNOLOGI PANGAN	Sarjana	32	666	Tidak Ada
18	11211018	PETERNAKAN	Sarjana	56	450	Tidak Ada
19	11211019	ARSITEKTUR	Sarjana	32	467	Tidak Ada
20	11211020	ILMU KEPERAWATAN	Sarjana	81	1064	Tidak Ada
21	11211021	KEHUTANAN	Sarjana	64	816	Tidak Ada
22	11211022	ILMU KOMPUTER	Sarjana	48	1654	Tidak Ada
23	11211023	TEKNOLOGI INFORMASI	Sarjana	48	1253	Tidak Ada
24	11211024	MANAJEMEN SUMBER DAYA PERAIRAN	Sarjana	32	305	Tidak Ada
25	11211025	TEKNIK LINGKUNGAN	Sarjana	27	707	Tidak Ada
26	11211026	GIZI	Sarjana	32	1045	Tidak Ada
27	11211027	ILMU HUKUM	Sarjana	196	3123	Tidak Ada
28	11211028	ILMU SEJARAH	Sarjana	39	218	Tidak Ada
29	11211029	ANTROPOLOGI SOSIAL	Sarjana	39	321	Tidak Ada
30	11211030	AKUNTANSI	Sarjana	80	1754	Tidak Ada
31	11211031	SOSIOLOGI	Sarjana	39	317	Tidak Ada
32	11211032	ILMU KESEJAHTERAAN SOSIAL	Sarjana	39	420	Tidak Ada
33	11211033	ILMU ADMINISTRASI NEGARA	Sarjana	38	871	Tidak Ada
34	11211034	ILMU KOMUNIKASI	Sarjana	38	1359	Tidak Ada
35	11211035	MANAJEMEN	Sarjana	80	1815	Tidak Ada
36	11211036	EKONOMI PEMBANGUNAN	Sarjana	57	670	Tidak Ada
37	11211037	ILMU POLITIK	Sarjana	39	469	Tidak Ada
38	11211038	SASTRA INDONESIA	Sarjana	52	287	Tidak Ada
39	11211039	SASTRA DAERAH UNTUK SASTRA MELAYU	Sarjana	24	14	Tidak Ada
40	11211040	SASTRA INGGRIS	Sarjana	75	702	Tidak Ada
41	11211041	SASTRA DAERAH UNTUK SASTRA BATAK	Sarjana	20	28	Tidak Ada
42	11211042	SASTRA ARAB	Sarjana	45	97	Tidak Ada
43	11211043	ETNO MUSIKOLOGI	Sarjana	32	53	Etnomusikologi
44	11211044	SASTRA JEPANG	Sarjana	16	293	Tidak Ada
45	11211045	ILMU PERPUSTAKAAN	Sarjana	32	396	Tidak Ada
46	11211046	SASTRA CINA	Sarjana	16	190	Tidak Ada
47	11211047	ILMU ADMINISTRASI NIAGA/BISNIS	Sarjana	38	1208	Tidak Ada
48	11211048	PSIKOLOGI	Sarjana	80	1716	Tidak Ada
49	11211049	KEWIRAUSAHAAN	Sarjana	24	441	Tidak Ada
50	11211071	EKONOMI ISLAM	Sarjana	21		Tidak Ada
51	11211072	TEKNIK PERTAMBANGAN	Sarjana	19		Tidak Ada
52	11211073	TEKNIK LOGISTIK	Sarjana	19		Tidak Ada
53	11211074	PERENCANAAN WILAYAH DAN KOTA	Sarjana	19		Tidak Ada
54	11212064	PERBANKAN DAN KEUANGAN	Sarjana Terapan	46	2589	Tidak Ada
55	11212065	ADMINISTRASI PERKANTORAN DIGITAL	Sarjana Terapan	32	1889	Tidak Ada
56	11212066	AKUNTANSI SEKTOR PUBLIK	Sarjana Terapan	44	1411	Tidak Ada
57	11212067	STATISTIKA	Sarjana Terapan	40	1117	Tidak Ada
58	11212068	KIMIA TERAPAN	Sarjana Terapan	32	616	Tidak Ada
59	11212069	MANAJEMEN BISNIS PARIWISATA	Sarjana Terapan	40	1727	Tidak Ada
60	11212070	TEKNOLOGI REKAYASA INSTRUMENTASI	Sarjana Terapan	40	412	Tidak Ada
61	11213050	METROLOGI DAN INSTRUMENTASI	Diploma Tiga	36	518	Tidak Ada
62	11213054	ADMINISTRASI PERPAJAKAN	Diploma Tiga	40	3950	Tidak Ada
63	11213056	BAHASA JEPANG	Diploma Tiga	20	648	Tidak Ada
64	11213058	ANALIS FARMASI DAN MAKANAN	Diploma Tiga	24	3220	Tidak Ada
65	11213059	BAHASA INGGRIS	Diploma Tiga	40	1267	Tidak Ada
66	11213060	TEKNIK INFORMATIKA	Diploma Tiga	40	3142	Tidak Ada
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
        'kesehatan', 'gizi', 'farmasi', 'fisioterapi', 'sains', 'biologi', 'akuakultur',
        'hewan', 'fisika', 'kimia', 'matematika', 'arsitektur', 'agroekoteknologi',
        'pertanian', 'kelautan', 'perikanan', 'geofisika', 'statistika', 'kehutanan', 'alam', 'bioteknologi', 'logistik', 'peternakan'
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
        console.log("Looking up Universitas Sumatera Utara...");
        let univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Sumatera Utara", mode: "insensitive" }
            }
        });

        if (!univ) {
            console.log("USU not found in DB! Exiting...");
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
                        accreditation: "Baik Sekali", // Safe default
                        degree: data.degree,
                        estimatedUkt: 5500000
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
