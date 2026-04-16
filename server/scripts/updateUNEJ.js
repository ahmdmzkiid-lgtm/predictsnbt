import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	13711001	AGROTEKNOLOGI / AGROEKOTEKNOLOGI	Sarjana	80	344	Tidak Ada
2	13711002	AGRIBISNIS	Sarjana	56	462	Tidak Ada
3	13711003	PENDIDIKAN MATEMATIKA	Sarjana	74	247	Tidak Ada
4	13711004	PENDIDIKAN FISIKA	Sarjana	66	106	Tidak Ada
5	13711005	PENDIDIKAN BIOLOGI	Sarjana	66	261	Tidak Ada
6	13711006	TEKNOLOGI HASIL PERTANIAN	Sarjana	60	251	Tidak Ada
7	13711007	TEKNIK PERTANIAN	Sarjana	60	254	Tidak Ada
8	13711008	PENDIDIKAN DOKTER GIGI	Sarjana	76	1506	Tidak Ada
9	13711009	MATEMATIKA	Sarjana	54	91	Tidak Ada
10	13711010	FISIKA	Sarjana	48	55	Tidak Ada
11	13711011	KIMIA	Sarjana	54	180	Tidak Ada
12	13711012	BIOLOGI	Sarjana	54	186	Tidak Ada
13	13711013	PENDIDIKAN DOKTER	Sarjana	76	1706	Tidak Ada
14	13711014	KESEHATAN MASYARAKAT	Sarjana	100	1018	Tidak Ada
15	13711015	TEKNIK MESIN	Sarjana	56	452	Tidak Ada
16	13711016	TEKNIK ELEKTRO	Sarjana	56	360	Tidak Ada
17	13711017	TEKNIK SIPIL	Sarjana	68	601	Tidak Ada
18	13711018	FARMASI	Sarjana	76	1327	Tidak Ada
19	13711019	ILMU KEPERAWATAN	Sarjana	72	1021	Tidak Ada
20	13711020	SISTEM INFORMASI	Sarjana	52	462	Tidak Ada
21	13711024	TEKNOLOGI INDUSTRI PERTANIAN	Sarjana	58	229	Tidak Ada
22	13711025	ILMU TANAH	Sarjana	32	129	Tidak Ada
23	13711026	PROTEKSI TANAMAN	Sarjana	36	62	Tidak Ada
24	13711027	TEKNOLOGI INFORMASI	Sarjana	52	354	Tidak Ada
25	13711028	PENDIDIKAN IPA	Sarjana	66	205	Tidak Ada
26	13711029	PERENCANAAN WILAYAH DAN KOTA	Sarjana	46	274	Tidak Ada
27	13711030	TEKNIK KIMIA	Sarjana	32	184	Tidak Ada
28	13711031	AGRONOMI	Sarjana	46	151	Tidak Ada
29	13711032	ILMU PERTANIAN KAMPUS BONDOWOSO	Sarjana	44	177	Tidak Ada
30	13711033	INFORMATIKA	Sarjana	52	484	Tidak Ada
31	13711034	PENYULUHAN PERTANIAN	Sarjana	32	99	Tidak Ada
32	13711035	TEKNIK LINGKUNGAN	Sarjana	32	340	Tidak Ada
33	13711036	TEKNIK KONSTRUKSI PERKAPALAN	Sarjana	30	119	Tidak Ada
34	13711037	PETERNAKAN KAMPUS BONDOWOSO	Sarjana	44	193	Tidak Ada
35	13711038	GIZI KAMPUS BONDOWOSO	Sarjana	42	462	Tidak Ada
36	13711039	TEKNIK PERTAMBANGAN	Sarjana	32	577	Tidak Ada
37	13711040	TEKNIK PERMINYAKAN	Sarjana	26	303	Tidak Ada
38	13711041	ILMU HUKUM	Sarjana	180	1036	Tidak Ada
39	13711042	HUBUNGAN INTERNASIONAL	Sarjana	64	349	Tidak Ada
40	13711043	ILMU ADMINISTRASI NEGARA	Sarjana	64	507	Tidak Ada
41	13711044	ILMU ADMINISTRASI BISNIS	Sarjana	64	746	Tidak Ada
42	13711045	ILMU KESEJAHTERAAN SOSIAL	Sarjana	64	342	Tidak Ada
43	13711046	SOSIOLOGI	Sarjana	64	321	Tidak Ada
44	13711047	EKONOMI PEMBANGUNAN	Sarjana	84	416	Tidak Ada
45	13711048	MANAJEMEN	Sarjana	108	964	Tidak Ada
46	13711049	AKUNTANSI	Sarjana	76	761	Tidak Ada
47	13711050	PENDIDIKAN LUAR SEKOLAH	Sarjana	48	92	Tidak Ada
48	13711051	PENDIDIKAN EKONOMI	Sarjana	66	280	Tidak Ada
49	13711052	PENDIDIKAN SEJARAH	Sarjana	48	186	Tidak Ada
50	13711053	PENDIDIKAN BAHASA INGGRIS	Sarjana	66	333	Tidak Ada
51	13711054	PENDIDIKAN BAHASA DAN SASTRA INDONESIA	Sarjana	66	457	Tidak Ada
52	13711055	PENDIDIKAN GURU SEKOLAH DASAR	Sarjana	66	769	Tidak Ada
53	13711056	SASTRA INGGRIS	Sarjana	48	264	Tidak Ada
54	13711057	SASTRA INDONESIA	Sarjana	48	187	Tidak Ada
55	13711058	ILMU SEJARAH	Sarjana	48	123	Tidak Ada
56	13711059	TELEVISI DAN FILM	Sarjana	48	253	Film dan Televisi
57	13711060	PENDIDIKAN GURU PAUD	Sarjana	66	136	Tidak Ada
58	13711061	EKONOMI SYARIAH	Sarjana	48	254	Tidak Ada
59	13711062	PENDIDIKAN GEOGRAFI	Sarjana	48	206	Tidak Ada
60	13711063	EKONOMI SYARIAH KAMPUS BONDOWOSO	Sarjana	24	89	Tidak Ada
61	13711064	PENDIDIKAN GURU SEKOLAH DASAR KAMPUS BONDOWOSO	Sarjana	48	198	Tidak Ada
62	13711076	AGRIBISNIS KAMPUS BONDOWOSO	Sarjana	24		Tidak Ada
63	13711077	AKUNTANSI KAMPUS BONDOWOSO	Sarjana	32		Tidak Ada
64	13711078	PENDIDIKAN MATEMATIKA KAMPUS BONDOWOSO	Sarjana	32		Tidak Ada
65	13711079	ILMU KEPERAWATAN KAMPUS LUMAJANG	Sarjana	32		Tidak Ada
66	13712066	TEKNOLOGI REKAYASA KONSTRUKSI BANGUNAN GEDUNG	Sarjana Terapan	30	335	Tidak Ada
67	13712070	REKAYASA PERANCANGAN MEKANIK	Sarjana Terapan	30	192	Tidak Ada
68	13712072	TEKNOLOGI REKAYASA ELEKTRONIKA	Sarjana Terapan	30	249	Tidak Ada
69	13713065	ADMINISTRASI KEUANGAN	Diploma Tiga	32	842	Tidak Ada
70	13713067	KEPERAWATAN KAMPUS LUMAJANG	Diploma Tiga	72	1808	Tidak Ada
71	13713068	AKUNTANSI	Diploma Tiga	36	870	Tidak Ada
72	13713069	PERPAJAKAN	Diploma Tiga	36	951	Tidak Ada
73	13713071	KEPERAWATAN KAMPUS PASURUAN	Diploma Tiga	70	871	Tidak Ada
74	13713073	MANAJEMEN PERUSAHAAN	Diploma Tiga	32	1087	Tidak Ada
75	13713074	KESEKRETARIATAN	Diploma Tiga	32	424	Tidak Ada
76	13713075	USAHA PERJALANAN WISATA	Diploma Tiga	36	565	Tidak Ada
`;

const capitalize = (str) => {
    return str.replace('&', 'Dan').replace('BHS.', 'Bahasa').replace('INDO.', 'Indonesia').replace(/\//g, ' / ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ').replace(' / ', '/');
};

const getRandomScore = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const determineCategory = (majorName) => {
    const nameStr = majorName.toLowerCase();
    const saintekKeywords = [
        'teknik', 'informatika', 'teknologi', 'komputer', 'kedokteran', 'keperawatan', 'kesehatan',
        'gizi', 'farmasi', 'biologi', 'fisika', 'kimia', 'matematika', 'arsitektur', 'agroteknologi',
        'agroekoteknologi', 'pertanian', 'kelautan', 'peternakan', 'akuakultur', 'mesin', 'elektro',
        'sipil', 'pangan', 'statistika', 'lingkungan', 'sains', 'olahraga', 'jasmani', 'agronomi',
        'ilmu tanah', 'proteksi', 'perencanaan', 'pertambangan', 'perminyakan', 'perkapalan'
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
        console.log("Looking up Universitas Jember...");
        let univ = await prisma.university.findFirst({
            where: { name: { contains: "Jember", mode: "insensitive" } }
        });

        if (!univ) {
            console.log("UNEJ not found in DB! Exiting...");
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
                actualApplicants = Math.floor(data.capacity * (Math.random() * 7 + 3));
            }

            const dummyScore = getRandomScore(490, 650);
            const tps = getRandomScore(470, dummyScore + 40);
            const litBi = getRandomScore(470, dummyScore + 40);
            const litBing = getRandomScore(470, dummyScore + 40);
            const pm = getRandomScore(470, dummyScore + 40);

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
