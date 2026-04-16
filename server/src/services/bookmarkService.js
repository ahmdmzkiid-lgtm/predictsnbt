import prisma from '../config/db.js';

export async function getBookmarks(userId) {
  const bookmarks = await prisma.bookmark.findMany({
    where: { userId },
    include: {
      major: {
        include: {
          university: true,
          statistics: { orderBy: { year: 'desc' }, take: 1 },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  return bookmarks.map(b => {
    const stat = b.major.statistics[0] || {};
    return {
      bookmarkId: b.id,
      majorId: b.major.id,
      majorName: b.major.name,
      university: b.major.university.name,
      minScore: stat.minScore || 0,
      category: b.major.category,
      createdAt: b.createdAt,
    };
  });
}

export async function addBookmark(userId, majorId) {
  const existing = await prisma.bookmark.findUnique({
    where: { userId_majorId: { userId, majorId: parseInt(majorId) } },
  });
  if (existing) {
    const err = new Error('Prodi sudah di-bookmark');
    err.status = 400;
    throw err;
  }

  return prisma.bookmark.create({
    data: { userId, majorId: parseInt(majorId) },
  });
}

export async function removeBookmark(userId, majorId) {
  return prisma.bookmark.delete({
    where: { userId_majorId: { userId, majorId: parseInt(majorId) } },
  });
}
