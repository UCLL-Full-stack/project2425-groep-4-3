import { Bike } from "../model/Bike";
import { Rent } from "../model/Rent";
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

export default {
    getAllRents,
    getRentById,
    createRent
};
