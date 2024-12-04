import { User } from "../model/User";
import database from "../util/database";

// const users = [
//     new User({
//         id: 0,
//         name: 'John Doe',
//         email: 'jhondoe@gmail.com',
//         age: 25,
//         password: 'joDoe123',
//         role: 'admin'
//     }),
//     new User({
//         id: 1,
//         name: 'Jane Doe',
//         email: 'janedoe@gmail.com',
//         age: 30,
//         password: 'jaDoe123',
//         role: 'user'
//     }),
//     new User({
//         id: 2,
//         name: 'Sander',
//         email: 'sander@gmail.com',
//         age: 35,
//         password: 'sDeb123',
//         role: 'user'
//     })
// ];

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
}
}

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                name: user.getName(),
                email: user.getEmail(),
                age: user.getAge(),
                password: user.getPassword(),
                role: user.getRole()
            },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllUsers,
    getUserById,
    createUser,
};