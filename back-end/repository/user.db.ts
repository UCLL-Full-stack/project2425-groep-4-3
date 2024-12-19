import { User } from "../model/User";
import database from "../util/database";

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

const makeUserCoach = async (user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.update({
            where: {
                id: user.getId(),
            },
            data: {
                name: user.getName(),
                email: user.getEmail(),
                age: user.getAge(),
                password: user.getPassword(),
                role: 'Admin',
                rents: {
                    connect: (user.getRents() || []).map(rent => ({ id: rent.getId() })),
                },
            },
        
        })

        return User.from(userPrisma)

    } catch (error) {
        console.log(error)
        throw new Error("Database error, see server log for more info.")
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

const getUserByUsername = async (name: string): Promise<User | null> => {
    console.log(name + 'DBBBB')
    try {
        const userPrisma = await database.user.findUnique({
            where: { name: name},
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


export default {
    getAllUsers,
    getUserById,
    createUser,
    getUserByUsername,
    makeUserCoach
};