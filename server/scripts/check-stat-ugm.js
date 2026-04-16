import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const u = await prisma.university.findFirst({where:{name:{contains:'Gadjah'}}});
    const majors = await prisma.major.findMany({where:{universityId:u.id}, include:{statistics:{orderBy:{year:'desc'}, take:1}}});
    
    // Print a few to check
    for (let i = 0; i < 5; i++) {
        const m = majors[i];
        if (m) console.log(`${m.name}: Capacity -> ${m.statistics[0]?.capacity}, Year -> ${m.statistics[0]?.year}, minScore -> ${m.statistics[0]?.minScore}`);
    }
    await prisma.$disconnect();
}
main();
