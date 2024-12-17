import userService from "../../service/user.service";
import userDb from "../../repository/user.db";
import { User } from "../../model/User";

const mockUser1 = new User({ id: 1, name: 'Alice', email: 'alice@example.com', age: 30, role: 'renter', password: 'password1' });
const mockUser2 = new User({ id: 2, name: 'Bob', email: 'bob@example.com', age: 25, role: 'admin', password: 'password2' });
const mockUser3 = new User({ id: 2, name: 'kika', email: 'kika@example.com', age: 35, role: 'owner', password: 'password3' });

let mockUserDbGetAllUsers: jest.Mock;
let mockUserDbGetUserById: jest.Mock;

beforeEach(() => {
    mockUserDbGetAllUsers = jest.fn();
    mockUserDbGetUserById = jest.fn();

    userDb.getAllUsers = mockUserDbGetAllUsers;
    userDb.getUserById = mockUserDbGetUserById;
});

afterEach(() => {
    jest.clearAllMocks();
});
test('given: users exist in database, when: getAllUsers is called, then: it returns a list of users', () => {
    
    mockUserDbGetAllUsers.mockReturnValue([mockUser1, mockUser2]);
    
    const result = userService.getAllUsers();
    
    expect(result).toEqual([mockUser1, mockUser2]);
    expect(mockUserDbGetAllUsers).toHaveBeenCalledTimes(1);
});
test('given: no users in database, when: getAllUsers is called, then: it returns an empty array', () => {
    
    mockUserDbGetAllUsers.mockReturnValue([]);
    
    const result = userService.getAllUsers();
    
    expect(result).toEqual([]);
    expect(mockUserDbGetAllUsers).toHaveBeenCalledTimes(1);
});

test('given: user with specific ID exists, when: getUserById is called, then: it returns that user', () => {
    
    const userId = 1;
    mockUserDbGetUserById.mockReturnValue(mockUser1);
    
    const result = userService.getUserById(userId);
    
    expect(result).toEqual(mockUser1);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith({ id: userId });
});

test('given: user with specific ID does not exist, when: getUserById is called, then: it throws an error', () => {
    
    const userId = 3;
    mockUserDbGetUserById.mockReturnValue(null);
    
    expect(() => userService.getUserById(userId))
        .toThrow(`User with id ${userId} does not exist.`);
    expect(mockUserDbGetUserById).toHaveBeenCalledWith({ id: userId });
});

