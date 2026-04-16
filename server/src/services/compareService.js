import prisma from '../config/db.js';

export async function compareMajors(majorIds) {
  if (!majorIds || majorIds.length < 2 || majorIds.length > 3) {
    const err = new Error('Pilih 2-3 prodi untuk dibandingkan');
    err.status = 400;
    throw err;
  }

  const majors = await prisma.major.findMany({
    where: { id: { in: majorIds.map(Number) } },
    include: {
      university: true,
      statistics: {
        orderBy: { year: 'desc' },
        take: 1,
      },
    },
  });

  if (majors.length !== majorIds.length) {
    const err = new Error('Satu atau lebih prodi tidak ditemukan');
    err.status = 404;
    throw err;
  }

  return majors.map(m => {
    const stat = m.statistics[0] || {};
    const ratio = stat.capacity ? stat.applicants / stat.capacity : 0;
    let level = 'Aman';
    if (ratio > 10) level = 'Ambisius';
    else if (ratio > 5) level = 'Menengah';

    return {
      id: m.id,
      name: m.name,
      category: m.category,
      accreditation: m.accreditation,
      degree: m.degree,
      estimatedUkt: m.estimatedUkt,
      university: m.university.name,
      city: m.university.city,
      minScore: stat.minScore || 0,
      applicants: stat.applicants || 0,
      capacity: stat.capacity || 0,
      ratio: Math.round(ratio * 100) / 100,
      level,
    };
  });
}
