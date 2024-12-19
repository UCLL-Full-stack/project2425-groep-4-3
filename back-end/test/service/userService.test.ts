import userService from "../../service/user.service";
import userDb from "../../repository/user.db";
import { User } from "../../model/User";

enum Role {
    Renter = 'renter',
    Admin = 'admin',
    Owner = 'owner'
}

const mockUser1 = new User({ id: 1, name: 'Sander', email: 'Sander@example.com', age: 30, role: Role.Renter, password: 'Password1' });
const mockUser2 = new User({ id: 2, name: 'Niels', email: 'Niels@example.com', age: 25, role: Role.Admin, password: 'Password2' });


let mockUserDbGetAllUsers: jest.Mock;
let mockUserDbGetUserById: jest.Mock;
let mockUserDbCreateUser: jest.Mock;
let mockUserDbGetUserByUsername: jest.Mock;
let mockBcryptHash : jest.Mock

beforeEach(() => {
    mockUserDbGetAllUsers = jest.fn();
    mockUserDbGetUserById = jest.fn();
    mockUserDbCreateUser = jest.fn()
    mockUserDbGetUserByUsername = jest.fn();
    mockBcryptHash = jest.fn()
    userDb.getAllUsers = mockUserDbGetAllUsers;
    userDb.getUserById = mockUserDbGetUserById;
    userDb.createUser = mockUserDbCreateUser;
    userDb.getUserByUsername = mockUserDbGetUserByUsername;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given: users exist in database, when: getAllUsers is called, then: it returns a list of users', async () => {
    mockUserDbGetAllUsers.mockReturnValue([mockUser1, mockUser2]);

    const result = await userService.getAllUsers();

    expect(result).toEqual([mockUser1, mockUser2]);
    expect(mockUserDbGetAllUsers).toHaveBeenCalledTimes(1);
});

test('given: no users in database, when: getAllUsers is called, then: it returns an empty array', async () => {
    mockUserDbGetAllUsers.mockReturnValue([]);

    const result = await userService.getAllUsers();

    expect(result).toEqual([]);
    expect(mockUserDbGetAllUsers).toHaveBeenCalledTimes(1);
});

test('given user with specific ID exists, when getUserById is called, then: it returns that user', async () => {
    const userId = 1;
    mockUserDbGetUserById.mockReturnValue(mockUser1);

    const result = await userService.getUserById(userId);

    expect(result).toEqual(mockUser1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith({ id: userId });
});

test('given: user with specific ID does not exist, when: getUserById is called, then: it throws an error', async () => {
    const userId = 3;
    mockUserDbGetUserById.mockReturnValue(null);

    await expect(userService.getUserById(userId))
        .rejects
        .toThrow(`User with id: ${userId} does not exist.`);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith({ id: userId });
});


test('given: valid User object, when: user create, then: it returns User', async () => {
    mockUserDbGetUserByUsername.mockResolvedValue(null); // No existing user
    mockBcryptHash.mockResolvedValue('hashedPassword');
    mockUserDbCreateUser.mockResolvedValue(mockUser1);

    const userInput = {
        name: 'Sander',
        email: 'Sander@example.com',
        age: 30,
        role: Role.Admin,
        password: 'Password1'
    };

    const result = await userService.createUser(userInput);

    expect(result).toEqual(mockUser1);
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledWith(userInput.name);
    expect(mockUserDbCreateUser).toHaveBeenCalledWith(expect.any(User));
});

test('given: existing User, when: user create, then: it throws an error', async () => {
    mockUserDbGetUserByUsername.mockResolvedValue(mockUser1); // Existing user

    const userInput = {
        name: 'Sander',
        email: 'Sander@example.com',
        age: 30,
        role:Role.Admin,
        password: 'Password1'
    };

    await expect(userService.createUser(userInput))
        .rejects
        .toThrow(`User with name: ${userInput.name} already exist.`);

    expect(mockUserDbGetUserByUsername).toHaveBeenCalledWith(userInput.name);
    expect(mockUserDbCreateUser).not.toHaveBeenCalled();
});

test('given: valid username, when: getUserByUsername is called, then: it returns the user', async () => {
    mockUserDbGetUserByUsername.mockResolvedValue(mockUser1);

    const result = await userService.getUserByUsername({ name: 'Sander' });

    expect(result).toEqual(mockUser1);
    expect(mockUserDbGetUserByUsername).toHaveBeenCalledWith('Sander');
});

test('given: name is not provided, when: getUserByUsername is called, then: it throws an error', async () => {
    mockUserDbGetUserByUsername.mockResolvedValue(null);
    const invalidName = "Eddy"
    await expect(userService.getUserByUsername({ name:invalidName}))
        .rejects
        .toThrow(`User with name: ${invalidName} does not exist.`);
});





