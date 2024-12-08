import { Accessory } from "../model/Accessory";
import database from "../util/database";

const getAllAccessories = async (): Promise<Accessory[]> => {
    try {
        const accessoriesPrisma = await database.accessory.findMany();
        return accessoriesPrisma.map((accessoryPrisma) => Accessory.from(accessoryPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getAccessoryById = async ({ id }: { id: number }): Promise<Accessory | null> => {
    try {
        const accessoryPrisma = await database.accessory.findUnique({
            where: { id },
        });

        return accessoryPrisma ? Accessory.from(accessoryPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const createAccessory = async (accessory: Accessory): Promise<Accessory> => {
    try {
        const accessoryPrisma = await database.accessory.create({
            data: {
                name: accessory.getName(),
                amount: accessory.getAmount(),
                cost: accessory.getCost(),
            },
        });

        return Accessory.from(accessoryPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllAccessories,
    getAccessoryById,
    createAccessory,
};
