import { set } from "date-fns";
import { Bike } from "../../model/Bike";
import { Rent } from "../../model/Rent";
import bikeDb from "../../repository/bike.db";
import rentDb from "../../repository/rent.db";
import rentService from "../../service/rent.service";
import { BikeInput, RentInput, Size } from "../../types";

const currentDate = new Date();
const startDate = set(currentDate, { hours: currentDate.getHours() + 1, minutes: currentDate.getMinutes() });
const returned = true;

const validBbike = new Bike({
    id: 0,
    brand: "Trek",
    model: "Domane AL 2",
    location: "Brussels",
    size: "M",
    cost: 25,
});
const cost = validBbike.getCost() + 20

let getAllRentsDbMock: jest.Mock;
let getRentByIdDbMock: jest.Mock;
let createRentDbMock: jest.Mock;
let getBikeByIdDbMock: jest.Mock;


const validRent = new Rent({startDate,returned,cost,bike: validBbike});
const bikeInput : BikeInput = {
    id: 0,
    brand: "Trek",
    model: "Domane AL 2",
    location: "Brussels",
    size: "M",
    cost: 25,
}
const rentInput: RentInput = {
    startDate,
    returned,
    cost,
    bike: bikeInput
}
beforeEach(() => {
    getAllRentsDbMock = jest.fn();
    getRentByIdDbMock = jest.fn();
    createRentDbMock = jest.fn();
    getBikeByIdDbMock = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test("when getting all rents, then all rents should be returned", async () => {
    // given
    const rents: Rent[] = [validRent];
    rentDb.getAllrents = getAllRentsDbMock.mockResolvedValue(rents);

    // when
    const allRents = await rentService.getAllRents();

    // then
    expect(getAllRentsDbMock).toHaveBeenCalledTimes(1);
    expect(allRents).toEqual(rents);
});

test("given a valid rent ID, when retrieving the rent, then the correct rent should be returned", async () => {
    // given
    // const rent = new Rent({startDate,returned,cost,bike:validBbike});
    rentDb.getRentById = getRentByIdDbMock.mockResolvedValue(validRent);

    // when
    const retrievedRent = await rentService.getRentById(1);

    // then
    expect(getRentByIdDbMock).toHaveBeenCalledTimes(1);
    expect(getRentByIdDbMock).toHaveBeenCalledWith({ id: 1 });
    expect(retrievedRent).toEqual(validRent);
});

test("given an invalid rent ID, when retrieving the rent, then an exception should be thrown", async () => {
    // given
    const id = 99;
    rentDb.getRentById = getRentByIdDbMock.mockResolvedValue(null);

    // when
    await expect(rentService.getRentById(id)).rejects.toThrow(`rent with id: ${id} does not exist.`);
});

test("given a valid rent input, when renting a bike, then the rent should be created", async () => {
    // given
    bikeDb.getBikeById = getBikeByIdDbMock.mockResolvedValue(validBbike);
    rentDb.createRent = createRentDbMock.mockResolvedValue(validRent);

    // when
    const rent = await rentService.rentAbike(rentInput);

    // then
    expect(getBikeByIdDbMock).toHaveBeenCalledTimes(1);
    expect(getBikeByIdDbMock).toHaveBeenCalledWith({ id : rentInput.bike?.id});
    expect(createRentDbMock).toHaveBeenCalledTimes(1);
    expect(createRentDbMock).toHaveBeenCalledWith(rentInput);
    expect(rent).toEqual(rentInput);
});

test("when renting a bike without bike input, then an exception should be thrown", async () => {
    // given
    const rentInput: RentInput = { startDate: new Date(), returned: true, cost: 50, bike: undefined };

    // when
    await expect(rentService.rentAbike(rentInput)).rejects.toThrow(`No bike input.`);
});

test("when renting a bike without an ID, then an exception should be thrown", async () => {
    // given
    const bikeInputWithoutId : BikeInput = {
        brand: "Trek",
        model: "Domane AL 2",
        location: "Brussels",
        size: "M",
        cost: 25,
    }

    const rentInput: RentInput = { startDate: new Date(), returned: true, cost: 50, bike: bikeInputWithoutId };

    // when
    await expect(rentService.rentAbike(rentInput)).rejects.toThrow(`Id is required. undefined`);
});

test("when renting a bike with a non-existent bike ID, then an exception should be thrown", async () => {
    // given
    bikeDb.getBikeById = getBikeByIdDbMock.mockResolvedValue(null);
    
    // when
    await expect(rentService.rentAbike(rentInput)).rejects.toThrow(`Bike with given Id not found.`);
});
