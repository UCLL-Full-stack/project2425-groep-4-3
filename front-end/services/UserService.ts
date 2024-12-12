import { User } from "@types";

const getAllUsers = async () => {


    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users`, 
        { 
            method: "GET",
            headers: {
                "Content-Type": "application/json",

            }
        });
    };
      
    const getUserById = async (userId: string) =>{
        return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${userId}`, 
        { 
            method: "GET",
            headers:{
            "Content-Type": "application/json",
            }
        });
    };

    const loginUser = (user: User) => {
        return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
    };
      
    const UserService = {
        getAllUsers,
        getUserById,
        loginUser,
    };
      
    export default UserService;
    