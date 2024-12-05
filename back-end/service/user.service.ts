import { create } from "domain";
import { User } from "../model/User";
import userDb from "../repository/user.db";
import { AuthenticationRequest, AuthenticationResponse, UserInput } from '../types';
import { generateJwtToken } from "../model/jwt";
import bcrypt from 'bcrypt';

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

const getUserByUsername = async ({ name }: { name: string }): Promise<User> => {
    const user = await userDb.getUserByUsername({ name });
    if (!user) {
        throw new Error(`User with name: ${name} does not exist.`);
    }
    return user;
};

const authenticate = async ({name, password}: AuthenticationRequest): Promise<AuthenticationResponse> => {
    
    const user = await getUserByUsername({name});
    console.log(user)
    if ((user == null)) {
        throw new Error(`Authanticate Error.`)
    };
    const userPassword = user.getPassword()
    console.log(userPassword)
    const isValidPassword = await bcrypt.compare((password).trim(), (userPassword).trim())
    if (!isValidPassword) {
        throw new Error("Password is incorrect.")
    }

    return {
        token: generateJwtToken({name, role : user.getRole()}), 
        name,
        role: user.getRole(),
    };
};

export default { getAllUsers, getUserById, createUser, authenticate };