import { Bike } from "./Bike";
import { User } from "./User";
import {Rent as RentPrisma,Bike as BikePrisma, User as UserPrisma} from '@prisma/client'
export class Rent{
    private id?: number;
    private startDate:Date;
    private returned: boolean;
    private cost:number;
    private bike: Bike;
    private user: User;
    



    constructor(rent:{id?: number, startDate: Date;returned: boolean;cost: number; bike:Bike; user:User} ){
        this.validate(rent);
        this.id = rent.id;
        this.startDate = rent.startDate;
        this.returned = rent.returned;
        this.cost = rent.cost;
        this.bike = rent.bike;
        this.user = rent.user;
    }

    validate(rent:{startDate: Date;returned: boolean;cost: number}){
        
        if(this.returned == true){
            throw new Error('The rent is in use');
        }
        if(rent.cost < 0){
            throw new Error('Cost cannot go under 0.');
        }
    }

    getId(): number | undefined{
        return this.id;
    }
    
    getStartDate():Date{
        return this.startDate;
    }

    getReturned():boolean{
        return this.returned;
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

    setReturned(returned: boolean): void {
        this.returned = returned;
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

    getUser(): User {
        return this.user;
    }
    
    setUser(user: User): void {
        this.user = user;
    }
    

   
    equals(rent:Rent):boolean{
        return(
            this.startDate === rent.getStartDate() &&
            this.returned === rent.getReturned() &&
            this.cost === rent.getCost()
        );
    }

    static from({
        id,
        startDate,
        returned,
        cost,
        bike,
        user
    }: RentPrisma & { bike: BikePrisma; user: UserPrisma }): Rent {
        return new Rent({
            id,
            startDate,
            returned,
            cost,
            bike: Bike.from(bike),
            user: User.from(user) 
        });
    }  
    
}