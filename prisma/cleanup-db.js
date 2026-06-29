const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Clearing all data from database...');
  
  // Delete all data in the correct order to avoid foreign key constraint issues
  await prisma.eventRecurrence.deleteMany({});
  await prisma.eventStyle.deleteMany({});
  await prisma.event.deleteMany({});
  await prisma.venue.deleteMany({});
  await prisma.level.deleteMany({});
  await prisma.style.deleteMany({});
  
  console.log('Database cleared successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });