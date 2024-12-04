import { User as UserPrisma, Rent as RentPrisma, Bike as BikePrisma} from '@prisma/client'
import { Role } from '@prisma/client';
import { Rent } from './Rent';

export class User{

    private id?: number;
    private name: string;
    private email: string;
    private age: number;
    private role: Role;
    private password: string;
    private rents: Rent[];


    constructor(user:{id?: number, name: string, email: string, age: number, role: Role, password: string, rents?:Rent[]} ){
        this.validate(user);
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.age = user.age;
        this.role = user.role;
        this.password = user.password;
        this.rents = user.rents || [];

    }

    validate(user:{name: string, email: string, age: number, password: string}){
        if(!user.name?.trim()){
            throw new Error('Name is required.');
        }
        if(!user.email?.trim()){
            throw new Error('Email is required.');
        }
        if(user.email.indexOf('@') === -1){
            throw new Error('Email must contain an @.');
        }
        if(user.age < 16){
            throw new Error('Minimum age is 16 years.');
        }
        if(user.password.length < 6){
            throw new Error('Password must be at least 6 characters long.');
        }
    }

    getId(): number | undefined{
        return this.id;
    }

    getName():string{
        return this.name;
    }

    getEmail():string{
        return this.email;
    }

    getAge():number{
        return this.age;
    }

    getRole():Role{
        return this.role;
    }

    getPassword():string{
        return this.password;
    }

    setId(id: number | undefined): void {
        this.id = id;
    }

    setName(name: string): void {
        this.name = name;
    }

    setEmail(email: string): void {
        this.email = email;
    }

    setAge(age: number): void {
        this.age = age;
    }

    setRole(role: Role): void {
        this.role = role;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    getRents(): Rent[] {
        return this.rents;
    }
    
    setRents(rents: Rent[]): void {
        this.rents = rents;
    }
    
    addRent(rent: Rent): void {
        if (!this.rents.some(r => r.equals(rent))) {
            this.rents.push(rent);
        }
    }
    
    removeRent(rent: Rent): void {
        this.rents = this.rents.filter(r => !r.equals(rent));
    }
    

    equals(user:User):boolean{
        return(
            this.name === user.getName() &&
            this.email === user.getEmail() &&
            this.age === user.getAge() &&
            this.role === user.getRole() &&
            this.password === user.getPassword()
        );
    }

    static from({
        id,
        name,
        email,
        age,
        role,
        password,
        rents,
    }: UserPrisma & {
        rents?: (RentPrisma & { bike: BikePrisma; user: UserPrisma })[];
    }) {
        return new User({
            id,
            name,
            email,
            age,
            role,
            password,
            rents: rents?.map(rent => Rent.from(rent)) || [],
        });
    }
    
    
}