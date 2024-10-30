import { User } from "../../model/User";

const name = 'Niels';
const email = 'Niels@gmail.com';
const age = 24;
const role = 'user';
const password = 'password';

const user = new User({
    name,
    email,
    age,
    role,
    password
});

test('given: valid values for User, when: User is created, then: User is created with those values', () => {
    //given

    //when
    const newUser = new User({name,email,age,role,password});

    //then
    expect(newUser.getName()).toEqual(name);
    expect(newUser.getEmail()).toEqual(email);
    expect(newUser.getAge()).toEqual(age);
    expect(newUser.getRole()).toEqual(role);
    expect(newUser.getPassword()).toEqual(password);
   
});