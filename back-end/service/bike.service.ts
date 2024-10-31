import { Bike } from "../model/Bike";
import bikeDb from "../repository/bike.db";

const getAllBikes = (): Bike[] => bikeDb.getAllbikes();

const getBikeById = (id: number): Bike => {
    const rent = bikeDb.getBikeById({ id });
    if (!rent) throw new Error(`Bike with id: ${id} does not exist.`);
    return rent;
};

export default { getAllBikes, getBikeById };
