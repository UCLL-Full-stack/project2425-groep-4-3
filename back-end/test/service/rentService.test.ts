import rentService from "../../service/rent.service";
import rentDb from "../../repository/rent.db";
import bikeDb from "../../repository/bike.db";
import accessoryDb from "../../repository/accessory.db";
import userDb from "../../repository/user.db";
import { Rent } from "../../model/Rent";
import { Bike } from "../../model/Bike";
import { Accessory } from "../../model/Accessory";
import { User } from "../../model/User";
import { add } from "date-fns";

const validRenter = new User({ id: 1, name: 'John', email: 'John@gmail.com', age: 30, role: 'renter', password: 'Password1' });
const validBike = new Bike({ id: 1, brand: 'Trek', model: 'Mountain', location: 'Halle', size: 'M', cost: 100 });
const validAccessory1 = new Accessory({ id: 1, name: 'Helmet', amount: 1, cost: 10 });
const validAccessory2 = new Accessory({ id: 2, name: 'Lock', amount: 1, cost: 5 });
const mockRent = new Rent({ id: 1, startDate: new Date(), returned: false, cost: 100, bike: validBike, user: validRenter, accessories: [validAccessory1, validAccessory2] });

let mockRentDbGetAllRents: jest.Mock;
let mockRentDbGetRentById: jest.Mock;
let mockRentDbCreateRent: jest.Mock;
let mockRentDbDeleteRentById: jest.Mock;
let mockRentDbUpdateRentById: jest.Mock;
let mockBikeDbGetBikeById: jest.Mock;
let mockAccessoryDbGetAccessoryById: jest.Mock;
let mockUserDbGetUserByUsername: jest.Mock;

beforeEach(() => {
    mockRentDbGetAllRents = jest.fn();
    mockRentDbGetRentById = jest.fn();
    mockRentDbCreateRent = jest.fn();
    mockRentDbDeleteRentById = jest.fn();
    mockRentDbUpdateRentById = jest.fn();
    mockBikeDbGetBikeById = jest.fn();
    mockAccessoryDbGetAccessoryById = jest.fn();
    mockUserDbGetUserByUsername = jest.fn();

    rentDb.getAllRents = mockRentDbGetAllRents;
    rentDb.getRentById = mockRentDbGetRentById;
    rentDb.createRent = mockRentDbCreateRent;
    rentDb.deleteRentById = mockRentDbDeleteRentById;
    rentDb.updateRentById = mockRentDbUpdateRentById;
    bikeDb.getBikeById = mockBikeDbGetBikeById;
    accessoryDb.getAccessoryById = mockAccessoryDbGetAccessoryById;
    userDb.getUserByUsername = mockUserDbGetUserByUsername;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: rents exist in database, when: getAllRents is called, then: it returns a list of rents', async () => {
    
    mockRentDbGetAllRents.mockReturnValue([mockRent]);

    const result = await rentService.getAllRents();

    expect(result).toEqual([mockRent]);
    expect(mockRentDbGetAllRents).toHaveBeenCalledTimes(1);
});

test('given: no rents in database, when: getAllRents is called, then: it returns an empty array', async () => {
    mockRentDbGetAllRents.mockReturnValue([]);

    const result = await rentService.getAllRents();

    expect(result).toEqual([]);
    expect(mockRentDbGetAllRents).toHaveBeenCalledTimes(1);
});

test('given: rent with specific ID exists, when: getRentById is called, then: it returns the rent', async () => {
    const rentId = 1;
    mockRentDbGetRentById.mockReturnValue(mockRent);

    const result = await rentService.getRentById(rentId);

    expect(result).toEqual(mockRent);
    expect(mockRentDbGetRentById).toHaveBeenCalledWith({ id: rentId });
});

test('given: rent with specific ID does not exist, when: getRentById is called, then: it throws an error', async () => {
    const rentId = 3;
    mockRentDbGetRentById.mockReturnValue(null);

    await expect(rentService.getRentById(rentId))
        .rejects
        .toThrow(`rent with id: ${rentId} does not exist.`);
    expect(mockRentDbGetRentById).toHaveBeenCalledWith({ id: rentId });
});

test('given: valid Rent object, when: rentAbike is called, then: it creates and returns the rent', async () => {
    
    mockBikeDbGetBikeById.mockResolvedValue(validBike);
    mockUserDbGetUserByUsername.mockResolvedValue(validRenter);
    mockAccessoryDbGetAccessoryById.mockResolvedValue(validAccessory1);
    mockRentDbGetAllRents.mockResolvedValue([]);
    mockRentDbCreateRent.mockResolvedValue(mockRent);

    const accessoryIds = [validAccessory1.getId(), validAccessory2.getId()];
    const currentdate = new Date();
    const start = add(currentdate, { days: 1 });


    const input = {
        startDate: start,
        returned: false,
        cost: 100,
        bike: {
            id: validBike.getId() ?? 0, // Use a default value if `getId()` might return undefined
            brand: validBike.getBrand(), // Extract other properties similarly
            model: validBike.getModel(),
            location: validBike.getLocation(),
            size: validBike.getSize(),
            cost: validBike.getCost(),
        },
        name: validRenter.getName(),
        accessoriesIdList: accessoryIds.map(id => id ?? 0), // Ensure no `undefined` values
    };
    

    const result = await rentService.rentAbike(input);

    expect(result).toEqual(mockRent);
    expect(mockBikeDbGetBikeById).toHaveBeenCalledWith({ id: input.bike.id });
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledWith(input.name);
    expect(mockAccessoryDbGetAccessoryById).toHaveBeenCalledWith({ id: 1 });
    expect(mockRentDbCreateRent).toHaveBeenCalledWith(expect.any(Rent));
});

test('given: start date in the past, when: rentAbike is called, then: it throws an error', async () => {
    const accessoryIds = [validAccessory1.getId(), validAccessory2.getId()];

    // Mocking to return valid accessories
    mockAccessoryDbGetAccessoryById.mockImplementation(({ id }) => {
        if (id === validAccessory1.getId()) return validAccessory1;
        if (id === validAccessory2.getId()) return validAccessory2;
        return null; // Simulate "not found" for other IDs
    });

    const input = {
        startDate: new Date('2000-01-01'),
        returned: false,
        cost: 100,
        bike: {
            id: validBike.getId() ?? 0,
            brand: validBike.getBrand(),
            model: validBike.getModel(),
            location: validBike.getLocation(),
            size: validBike.getSize(),
            cost: validBike.getCost(),
        },
        name: validRenter.getName(),
        accessoriesIdList: accessoryIds.map(id => id ?? 0),
    };

    await expect(rentService.rentAbike(input))
        .rejects
        .toThrow('Start date cannot be in the past.');


});


test('given: rent exists, when: deleteRentById is called, then: it deletes and returns the rent', async () => {
    const rentId = 1;
    
    mockRentDbGetRentById.mockResolvedValue(mockRent);
    mockRentDbDeleteRentById.mockResolvedValue(mockRent);

    const result = await rentService.deleteRentById(rentId);

    expect(result).toEqual(mockRent);
    expect(mockRentDbDeleteRentById).toHaveBeenCalledWith(rentId);
});

test('given: rent does not exist, when: deleteRentById is called, then: it throws an error', async () => {
    const rentId = 2;
    mockRentDbGetRentById.mockResolvedValue(null);

    await expect(rentService.deleteRentById(rentId))
        .rejects
        .toThrow(`No rent with id ${rentId} found.`);
});
