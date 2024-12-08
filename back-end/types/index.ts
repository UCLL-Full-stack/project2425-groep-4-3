
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

export {
    size,
    BikeInput,
    RentInput,
    UserInput,
    AccessoryInput, 
    Role,
    AuthenticationResponse,
    AuthenticationRequest
};