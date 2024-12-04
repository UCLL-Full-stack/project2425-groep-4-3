export class Accessory{
    private accessoryId?: number;
    private name: String;
    private amount: number;
    private cost: number;

    constructor(accessory: {accessoryId?: number; name: string,amount: number,cost: number}) {
        this.validate(accessory);
        this.accessoryId = accessory.accessoryId;
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
        return this.accessoryId;
    }

    public setId(id: number): void {
        this.accessoryId = id;
    }

    public getName(): String {
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
}   