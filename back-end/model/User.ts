export class User{
    private id?: number;
    private name: string;
    private email: string;
    private age: number;
    private role: string;
    private password: string;

    constructor(user:{id?: number, name: string, email: string, age: number, role: string, password: string} ){
        this.validate(user);
        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.age = user.age;
        this.role = user.role;
        this.password = user.password;
    }

    validate(user:{name: string, email: string, age: number, role: string, password: string}){
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
        if(!user.role?.trim()){
            throw new Error('Role is required.');
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

    getRole():string{
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

    setRole(role: string): void {
        this.role = role;
    }

    setPassword(password: string): void {
        this.password = password;
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
}