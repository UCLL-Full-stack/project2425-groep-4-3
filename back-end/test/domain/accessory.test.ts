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

test('when amount is set negative, then throws an error', () => {
    const accessory = new Accessory(validAccessory);
    const setAmount = () => accessory.setAmount(-1);

    expect(setAmount).toThrow("Amount must be greater than 0.");
});

test('when amount is set empty, then throws an error', () => {
    const accessory = new Accessory(validAccessory);
    const setAmount = () => accessory.setAmount(null as any);

    expect(setAmount).toThrow("Amount is required.");
});

test('when cost is set negative, then throws an error', () => {
    const accessory = new Accessory(validAccessory);
    const setCost = () => accessory.setCost(-1);

    expect(setCost).toThrow("Cost must be greater than 0.");
});

test('when cost is set empty, then throws an error', () => {
    const accessory = new Accessory(validAccessory);
    const setCost = () => accessory.setCost(null as any);

    expect(setCost).toThrow("Cost is required.");
});





