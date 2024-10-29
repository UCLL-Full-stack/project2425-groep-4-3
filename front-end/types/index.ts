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
  