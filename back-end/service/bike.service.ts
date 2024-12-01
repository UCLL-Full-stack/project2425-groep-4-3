import { Bike } from "../model/Bike";
import bikeDb from "../repository/bike.db";
import { BikeInput } from "../types";
const getAllBikes = async (): Promise<Bike[]> => bikeDb.getAllBikes();

const getBikeById = async (id: number): Promise<Bike | null> => {
    const bike = bikeDb.getBikeById({ id });
    if (!bike) throw new Error(`Bike with id: ${id} does not exist.`);
    return bike;
};

const createBike = async ({
    brand,
    model,
    location,
    size,
    cost
}: BikeInput): Promise<Bike> =>{
    const bike = new Bike({brand,model,location,size,cost});
    return await bikeDb.createBike(bike)
}


export default { getAllBikes, getBikeById, createBike };
