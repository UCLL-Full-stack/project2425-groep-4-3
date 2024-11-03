import { User } from "../model/User";

const users = [
    new User({
        id: 0,
        name: 'John Doe',
        email: 'jhondoe@gmail.com',
        age: 25,
        password: 'joDoe123',
        role: 'admin'
    }),
    new User({
        id: 1,
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        age: 30,
        password: 'jaDoe123',
        role: 'user'
    }),
    new User({
        id: 2,
        name: 'Sander',
        email: 'sander@gmail.com',
        age: 35,
        password: 'sDeb123',
        role: 'user'
    })
];

const getAllUsers = (): User[] => users;

const getUserById = ({ id }: { id: number }): User | null => {
    return users.find((user) => user.getId() === id) || null;
};

export default {
    getAllUsers,
    getUserById,
};