const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const levels = [
    "Absolute Beginners",
    "Beginners", 
    "Beginners+",
    "Improvers",
    "Intermediate",
    "Advanced",
    "All Levels"
  ];

  console.log('Populating levels table...');
  
  for (const levelName of levels) {
    await prisma.level.create({
      data: {
        name: levelName,
      },
    });
  }
  
  console.log('Levels table populated successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });