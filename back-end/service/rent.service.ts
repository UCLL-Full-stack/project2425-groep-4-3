import { Rent } from "../model/Rent";
import bikeDb from "../repository/bike.db";
import rentDb from "../repository/rent.db";

const getAllRents = (): Rent[] => rentDb.getAllrents();

const getRentById = (id: number): Rent => {
    const rent = rentDb.getRentById({ id });
    if (!rent) throw new Error(`rent with id: ${id} does not exist.`);
    return rent;
};

const rentABike = (bikeId: number,rentId: number): Rent =>{
    const bike = bikeDb.getBikeById({id: bikeId});
    const rent = getRentById(rentId);
    if(rent.getBike() == undefined && bike ){
        rent.setBike(bike);
    }
    else{
        throw new Error(`Bike is already in use.`)
    }
    return rent;
}

export default { getAllRents, getRentById, rentABike };
