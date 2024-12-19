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
        if(accessory.amount < 0){
            throw new Error("Amount must be greater than 0.");
        }
        if (!accessory.cost) {
          throw new Error("Cost is required.");
        }
        if(accessory.cost < 0){
            throw new Error("Cost must be greater than 0.");
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
        if (!name) {
            throw new Error("Name is required.");
        }
        this.name = name;
    }

    public getAmount(): number {
        return this.amount;
    }

    public setAmount(amount: number): void {
        if (!amount) {
            throw new Error("Amount is required.");
        } else if(amount < 0){
            throw new Error("Amount must be greater than 0.");
        }
        this.amount = amount;
    }

    public getCost(): number {
        return this.cost;
    }

    public setCost(cost: number): void {
        if (!cost) {
            throw new Error("Cost is required.");
        } else if(cost < 0){
            throw new Error("Cost must be greater than 0.");
        }
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