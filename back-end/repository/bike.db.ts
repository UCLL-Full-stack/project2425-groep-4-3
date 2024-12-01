import { run } from "node:test";
import { Bike } from "../model/Bike";
import database from "../util/database";


const getAllBikes = async (): Promise<Bike[]> => {
  try {
      const bikesPrisma = await database.bike.findMany();
      return bikesPrisma.map((bikePrisma) => Bike.from(bikePrisma));
  } catch (error) {
      console.error(error);
      throw new Error('Database error. See server log for details.');
  }
};

const getBikeById = async ({ id }: { id: number }): Promise<Bike | null> => {
  try {
      const bikePrisma = await database.bike.findUnique({
          where: { id },
      });

      return bikePrisma ? Bike.from(bikePrisma) : null;
  } catch (error) {
      console.error(error);
      throw new Error('Database error. See server log for details.');
  }
};

const createBike = async (bike: Bike): Promise<Bike> => {
  try {
      const bikePrisma = await database.bike.create({
          data: {
                  brand: bike.getBrand(),
                  model: bike.getModel(),
                  location: bike.getLocation(),
                  size: bike.getSize(),
                  cost: bike.getCost()
          },
      });
      return Bike.from(bikePrisma);
  } catch (error) {
      console.error(error);
      throw new Error('Database error. See server log for details.');
  }
};


export default {
    getAllBikes,
    getBikeById,
    createBike
    // updateBike
};
