// import { set } from "date-fns";
// import { Bike } from "../../model/Bike";
// import { Rent } from "../../model/Rent";
// import bikeDb from "../../repository/bike.db";
// import rentDb from "../../repository/rent.db";
// import rentService from "../../service/rent.service";
// import { BikeInput, RentInputCreate, size } from "../../types";
// import { Accessory } from "../../model/Accessory";
// import { User } from "../../model/User";
// import userDb from "../../repository/user.db";
// import AccessoryDb from "../../repository/accessory.db";

// const currentDate = new Date();
// const startDate = set(currentDate, { hours: currentDate.getHours() + 1, minutes: currentDate.getMinutes() });
// const returned = true;

// const mockUser1 = new User({ id: 1, name: 'Alice', email: 'alice@example.com', age: 30, role: 'renter', password: 'Password1' });

// const validBike = new Bike({
//     id: 1,
//     brand: "Trek",
//     model: "Domane AL 2",
//     location: "Brussels",
//     size: "M",
//     cost: 25,
// });

// const validAccessory = new Accessory({
//     id: 1,
//     name: "Helmet",
//     amount : 1,
//     cost: 5,
// });

// const cost = validBike.getCost() + 20

// let getAllRentsDbMock: jest.Mock;
// let getRentByIdDbMock: jest.Mock;
// let createRentDbMock: jest.Mock;
// let getBikeByIdDbMock: jest.Mock;
// let getAccessoryByIdDbMock: jest.Mock;
// let getAllAccessoriesDbMock: jest.Mock;
// let getAllUsersDbMock: jest.Mock;
// let getUserByIdDbMock: jest.Mock;


// const validRent = new Rent({startDate,returned,cost,bike: validBike, user: mockUser1, accessories: [validAccessory]});

// const BikeID = validBike.getId();
// if (!BikeID) {
//     throw new Error('Bike ID is required.');
// }

// const rentInput: RentInputCreate = {
    
//     startDate,
//     returned,
//     cost,
//     bikeId: BikeID,
//     name: mockUser1.getName(),
//     accessoriesIdList: [1,2]
// }
// beforeEach(() => {
//     getAllRentsDbMock = jest.fn();
//     getRentByIdDbMock = jest.fn();
//     createRentDbMock = jest.fn();
//     getBikeByIdDbMock = jest.fn();
//     getAccessoryByIdDbMock = jest.fn();
//     getAllAccessoriesDbMock = jest.fn();
//     getAllUsersDbMock = jest.fn();
//     getUserByIdDbMock = jest.fn();
// });

// afterEach(() => {
//     jest.clearAllMocks();
// });

// test("when getting all rents, then all rents should be returned", async () => {
//     // given
//     const rents: Rent[] = [validRent];
//     rentDb.getAllRents = getAllRentsDbMock.mockResolvedValue(rents);

//     // when
//     const allRents = await rentService.getAllRents();

//     // then
//     expect(getAllRentsDbMock).toHaveBeenCalledTimes(1);
//     expect(allRents).toEqual(rents);
// });

// test("given a valid rent ID, when retrieving the rent, then the correct rent should be returned", async () => {
//     // given
//     // const rent = new Rent({startDate,returned,cost,bike:validBbike});
//     rentDb.getRentById = getRentByIdDbMock.mockResolvedValue(validRent);

//     // when
//     const retrievedRent = await rentService.getRentById(1);

//     // then
//     expect(getRentByIdDbMock).toHaveBeenCalledTimes(1);
//     expect(getRentByIdDbMock).toHaveBeenCalledWith({ id: 1 });
//     expect(retrievedRent).toEqual(validRent);
// });

// test("given an invalid rent ID, when retrieving the rent, then an exception should be thrown", async () => {
//     // given
//     const id = 99;
//     rentDb.getRentById = getRentByIdDbMock.mockResolvedValue(null);

//     // when
//     await expect(rentService.getRentById(id)).rejects.toThrow(`rent with id: ${id} does not exist.`);
// });

// test("given a valid rent input, when renting a bike, then the rent should be created", async () => {
//     // given
//     bikeDb.getBikeById = getBikeByIdDbMock.mockResolvedValue(BikeID);
//     userDb.getUserById = getUserByIdDbMock.mockResolvedValue(mockUser1);
//     AccessoryDb.getAccessoryById = getAccessoryByIdDbMock.mockResolvedValue(validAccessory);
//     rentDb.createRent = createRentDbMock.mockResolvedValue(validRent);


//     // when
//     const rent = await rentService.rentAbike(rentInput);

//     // then
//     expect(getBikeByIdDbMock).toHaveBeenCalledTimes(1);
//     expect(getBikeByIdDbMock).toHaveBeenCalledWith({ id : rentInput.bikeId});
//     expect(createRentDbMock).toHaveBeenCalledTimes(1);
//     expect(createRentDbMock).toHaveBeenCalledWith(rentInput);
//     expect(rent).toEqual(rentInput);
// });

// test("when renting a bike without bike input, then an exception should be thrown", async () => {
//     // given
//     const rentInput: RentInputCreate = { startDate: new Date(), returned: true, cost: 50, bikeId: BikeID, name: mockUser1.getName(), accessoriesIdList: [1,2] };

//     // when
//     await expect(rentService.rentAbike(rentInput)).rejects.toThrow(`No bike input.`);
// });

// test("when renting a bike without an ID, then an exception should be thrown", async () => {
//     // given
//     const bikeInputWithoutId : BikeInput = {
//         brand: "Trek",
//         model: "Domane AL 2",
//         location: "Brussels",
//         size: "M",
//         cost: 25,
//     }

//     const rentInput: RentInputCreate = { startDate: new Date(), returned: true, cost: 50, bikeId: null };

//     // when
//     await expect(rentService.rentAbike(rentInput)).rejects.toThrow(`Id is required. undefined`);
// });

// test("when renting a bike with a non-existent bike ID, then an exception should be thrown", async () => {
//     // given
//     bikeDb.getBikeById = getBikeByIdDbMock.mockResolvedValue(null);
    
//     // when
//     await expect(rentService.rentAbike(rentInput)).rejects.toThrow(`Bike with given Id not found.`);
// });
