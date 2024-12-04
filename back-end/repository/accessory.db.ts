import { Accessory } from "../model/Accessory";

const accessories = [
    new Accessory({
        accessoryId: 0,
        name: "Helmet",
        amount: 10,
        cost: 10,
    }),
    new Accessory({
        accessoryId: 1,
        name: "Lock",
        amount: 20,
        cost: 5,
    }),
    new Accessory({
        accessoryId: 2,
        name: "Lights",
        amount: 15,
        cost: 3,
    }),
    new Accessory({
        accessoryId: 3,
        name: "Bottle",
        amount: 5,
        cost: 2,
    })
]
const getAllAccessories = (): Accessory[] => accessories;

const getAccessoryById = ({ id }: { id: number }): Accessory | null => {
    return accessories.find((Accessory) => Accessory.getId() === id) || null;
};

export default {
    getAllAccessories,
    getAccessoryById,
};
