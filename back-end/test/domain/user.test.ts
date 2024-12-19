import { User } from "../../model/User";
import { Rent } from "../../model/Rent";
import { Role } from "../../types";
import { User as UserPrisma, Rent as RentPrisma, Bike as BikePrisma } from '@prisma/client';

// Mock valid user data
const validUser = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    age: 25,
    role: "ADMIN" as Role,
    password: "Password1",
};

// Tests
test('given valid values for User, when User is created, then User is created with those values', () => {
    // When
    const user = new User(validUser);

    // Then
    expect(user.getId()).toEqual(1);
    expect(user.getName()).toEqual("John Doe");
    expect(user.getEmail()).toEqual("john.doe@example.com");
    expect(user.getAge()).toEqual(25);
    expect(user.getRole()).toEqual("ADMIN");
    expect(user.getPassword()).toEqual("Password1");
});

test('given a missing name, when User is created, then throws an error', () => {
    const invalidUser = { ...validUser, name: "" };
    const createUser = () => new User(invalidUser);

    expect(createUser).toThrow('Name is required.');
});

test('given an invalid email, when User is created, then throws an error', () => {
    const invalidUser = { ...validUser, email: "invalidEmail" };
    const createUser = () => new User(invalidUser);

    expect(createUser).toThrow('Email must be valid.');
});

test('given an age less than 16, when User is created, then throws an error', () => {
    const invalidUser = { ...validUser, age: 15 };
    const createUser = () => new User(invalidUser);

    expect(createUser).toThrow('Minimum age is 16 years.');
});

test('given a password shorter than 6 characters, when User is created, then throws an error', () => {
    const invalidUser = { ...validUser, password: "12345" };
    const createUser = () => new User(invalidUser);

    expect(createUser).toThrow('Password must be at least 7 characters long.');
});

test('given two User objects with the same values, when equals is called, then returns true', () => {
    const user1 = new User(validUser);
    const user2 = new User(validUser);

    expect(user1.equals(user2)).toBe(true);
});

test('given two User objects with different values, when equals is called, then returns false', () => {
    const user1 = new User(validUser);
    const user2 = new User({ ...validUser, email: "jane.doe@example.com" }); // Different email

    expect(user1.equals(user2)).toBe(false);
});

test('when id is set, then getId returns the correct value', () => {
    const user = new User(validUser);
    user.setId(2);

    expect(user.getId()).toEqual(2);
});

test('when id is not set, then getId returns undefined', () => {
    const user = new User({ ...validUser, id: undefined });

    expect(user.getId()).toBeUndefined();
});

test('when setting new values, then values are updated correctly', () => {
    const user = new User(validUser);

    // Update values
    user.setName("Jane Doe");
    user.setEmail("jane.doe@example.com");
    user.setAge(30);
    user.setRole("ADMIN" as Role);
    user.setPassword("newSecurePassword");

    expect(user.getName()).toEqual("Jane Doe");
    expect(user.getEmail()).toEqual("jane.doe@example.com");
    expect(user.getAge()).toEqual(30);
    expect(user.getRole()).toEqual("ADMIN");
    expect(user.getPassword()).toEqual("newSecurePassword");
});

test('when setting a new name as an empty string, then throws an error', () => {
    const user = new User(validUser);
    const setName = () => user.setName("");

    expect(setName).toThrow('Name is required.');
});

test('when setting a new email as an invalid email, then throws an error', () => {
    const user = new User(validUser);
    const setEmail = () => user.setEmail("invalidEmail");

    expect(setEmail).toThrow('Email must be valid.');
});

test('when setting a new age less than 16, then throws an error', () => {
    const user = new User(validUser);
    const setAge = () => user.setAge(15);

    expect(setAge).toThrow('Minimum age is 16 years.');
});

test('when setting a new password shorter than 6 characters, then throws an error', () => {

    const user = new User(validUser);
    const setPassword = () => user.setPassword("G12345");

    expect(setPassword).toThrow('Password must be at least 7 characters long.');
});

test('when setting a new password with no numbers or caps, then throws an error', () => {

    const user = new User(validUser);
    const setPassword = () => user.setPassword("lololoaz");

    expect(setPassword).toThrow('Password must contain at least one number and one uppercase letter.');
});

test('when setting a new role as an empty string, then throws an error', () => {
    const user = new User(validUser);
    const setRole = () => user.setRole("" as Role);

    expect(setRole).toThrow('Role is required.');
});





