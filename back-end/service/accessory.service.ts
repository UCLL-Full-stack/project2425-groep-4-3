import e from "express";
import { Accessory } from "../model/Accessory";
import accessoryDb from "../repository/accessory.db";
import { AccessoryInput } from "../types";

const getAllAccessories = async (): Promise<Accessory[]> => accessoryDb.getAllAccessories();

const getAccessoryById = async (id: number): Promise<Accessory | null> => {
    const accessory = accessoryDb.getAccessoryById({ id });
    if (!accessory) throw new Error(`Accessory with id: ${id} does not exist.`);
    return accessory;
};

const createAccessory = async ({
    name,
    amount,
    cost
}: AccessoryInput): Promise<Accessory> =>{
    const accessory = new Accessory({name,amount,cost});
    return await accessoryDb.createAccessory(accessory)
}

export default { getAllAccessories, getAccessoryById, createAccessory};