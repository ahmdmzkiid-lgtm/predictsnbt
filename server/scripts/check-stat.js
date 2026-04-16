import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const u = await prisma.university.findFirst({where:{name:{contains:'Gadjah'}}});
    const m = await prisma.major.findFirst({where:{universityId:u.id, name:'Kedokteran'}, include:{statistics:true}});
    console.log(JSON.stringify(m, null, 2));
    await prisma.$disconnect();
}
main();
