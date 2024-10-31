export class User{
    private userId?: number;
    private name: string;
    private email: string;
    private age: number;
    private role: string;
    private password: string;

    constructor(user:{userId?: number, name: string, email: string, age: number, role: string, password: string} ){
        this.validate(user);
        this.userId = user.userId;
        this.name = user.name;
        this.email = user.email;
        this.age = user.age;
        this.role = user.role;
        this.password = user.password;
    }

    validate(user:{name: string, email: string, age: number, role: string, password: string}){
        if(!user.name){
            throw new Error('Name is required.');
        }
        if(!user.email){
            throw new Error('Email is required.');
        }
        if(!user.age){
            throw new Error('Age is required.');
        }
        if(!user.role){
            throw new Error('Role is required.');
        }
        if(!user.password){
            throw new Error('Password is required.');
        }
    }

    getId(): number | undefined{
        return this.userId;
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

    getRole():string{
        return this.role;
    }

    getPassword():string{
        return this.password;
    }

    setId(userId: number | undefined): void {
        this.userId = userId;
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

    setRole(role: string): void {
        this.role = role;
    }

    setPassword(password: string): void {
        this.password = password;
    }

    equals(user:User):boolean{
        return(
            this.userId === user.getId() &&
            this.name === user.getName() &&
            this.email === user.getEmail() &&
            this.age === user.getAge() &&
            this.role === user.getRole() &&
            this.password === user.getPassword()
        );
    }
}