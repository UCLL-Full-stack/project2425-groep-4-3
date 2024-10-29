import { Rent } from "../model/Rent";
import rentDb from "../repository/rent.db";

const getAllRents = (): Rent[] => rentDb.getAllrents();

const getRentById = (id: number): Rent => {
    const rent = rentDb.getRentById({ id });
    if (!rent) throw new Error(`rent with id ${id} does not exist.`);
    return rent;
};

export default { getAllRents, getRentById };
