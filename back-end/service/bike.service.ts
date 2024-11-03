import { Bike } from "../model/Bike";
import bikeDb from "../repository/bike.db";

const getAllBikes = (): Bike[] => bikeDb.getAllbikes();

const getBikeById = (id: number): Bike => {
    const bike = bikeDb.getBikeById({ id });
    if (!bike) throw new Error(`Bike with id: ${id} does not exist.`);
    return bike;
};

export default { getAllBikes, getBikeById };
