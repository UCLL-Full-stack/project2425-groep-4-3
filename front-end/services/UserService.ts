import { User } from "@types";

const getAllUsers = async () => {

    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {throw new Error("No logged-in user found in local storage");}
    const token = JSON.parse(loggedInUser).token;
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/users`, 
        { 
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
    };

    const makeAdmin = async (name: string) => {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {throw new Error("No logged-in user found in local storage");}
        const token = JSON.parse(loggedInUser).token;
        return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/makeAdmin/${name}`, 
        { 
            method: "PUT",
            headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            }

        });
    }
      
    const getUserById = async (userId: string) =>{
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {throw new Error("No logged-in user found in local storage");}
        const token = JSON.parse(loggedInUser).token;
        return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${userId}`, 
        { 
            method: "GET",
            headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
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

    const signupUser = (user: User) => {
        return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
    }
      
    const UserService = {
        getAllUsers,
        getUserById,
        loginUser,
        signupUser,
        makeAdmin,
    };
      
    export default UserService;
    