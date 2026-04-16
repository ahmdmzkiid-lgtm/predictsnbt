import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const rawData = `1	13211001	PENDIDIKAN DOKTER	Sarjana	90	3330	Tidak Ada
2	13211002	PENDIDIKAN DOKTER GIGI	Sarjana	47	1114	Tidak Ada
3	13211003	MATEMATIKA	Sarjana	24	401	Tidak Ada
4	13211004	FISIKA	Sarjana	42	316	Tidak Ada
5	13211005	KIMIA	Sarjana	42	526	Tidak Ada
6	13211006	BIOLOGI	Sarjana	41	372	Tidak Ada
7	13211007	FARMASI	Sarjana	59	1154	Tidak Ada
8	13211008	GEOGRAFI	Sarjana	42	580	Tidak Ada
9	13211009	TEKNIK SIPIL	Sarjana	60	1258	Tidak Ada
10	13211010	TEKNIK MESIN	Sarjana	60	1152	Tidak Ada
11	13211011	TEKNIK ELEKTRO	Sarjana	45	916	Tidak Ada
12	13211012	TEKNIK METALURGI & MATERIAL	Sarjana	51	990	Tidak Ada
13	13211013	ARSITEKTUR	Sarjana	24	824	Tidak Ada
14	13211014	TEKNIK KIMIA	Sarjana	44	765	Tidak Ada
15	13211015	ILMU KEPERAWATAN	Sarjana	75	1218	Tidak Ada
16	13211016	ILMU KOMPUTER	Sarjana	75	2132	Tidak Ada
17	13211017	ILMU KESEHATAN MASYARAKAT	Sarjana	68	1527	Tidak Ada
18	13211018	TEKNIK INDUSTRI	Sarjana	71	1963	Tidak Ada
19	13211019	TEKNIK PERKAPALAN	Sarjana	39	768	Tidak Ada
20	13211020	TEKNIK LINGKUNGAN	Sarjana	36	775	Tidak Ada
21	13211021	TEKNIK KOMPUTER	Sarjana	33	1018	Tidak Ada
22	13211022	SISTEM INFORMASI	Sarjana	75	1863	Tidak Ada
23	13211023	ARSITEKTUR INTERIOR	Sarjana	15	621	Tidak Ada
24	13211024	TEKNOLOGI BIOPROSES	Sarjana	21	610	Tidak Ada
25	13211025	GIZI	Sarjana	20	645	Tidak Ada
26	13211026	KESEHATAN LINGKUNGAN	Sarjana	20	343	Tidak Ada
27	13211027	KESELAMATAN DAN KESEHATAN KERJA	Sarjana	27	1287	Tidak Ada
28	13211028	GEOFISIKA	Sarjana	24	401	Tidak Ada
29	13211029	GEOLOGI	Sarjana	24	563	Tidak Ada
30	13211030	STATISTIKA	Sarjana	24	519	Tidak Ada
31	13211031	AKTUARIA	Sarjana	24	569	Tidak Ada
32	13211032	TEKNIK BIOMEDIS	Sarjana	15	447	Tidak Ada
33	13211033	ILMU HUKUM	Sarjana	171	4434	Tidak Ada
34	13211034	ARKEOLOGI INDONESIA	Sarjana	24	342	Tidak Ada
35	13211035	ILMU SEJARAH	Sarjana	24	501	Tidak Ada
36	13211036	ILMU PSIKOLOGI	Sarjana	99	3506	Tidak Ada
37	13211037	ILMU KOMUNIKASI	Sarjana	44	2412	Tidak Ada
38	13211038	ILMU POLITIK	Sarjana	24	819	Tidak Ada
39	13211039	ILMU ADMINISTRASI NEGARA	Sarjana	50	1448	Tidak Ada
40	13211040	KRIMINOLOGI	Sarjana	23	1583	Tidak Ada
41	13211041	SOSIOLOGI	Sarjana	24	589	Tidak Ada
42	13211042	ILMU KESEJAHTERAAN SOSIAL	Sarjana	24	873	Tidak Ada
43	13211043	ANTROPOLOGI SOSIAL	Sarjana	24	573	Tidak Ada
44	13211044	ILMU EKONOMI	Sarjana	45	1147	Tidak Ada
45	13211045	ILMU ADMINISTRASI NIAGA	Sarjana	50	1799	Tidak Ada
46	13211046	ILMU ADMINISTRASI FISKAL	Sarjana	50	1250	Tidak Ada
47	13211047	MANAJEMEN	Sarjana	90	2782	Tidak Ada
48	13211048	AKUNTANSI	Sarjana	90	2720	Tidak Ada
49	13211049	ILMU HUBUNGAN INTERNASIONAL	Sarjana	18	1281	Tidak Ada
50	13211050	ILMU PERPUSTAKAAN	Sarjana	24	608	Tidak Ada
51	13211051	ILMU FILSAFAT	Sarjana	24	363	Tidak Ada
52	13211052	SASTRA INDONESIA	Sarjana	24	519	Tidak Ada
53	13211053	SASTRA DAERAH UNTUK SASTRA JAWA	Sarjana	24	146	Tidak Ada
54	13211054	SASTRA JEPANG	Sarjana	24	821	Tidak Ada
55	13211055	SASTRA CINA	Sarjana	24	881	Tidak Ada
56	13211056	SASTRA ARAB	Sarjana	24	558	Tidak Ada
57	13211057	SASTRA PERANCIS	Sarjana	17	289	Tidak Ada
58	13211058	SASTRA INGGRIS	Sarjana	24	969	Tidak Ada
59	13211059	SASTRA JERMAN	Sarjana	17	441	Tidak Ada
60	13211060	SASTRA BELANDA	Sarjana	24	445	Tidak Ada
61	13211061	SASTRA RUSIA	Sarjana	24	310	Tidak Ada
62	13211062	BAHASA DAN KEBUDAYAAN KOREA	Sarjana	17	610	Tidak Ada
63	13211063	ILMU EKONOMI ISLAM	Sarjana	15	421	Tidak Ada
64	13211064	BISNIS ISLAM	Sarjana	15	625	Tidak Ada
65	13211080	KECERDASAN ARTIFISIAL	Sarjana	18	0	Tidak Ada
66	13212065	MANAJEMEN BISNIS PARIWISATA	Sarjana Terapan	47	2219	Tidak Ada
67	13212066	TERAPI OKUPASI	Sarjana Terapan	47	2173	Tidak Ada
68	13212067	FISIOTERAPI	Sarjana Terapan	47	2905	Tidak Ada
69	13212068	MANAJEMEN REKOD DAN ARSIP	Sarjana Terapan	47	2188	Tidak Ada
70	13212078	BISNIS KREATIF	Sarjana Terapan	47	4167	Tidak Ada
71	13212079	PRODUKSI MEDIA	Sarjana Terapan	47	3374	Tidak Ada
72	13213069	ADMINISTRASI PERPAJAKAN	Diploma Tiga	30	2965	Tidak Ada
73	13213070	ADMINISTRASI PERKANTORAN	Diploma Tiga	30	2389	Tidak Ada
74	13213071	ADMINISTRASI RUMAH SAKIT	Diploma Tiga	30	3016	Tidak Ada
75	13213072	PENYIARAN MULTIMEDIA	Diploma Tiga	30	2908	Tidak Ada
76	13213073	ADMINISTRASI ASURANSI & AKTUARIA	Diploma Tiga	30	1846	Tidak Ada
77	13213074	HUBUNGAN MASYARAKAT	Diploma Tiga	30	4950	Tidak Ada
78	13213075	PERIKLANAN KREATIF	Diploma Tiga	30	2943	Tidak Ada
79	13213076	AKUNTANSI	Diploma Tiga	30	3364	Tidak Ada
80	13213077	ADMINISTRASI KEUANGAN DAN PERBANKAN	Diploma Tiga	30	2767	Tidak Ada`;

