import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	13511001	BIOLOGI	Sarjana	120	346	Tidak Ada
2	13511002	KIMIA	Sarjana	88	298	Tidak Ada
3	13511003	MATEMATIKA	Sarjana	88	254	Tidak Ada
4	13511004	FISIKA	Sarjana	88	185	Tidak Ada
5	13511005	MANAJEMEN SUMBERDAYA PERAIRAN	Sarjana	80	289	Tidak Ada
6	13511006	AKUAKULTUR	Sarjana	80	267	Tidak Ada
7	13511007	TEKNIK PERTANIAN	Sarjana	80	479	Tidak Ada
8	13511008	TEKNIK ELEKTRO	Sarjana	80	665	Tidak Ada
9	13511009	TEKNIK SIPIL	Sarjana	80	811	Tidak Ada
10	13511010	PENDIDIKAN DOKTER	Sarjana	70	1531	Tidak Ada
11	13511011	KESEHATAN MASYARAKAT	Sarjana	88	1236	Tidak Ada
12	13511012	KEPERAWATAN	Sarjana	86	1201	Tidak Ada
13	13511013	FARMASI	Sarjana	88	1397	Tidak Ada
14	13511014	TEKNIK GEOLOGI	Sarjana	80	916	Tidak Ada
15	13511015	ILMU KELAUTAN	Sarjana	86	312	Tidak Ada
16	13511016	AGROTEKNOLOGI	Sarjana	120	839	Tidak Ada
17	13511017	AGRIBISNIS	Sarjana	84	607	Tidak Ada
18	13511018	TEKNOLOGI PANGAN	Sarjana	80	850	Tidak Ada
19	13511019	PETERNAKAN	Sarjana	126	693	Tidak Ada
20	13511020	INFORMATIKA	Sarjana	80	966	Tidak Ada
21	13511021	KEDOKTERAN GIGI	Sarjana	28	826	Tidak Ada
22	13511022	ILMU GIZI	Sarjana	88	1127	Tidak Ada
23	13511023	PENDIDIKAN JASMANI	Sarjana	88	431	Olahraga
24	13511024	TEKNIK INDUSTRI	Sarjana	64	906	Tidak Ada
25	13511025	HUKUM	Sarjana	128	1353	Tidak Ada
26	13511026	SOSIOLOGI	Sarjana	88	583	Tidak Ada
27	13511027	ADMINISTRASI PUBLIK	Sarjana	88	1075	Tidak Ada
28	13511028	MANAJEMEN	Sarjana	56	1069	Tidak Ada
29	13511029	EKONOMI PEMBANGUNAN	Sarjana	56	574	Tidak Ada
30	13511030	AKUNTANSI	Sarjana	56	916	Tidak Ada
31	13511031	ILMU KOMUNIKASI	Sarjana	92	1158	Tidak Ada
32	13511032	ILMU POLITIK	Sarjana	72	455	Tidak Ada
33	13511033	SASTRA INDONESIA	Sarjana	64	361	Tidak Ada
34	13511034	SASTRA INGGRIS	Sarjana	64	525	Tidak Ada
35	13511035	HUBUNGAN INTERNASIONAL	Sarjana	76	512	Tidak Ada
36	13511036	SASTRA JEPANG	Sarjana	64	465	Tidak Ada
37	13511037	PENDIDIKAN EKONOMI	Sarjana	40	319	Tidak Ada
38	13511038	PENDIDIKAN BAHASA INDONESIA	Sarjana	64	574	Tidak Ada
39	13511039	PENDIDIKAN BAHASA INGGRIS	Sarjana	64	448	Tidak Ada
40	13511053	MIKROBIOLOGI	Sarjana	32	153	Tidak Ada
41	13511054	TEKNIK MESIN	Sarjana	32	415	Tidak Ada
42	13511055	PENDIDIKAN BAHASA JEPANG	Sarjana	48	163	Tidak Ada
43	13511056	PROTEKSI TANAMAN	Sarjana	28	156	Tidak Ada
44	13511057	STATISTIK	Sarjana	48	278	Tidak Ada
45	13511058	BIOLOGI TERAPAN	Sarjana	32	164	Tidak Ada
46	13511059	TEKNIK KOMPUTER	Sarjana	32	396	Tidak Ada
47	13511060	ARSITEKTUR	Sarjana	24		Tidak Ada
48	13513040	ADMINISTRASI BISNIS	Diploma Tiga	48	2531	Tidak Ada
49	13513041	BAHASA MANDARIN	Diploma Tiga	56	712	Tidak Ada
50	13513042	BUDI DAYA IKAN	Diploma Tiga	48	533	Tidak Ada
51	13513043	AGRIBISNIS	Diploma Tiga	48	1692	Tidak Ada
52	13513044	PERENCANAAN SUMBER DAYA LAHAN	Diploma Tiga	48	820	Tidak Ada
53	13513046	BAHASA INGGRIS	Diploma Tiga	56	1262	Tidak Ada
54	13513048	AKUNTANSI	Diploma Tiga	48	1636	Tidak Ada
55	13513049	BISNIS INTERNASIONAL	Diploma Tiga	48	1334	Tidak Ada
56	13513051	ADMINISTRASI PERKANTORAN	Diploma Tiga	48	2112	Tidak Ada
57	13513052	BUDI DAYA TERNAK	Diploma Tiga	92	990	Tidak Ada
`;

const capitalize = (str) => {
    return str.replace('&', 'Dan').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
};

const getRandomScore = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const determineCategory = (majorName) => {
    const nameStr = majorName.toLowerCase();
    const saintekKeywords = [
        'teknik', 'informatika', 'komputer', 'kedokteran', 'keperawatan', 'kesehatan', 'gizi', 'farmasi',
        'fisioterapi', 'biologi', 'fisika', 'kimia', 'matematika', 'arsitektur', 'agroteknologi', 'pertanian',
        'kelautan', 'perikanan', 'geologi', 'statistika', 'statistik', 'peternakan', 'akuakultur', 'mikrobiologi',
        'mesin', 'elektro', 'sipil', 'proteksi', 'sumberdaya', 'pangan', 'gigi', 'kebidanan', 'olahraga', 'jasmani'
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
        console.log("Looking up Universitas Jenderal Soedirman...");
        let univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Soedirman", mode: "insensitive" }
            }
        });
        if (!univ) {
            univ = await prisma.university.findFirst({
                where: {
                    name: { contains: "Sudirman", mode: "insensitive" }
                }
            });
        }

        if (!univ) {
            console.log("UNSOED not found in DB! Exiting...");
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

            const dummyScore = getRandomScore(510, 670);
            const tps = getRandomScore(490, dummyScore + 40);
            const litBi = getRandomScore(490, dummyScore + 40);
            const litBing = getRandomScore(490, dummyScore + 40);
            const pm = getRandomScore(490, dummyScore + 40);

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
