import { Bike } from "../../model/Bike";
import { size as Size } from "../../types";

//given for almost all
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

test('given an invalid size,when Bike is created, then throws an error', () => {
    const invalidBike = { ...validBike, size: "LLLLLLL" as Size };
    const createBike = () => new Bike(invalidBike);
    
    expect(createBike).toThrow('Size is required and must be one of: S, M, L, XL.');
});

test('when size is set to null, then throws an error', () => {
    const bike = new Bike(validBike);
    const setSize = () => bike.setSize(null as any)
    expect(setSize).toThrow("Size is required.");
});

test('when size is set to SM, then throws an error', () => {
    const bike = new Bike(validBike);
    const setSize = () => bike.setSize('SM' as Size)
    expect(setSize).toThrow("Size must be one of: S, M, L, XL.");
});

test('given a negative cost, when Bike is created,then throws an error', () => {
    const invalidBike = { ...validBike, cost: -1 };
    const createBike = () => new Bike(invalidBike);
    expect(createBike).toThrow("Cost can't be negative.");
});



test('when cost is set negative, then throws an error', () => {
    const bike = new Bike(validBike);
    const setCost = () => bike.setCost(-1)
    expect(setCost).toThrow("Cost can't be negative.");
});

test('when cost is set to null, then throws an error', () => {
    const bike = new Bike(validBike);
    const setCost = () => bike.setCost(null as any)
    expect(setCost).toThrow("Cost is required.");
});

test('given an empty brand, when Bike is created, then throws error', () => {
    const invalidBike = { ...validBike, brand: "" };
    const createBike = () => new Bike(invalidBike);
    expect(createBike).toThrow("Brand is required.");
});

test('when brand is set to null, then throws an error', () => {
    const bike = new Bike(validBike);
    const setBrand = () => bike.setBrand(null as any)
    expect(setBrand).toThrow("Brand is required.");
});

test('given an empty model, when Bike is created, then throws error', () => {
    const invalidBike = { ...validBike, model: "" };
    const createBike = () => new Bike(invalidBike);
    expect(createBike).toThrow("Model is required.");
});

test('when model is set to null, then throws an error', () => {
    const bike = new Bike(validBike);
    const setModel = () => bike.setModel(null as any)
    expect(setModel).toThrow("Model is required.");
});

test('given an empty Location, when Bike is created, then throws error', () => {
    const invalidBike = { ...validBike, location: "" };
    const createBike = () => new Bike(invalidBike);
    expect(createBike).toThrow("Location is required.");
});

test('when location is set to null, then throws an error', () => {
    const bike = new Bike(validBike);
    const setLocation = () => bike.setLocation(null as any)
    expect(setLocation).toThrow("Location is required.");
});

test('when id is set, then getId returns the correct value', () => {
    const bike = new Bike(validBike);
    bike.setId(1);

    // Then
    expect(bike.getId()).toEqual(1);
});

test('when size is set, then getSize returns the correct value', () => {
    const bike = new Bike(validBike);
    bike.setSize("L");

    // Then
    expect(bike.getSize()).toEqual("L");
});

test('when size is set, then getSize returns the correct value', () => {
    const bike = new Bike(validBike);
    bike.setSize("L");

    // Then
    expect(bike.getSize()).toEqual("L");
});

test('when setting new values, then values are updated correctly', () => {
    //given
    const bike = new Bike({brand:"Cannondale",model:"Ultra",location:"Antwerp",size:"L",cost :30});
    
    bike.setModel("Synapse")
    // Then
    expect(bike.getBrand()).toEqual("Cannondale");
    expect(bike.getModel()).toEqual("Synapse");
    expect(bike.getLocation()).toEqual("Antwerp");
    expect(bike.getSize()).toEqual("L");
    expect(bike.getCost()).toEqual(30);
});

