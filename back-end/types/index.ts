type Size = "S" | "M" | "L" | "XL"

type BikeInput = {
    id?: number;
    brand: string;
    model: string;
    location: string;
    size: Size;
    cost: number;
}

type RentInput = {
    id?: number;
    startDate: Date;
    endDate: Date;
    cost: number;
    bike?: BikeInput;
}
export{
    Size,
    BikeInput,
    RentInput
}