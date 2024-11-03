import { set } from "date-fns";
import { Rent } from "../../model/Rent";
import { Bike } from "../../model/Bike";

const currentDate = new Date();
const startDate = set(currentDate, { hours: currentDate.getHours() + 1, minutes: currentDate.getMinutes() });
const endDate = set(currentDate, { hours: currentDate.getHours() + 2, minutes: currentDate.getMinutes() });
const bike = new Bike({
    id: 0,
    brand: "Trek",
    model: "Domane AL 2",
    location: "Brussels",
    size: "M",
    cost: 25,
});

test('given valid values for Rent, when Rent is created, then Rent is created with those values', () => {
    // When
    const rent = new Rent({ startDate, endDate, cost: 12, bike });

    // Then
    expect(rent.getStartDate()).toEqual(startDate);
    expect(rent.getEndDate()).toEqual(endDate);
    expect(rent.getCost()).toEqual(12);
    expect(rent.getBike()).toEqual(bike);
});

test('given a start date in the past, when Rent is created, then throws an error', () => {
    const pastStartDate = set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 });
    const createRent = () => new Rent({ startDate: pastStartDate, endDate, cost: 12, bike });
    
    expect(createRent).toThrow('Start date cannot be in the past.');
});

test('given an end date before the start date, when Rent is created, then throws an error', () => {
    const invalidEndDate = set(startDate, { hours: 2, minutes: 30 });
    const createRent = () => new Rent({ startDate, endDate: invalidEndDate, cost: 12, bike });
    
    expect(createRent).toThrow('End date cannot be before the start date.');
});

test('given a negative cost, when Rent is created, then throws an error', () => {
    const createRent = () => new Rent({ startDate, endDate, cost: -5, bike });
    
    expect(createRent).toThrow('Cost cannot go under 0.');
});

test('given two Rent objects with the same values, when equals is called, then returns true', () => {
    const rent1 = new Rent({ startDate, endDate, cost: 12, bike });
    const rent2 = new Rent({ startDate, endDate, cost: 12, bike });

    // Then
    expect(rent1.equals(rent2)).toBe(true);
});

test('when id is set, then getId returns the correct value', () => {
    const rent = new Rent({ startDate, endDate, cost: 12, bike });
    rent.setId(1);

    // Then
    expect(rent.getId()).toEqual(1);
});

test('when id is not set, then getId returns undefined', () => {
    const rent = new Rent({ startDate, endDate, cost: 12, bike });

    // Then
    expect(rent.getId()).toBeUndefined();
});

test('when setting new values, then values are updated correctly', () => {
    const rent = new Rent({ startDate, endDate, cost: 12, bike });

    // Update values
    const newStartDate = set(new Date(), { hours: 6, minutes: 0 });
    const newEndDate = set(new Date(), { hours: 8, minutes: 0 });
    rent.setStartDate(newStartDate);
    rent.setEndDate(newEndDate);
    rent.setCost(20);

    // Then
    expect(rent.getStartDate()).toEqual(newStartDate);
    expect(rent.getEndDate()).toEqual(newEndDate);
    expect(rent.getCost()).toEqual(20);
});

