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

const rentAbike = async ({startDate,returned,cost,bike:bikeInput}:RentInput): Promise<Rent> =>{
    if(!bikeInput)throw new Error(`No bike input.`)

    if(bikeInput.id === undefined || bikeInput.id === null) throw new Error(`Id is required. ${bikeInput.id}`);

    const bike = await bikeDb.getBikeById({id : bikeInput.id})
    if(!bike) throw new Error(`Bike with given Id not found.`)
    
    const rent = new Rent({startDate,returned,cost,bike: bike});
    return await rentDb.createRent(rent);

}

export default { getAllRents, getRentById, rentAbike };
