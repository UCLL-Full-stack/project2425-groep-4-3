import { Bike } from "../model/Bike";
import { Rent } from "../model/Rent";

const rents: Rent[] = []
// let rents = [
//     new Rent({
//         rentId: 0,
//         startDate: new Date('2022-01-01'),
//         endDate: new Date('2022-01-07'),
//         cost: 100,
//         bike: new Bike({
//             bikeId: 0,
//             brand: "Trek",
//             model: "Domane AL 2",
//             location: "Brussels",
//             size: "M",
//             cost: 25,
//           })
//     }),
//     new Rent({
//         rentId: 1,
//         startDate: new Date('2022-01-10'),
//         endDate: new Date('2022-01-15'),
//         cost: 150
//     }),
//     new Rent({
//         rentId: 2,
//         startDate: new Date('2022-02-01'),
//         endDate: new Date('2022-02-05'),
//         cost: 120,
//         bike: new Bike({
//             bikeId: 1,
//             brand: "Giant",
//             model: "Escape 3",
//             location: "Antwerp",
//             size: "L",
//             cost: 30,
//           }),
//     })
// ];


const getAllrents = (): Rent[] => rents;

const getRentById = ({ id }: { id: number }): Rent | null => {
    return rents.find((Rent) => Rent.getId() === id) || null;
};

const createRent = (rent: Rent) =>{
    rents.push(rent);
    return rent;
}

export default {
    getAllrents,
    getRentById,
    createRent
};
