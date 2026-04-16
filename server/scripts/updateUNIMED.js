import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `
1	11221001	PENDIDIKAN MATEMATIKA	Sarjana	133	467	Tidak Ada
2	11221002	PENDIDIKAN BIOLOGI	Sarjana	144	491	Tidak Ada
3	11221003	PENDIDIKAN FISIKA	Sarjana	136	166	Tidak Ada
4	11221004	PENDIDIKAN KIMIA	Sarjana	179	217	Tidak Ada
5	11221005	PENDIDIKAN TEKNIK BANGUNAN	Sarjana	94	67	Tidak Ada
6	11221006	PENDIDIKAN TEKNIK MESIN	Sarjana	102	227	Tidak Ada
7	11221007	PENDIDIKAN TEKNIK ELEKTRO	Sarjana	90	162	Tidak Ada
8	11221008	KIMIA	Sarjana	86	186	Tidak Ada
9	11221009	BIOLOGI	Sarjana	118	294	Tidak Ada
10	11221010	ILMU KEOLAHRAGAAN	Sarjana	154	185	Olahraga
11	11221011	MATEMATIKA	Sarjana	90	183	Tidak Ada
12	11221012	FISIKA	Sarjana	66	104	Tidak Ada
13	11221013	PENDIDIKAN TEKNIK OTOMOTIF	Sarjana	102	147	Tidak Ada
14	11221014	GIZI	Sarjana	106	1048	Tidak Ada
15	11221015	TEKNIK ELEKTRO	Sarjana	90	457	Tidak Ada
16	11221016	TEKNIK SIPIL	Sarjana	102	612	Tidak Ada
17	11221017	PENDIDIKAN TEKNOLOGI INFORMATIKA DAN KOMPUTER	Sarjana	102	524	Tidak Ada
18	11221018	ILMU KOMPUTER	Sarjana	96	1002	Tidak Ada
19	11221019	PENDIDIKAN IPA	Sarjana	86	184	Tidak Ada
20	11221021	PENDIDIKAN SEJARAH	Sarjana	122	362	Tidak Ada
21	11221022	PEND. PANCASILA & KEWARGANEGARAAN (PPKN)	Sarjana	122	485	Tidak Ada
22	11221023	PENDIDIKAN GEOGRAFI	Sarjana	122	285	Tidak Ada
23	11221024	PEND. JASMANI, KESEHATAN & REKREASI	Sarjana	234	677	Olahraga
24	11221025	PENDIDIKAN KEPELATIHAN OLAHRAGA (PKO)	Sarjana	234	560	Olahraga
25	11221026	PENDIDIKAN LUAR SEKOLAH (PLS)	Sarjana	82	103	Tidak Ada
26	11221027	PENDIDIKAN EKONOMI	Sarjana	78	295	Tidak Ada
27	11221028	MANAJEMEN	Sarjana	102	1008	Tidak Ada
28	11221029	AKUNTANSI	Sarjana	90	969	Tidak Ada
29	11221030	PENDIDIKAN BAHASA DAN SASTRA INDONESIA	Sarjana	168	966	Tidak Ada
30	11221031	PENDIDIKAN BAHASA INGGRIS	Sarjana	170	659	Tidak Ada
31	11221032	PENDIDIKAN BAHASA PERANCIS	Sarjana	85	39	Tidak Ada
32	11221033	PENDIDIKAN BAHASA JERMAN	Sarjana	92	151	Tidak Ada
33	11221034	PENDIDIKAN SENI RUPA	Sarjana	79	86	Seni Rupa, Desain, dan Kriya
34	11221035	SASTRA INDONESIA	Sarjana	102	220	Tidak Ada
35	11221036	SASTRA INGGRIS	Sarjana	102	378	Tidak Ada
36	11221038	PENDIDIKAN GURU SEKOLAH DASAR (PGSD)	Sarjana	288	2528	Tidak Ada
37	11221039	PENDIDIKAN TATA BOGA	Sarjana	90	461	Tidak Ada
38	11221040	PENDIDIKAN TATA RIAS	Sarjana	102	440	Tidak Ada
39	11221041	PENDIDIKAN ANTROPOLOGI	Sarjana	122	266	Tidak Ada
40	11221042	PEND. GURU PENDIDIKAN ANAK USIA DINI	Sarjana	144	340	Tidak Ada
41	11221043	PENDIDIKAN BIMBINGAN DAN KONSELING	Sarjana	144	1059	Tidak Ada
42	11221044	PENDIDIKAN AKUNTANSI	Sarjana	78	249	Tidak Ada
43	11221046	PENDIDIKAN ADMINISTRASI PERKANTORAN	Sarjana	78	406	Tidak Ada
44	11221047	PENDIDIKAN BISNIS	Sarjana	78	179	Tidak Ada
45	11221048	PENDIDIKAN TARI	Sarjana	110	126	Tari
46	11221049	PENDIDIKAN MUSIK	Sarjana	118	160	Musik
47	11221050	PENDIDIKAN TATA BUSANA	Sarjana	90	413	Tidak Ada
48	11221051	SENI PERTUNJUKAN	Sarjana	43	24	Sendratasik
49	11221052	ILMU EKONOMI	Sarjana	78	378	Tidak Ada
50	11221053	BISNIS DIGITAL	Sarjana	78	607	Tidak Ada
51	11221054	KEWIRAUSAHAAN	Sarjana	78	340	Tidak Ada
52	11221057	ARSITEKTUR	Sarjana	80	208	Tidak Ada
53	11221058	STATISTIKA	Sarjana	80	260	Tidak Ada
54	11221059	SAINS INFORMASI GEOGRAFI	Sarjana	30	66	Tidak Ada
55	11221060	HUKUM BISNIS	Sarjana	30	291	Tidak Ada
56	11221061	KEDOKTERAN	Sarjana	23		Tidak Ada
57	11221062	TEKNIK LINGKUNGAN	Sarjana	60		Tidak Ada
58	11222056	MANAJEMEN KONSTRUKSI	Sarjana Terapan	102	1152	Tidak Ada
59	11223055	TEKNIK MESIN	Diploma Tiga	80	1266	Tidak Ada
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
        'pertanian', 'kelautan', 'perikanan', 'geofisika', 'statistika', 'kehutanan', 'alam', 'bioteknologi', 'logistik', 'peternakan',
        'mesin', 'bangunan', 'elektro', 'otomotif', 'ipa', 'olahraga', 'tata boga', 'tata busana', 'tata rias'
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
                // Handle special cases in name like extra brackets
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
        console.log("Looking up Universitas Negeri Medan (UNIMED)...");
        let univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Negeri Medan", mode: "insensitive" }
            }
        });

        if (!univ) {
            console.log("UNIMED not found in DB! Exiting...");
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
                        accreditation: "Unggul", // UNIMED mostly unggul/baik sekali
                        degree: data.degree,
                        estimatedUkt: 5000000
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
