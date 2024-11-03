import { Bike } from "../../model/Bike";
import { Size } from "../../types";

const validBike = {
    id: 0,
    brand: "Trek",
    model: "Domane AL 2",
    location: "Brussels",
    size: "M" as Size,
    cost: 25,
};

test('given valid values for Bike, when Bike is created, then Bike is created with those values', () => {
    // When
    const bike = new Bike(validBike);

    // Then
    expect(bike.getId()).toEqual(0);
    expect(bike.getBrand()).toEqual("Trek");
    expect(bike.getModel()).toEqual("Domane AL 2");
    expect(bike.getLocation()).toEqual("Brussels");
    expect(bike.getSize()).toEqual("M");
    expect(bike.getCost()).toEqual(25);
});

test('given an invalid size, when Bike is created, then throws an error', () => {
    const invalidBike = { ...validBike, size: "KDHZ" as Size };
    const createBike = () => new Bike(invalidBike);
    
    expect(createBike).toThrow('Size is required and must be one of: S, M, L, XL.');
});

test('given a negative cost, when Bike is created, then throws an error', () => {
    const invalidBike = { ...validBike, cost: -10 };
    const createBike = () => new Bike(invalidBike);
    
    expect(createBike).toThrow('Cost is required.');
});

test('given two Bike objects with the same values, when equals is called, then returns true', () => {
    const bike1 = new Bike(validBike);
    const bike2 = new Bike(validBike);

    // Then
    expect(bike1.equals(bike2)).toBe(true);
});

test('given two Bike objects with different values, when equals is called, then returns false', () => {
    const bike1 = new Bike(validBike);
    const bike2 = new Bike({ ...validBike, brand: "Giant" }); // Different brand

    // Then
    expect(bike1.equals(bike2)).toBe(false);
});

test('when id is set, then getId returns the correct value', () => {
    const bike = new Bike(validBike);
    bike.setId(1);

    // Then
    expect(bike.getId()).toEqual(1);
});

test('when id is not set, then getId returns undefined', () => {
    const bike = new Bike(validBike);

    // Then
    expect(bike.getId()).toEqual(0);
});

test('when setting new values, then values are updated correctly', () => {
    const bike = new Bike(validBike);

    // Update values
    bike.setBrand("Cannondale");
    bike.setModel("Synapse");
    bike.setLocation("Antwerp");
    bike.setSize("L" as Size);
    bike.setCost(30);

    // Then
    expect(bike.getBrand()).toEqual("Cannondale");
    expect(bike.getModel()).toEqual("Synapse");
    expect(bike.getLocation()).toEqual("Antwerp");
    expect(bike.getSize()).toEqual("L");
    expect(bike.getCost()).toEqual(30);
});

