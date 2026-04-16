import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	13411001	AGRIBISNIS	Sarjana	45	1171	Tidak Ada
2	13411002	AGRONOMI DAN HORTIKULTURA	Sarjana	68	809	Tidak Ada
3	13411003	ARSITEKTUR LANSKAP	Sarjana	30	537	Tidak Ada
4	13411004	BIOKIMIA	Sarjana	33	497	Tidak Ada
5	13411005	BIOLOGI	Sarjana	33	354	Tidak Ada
6	13411006	EKONOMI SUMBERDAYA DAN LINGKUNGAN	Sarjana	39	727	Tidak Ada
7	13411007	ILMU DAN TEKNOLOGI KELAUTAN	Sarjana	39	511	Tidak Ada
8	13411008	ILMU KOMPUTER	Sarjana	51	1532	Tidak Ada
9	13411009	KEDOKTERAN HEWAN	Sarjana	66	966	Tidak Ada
10	13411010	KIMIA	Sarjana	36	360	Tidak Ada
11	13411011	KOMUNIKASI DAN PENGEMBANGAN MASYARAKAT	Sarjana	53	1558	Tidak Ada
12	13411012	KONSERVASI SUMBERDAYA HUTAN DAN EKOWISATA	Sarjana	42	705	Tidak Ada
13	13411013	MANAJEMEN HUTAN	Sarjana	42	555	Tidak Ada
14	13411014	STATISTIKA DAN SAINS DATA	Sarjana	36	858	Tidak Ada
15	13411015	TEKNIK PERTANIAN DAN BIOSISTEM	Sarjana	36	663	Tidak Ada
16	13411016	TEKNOLOGI HASIL HUTAN	Sarjana	33	370	Tidak Ada
17	13411017	TEKNIK INDUSTRI PERTANIAN	Sarjana	39	1038	Tidak Ada
18	13411018	TEKNOLOGI PANGAN	Sarjana	39	1538	Tidak Ada
19	13411019	NUTRISI DAN TEKNOLOGI PAKAN	Sarjana	48	681	Tidak Ada
20	13411020	TEKNOLOGI PRODUKSI TERNAK	Sarjana	36	460	Tidak Ada
21	13411021	TEKNIK SIPIL DAN LINGKUNGAN	Sarjana	30	1204	Tidak Ada
22	13411022	TEKNOLOGI DAN MANAJEMEN PERIKANAN BUDIDAYA	Sarjana	36	324	Tidak Ada
23	13411023	EKONOMI PEMBANGUNAN	Sarjana	39	724	Tidak Ada
24	13411024	MANAJEMEN	Sarjana	39	1301	Tidak Ada
25	13411025	ILMU GIZI	Sarjana	30	1229	Tidak Ada
26	13411026	ILMU EKONOMI SYARIAH	Sarjana	39	639	Tidak Ada
27	13411027	MANAJEMEN SUMBERDAYA LAHAN	Sarjana	27	439	Tidak Ada
28	13411028	PROTEKSI TANAMAN	Sarjana	30	303	Tidak Ada
29	13411029	MANAJEMEN SUMBERDAYA PERAIRAN	Sarjana	30	348	Tidak Ada
30	13411030	TEKNOLOGI HASIL PERAIRAN	Sarjana	30	260	Tidak Ada
31	13411031	TEKNOLOGI DAN MANAJEMEN PERIKANAN TANGKAP	Sarjana	36	432	Tidak Ada
32	13411032	SILVIKULTUR	Sarjana	33	445	Tidak Ada
33	13411033	METEOROLOGI TERAPAN	Sarjana	30	393	Tidak Ada
34	13411034	MATEMATIKA	Sarjana	33	276	Tidak Ada
35	13411035	FISIKA	Sarjana	36	211	Tidak Ada
36	13411036	ILMU KELUARGA DAN KONSUMEN	Sarjana	36	747	Tidak Ada
37	13411037	BISNIS	Sarjana	72	1991	Tidak Ada
38	13411038	TEKNOLOGI HASIL TERNAK	Sarjana	30	477	Tidak Ada
39	13411039	AKTUARIA	Sarjana	29	501	Tidak Ada
40	13411063	KEDOKTERAN	Sarjana	15	826	Tidak Ada
41	13411064	SAINS BIOMEDIS	Sarjana	15	499	Tidak Ada
42	13411070	SMART AGRICULTURE	Sarjana	12	527	Tidak Ada
43	13411071	BIOINFORMATIKA	Sarjana	15	284	Tidak Ada
44	13411072	KECERDASAN BUATAN	Sarjana	21	930	Tidak Ada
45	13411074	TEKNIK MESIN	Sarjana	18		Tidak Ada
46	13411076	TEKNIK KIMIA	Sarjana	18		Tidak Ada
47	13412042	KOMUNIKASI DIGITAL DAN MEDIA	Sarjana Terapan	63	4727	Tidak Ada
48	13412043	KOMUNIKASI DIGITAL DAN MEDIA (KAMPUS SUKABUMI)	Sarjana Terapan	41	858	Tidak Ada
49	13412044	EKOWISATA	Sarjana Terapan	30	1360	Tidak Ada
50	13412045	EKOWISATA (KAMPUS SUKABUMI)	Sarjana Terapan	27	524	Tidak Ada
51	13412046	TEKNOLOGI REKAYASA PERANGKAT LUNAK	Sarjana Terapan	42	1638	Tidak Ada
52	13412047	TEKNOLOGI REKAYASA KOMPUTER	Sarjana Terapan	42	1366	Tidak Ada
53	13412048	SUPERVISOR JAMINAN MUTU PANGAN	Sarjana Terapan	42	1511	Tidak Ada
54	13412049	MANAJEMEN INDUSTRI JASA MAKANAN DAN GIZI	Sarjana Terapan	42	2456	Tidak Ada
55	13412050	TEKNOLOGI DAN MANAJEMEN PEMBENIHAN IKAN	Sarjana Terapan	21	604	Tidak Ada
56	13412051	TEKNOLOGI DAN MANAJEMEN PEMBENIHAN IKAN (KAMPUS SUKABUMI)	Sarjana Terapan	21	242	Tidak Ada
57	13412052	TEKNOLOGI DAN MANAJEMEN TERNAK	Sarjana Terapan	21	995	Tidak Ada
58	13412053	TEKNOLOGI DAN MANAJEMEN TERNAK (KAMPUS SUKABUMI)	Sarjana Terapan	21	372	Tidak Ada
59	13412054	MANAJEMEN AGRIBISNIS	Sarjana Terapan	84	3135	Tidak Ada
60	13412055	MANAJEMEN AGRIBISNIS (KAMPUS SUKABUMI)	Sarjana Terapan	27	739	Tidak Ada
61	13412056	MANAJEMEN INDUSTRI	Sarjana Terapan	42	2278	Tidak Ada
62	13412057	ANALISIS KIMIA	Sarjana Terapan	42	1784	Tidak Ada
63	13412058	TEKNIK DAN MANAJEMEN LINGKUNGAN	Sarjana Terapan	42	2360	Tidak Ada
64	13412059	AKUNTANSI	Sarjana Terapan	84	3230	Tidak Ada
65	13412060	PARAMEDIK VETERINER	Sarjana Terapan	26	806	Tidak Ada
66	13412061	TEKNOLOGI DAN MANAJEMEN PRODUKSI PERKEBUNAN	Sarjana Terapan	32	961	Tidak Ada
67	13412062	TEKNOLOGI PRODUKSI DAN PENGEMBANGAN MASYARAKAT PERTANIAN	Sarjana Terapan	21	889	Tidak Ada
68	13412073	PEMULIAAN TANAMAN DAN TEKNOLOGI BENIH	Sarjana Terapan	21		Tidak Ada
`;

// Helper
const capitalize = (str) => {
    let cap = str.replace('&', 'Dan').replace(/\./g, '').replace('/', ' / ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ').replace(' / ', '/');
    cap = cap.replace(/\(([a-z\-]+)\)/gi, (m, p1) => "(" + p1.toUpperCase() + ")");
    return cap;
};

const getRandomScore = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const determineCategory = (majorName) => {
    const nameStr = majorName.toLowerCase();
    const soshumKeywords = ['ekonomi', 'manajemen', 'bisnis', 'akuntansi', 'komunikasi'];

    if (soshumKeywords.some(kw => nameStr.includes(kw))) {
        // Many IPB majors like Manajemen Agribisnis or Manajemen Hutan might actually be considered SAINTEK in IPB
        // However, standard ones like Ekonomi Pembangunan, Manajemen, Akuntansi, Manajemen Industri are often SAINTEK or SOSHUM depending on path.
        // IPB is predominantly SAINTEK for most.
        if (nameStr === 'manajemen' || nameStr === 'akuntansi' || nameStr === 'ekonomi pembangunan' || nameStr === 'bisnis' || nameStr === 'ilmu ekonomi syariah') {
            return 'SOSHUM';
        }
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
        console.log("Looking up Institut Pertanian Bogor...");
        let univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Pertanian Bogor", mode: "insensitive" }
            }
        });

        if (!univ) {
            console.log("IPB not found in DB! Exiting...");
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

            // If applicants are missing (0/NaN) we generate a realistic figure
            let actualApplicants = data.applicants;
            if (actualApplicants === 0 || isNaN(actualApplicants)) {
                actualApplicants = Math.floor(data.capacity * (Math.random() * 8 + 3));
            }
            
            const dummyScore = getRandomScore(530, 690);
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
