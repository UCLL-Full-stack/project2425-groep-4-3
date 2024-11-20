const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // Create some bikes
  const bike1 = await prisma.bike.create({
    data: {
      brand: 'Giant',
      model: 'Escape 3',
      location: 'New York',
      Size: 'M',
      cost: 500,
    },
  });

  const bike2 = await prisma.bike.create({
    data: {
      brand: 'Trek',
      model: 'FX 3 Disc',
      location: 'San Francisco',
      Size: 'L',
      cost: 700,
    },
  });

  const bike3 = await prisma.bike.create({
    data: {
      brand: 'Specialized',
      model: 'Sirrus 2.0',
      location: 'Chicago',
      Size: 'S',
      cost: 600,
    },
  });

  // Create some rents
  const rent1 = await prisma.rent.create({
    data: {
      startDate: new Date('2023-01-01T00:00:00.000Z'),
      endDate: new Date('2023-01-05T00:00:00.000Z'),
      cost: 100,
      bike: { connect: { id: bike1.id } },
    },
  });

  const rent2 = await prisma.rent.create({
    data: {
      startDate: new Date('2023-02-01T00:00:00.000Z'),
      endDate: new Date('2023-02-03T00:00:00.000Z'),
      cost: 50,
      bike: { connect: { id: bike2.id } },
    },
  });

  const rent3 = await prisma.rent.create({
    data: {
      startDate: new Date('2023-03-01T00:00:00.000Z'),
      endDate: new Date('2023-03-07T00:00:00.000Z'),
      cost: 200,
      bike: { connect: { id: bike3.id } },
    },
  });

  console.log({ bike1, bike2, bike3, rent1, rent2, rent3 });
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
