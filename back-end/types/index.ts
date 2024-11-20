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
    returned: Boolean;
    cost: number;
    bike?: BikeInput;
}
export{
    Size,
    BikeInput,
    RentInput
}