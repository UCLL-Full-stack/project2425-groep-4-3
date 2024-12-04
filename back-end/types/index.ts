import { Role } from "@prisma/client";

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
    userId: number;
}

type UserInput = {
    id?: number;
    name: string;
    email: string;
    age: number;
    role: Role;
    password: string;
}

export{
    size,
    BikeInput,
    RentInput,
    UserInput
}