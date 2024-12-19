import bikeService from "../../service/bike.service";
import bikeDb from "../../repository/bike.db";
import { Bike } from "../../model/Bike";
import { size } from "../../types";

const mockBike = new Bike({ id: 1, brand: "Trek", model: "Mountain", location: "Halle", size: "M", cost: 100 });

let mockBikeDbGetAllBikes: jest.Mock;
let mockBikeDbGetBikeById: jest.Mock;
let mockBikeDbCreateBike: jest.Mock;
let mockBikeDbUpdateBikeById: jest.Mock;
let mockBikeDbDeleteBikeById: jest.Mock;

beforeEach(() => {
    mockBikeDbGetAllBikes = jest.fn();
    mockBikeDbGetBikeById = jest.fn();
    mockBikeDbCreateBike = jest.fn();
    mockBikeDbUpdateBikeById = jest.fn();
    mockBikeDbDeleteBikeById = jest.fn();

    bikeDb.getAllBikes = mockBikeDbGetAllBikes;
    bikeDb.getBikeById = mockBikeDbGetBikeById;
    bikeDb.createBike = mockBikeDbCreateBike;
    bikeDb.updateBikeById = mockBikeDbUpdateBikeById;
    bikeDb.deleteBikeById = mockBikeDbDeleteBikeById;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: bikes exist in database, when: getAllBikes is called, then: it returns a list of bikes', async () => {
    mockBikeDbGetAllBikes.mockResolvedValue([mockBike]);

    const result = await bikeService.getAllBikes();

    expect(result).toEqual([mockBike]);
    expect(mockBikeDbGetAllBikes).toHaveBeenCalledTimes(1);
});

test('given: no bikes in database, when: getAllBikes is called, then: it returns an empty array', async () => {
    mockBikeDbGetAllBikes.mockResolvedValue([]);

    const result = await bikeService.getAllBikes();

    expect(result).toEqual([]);
    expect(mockBikeDbGetAllBikes).toHaveBeenCalledTimes(1);
});

test('given: bike with specific ID exists, when: getBikeById is called, then: it returns the bike', async () => {
    const bikeId = 1;
    mockBikeDbGetBikeById.mockResolvedValue(mockBike);

    const result = await bikeService.getBikeById(bikeId);

    expect(result).toEqual(mockBike);
    expect(mockBikeDbGetBikeById).toHaveBeenCalledWith({ id: bikeId });
});


test('given: valid bike input, when: createBike is called, then: it creates and returns the bike', async () => {
    const input = { brand: "Giant", model: "Road", location: "Berlin", size: "L" as size, cost: 200 };

    const newBike = new Bike({ ...input });
    mockBikeDbCreateBike.mockResolvedValue(newBike);

    const result = await bikeService.createBike(input);

    expect(result).toEqual(newBike);
    expect(mockBikeDbCreateBike).toHaveBeenCalledWith(expect.any(Bike));
});

test('given: valid bike ID and update input, when: updateBikeById is called, then: it updates and returns the bike', async () => {
    const bikeId = 1;
    const updatedBikeInput = { brand: "Cannondale", model: "Hybrid", location: "Hamburg", size: "M" as size, cost: 150 };

    mockBikeDbGetBikeById.mockResolvedValue(mockBike);
    const updatedBike = new Bike({ id: bikeId, ...updatedBikeInput });
    mockBikeDbUpdateBikeById.mockResolvedValue(updatedBike);

    const result = await bikeService.updateBikeById(updatedBikeInput, bikeId);

    expect(result).toEqual(updatedBike);
    expect(mockBikeDbGetBikeById).toHaveBeenCalledWith({ id: bikeId });
    expect(mockBikeDbUpdateBikeById).toHaveBeenCalledWith(updatedBikeInput, bikeId);
});


test('given: bike with specific ID exists, when: deleteBikeById is called, then: it deletes and returns the bike', async () => {
    const bikeId = 1;

    mockBikeDbGetBikeById.mockResolvedValue(mockBike);
    mockBikeDbDeleteBikeById.mockResolvedValue(mockBike);

    const result = await bikeService.deleteBikeById(bikeId);

    expect(result).toEqual(mockBike);
    expect(mockBikeDbGetBikeById).toHaveBeenCalledWith({ id: bikeId });
    expect(mockBikeDbDeleteBikeById).toHaveBeenCalledWith(bikeId);
});

test('given: bike with specific ID does not exist, when: deleteBikeById is called, then: it throws an error', async () => {
    const bikeId = 999;

    mockBikeDbGetBikeById.mockResolvedValue(null);

    await expect(bikeService.deleteBikeById(bikeId))
        .rejects
        .toThrow(`No bike with id ${bikeId} found.`);
    expect(mockBikeDbGetBikeById).toHaveBeenCalledWith({ id: bikeId });
});
