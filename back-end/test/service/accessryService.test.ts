import accessoryService from "../../service/accessory.service";
import accessoryDb from "../../repository/accessory.db";
import { Accessory } from "../../model/Accessory";

jest.mock("../../repository/accessory.db");

const mockAccessoryDbGetAllAccessories = jest.fn();
const mockAccessoryDbGetAccessoryById = jest.fn();
const mockAccessoryDbCreateAccessory = jest.fn();

beforeEach(() => {
    jest.clearAllMocks();
    accessoryDb.getAllAccessories = mockAccessoryDbGetAllAccessories;
    accessoryDb.getAccessoryById = mockAccessoryDbGetAccessoryById;
    accessoryDb.createAccessory = mockAccessoryDbCreateAccessory;
});

describe("AccessoryService", () => {
    test("given: accessories exist in database, when: getAllAccessories is called, then: it returns a list of accessories", async () => {
        const mockAccessories = [
            new Accessory({ id: 1, name: "Helmet", amount: 10, cost: 20 }),
            new Accessory({ id: 2, name: "Lock", amount: 5, cost: 15 }),
        ];
        mockAccessoryDbGetAllAccessories.mockResolvedValue(mockAccessories);

        const result = await accessoryService.getAllAccessories();

        expect(result).toEqual(mockAccessories);
        expect(mockAccessoryDbGetAllAccessories).toHaveBeenCalledTimes(1);
    });

    test("given: no accessories exist in database, when: getAllAccessories is called, then: it returns an empty array", async () => {
        mockAccessoryDbGetAllAccessories.mockResolvedValue([]);

        const result = await accessoryService.getAllAccessories();

        expect(result).toEqual([]);
        expect(mockAccessoryDbGetAllAccessories).toHaveBeenCalledTimes(1);
    });

    test("given: accessory with specific ID exists, when: getAccessoryById is called, then: it returns the accessory", async () => {
        const mockAccessory = new Accessory({ id: 1, name: "Helmet", amount: 10, cost: 20 });
        mockAccessoryDbGetAccessoryById.mockResolvedValue(mockAccessory);

        const result = await accessoryService.getAccessoryById(1);

        expect(result).toEqual(mockAccessory);
        expect(mockAccessoryDbGetAccessoryById).toHaveBeenCalledWith({ id: 1 });
    });

    test("given: accessory with specific ID does not exist, when: getAccessoryById is called, then: it throws an error", async () => {
        const accessoryId = 999;
        mockAccessoryDbGetAccessoryById.mockResolvedValue(null);
    
        // Using reject to handle promises correctly
        await expect(accessoryService.getAccessoryById(accessoryId))
            .rejects
            .toThrow(`Accessory with id: ${accessoryId} does not exist.`);
        expect(mockAccessoryDbGetAccessoryById).toHaveBeenCalledWith({ id: accessoryId });
    });
    

    test("given: valid accessory data, when: createAccessory is called, then: it creates and returns the new accessory", async () => {
        const input = { name: "Helmet", amount: 10, cost: 20 };
        const createdAccessory = new Accessory({ id: 1, ...input });

        mockAccessoryDbCreateAccessory.mockResolvedValue(createdAccessory);

        const result = await accessoryService.createAccessory(input);

        expect(result).toEqual(createdAccessory);
        expect(mockAccessoryDbCreateAccessory).toHaveBeenCalledWith(expect.any(Accessory));
    });
});
