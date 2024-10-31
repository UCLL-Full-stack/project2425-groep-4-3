import { User } from "../model/User";

const users = [
    new User({
        userId: 0,
        name: 'John Doe',
        email: 'jhondoe@gmail.com',
        age: 25,
        password: 't',
        role: 'admin'
    }),
    new User({
        userId: 1,
        name: 'Jane Doe',
        email: 'janedoe@gmail.com',
        age: 30,
        password: 't',
        role: 'user'
    }),
    new User({
        userId: 2,
        name: 'Sander',
        email: 'sander@gmail.com',
        age: 35,
        password: 't',
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