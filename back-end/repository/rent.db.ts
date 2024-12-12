import { Bike } from "../model/Bike";
import { Rent } from "../model/Rent";
import { RentInput, RentInputUpdate } from "../types";
import database from "../util/database";

const getAllRents = async (): Promise<Rent[]> => {
    try {
        const rentsPrisma = await database.rent.findMany({
            include: {bike: true, user: true},
        });
        return rentsPrisma.map((rentPrisma) => Rent.from(rentPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};
const getRentById = async ({ id }: { id: number }): Promise<Rent | null> => {
    try {
        const rentPrisma = await database.rent.findUnique({
            where: { id },
            include: { bike: true, user: true },
        });

        return rentPrisma ? Rent.from(rentPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createRent = async (rent: Rent): Promise<Rent> => {
    try {
        const rentPrisma = await database.rent.create({
            data: {
                startDate: rent.getStartDate(),
                returned: rent.getReturned(),
                cost: rent.getCost(),
                bike: {
                    connect: {id: rent.getBike().getId()}
                },
                user: {
                    connect: {id: rent.getUser().getId()}
                },
                accessories: {
                    connect: rent.getAccessories().map(accessory => ({id: accessory.getId()}))
                },
            },
            include:{
                bike: true,
                user: true,
                accessories: true
            }});
    
        return Rent.from(rentPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateRentById = async (rent: RentInputUpdate,id:number): Promise<Rent> =>{
    try{
        // console.log("Updating rent with id:", id);
        // console.log("Rent data:", rent);
        const rentPrisma = await database.rent.update({
            where:{
                id:id
            },
            data:{
                startDate: rent.startDate,
                returned: rent.returned,
                cost: rent.cost,
                bike: {
                    connect: {id: rent.bike.id}
                },
                user: {
                    connect: {id: rent.user.id}
                },
                accessories: {
                    connect: (rent.accessoriesIdList || []).map(accId => ({ id: accId })),
                },
                
            },
            include: {
                bike: true,
                user: true,
                accessories: true
            }
        });
        return Rent.from(rentPrisma);
    }catch(error){
        console.log("Error occurred while updating rent by given id.");
        console.log(error)
        throw error;
    }
}

const deleteRentById = async (id : number) : Promise<Rent> => {
    try {
        const rentToDelete = await database.rent.delete({
            where: {
                id: id,
            },
            include: {
                bike: true,
                user: true,
                accessories: true
            }
        });
        return Rent.from(rentToDelete);
    } catch (error) {
        console.log("Error occurred while deleting rent by id.")
        throw error;
    };
};

export default {
    getAllRents,
    getRentById,
    createRent,
    updateRentById,
    deleteRentById
};
