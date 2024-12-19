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
    const userCheck = await userDb.getUserByUsername(name);
    
    if(userCheck != null){
        throw new Error(`User with name: ${name} already exist.`);
    }
    const hashedPassword = await bcrypt.hash(password, 12)

    const user = new User({name,email,age,role,password:hashedPassword});
    return await userDb.createUser(user)
}

const makeUserAdmin = async (username : string) : Promise<User>  => {
    const user = await userDb.getUserByUsername(username);
    if (!user) {
        throw new Error(`User with name: ${username} does not exist.`);
    }
    const result = await userDb.makeUserCoach(user);
    return result;
    } 

const getUserByUsername = async ({ name }: { name: string }): Promise<User> => {
    if(name === undefined){
        throw new Error(`Username:${name} is not correct.`)
    }
    const user = await userDb.getUserByUsername(name);
    if (!user) {
        throw new Error(`User with name: ${name} does not exist.`);
    }
    return user;

};

const authenticate = async ({name, password}: AuthenticationRequest): Promise<AuthenticationResponse> => {
    
    const user = await getUserByUsername({name});
    // console.log(user)
    if ((user == null)) {
        throw new Error(`Authanticate Error.`)
    };

    console.log(user.getPassword())

    const isValidPassword = await bcrypt.compare(password, user.getPassword())
    if (!isValidPassword) {
        throw new Error("Password is incorrect.")
    }

    return {
        token: generateJwtToken({name, role : user.getRole()}), 
        name,
        role: user.getRole(),
    };
};


export default { getAllUsers, getUserById, createUser, authenticate,getUserByUsername, makeUserAdmin };