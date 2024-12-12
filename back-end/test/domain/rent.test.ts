import { set } from "date-fns";
import { Rent } from "../../model/Rent";
import { Bike } from "../../model/Bike";
import { User } from "../../model/User";
import { Role, size as Size } from "../../types";

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
    password: "securePassword",
};

const bike = new Bike(validBike);
const user = new User(validUser);

const currentDate = new Date();
const startDate = set(currentDate, { hours: currentDate.getHours() + 10, minutes: currentDate.getMinutes() });
const returned = false;

test('given valid values for Rent, when Rent is created, then Rent is created with those values', () => {
    // When
    const rent = new Rent({ startDate, returned, cost: 12, bike, user });

    // Then
    expect(rent.getStartDate()).toEqual(startDate);
    expect(rent.getReturned()).toEqual(returned);
    expect(rent.getCost()).toEqual(12);
    expect(rent.getBike()).toEqual(bike);
    expect(rent.getUser()).toEqual(user);
});

test('given a negative cost, when Rent is created, then throws an error', () => {
    const createRent = () => new Rent({ startDate, returned, cost: -5, bike, user });
    
    expect(createRent).toThrow('Cost cannot go under 0.');
});

test('given two Rent objects with different values, when equals is called, then returns false', () => {
    const rent1 = new Rent({ startDate, returned, cost: 12, bike, user });
    const rent2 = new Rent({ startDate, returned: true, cost: 15, bike, user }); // Different returned and cost

    // Then
    expect(rent1.equals(rent2)).toBe(false);
});

test('when id is set, then getId returns the correct value', () => {
    const rent = new Rent({ startDate, returned, cost: 12, bike, user });
    rent.setId(1);

    // Then
    expect(rent.getId()).toEqual(1);
});

test('when id is not set, then getId returns undefined', () => {
    const rent = new Rent({ startDate, returned, cost: 12, bike, user });

    // Then
    expect(rent.getId()).toBeUndefined();
});

test('when setting new values, then values are updated correctly', () => {
    const rent = new Rent({ startDate, returned, cost: 12, bike, user });

    // Update values
    const newStartDate = set(new Date(), { hours: 6, minutes: 0 });
    rent.setStartDate(newStartDate);
    rent.setReturned(true);
    rent.setCost(20);

    // Then
    expect(rent.getStartDate()).toEqual(newStartDate);
    expect(rent.getReturned()).toBeTruthy();
    expect(rent.getCost()).toEqual(20);
});

test('when setting new bike and user, then values are updated correctly', () => {
    const rent = new Rent({ startDate, returned, cost: 12, bike, user });

    const newBike = new Bike({ ...validBike, brand: "Giant" });
    const newUser = new User({ ...validUser, name: "Jane Doe" });

    rent.setBike(newBike);
    rent.setUser(newUser);

    // Then
    expect(rent.getBike()).toEqual(newBike);
    expect(rent.getUser()).toEqual(newUser);
});


