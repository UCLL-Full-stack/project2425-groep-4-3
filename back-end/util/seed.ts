const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

async function main() {
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

  const user1 = await prisma.user.create({
    data: {
      name: 'Sander',
      email: 'Sander@gmail.com',
      age: 20,
      role: 'Owner',
      password: await bcrypt.hash("Sander123", 12),
    }
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Niels',
      email: 'Niels@gmail.com',
      age: 20,
      role: 'Admin',
      password: 'Niels123',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'Remco',
      email: 'Remco@gmail.com',
      age: 25,
      role: 'Renter',
      password: 'Remco123',
    },
  });

  const user4 = await prisma.user.create({
    data: {
      name: 'Wout',
      email: 'Wout@gmail.com',
      age: 25,
      role: 'Renter',
      password: 'Wout123',
    },
  });

  const accessory1 = await prisma.accessory.create({
    data: {
      name: 'Helmet',
      amount: 50,
      cost: 25,
    },
  });

  const accessory2 = await prisma.accessory.create({
    data: {
      name: 'Lock',
      amount: 100,
      cost: 15,
    },
  });

  const accessory3 = await prisma.accessory.create({
    data: {
      name: 'Lights',
      amount: 75,
      cost: 20,
    },
  });

  const rent1 = await prisma.rent.create({
    data: {
      startDate: new Date('2025-01-01T00:00:00.000Z'),
      returned: true,
      cost: 100,
      bike: { connect: { id: bike1.id } },
      user: { connect: { id: user3.id } },
      accessories: {
        connect: [{ id: accessory1.id }, { id: accessory2.id }],
      },
    },
  });

  const rent2 = await prisma.rent.create({
    data: {
      startDate: new Date('2025-02-01T00:00:00.000Z'),
      returned: false,
      cost: 50,
      bike: { connect: { id: bike2.id } },
      user: { connect: { id: user4.id } },
      accessories: {
        connect: [{ id: accessory3.id }],
      },
    },
  });

  console.log({
    bike1,
    bike2,
    bike3,
    user1,
    user2,
    user3,
    user4,
    rent1,
    rent2,
    accessory1,
    accessory2,
    accessory3,
  });
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
