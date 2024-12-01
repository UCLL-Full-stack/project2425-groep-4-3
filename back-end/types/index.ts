type size = "S" | "M" | "L" | "XL"

type BikeInput = {
    id?: number;
    brand: string;
    model: string;
    location: string;
    size: size;
    cost: number;
}

type RentInput = {
    id?: number;
    startDate: Date;
    returned: boolean;
    cost: number;
    bikeId: number;
}
export{
    size,
    BikeInput,
    RentInput
}