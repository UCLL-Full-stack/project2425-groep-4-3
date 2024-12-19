import { add, set } from "date-fns";
import { Rent } from "../../model/Rent";
import { Bike } from "../../model/Bike";
import { User } from "../../model/User";
import { Role, size as Size } from "../../types";
import { Accessory } from "../../model/Accessory";

const validBike = {
    id: 0,
    brand: "Trek",
    model: "Domane AL 2",
    location: "Brussels",
    size: "M" as Size,
    cost: 25,
};

const validUser = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    age: 25,
    role: "USER" as Role,
    password: "securePassword1",
};

const validAccessory = {
    id: 0,
    name: "Helmet",
    amount: 1,
    cost: 5,
};

const bike = new Bike(validBike);
const user = new User(validUser);
const accessory = new Accessory(validAccessory)

const currentDate = new Date();
const startDate = set(currentDate, { hours: currentDate.getHours() + 10, minutes: currentDate.getMinutes() });
const returned = false;

test('given valid values for Rent, when Rent is created, then Rent is created with those values', () => {
    // When
    const rent = new Rent({ startDate, returned, cost: 12, bike, user, accessories: [accessory] });

    // Then
    expect(rent.getStartDate()).toEqual(startDate);
    expect(rent.getReturned()).toEqual(returned);
    expect(rent.getCost()).toEqual(12);
    expect(rent.getBike()).toEqual(bike);
    expect(rent.getUser()).toEqual(user);
});

test('given a negative cost, when Rent is created, then throws an error', () => {
    const createRent = () => new Rent({ startDate, returned, cost: -5, bike, user, accessories: [accessory] });
    
    expect(createRent).toThrow('Cost cannot go under 0.');
});

test('given two Rent objects with different values, when equals is called, then returns false', () => {
    const rent1 = new Rent({ startDate, returned, cost: 12, bike, user, accessories: [accessory] });
    const rent2 = new Rent({ startDate, returned: true, cost: 15, bike, user, accessories : [accessory] }); // Different returned and cost

    // Then
    expect(rent1.equals(rent2)).toBe(false);
});

test('when id is set, then getId returns the correct value', () => {
    const rent = new Rent({ startDate, returned, cost: 12, bike, user, accessories: [accessory] });
    rent.setId(1);

    // Then
    expect(rent.getId()).toEqual(1);
});


test('when id is not set, then getId returns undefined', () => {
    const rent = new Rent({ startDate, returned, cost: 12, bike, user, accessories: [accessory] });

    // Then
    expect(rent.getId()).toBeUndefined();
});

test('when setting new values, then values are updated correctly', () => {
    const rent = new Rent({ startDate, returned, cost: 12, bike, user, accessories: [accessory] });

    // Update values
    const currentDate = new Date();
    const newStartDate = add(currentDate, { hours: 6});
    rent.setStartDate(newStartDate);
    rent.setReturned(true);
    rent.setCost(20);

    // Then
    expect(rent.getStartDate()).toEqual(newStartDate);
    expect(rent.getReturned()).toBeTruthy();
    expect(rent.getCost()).toEqual(20);
});

test('when setting new bike, accessories and user, then values are updated correctly', () => {
    const rent = new Rent({ startDate, returned, cost: 12, bike, user, accessories: [accessory] });

    const newBike = new Bike({ ...validBike, brand: "Giant" });
    const newUser = new User({ ...validUser, name: "Jane Doe" });
    const newAccessory = new Accessory({ ...validAccessory, name: "Lock" });

    rent.setBike(newBike);
    rent.setUser(newUser);
    rent.setAccessories([newAccessory]);

    // Then
    expect(rent.getBike()).toEqual(newBike);
    expect(rent.getUser()).toEqual(newUser);
    expect(rent.getAccessories()).toEqual([newAccessory]);
});

test('when cost is set negative, then throws an error', () => {
    const rent = new Rent({ startDate, returned, cost: 12, bike, user, accessories: [accessory] });
    const setCost = () => rent.setCost(-1);

    expect(setCost).toThrow('Cost cannot go under 0.');
});

test('when cost is set to null, then throws an error', () => {
    const rent = new Rent({ startDate, returned, cost: 12, bike, user, accessories: [accessory] });
    const setCost = () => rent.setCost(null as any);

    expect(setCost).toThrow('Cost is required.');
});

test('when startDate is set to null, then throws an error', () => {
    const rent = new Rent({ startDate, returned, cost: 12, bike, user, accessories: [accessory] });
    const setStartDate = () => rent.setStartDate(null as any);

    expect(setStartDate).toThrow('Start date is required.');
});

test('when startDate is set in the past, then throws an error', () => {
    const rent = new Rent({ startDate, returned, cost: 12, bike, user, accessories: [accessory] });
    const setStartDate = () => rent.setStartDate(set(new Date(), { hours: -1 }));

    expect(setStartDate).toThrow('Start date cannot be in the past.');
});

test('when bike is set to null, then throws an error', () => {
    const rent = new Rent({ startDate, returned, cost: 12, bike, user, accessories: [accessory] });
    const setBike = () => rent.setBike(null as any);

    expect(setBike).toThrow('Bike is required.');
});

test('when user is set to null, then throws an error', () => {
    const rent = new Rent({ startDate, returned, cost: 12, bike, user, accessories: [accessory] });
    const setUser = () => rent.setUser(null as any);

    expect(setUser).toThrow('User is required.');
});





