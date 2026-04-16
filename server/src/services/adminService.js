import prisma from '../config/db.js';

// ====== Universities ======
export async function getUniversities() {
  return prisma.university.findMany({ orderBy: { name: 'asc' } });
}

export async function createUniversity(data) {
  return prisma.university.create({ data });
}

export async function updateUniversity(id, data) {
  return prisma.university.update({ where: { id: parseInt(id) }, data });
}

export async function deleteUniversity(id) {
  return prisma.university.delete({ where: { id: parseInt(id) } });
}

// ====== Majors ======
export async function getMajors(universityId) {
  const where = universityId ? { universityId: parseInt(universityId) } : {};
  return prisma.major.findMany({
    where,
    include: { university: true },
    orderBy: { name: 'asc' },
  });
}

export async function createMajor(data) {
  return prisma.major.create({ data: { ...data, universityId: parseInt(data.universityId) } });
}

export async function updateMajor(id, data) {
  return prisma.major.update({ where: { id: parseInt(id) }, data });
}

export async function deleteMajor(id) {
  return prisma.major.delete({ where: { id: parseInt(id) } });
}

// ====== Statistics ======
export async function getStatistics(majorId) {
  return prisma.statistic.findMany({
    where: { majorId: parseInt(majorId) },
    orderBy: { year: 'asc' },
  });
}

export async function createStatistic(data) {
  return prisma.statistic.create({ data: { ...data, majorId: parseInt(data.majorId) } });
}

export async function updateStatistic(id, data) {
  return prisma.statistic.update({ where: { id: parseInt(id) }, data });
}

export async function deleteStatistic(id) {
  return prisma.statistic.delete({ where: { id: parseInt(id) } });
}
