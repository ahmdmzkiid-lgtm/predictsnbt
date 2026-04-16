import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    console.log("Menemukan prodi dengan nama 'teknik' dan menaikkan skornya sebesar 30...");
    
    const majors = await prisma.major.findMany({
        where: {
            name: {
                contains: 'teknik',
                mode: 'insensitive'
            }
        },
        include: {
            statistics: true
        }
    });

    console.log(`Ditemukan ${majors.length} prodi teknik. Memperbarui skor...`);

    let updatedStatCount = 0;

    for (const major of majors) {
        for (const stat of major.statistics) {
            await prisma.statistic.update({
                where: { id: stat.id },
                data: {
                    minScore: stat.minScore + 30
                }
            });
            updatedStatCount++;
        }
    }

    console.log(`Berhasil! ${updatedStatCount} rekam data statistik telah diperbarui (skor naik 30).`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
