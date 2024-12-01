import {size} from "../types"
import { Rent } from "./Rent";
import {Bike as BikePrisma } from '@prisma/client'

export class Bike{
    private id?: number;
    private brand: string;
    private model: string;
    private location: string;
    private size: size;
    private cost: number;


    constructor(bike: {id?: number; brand: string,model: string,location: string,size: size,cost: number}) {
        this.validate(bike);
        this.id = bike.id;
        this.brand = bike.brand;
        this.model = bike.model;
        this.location = bike.location;
        this.size = bike.size;
        this.cost = bike.cost;
    }
    
    validate(bike: {brand: string; model: string;location: string;size: size;cost: number;}) {
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

    public getBrand(): string {
        return this.brand;
    }

    public setBrand(brand: string): void {
        this.brand = brand;
    }

    public getModel(): string {
        return this.model;
    }

    public setModel(model: string): void {
        this.model = model;
    }

    public getLocation(): string {
        return this.location;
    }

    public setLocation(location: string): void {
        this.location = location;
    }

    public getSize(): size {
        return this.size;
    }

    public setSize(size: size): void {
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

    static from({
        id,
        brand,
        model,
        location,
        //dit is raar ma vind niet waar die hoofdletter is
        size,
        cost
    }: BikePrisma){
        return new Bike({
            id,
            brand,
            model,
            location,
            size: size as size,
            cost
        })
    }
}

