import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    try {
        console.log("Looking up Universitas Indonesia...");
        const univ = await prisma.university.findFirst({
            where: {
                name: { contains: "Indonesia", mode: "insensitive" }
            }
        });

        if (!univ) {
            console.log("UI not found!");
            return;
        }

        console.log(`Found University: ${univ.name} (ID: ${univ.id})`);

        const major = await prisma.major.findFirst({
            where: {
                universityId: univ.id,
                name: { equals: "Kedokteran", mode: "insensitive" }
            }
        });

        if (!major) {
            console.log("Major 'Kedokteran' not found at UI!");
            const allMajors = await prisma.major.findMany({
                where: { universityId: univ.id },
                select: { name: true }
            });
            console.log("Available majors:", allMajors.map(m => m.name).join(", "));
            return;
        }

        console.log(`Updating ${major.name} (ID: ${major.id}) to 'Pendidikan Dokter'...`);
        
        await prisma.major.update({
            where: { id: major.id },
            data: { name: "Pendidikan Dokter" }
        });

        console.log("Update successful!");

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
