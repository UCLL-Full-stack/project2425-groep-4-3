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
    rentId?: number;
    startDate: Date;
    endDate: Date;
    cost: number;
    bike: Bike;
};
  