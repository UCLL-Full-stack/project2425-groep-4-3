import { Rent } from "../model/Rent";
import accessoryDb from "../repository/accessory.db";
import bikeDb from "../repository/bike.db";
import rentDb from "../repository/rent.db";
import userDb from "../repository/user.db";
import { RentInput, RentInputCreate, RentInputUpdate } from "../types";

const getAllRents = async (): Promise<Rent[]> => rentDb.getAllRents();

const getRentById = async (id: number): Promise<Rent> => {
    const rent = await rentDb.getRentById({ id });
    if (!rent) throw new Error(`rent with id: ${id} does not exist.`);
    return rent;
};

const updateRent = async (rent : RentInputUpdate ,id:number): Promise<Rent> =>{
    const rentUpdate = await getRentById(id);
    if (rentUpdate == null || undefined) {
        throw new Error(`No rent with id ${id} found.`);
    };
    console.log(rent,rentUpdate)
    return await rentDb.updateRentById(rent,id);
}

const rentAbike = async ({startDate, returned, cost, bike, userName, accessoriesIdList}: RentInputCreate): Promise<Rent> => {
    const todaysDate = new Date();
    const accessoriesList = [];

    if(startDate < todaysDate){
        throw new Error('Start date cannot be in the past.');
    }
    const bikeInput = await bikeDb.getBikeById({id : bike.id});
    const userInput = await userDb.getUserByUsername({name : userName});

    for (const accessoryId of accessoriesIdList) {
        const accessory = await accessoryDb.getAccessoryById({ id: accessoryId });
        if (!accessory) {
            throw new Error(`Accessory with id ${accessoryId} does not exist.`);
        }
        accessoriesList.push(accessory);
    }
    if(!bikeInput)throw new Error(`No bike input wit id ${bike.id}.`)
    if(!userInput)throw new Error(`No user input wit id ${userName}.`)
    
    const rents = await getAllRents()
    const bikeIds = rents.map(rent => rent.getBike().getId());
    if(bikeIds.includes(bike.id)){
        throw new Error(`Bike with ${bike.id} is already rented.`)
    }

    const rent = new Rent({startDate,returned,cost,bike: bikeInput, user: userInput, accessories: accessoriesList});
    return await rentDb.createRent(rent);
}

const deleteRentById = async (id: number): Promise<Rent> => {
    const foundRent = await rentDb.getRentById({id});    
    if (foundRent == null || undefined) {
        throw new Error(`No rent with id ${id} found.`);
    };

    const rentToDelete = await rentDb.deleteRentById(id);
    return rentToDelete;
};

export default { getAllRents, getRentById, rentAbike,updateRent, deleteRentById};
