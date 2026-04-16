import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const u = await prisma.university.findFirst({where:{name:{contains:'Indonesia'}}});
    
    // Check if it's already renamed
    const alreadyRenamed = await prisma.major.findFirst({where:{universityId:u.id, name:'Kedokteran'}});
    
    if (!alreadyRenamed) {
        await prisma.major.updateMany({where:{universityId:u.id, name:'Pendidikan Dokter'}, data:{name:'Kedokteran'}});
        await prisma.major.updateMany({where:{universityId:u.id, name:'Pendidikan Dokter Gigi'}, data:{name:'Kedokteran Gigi'}});
        console.log('Renamed UI Doctors');
    } else {
        console.log('Already renamed');
    }
    
    await prisma.$disconnect();
}
main();
