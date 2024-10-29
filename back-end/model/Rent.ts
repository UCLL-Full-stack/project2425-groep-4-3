export class Rent{
    private rentId?: number;
    private startDate:Date;
    private endDate: Date;
    private cost:number;

    constructor(rent:{rentId?: number, startDate: Date;endDate: Date;cost: number} ){
        this.validate(rent);
        this.rentId = rent.rentId;
        this.startDate = rent.startDate;
        this.endDate = rent.endDate;
        this.cost = rent.cost;
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
        return this.rentId;
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

    setId(rentId: number | undefined): void {
        this.rentId = rentId;
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

    equals(rent:Rent):boolean{
        return(
            this.rentId === rent.getId() &&
            this.startDate === rent.getStartDate() &&
            this.endDate === rent.getEndDate() &&
            this.cost === rent.getCost()
        );
    }
}