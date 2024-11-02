import { Bike } from "./Bike";

export class Rent{
    private id?: number;
    private startDate:Date;
    private endDate: Date;
    private cost:number;
    private bike: Bike;


    constructor(rent:{id?: number, startDate: Date;endDate: Date;cost: number; bike:Bike} ){
        this.validate(rent);
        this.id = rent.id;
        this.startDate = rent.startDate;
        this.endDate = rent.endDate;
        this.cost = rent.cost;
        this.bike = rent.bike;
    }

    validate(rent:{startDate: Date;endDate: Date;cost: number}){
        if(!rent.startDate){
            throw new Error('Start date is required.');
        }
        if(!rent.endDate){
            throw new Error('End date is required.');
        }
        if(!rent.cost){
            throw new Error('Cost is required.');
        }
    }

    getId(): number | undefined{
        return this.id;
    }
    
    getStartDate():Date{
        return this.startDate;
    }

    getEndDate():Date{
        return this.endDate;
    }

    getCost():number{
        return this.cost;
    }

    setId(id: number | undefined): void {
        this.id = id;
    }

    setStartDate(startDate: Date): void {
        this.startDate = startDate;
    }

    setEndDate(endDate: Date): void {
        this.endDate = endDate;
    }

    setCost(cost: number): void {
        this.cost = cost;
    }
    
    public getBike(): Bike {
        return this.bike;
    }

    public setBike(bike: Bike): void {
        this.bike = bike;
    }
   
    equals(rent:Rent):boolean{
        return(
            this.startDate === rent.getStartDate() &&
            this.endDate === rent.getEndDate() &&
            this.cost === rent.getCost()
        );
    }
}