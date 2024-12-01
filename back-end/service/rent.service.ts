import { Rent } from "../model/Rent";
import bikeDb from "../repository/bike.db";
import rentDb from "../repository/rent.db";
import { RentInput } from "../types";

const getAllRents = async (): Promise<Rent[]> => rentDb.getAllRents();

const getRentById = async (id: number): Promise<Rent> => {
    const rent = await rentDb.getRentById({ id });
    if (!rent) throw new Error(`rent with id: ${id} does not exist.`);
    return rent;
};

const rentAbike = async ({startDate,returned,cost,bikeId}:RentInput): Promise<Rent> =>{
    const todaysDate = new Date();
    if(startDate < todaysDate){
        throw new Error('Start date cannot be in the past.');
    }
    const bikeInput = await bikeDb.getBikeById({id : bikeId});
    if(!bikeInput)throw new Error(`No bike input wit id ${bikeId}.`)
    
    const rents = await getAllRents()
    const bikeIds = rents.map(rent => rent.getBike().getId());
    if(bikeIds.includes(bikeId)){
        throw new Error(`Bike with ${bikeId} is already rented.`)
    }
    const rent = new Rent({startDate,returned,cost,bike: bikeInput});
    return await rentDb.createRent(rent);
}

export default { getAllRents, getRentById, rentAbike };
