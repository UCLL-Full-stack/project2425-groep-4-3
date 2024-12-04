import { create } from "domain";
import { User } from "../model/User";
import userDb from "../repository/user.db";
import { UserInput } from "../types";

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const getUserById = async (id: number): Promise<User | null> => {
    const user = userDb.getUserById({ id });
    if (!user) throw new Error(`User with id: ${id} does not exist.`);
    return user;
};

const createUser = async ({
    name,
    email,
    age,
    role,
    password
}: UserInput): Promise<User> =>{
    const user = new User({name,email,age,role,password});
    return await userDb.createUser(user)
}

export default { getAllUsers, getUserById, createUser };