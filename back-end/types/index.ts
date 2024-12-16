import { Bike, User } from "@prisma/client";

type size = "S" | "M" | "L" | "XL"

type Role = "admin" | "renter" | "owner"

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
    accessoriesIdList: number[];
}

type UserInput = {
    // id?: number;
    name: string;
    email: string;
    age: number;
    role: Role;
    password: string;
}

type AccessoryInput = {
    id?: number;
    name: string;
    amount: number;
    cost: number;
}


type AuthenticationResponse = {
    token: string;
    name: string;
    role: Role;
};

type AuthenticationRequest = {
    name: string,
    password: string
}

type RentInputUpdate={
    id?: number;
    startDate: Date;
    returned: boolean;
    cost: number;
    bike: Bike;
    user: User;
    accessoriesIdList: number[];
}

type RentInputCreate = {
    id?: number;
    startDate: Date;
    returned: boolean;
    cost: number;
    bike: Bike;
    name: string;
    accessoriesIdList: number[];
};
export {
    size,
    BikeInput,
    RentInput,
    UserInput,
    AccessoryInput, 
    Role,
    AuthenticationResponse,
    AuthenticationRequest,
    RentInputUpdate,
    RentInputCreate
};