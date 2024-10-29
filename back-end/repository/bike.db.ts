import { Bike } from "../model/Bike";

const bikes = [
    new Bike({
        bikeId: 0,
        brand: "Trek",
        model: "Domane AL 2",
        location: "Brussels",
        size: "M",
        cost: 25,
      }),
      new Bike({
        bikeId: 1,
        brand: "Giant",
        model: "Escape 3",
        location: "Antwerp",
        size: "L",
        cost: 30,
      }),
      new Bike({
        bikeId: 2,
        brand: "Cannondale",
        model: "Quick 2 Disc",
        location: "Ghent",
        size: "S",
        cost: 20,
      }),
]
const getAllbikes = (): Bike[] => bikes;

const getBikeById = ({ id }: { id: number }): Bike | null => {
    return bikes.find((Bike) => Bike.getId() === id) || null;
};

export default {
    getAllbikes,
    getBikeById,
};
