import { Rent as RentPrisma, Accessory as AccessoryPrisma, User as UserPrisma, Bike as BikePrisma } from "@prisma/client";
import { Rent } from "./Rent";
export class Accessory{
    private id?: number;
    private name: string;
    private amount: number;
    private cost: number;

    constructor(accessory: {id?: number; name: string,amount: number,cost: number}) {
        this.validate(accessory);
        this.id = accessory.id;
        this.name = accessory.name;
        this.amount = accessory.amount;
        this.cost = accessory.cost;
    }

    validate(accessory: {name: string; amount: number;cost: number;}) {
        if (!accessory.name) {
          throw new Error("Name is required.");
        }
        if (!accessory.amount) {
          throw new Error("Amount is required.");
        }
        if (!accessory.cost) {
          throw new Error("Cost is required.");
        }
    }

    public getId(): number | undefined {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getAmount(): number {
        return this.amount;
    }

    public setAmount(amount: number): void {
        this.amount = amount;
    }

    public getCost(): number {
        return this.cost;
    }

    public setCost(cost: number): void {
        this.cost = cost;
    }

   
    
    

    equals(accessory: Accessory): boolean {
        return this.name === accessory.getName() && 
        this.amount === accessory.getAmount() && 
        this.cost === accessory.getCost();
    }

    static from({
        id,
        name,
        amount,
        cost,
        
    }: AccessoryPrisma & {
    }) {
        return new Accessory({
            id,
            name,
            amount,
            cost,
        });
    }

}   