const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const styles = [
    "Salsa",
    "Salsa on1",
    "Salsa on2", 
    "Cuban Salsa",
    "Son",
    "Bachata",
    "Sensual Bachata",
    "Dominican Bachata",
    "Kizomba"
  ];

  console.log('Populating styles table...');
  
  for (const styleName of styles) {
    await prisma.style.create({
      data: {
        name: styleName,
      },
    });
  }
  
  console.log('Styles table populated successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });