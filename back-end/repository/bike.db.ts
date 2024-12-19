import { run } from "node:test";
import { Bike } from "../model/Bike";
import database from "../util/database";
import { BikeInput } from "../types";


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

const updateBikeById = async(bike : BikeInput,id : number): Promise<Bike> =>{
    try{
        const bikePrisma = await database.bike.update({
            where:{
                id:id
            },
            data:{
                brand: bike.brand,
                model: bike.model,
                location: bike.location,
                size:bike.size,
                cost:bike.cost
            }
        })
        return Bike.from(bikePrisma);
    }catch(error){
        throw error
    }
}

const deleteBikeById = async (id : number) : Promise<Bike> => {
    try {
        const bikeToDelete = await database.bike.delete({
            where: {
                id: id,
            }
        });
        return Bike.from(bikeToDelete);
    } catch (error) {
        console.log("Error occurred while deleting bike by id.")
        throw error;
    };
};

export default {
    getAllBikes,
    getBikeById,
    createBike,
    updateBikeById,
    deleteBikeById
};
