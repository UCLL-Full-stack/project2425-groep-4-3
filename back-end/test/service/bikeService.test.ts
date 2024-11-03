import bikeService from "../../service/bike.service";
import bikeDb from "../../repository/bike.db";
import { Bike } from "../../model/Bike";
import { Size } from "../../types";

const mockBike1 = new Bike({ id: 1, brand: 'Giant', model: 'Escape 3', location: 'Downtown', size: 'M' as Size, cost: 12 });
const mockBike2 = new Bike({ id: 2, brand: 'Trek', model: 'FX 1', location: 'Uptown', size: 'L' as Size, cost: 15 });

let mockBikeDbGetAllBikes: jest.Mock;
let mockBikeDbGetBikeById: jest.Mock;

beforeEach(() => {
    mockBikeDbGetAllBikes = jest.fn();
    mockBikeDbGetBikeById = jest.fn();

    bikeDb.getAllbikes = mockBikeDbGetAllBikes;
    bikeDb.getBikeById = mockBikeDbGetBikeById;
});

afterEach(() => {
    jest.clearAllMocks();
});
test('given: bikes exist in database, when: getAllBikes is called, then: it returns a list of bikes', () => {
    
    mockBikeDbGetAllBikes.mockReturnValue([mockBike1, mockBike2]);

    const result = bikeService.getAllBikes();
    
    expect(result).toEqual([mockBike1, mockBike2]);
    expect(mockBikeDbGetAllBikes).toHaveBeenCalledTimes(1);
});
test('given: no bikes in database, when: getAllBikes is called, then: it returns an empty array', () => {
    
    mockBikeDbGetAllBikes.mockReturnValue([]);
    
    const result = bikeService.getAllBikes();
    
    expect(result).toEqual([]);
    expect(mockBikeDbGetAllBikes).toHaveBeenCalledTimes(1);
});

test('given: bike with specific ID exists, when: getBikeById is called, then: it returns that bike', () => {
    
    const bikeId = 1;
    mockBikeDbGetBikeById.mockReturnValue(mockBike1);
    
    const result = bikeService.getBikeById(bikeId);
    
    expect(result).toEqual(mockBike1);
    expect(mockBikeDbGetBikeById).toHaveBeenCalledWith({ id: bikeId });
});
test('given: bike with specific ID does not exist, when: getBikeById is called, then: it throws an error', () => {
    
    const bikeId = 3;
    mockBikeDbGetBikeById.mockReturnValue(null);
    
    expect(() => bikeService.getBikeById(bikeId))
        .toThrow(`Bike with id: ${bikeId} does not exist.`);
    expect(mockBikeDbGetBikeById).toHaveBeenCalledWith({ id: bikeId });
});
