import { Rent } from "../model/Rent";
import bikeDb from "../repository/bike.db";
import rentDb from "../repository/rent.db";
import { RentInput } from "../types";

const getAllRents = (): Rent[] => rentDb.getAllrents();

const getRentById = (id: number): Rent => {
    const rent = rentDb.getRentById({ id });
    if (!rent) throw new Error(`rent with id: ${id} does not exist.`);
    return rent;
};

const rentAbike = ({startDate,endDate,cost,bike:bikeInput}:RentInput):Rent =>{
    if(!bikeInput)throw new Error(`No bike input.`)

    if(bikeInput.id === undefined) throw new Error(`Id is required. ${bikeInput.id}`);

    const bike = bikeDb.getBikeById({id : bikeInput.id})
    if(!bike) throw new Error(`Bike with given Id not found.`)

    if (!startDate || !endDate) {
        throw new Error('Start and end date are required');
    }
    
    const rent = new Rent({startDate,endDate,cost,bike: bike});
    return rentDb.createRent(rent);

}

export default { getAllRents, getRentById, rentAbike };
