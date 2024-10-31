import { Bike } from "../model/Bike";
import { Rent } from "../model/Rent";


let rents = [
    new Rent({
        rentId: 0,
        startDate: new Date('2022-01-01'),
        endDate: new Date('2022-01-07'),
        cost: 100
    }),
    new Rent({
        rentId: 1,
        startDate: new Date('2022-01-10'),
        endDate: new Date('2022-01-15'),
        cost: 150
    }),
    new Rent({
        rentId: 2,
        startDate: new Date('2022-02-01'),
        endDate: new Date('2022-02-05'),
        cost: 120,
        bike: new Bike({
            bikeId: 1,
            brand: "Giant",
            model: "Escape 3",
            location: "Antwerp",
            size: "L",
            cost: 30,
          }),
    })
];


const getAllrents = (): Rent[] => rents;

const getRentById = ({ id }: { id: number }): Rent | null => {
    return rents.find((Rent) => Rent.getId() === id) || null;
};


// const updateRent = (updatedRent: Rent): Rent => {
//     const updatedRents = rents.map((rent) => {
//         if (rent.getId() === updatedRent.getId()) {
//             rent = updatedRent;
//             // console.log(rent)
//         }
//         // console.log(rent)
//         return rent;
//     });
//     console.log(rents)
//     rents = updatedRents;
//     console.log(rents)
//     return updatedRent;
// };


export default {
    getAllrents,
    getRentById,
    // updateRent
};
