import {Size} from "../types"
import { Rent } from "./Rent";
export class Bike{
    private id?: number;
    private brand: String;
    private model: String;
    private location: String;
    private size: Size;
    private cost: number;


    constructor(bike: {id?: number; brand: string,model: string,location: string,size: Size,cost: number}) {
        this.validate(bike);
        this.id = bike.id;
        this.brand = bike.brand;
        this.model = bike.model;
        this.location = bike.location;
        this.size = bike.size;
        this.cost = bike.cost;
    }
    
    validate(bike: {brand: string; model: string;location: string;size: Size;cost: number;}) {
        const validSizes = ['S', 'M', 'L', 'XL'];
        if (!bike.size || !validSizes.includes(bike.size)) {
            throw new Error("Size is required and must be one of: S, M, L, XL.");
        }
        if (bike.cost < 0) {
          throw new Error("Cost is required.");
        }
    }
    public getId(): number | undefined {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getBrand(): String {
        return this.brand;
    }

    public setBrand(brand: string): void {
        this.brand = brand;
    }

    public getModel(): String {
        return this.model;
    }

    public setModel(model: string): void {
        this.model = model;
    }

    public getLocation(): String {
        return this.location;
    }

    public setLocation(location: string): void {
        this.location = location;
    }

    public getSize(): Size {
        return this.size;
    }

    public setSize(size: Size): void {
        this.size = size;
    }

    public getCost(): number {
        return this.cost;
    }

    public setCost(cost: number): void {
        this.cost = cost;
    }

    equals(bike: Bike): boolean {
        return (
        //   this.id === bike.getId() &&
          this.brand === bike.getBrand() &&
          this.model === bike.getModel() &&
          this.location === bike.getLocation() &&
          this.size === bike.getSize() &&
          this.cost === bike.getCost()
        );
    };
}

