import { User } from "@prisma/client";
import { Bike } from "../model/Bike";
import bikeDb from "../repository/bike.db";
import { BikeInput, Role } from "../types";
import userDb from "../repository/user.db";
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
}: BikeInput): Promise<Bike> =>{//role : string
    // if(role === "owner" || role === "admin"){
        const bike = new Bike({brand,model,location,size,cost});
        return await bikeDb.createBike(bike)
    // }
    // else{
    //     throw new Error("You don't have permission to do this.")
    // }
}

const updateBikeById = async(bike : BikeInput,id:number): Promise<Bike> =>{
    const bikeUpdate = await getBikeById(id);
    if(!bikeUpdate){
        throw new Error(`No bike with id: ${id} found`)
    }
    return await bikeDb.updateBikeById(bike,id);
}

const deleteBikeById = async (id: number): Promise<Bike> => {
    const foundBike = await bikeDb.getBikeById({id});    
    if (!foundBike) {
        throw new Error(`No bike with id ${id} found.`);
    };

    const bikeToDelete = await bikeDb.deleteBikeById(id);
    return bikeToDelete;
};
export default { getAllBikes, getBikeById, createBike,updateBikeById,deleteBikeById };