function normalizeStr(str) {
  if (!str) return '';
  return str.toLowerCase().replace(/[^a-z0-9]/g, '');
}

async function run() {
  console.log('Injecting real capacity data for Universitas Indonesia...');
  const uni = await prisma.university.findFirst({
    where: { name: 'Universitas Indonesia' },
    include: { majors: true }
  });

  if (!uni) {
    console.error('UI not found in DB');
    process.exit(1);
  }

  const lines = rawData.split('\n');
  let updateCount = 0;

  for (const line of lines) {
    if (!line.trim()) continue;
    const parts = line.split('\t');
    if (parts.length >= 6) {
      const prodiName = parts[2].trim();
      let capacity = parseInt(parts[4].trim()) || 0;
      let applicants = parseInt(parts[5].trim()) || 0;

      // Note: Kecerdasan Artifisial in user data had an empty applicants cell. Handle NaN
      if (isNaN(applicants)) applicants = 0;
      
      // fuzzy search major
      const matchedMajor = uni.majors.find(m => normalizeStr(m.name) === normalizeStr(prodiName));
      if (matchedMajor) {
        const latestStat = await prisma.statistic.findFirst({
          where: { majorId: matchedMajor.id },
          orderBy: { year: 'desc' }
        });

        if (latestStat) {
          await prisma.statistic.update({
            where: { id: latestStat.id },
            data: {
              capacity,
              applicants
            }
          });
          updateCount++;
          console.log(`Updated ${prodiName} => Capacity: ${capacity}, Applicants: ${applicants}`);
        }
      } else {
        console.warn(`Major not found in DB: ${prodiName}`);
      }
    }
  }

  console.log(`Successfully updated ${updateCount} UI majors with exact scraped capacities.`);
  await prisma.$disconnect();
}

run();
