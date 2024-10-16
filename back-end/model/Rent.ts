export class Rent{
    private rentId?: number;
    private startDate:Date;
    private endDate: Date;
    private cost:number;

    constructor(rent:{startDate: Date;endDate: Date;cost: number} ){
        this.startDate = rent.startDate;
        this.endDate = rent.endDate;
        this.cost = rent.cost;
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
}