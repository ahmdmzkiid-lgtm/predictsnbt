import prisma from '../config/db.js';
import { UI_OVERRIDES } from '../utils/uiOverrides.js';

export async function searchMajors({ query, university, category, province, accreditation, degree, page = 1, limit = 20, sort = 'name', order = 'asc' }) {
  const where = {};
  const filters = [];

  if (query) {
    filters.push({
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { university: { name: { contains: query, mode: 'insensitive' } } },
      ],
    });
  }

  if (university) {
    filters.push({ university: { name: { contains: university, mode: 'insensitive' } } });
  }

  if (category) {
    filters.push({ category: category.toUpperCase() });
  }

  if (province) {
    filters.push({ university: { province: { contains: province, mode: 'insensitive' } } });
  }

  if (accreditation) {
    filters.push({ accreditation });
  }

  if (degree) {
    filters.push({ degree });
  }

  if (filters.length > 0) {
    where.AND = filters;
  }

  // Build orderBy
  let orderBy = {};
  if (sort === 'university') {
    orderBy = { university: { name: order } };
  } else if (sort === 'minScore') {
    // We'll sort in JS after fetching since it's a relation
    orderBy = { name: order };
  } else {
    orderBy = { [sort]: order };
  }

  const skip = (page - 1) * limit;

  const [majors, total] = await Promise.all([
    prisma.major.findMany({
      where,
      include: {
        university: true,
        statistics: {
          orderBy: { year: 'desc' },
          take: 1,
        },
      },
      orderBy,
      skip,
      take: limit,
    }),
    prisma.major.count({ where }),
  ]);

  const results = majors.map((m) => {
    const latestStat = m.statistics[0] || {};
    const ratio = latestStat.capacity ? (latestStat.applicants / latestStat.capacity) : 0;
    let level = 'Aman';
    if (ratio > 10) level = 'Ambisius';
    else if (ratio > 5) level = 'Menengah';

    let overridenMinScore = latestStat.minScore || 0;
    if (m.university.name.toLowerCase() === 'universitas indonesia') {
      const normalizeName = m.name.toLowerCase().trim();
      if (UI_OVERRIDES[normalizeName]) {
        overridenMinScore = UI_OVERRIDES[normalizeName];
      }
    }

    return {
      id: m.id,
      name: m.name,
      category: m.category,
      accreditation: m.accreditation,
      degree: m.degree,
      university: m.university.name,
      universityCity: m.university.city,
      province: m.university.province,
      minScore: overridenMinScore,
      applicants: latestStat.applicants || 0,
      capacity: latestStat.capacity || 0,
      ratio: Math.round(ratio * 100) / 100,
      level,
      year: latestStat.year || 2024,
    };
  });

  // Sort by minScore if requested
  if (sort === 'minScore') {
    results.sort((a, b) => order === 'asc' ? a.minScore - b.minScore : b.minScore - a.minScore);
  }

  return {
    data: results,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getMajorDetail(id) {
  const major = await prisma.major.findUnique({
    where: { id: parseInt(id) },
    include: {
      university: true,
      statistics: {
        orderBy: { year: 'asc' },
      },
    },
  });

  if (!major) {
    const err = new Error('Prodi tidak ditemukan');
    err.status = 404;
    throw err;
  }

  const latestStat = major.statistics[major.statistics.length - 1] || {};
  const ratio = latestStat.capacity ? (latestStat.applicants / latestStat.capacity) : 0;
  let level = 'Aman';
  if (ratio > 10) level = 'Ambisius';
  else if (ratio > 5) level = 'Menengah';

  return {
    id: major.id,
    name: major.name,
    category: major.category,
    accreditation: major.accreditation,
    degree: major.degree,
    estimatedUkt: major.estimatedUkt,
    university: {
      id: major.university.id,
      name: major.university.name,
      city: major.university.city,
      province: major.university.province,
    },
    statistics: major.statistics.map((s) => ({
      year: s.year,
      minScore: s.minScore,
      applicants: s.applicants,
      capacity: s.capacity,
      tpsScore: s.tpsScore,
      litBiScore: s.litBiScore,
      litBingScore: s.litBingScore,
      pmScore: s.pmScore,
    })),
    latestRatio: Math.round(ratio * 100) / 100,
    level,
  };
}

export async function getSimilarMajors(majorId) {
  const current = await prisma.major.findUnique({
    where: { id: parseInt(majorId) },
    include: {
      statistics: { orderBy: { year: 'desc' }, take: 1 },
    },
  });

  if (!current) {
    const err = new Error('Prodi tidak ditemukan');
    err.status = 404;
    throw err;
  }

  const currentMinScore = current.statistics[0]?.minScore || 0;
  const MAX_RESULTS = 6;

  function formatCandidate(m) {
    const stat = m.statistics[0] || {};
    const ratio = stat.capacity ? stat.applicants / stat.capacity : 0;
    let level = 'Aman';
    if (ratio > 10) level = 'Ambisius';
    else if (ratio > 5) level = 'Menengah';
    return {
      id: m.id,
      name: m.name,
      degree: m.degree,
      accreditation: m.accreditation,
      category: m.category,
      university: m.university.name,
      universityCity: m.university.city,
      minScore: stat.minScore || 0,
      capacity: stat.capacity || 0,
      applicants: stat.applicants || 0,
      level,
    };
  }

  function filterAndSort(candidates) {
    return candidates
      .filter(m => {
        const score = m.statistics[0]?.minScore || 0;
        return score > 0 && score < currentMinScore;
      })
      .map(formatCandidate)
      .sort((a, b) => b.minScore - a.minScore);
  }

  // Tier 1: Same/similar program name (prioritize finding the exact same major anywhere)
  const exactMatches = await prisma.major.findMany({
    where: {
      name: { contains: current.name, mode: 'insensitive' },
      id: { not: current.id },
    },
    include: {
      university: true,
      statistics: { orderBy: { year: 'desc' }, take: 1 },
    },
  });

  const results = filterAndSort(exactMatches);

  // Tier 2: If not enough, fill with same category + same accreditation
  if (results.length < MAX_RESULTS) {
    const usedIds = new Set([current.id, ...results.map(r => r.id)]);

    const categoryMatches = await prisma.major.findMany({
      where: {
        category: current.category,
        accreditation: current.accreditation,
        id: { notIn: Array.from(usedIds) },
      },
      include: {
        university: true,
        statistics: { orderBy: { year: 'desc' }, take: 1 },
      },
    });

    const extra = filterAndSort(categoryMatches);
    const remaining = MAX_RESULTS - results.length;
    results.push(...extra.slice(0, remaining));
  }

  return results.slice(0, MAX_RESULTS);
}

export async function getFilterOptions() {
  const [universities, provinces] = await Promise.all([
    prisma.university.findMany({
      select: { name: true },
      orderBy: { name: 'asc' },
    }),
    prisma.university.findMany({
      select: { province: true },
      distinct: ['province'],
      orderBy: { province: 'asc' },
    }),
  ]);

  return {
    universities: universities.map(u => u.name),
    provinces: provinces.map(p => p.province),
    categories: ['SAINTEK', 'SOSHUM', 'CAMPURAN'],
    accreditations: ['Unggul', 'A', 'Baik Sekali', 'B', 'Baik', 'C'],
    degrees: ['S1', 'D4', 'D3'],
  };
}
