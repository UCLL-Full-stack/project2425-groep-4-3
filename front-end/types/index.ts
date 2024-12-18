export type User = {
    userId?: number;
    name: string;
    email: string;
    age: number;
    password: string;
    role: string;
};

export type Bike = {
    id?: number;
    brand: string;
    model: string;
    location: string;
    size: "S" | "M" | "L" | "XL";
    cost: number;
  };
  
export type Rent = {
    id?: number;
    startDate: Date;
    returned: Boolean;
    cost: number;
    bike: Bike;
    user: User;
    accessories: Accessory[];
};

export type RentInputCreate = {
    id?: number;
    startDate: Date;
    returned: boolean;
    cost: number;
    bike: Bike;
    name: string;
    accessoriesIdList: number[];
};

export type StatusMessage = {
    message : String,
    type: "error" | "success"
}
export type Accessory = {
    id?: number;
    name: string;
    amount: number;
    cost: number;
};
  
export type size = "S" | "M" | "L" | "XL"
