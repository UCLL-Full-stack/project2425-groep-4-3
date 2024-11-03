import { User } from "../../model/User";

const name = 'Niels';
const email = 'Niels@gmail.com';
const age = 24;
const role = "user";
const password = 'password';

const emptyname = '';

const validUser = {
    id: 0,
    name: "Niels",
    email: "Niels@gmail.com",
    age: 25,
    role: "admin",
    password: "password", 
};

test('given: valid values for User, when: User is created, then: User is created with those values', () => {

    //when
    const user = new User(validUser);

    //then
    expect(user.getId()).toEqual(0)
    expect(user.getName()).toEqual("Niels");
    expect(user.getEmail()).toEqual("Niels@gmail.com");
    expect(user.getAge()).toEqual(25);
    expect(user.getRole()).toEqual("admin");
    expect(user.getPassword()).toEqual("password");
   
});

test('given: empty name, when: User is created, then: throws error "Name is required."', () => {
    //given
    const invalidUser = {...validUser, name: ""}
    
    //when
    const newUser = ()=> new User(invalidUser);

    //then
    expect(newUser).toThrow('Name is required.');
});

// Test missing email
test('given: missing email, when: User is created, then: throws error "Email is required."', () => {
    //given
    const invalidUser = {...validUser, email: ""}
    
    //when
    const newUser = ()=> new User(invalidUser);

    //then
    expect(newUser).toThrow('Email is required.');
});

// Test invalid email format
test('given: invalid email format, when: User is created, then: throws error "Email must contain an @."', () => {
    //given
    const invalidUser = {...validUser, email: "nielsgmail.com"}
    
    //when
    const newUser = ()=> new User(invalidUser);

    //then
    expect(newUser).toThrow('Email must contain an @.');
});

// Test minimum age
test('given: age below minimum, when: User is created, then: throws error "Minimum age is 16 years."', () => {
    //given
    const invalidUser = {...validUser, age: 15}
    
    //when
    const newUser = ()=> new User(invalidUser);

    //then
    expect(newUser).toThrow('Minimum age is 16 years.');
});

// Test missing role
test('given: missing role, when: User is created, then: throws error "Role is required."', () => {
    //given
    const invalidUser = {...validUser, role: ""}
    
    //when
    const newUser = ()=> new User(invalidUser);

    //then
    expect(newUser).toThrow('Role is required.'); 
});

// Test password length
test('given: short password, when: User is created, then: throws error "Password must be at least 6 characters long."', () => {
    //given
    const invalidUser = {...validUser, password: "12345"}
    
    //when
    const newUser = ()=> new User(invalidUser);

    //then
    expect(newUser).toThrow('Password must be at least 6 characters long.'); 
});

