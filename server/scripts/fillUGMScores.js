import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to generate random score between min and max
const getRandomScore = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

async function main() {
    try {
        console.log("Looking up Universitas Gadjah Mada...");
        let ugm = await prisma.university.findFirst({
            where: {
                name: {
                    contains: "Gadjah",
                    mode: "insensitive"
                }
            }
        });

        if (!ugm) {
            console.log("UGM not found!");
            return;
        }

        console.log(`Found University: ${ugm.name} (ID: ${ugm.id})`);

        // Find all majors for UGM
        const ugmMajors = await prisma.major.findMany({
            where: {
                universityId: ugm.id
            },
            include: {
                statistics: true
            }
        });

        let updatedCount = 0;

        for (const major of ugmMajors) {
            for (const stat of major.statistics) {
                // If the score is 0 or less than 500, we update it
                if (!stat.minScore || stat.minScore < 500) {
                    const dummyScore = getRandomScore(580, 720); // main score
                    const tps = getRandomScore(550, dummyScore + 50);
                    const litBi = getRandomScore(550, dummyScore + 50);
                    const litBing = getRandomScore(550, dummyScore + 50);
                    const pm = getRandomScore(550, dummyScore + 50);
                    
                    // Also generate random applicants based on capacity so it doesn't look empty
                    // Usually applicants are maybe 10x - 50x capacity
                    const dummyApplicants = stat.applicants === 0 
                                            ? Math.floor(stat.capacity * (Math.random() * 20 + 5)) 
                                            : stat.applicants;

                    await prisma.statistic.update({
                        where: { id: stat.id },
                        data: {
                            minScore: dummyScore,
                            tpsScore: tps,
                            litBiScore: litBi,
                            litBingScore: litBing,
                            pmScore: pm,
                            applicants: dummyApplicants
                        }
                    });
                    
                    console.log(`Updated ${major.name}: Score -> ${dummyScore}, Applicants -> ${dummyApplicants}`);
                    updatedCount++;
                }
            }
        }
        
        console.log(`Successfully updated dummy scores for ${updatedCount} program studi!`);

    } catch (error) {
        console.error("Error updating scores:", error);
    } finally {
        await prisma.$disconnect();
    }
}

main();
