import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	13811001	KEDOKTERAN	Sarjana	90	3138	Tidak Ada
2	13811002	KEDOKTERAN GIGI	Sarjana	75	1666	Tidak Ada
3	13811003	FARMASI	Sarjana	84	1999	Tidak Ada
4	13811004	KEDOKTERAN HEWAN	Sarjana	72	803	Tidak Ada
5	13811005	MATEMATIKA	Sarjana	30	219	Tidak Ada
6	13811006	BIOLOGI	Sarjana	27	263	Tidak Ada
7	13811007	FISIKA	Sarjana	24	143	Tidak Ada
8	13811008	KIMIA	Sarjana	27	292	Tidak Ada
9	13811009	KESEHATAN MASYARAKAT	Sarjana	72	1327	Tidak Ada
10	13811010	KEPERAWATAN	Sarjana	72	1336	Tidak Ada
11	13811011	AKUAKULTUR	Sarjana	48	318	Tidak Ada
12	13811012	KEBIDANAN	Sarjana	30	432	Tidak Ada
13	13811013	TEKNIK BIOMEDIS	Sarjana	27	692	Tidak Ada
14	13811014	TEKNIK LINGKUNGAN	Sarjana	33	626	Tidak Ada
15	13811015	SISTEM INFORMASI	Sarjana	36	763	Tidak Ada
16	13811016	STATISTIKA	Sarjana	36	331	Tidak Ada
17	13811017	GIZI	Sarjana	48	934	Tidak Ada
18	13811018	KEDOKTERAN HEWAN (FIKKIA BANYUWANGI)	Sarjana	30	380	Tidak Ada
19	13811019	KESEHATAN MASYARAKAT (FIKKIA BANYUWANGI)	Sarjana	30	445	Tidak Ada
20	13811020	AKUAKULTUR (FIKKIA BANYUWANGI)	Sarjana	30	115	Tidak Ada
21	13811021	TEKNOLOGI HASIL PERIKANAN	Sarjana	42	265	Tidak Ada
22	13811022	TEKNIK INDUSTRI	Sarjana	36	840	Tidak Ada
23	13811023	TEKNIK ELEKTRO	Sarjana	30	522	Tidak Ada
24	13811024	REKAYASA NANOTEKNOLOGI	Sarjana	30	266	Tidak Ada
25	13811025	TEKNOLOGI SAINS DATA	Sarjana	36	442	Tidak Ada
26	13811026	TEKNIK ROBOTIKA DAN KECERDASAN BUATAN	Sarjana	30	583	Tidak Ada
27	13811027	ILMU HUKUM	Sarjana	116	2418	Tidak Ada
28	13811028	ADMINISTRASI PUBLIK	Sarjana	42	826	Tidak Ada
29	13811029	PSIKOLOGI	Sarjana	81	2349	Tidak Ada
30	13811030	SOSIOLOGI	Sarjana	39	431	Tidak Ada
31	13811031	ILMU POLITIK	Sarjana	33	510	Tidak Ada
32	13811032	ILMU HUBUNGAN INTERNASIONAL	Sarjana	45	892	Tidak Ada
33	13811033	ANTROPOLOGI	Sarjana	30	400	Tidak Ada
34	13811034	ILMU EKONOMI	Sarjana	66	808	Tidak Ada
35	13811035	MANAJEMEN	Sarjana	84	1782	Tidak Ada
36	13811036	AKUNTANSI	Sarjana	80	1543	Tidak Ada
37	13811037	ILMU KOMUNIKASI	Sarjana	45	1205	Tidak Ada
38	13811038	ILMU SEJARAH	Sarjana	24	205	Tidak Ada
39	13811039	ILMU INFORMASI DAN PERPUSTAKAAN	Sarjana	39	533	Tidak Ada
40	13811040	BAHASA DAN SASTRA INGGRIS	Sarjana	75	682	Tidak Ada
41	13811041	BAHASA DAN SASTRA INDONESIA	Sarjana	30	325	Tidak Ada
42	13811042	BAHASA DAN SASTRA JEPANG	Sarjana	30	406	Tidak Ada
43	13811043	EKONOMI ISLAM	Sarjana	60	520	Tidak Ada
44	13811068	KEDOKTERAN (FIKKIA BANYUWANGI)	Sarjana	15	222	Tidak Ada
45	13812046	KESELAMATAN DAN KESEHATAN KERJA	Sarjana Terapan	60	4783	Tidak Ada
46	13812049	MANAJEMEN PERHOTELAN	Sarjana Terapan	27	925	Tidak Ada
47	13812050	DESTINASI PARIWISATA	Sarjana Terapan	27	1225	Tidak Ada
48	13812051	TEKNOLOGI LABORATORIUM MEDIK	Sarjana Terapan	45	2500	Tidak Ada
49	13812054	PERBANKAN DAN KEUANGAN	Sarjana Terapan	45	1765	Tidak Ada
50	13812055	TEKNOLOGI REKAYASA INSTRUMENTASI DAN KONTROL	Sarjana Terapan	32	376	Tidak Ada
51	13812056	MANAJEMEN PERKANTORAN DIGITAL	Sarjana Terapan	48	1770	Tidak Ada
52	13812061	PENGOBAT TRADISIONAL	Sarjana Terapan	20	322	Tidak Ada
53	13812062	FISIOTERAPI	Sarjana Terapan	36	2402	Tidak Ada
54	13812063	TEKNOLOGI RADIOLOGI PENCITRAAN	Sarjana Terapan	60	2390	Tidak Ada
55	13812064	TEKNIK INFORMATIKA	Sarjana Terapan	36	2051	Tidak Ada
56	13812065	TEKNOLOGI KESEHATAN GIGI	Sarjana Terapan	28	1067	Tidak Ada
57	13812066	TEKNOLOGI VETERINER	Sarjana Terapan	24	434	Tidak Ada
58	13812067	KEARSIPAN DAN INFORMASI DIGITAL	Sarjana Terapan	29	1233	Tidak Ada
59	13812069	AKUNTANSI BISNIS DIGITAL	Sarjana Terapan	27		Tidak Ada
60	13813045	BAHASA INGGRIS	Diploma Tiga	30	2489	Tidak Ada
61	13813047	PERPAJAKAN	Diploma Tiga	60	3620	Tidak Ada
62	13813059	KEPERAWATAN	Diploma Tiga	60	5215	Tidak Ada
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
        'sipil', 'pangan', 'statistika', 'lingkungan', 'sains', 'olahraga', 'jasmani', 'manufaktur', 'mekatronika',
        'elektronika', 'otomotif', 'ipa', 'geografi', 'promosi', 'bioteknologi', 'aktuaria', 'kebidanan',
        'biomedis', 'nanoteknologi', 'robotika', 'kecerdasan buatan', 'veteriner', 'laboratorium medik', 'radiologi', 'fisioterapi',
        'fisikoterapi', 'kedokteran gigi', 'kedokteran hewan', 'kesehatan gigi'
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
        console.log("Looking up Universitas Airlangga...");
        let univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Airlangga", mode: "insensitive" }
            }
        });

        if (!univ) {
            console.log("UNAIR not found in DB! Exiting...");
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
                        estimatedUkt: 8000000
                    }
                });
                newCount++;
            }

            let actualApplicants = data.applicants;
            if (actualApplicants === 0 || isNaN(actualApplicants)) {
                actualApplicants = Math.floor(data.capacity * (Math.random() * 8 + 4)); // More competitive for UNAIR
            }

            const dummyScore = getRandomScore(540, 710); // Higher scores for UNAIR
            const tps = getRandomScore(520, dummyScore + 40);
            const litBi = getRandomScore(520, dummyScore + 40);
            const litBing = getRandomScore(520, dummyScore + 40);
            const pm = getRandomScore(520, dummyScore + 40);

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
