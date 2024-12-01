const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create some bikes
  const bike1 = await prisma.bike.create({
    data: {
      brand: 'Giant',
      model: 'Escape 3',
      location: 'New York',
      size: 'M',
      cost: 500,
    },
  });

  const bike2 = await prisma.bike.create({
    data: {
      brand: 'Trek',
      model: 'FX 3 Disc',
      location: 'San Francisco',
      size: 'L',
      cost: 700,
    },
  });

  const bike3 = await prisma.bike.create({
    data: {
      brand: 'Specialized',
      model: 'Sirrus 2.0',
      location: 'Chicago',
      size: 'S',
      cost: 600,
    },
  });

  // Create some rents
  const rent1 = await prisma.rent.create({
    data: {
      startDate: new Date('2025-01-01T00:00:00.000Z'),
      returned: true,
      cost: 100,
      bike: { connect: { id: bike1.id } },
    },
  });

  const rent2 = await prisma.rent.create({
    data: {
      startDate: new Date('2025-02-01T00:00:00.000Z'),
      returned: false,
      cost: 50,
      bike: { connect: { id: bike2.id } },
    },
  });

  console.log({ bike1, bike2, bike3, rent1, rent2 });
}

(async () => {
  try {
    await main();
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
})();
