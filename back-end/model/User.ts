import { User as UserPrisma, Rent as RentPrisma, Bike as BikePrisma} from '@prisma/client'
import { Rent } from './Rent';
import { Role } from '../types/index'

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

    validate(user:{name: string, email: string, age: number, password: string, role: Role}){
        if(!user.name.trim()){
            throw new Error('Name is required.');
        }
        const nameRegex = /^[a-zA-Z\s]+$/; // enkel letters en spaties toegestaan
        if (!nameRegex.test(user.name)) {
            throw new Error('Name must contain only letters and spaces.');
        }
        if(!user.email.trim()){
            throw new Error('Email is required.');
        }
        if(!user.email.includes('@') || !user.email.includes('.')){
            throw new Error('Email must be valid.');
        }
        if(!user.age){
            throw new Error('Age is required.');
        }
        if(user.age < 16){
            throw new Error('Minimum age is 16 years.');
        }
        if(!user.password?.trim()){
            throw new Error('Password is required.');
        }
        if(user.password.length < 7){
            throw new Error('Password must be at least 7 characters long.');
        }
        if(!user.role){
            throw new Error('Role is required.');
        }
        if (!/[A-Z]/.test(user.password)) {
            throw new Error('Password must contain at least one uppercase letter.');
        }
        if (!/[0-9]/.test(user.password)) {
            throw new Error('Password must contain at least one numeric digit.');
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
            role: role as Role,
            password,
            rents: rents?.map(rent => Rent.from(rent)) || [],
        });
    }
    
    
}