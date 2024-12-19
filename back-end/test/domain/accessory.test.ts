import { Accessory } from "../../model/Accessory";

//given for almost all
const validAccessory = {
    id: 1,
    name: "Helmet",
    amount: 5,
    cost: 15,
};

test('given valid values for Accessory, when Accessory is created, then Accessory is created with those values', () => {
    // When
    const accessory = new Accessory(validAccessory);

    // Then
    expect(accessory.getId()).toEqual(1);
    expect(accessory.getName()).toEqual("Helmet");
    expect(accessory.getAmount()).toEqual(5);
    expect(accessory.getCost()).toEqual(15);
});

test('given no name, when Accessory is created, then throws an error', () => {
    const invalidAccessory = { ...validAccessory, name: "" };
    const createAccessory = () => new Accessory(invalidAccessory);

    expect(createAccessory).toThrow("Name is required.");
});

test('given no amount, when Accessory is created, then throws an error', () => {
    const invalidAccessory = { ...validAccessory, amount: 0 };
    const createAccessory = () => new Accessory(invalidAccessory);

    expect(createAccessory).toThrow("Amount is required.");
});

test('given no cost, when Accessory is created, then throws an error', () => {
    const invalidAccessory = { ...validAccessory, cost: 0 };
    const createAccessory = () => new Accessory(invalidAccessory);

    expect(createAccessory).toThrow("Cost is required.");
});

test('given two Accessory objects with the same values, when equals is called, then returns true', () => {
    const accessory1 = new Accessory(validAccessory);
    const accessory2 = new Accessory(validAccessory);

    // Then
    expect(accessory1.equals(accessory2)).toBe(true);
});

test('given two Accessory objects with different values, when equals is called, then returns false', () => {
    const accessory1 = new Accessory(validAccessory);
    const accessory2 = new Accessory({ ...validAccessory, name: "Gloves" });

    // Then
    expect(accessory1.equals(accessory2)).toBe(false);
});

test('when id is set, then getId returns the correct value', () => {
    const accessory = new Accessory(validAccessory);
    accessory.setId(2);

    // Then
    expect(accessory.getId()).toEqual(2);
});

test('when name is set, then getName returns the correct value', () => {
    const accessory = new Accessory(validAccessory);
    accessory.setName("Gloves");

    // Then
    expect(accessory.getName()).toEqual("Gloves");
});



test('when amount is set, then getAmount returns the correct value', () => {
    const accessory = new Accessory(validAccessory);
    accessory.setAmount(10);

    // Then
    expect(accessory.getAmount()).toEqual(10);
});

test('when cost is set, then getCost returns the correct value', () => {
    const accessory = new Accessory(validAccessory);
    accessory.setCost(20);

    // Then
    expect(accessory.getCost()).toEqual(20);
});

test('given an AccessoryPrisma object, when from is called, then Accessory is created with those values', () => {
    const prismaAccessory = {
        id: 3,
        name: "Bell",
        amount: 7,
        cost: 8,
    };

    const accessory = Accessory.from(prismaAccessory);

    expect(accessory.getId()).toEqual(3);
    expect(accessory.getName()).toEqual("Bell");
    expect(accessory.getAmount()).toEqual(7);
    expect(accessory.getCost()).toEqual(8);
});
