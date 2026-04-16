const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const univs = await prisma.university.findMany({
    where: {
      name: { contains: 'Gadjah' }
    }
  });
  console.log(univs);
  
  const stats = await prisma.statistic.findFirst();
  console.log('Sample stat year:', stats ? stats.year : 'no stats');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
