import e from "express";
import { Accessory } from "../model/Accessory";
import accessoryDb from "../repository/accessory.db";

const getAllAccessories = (): Accessory[] => accessoryDb.getAllAccessories();

const getAccessoryById = (id: number): Accessory => {
    const accessory = accessoryDb.getAccessoryById({ id });
    if (!accessory) throw new Error(`Accessory with id: ${id} does not exist.`);
    return accessory;
};

export default { getAllAccessories, getAccessoryById };