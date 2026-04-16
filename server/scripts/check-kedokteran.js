import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const u = await prisma.university.findFirst({where:{name:{contains:'Gadjah'}}});
    const majors = await prisma.major.findMany({where:{universityId:u.id, name:{contains:'Kedokt', mode:'insensitive'}}, include:{statistics:true}});
    console.log(JSON.stringify(majors, null, 2));
    await prisma.$disconnect();
}
main();
