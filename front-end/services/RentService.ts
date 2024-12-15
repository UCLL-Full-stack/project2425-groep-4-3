import { Rent, RentInputCreate } from "@types";

    const getAllRents = async () => {

        const loggedInUser = localStorage.getItem("loggedInUser");
  
        if (!loggedInUser) {
            throw new Error("No logged-in user found in local storage");
        }
    
        const token = JSON.parse(loggedInUser).token;

        return fetch(process.env.NEXT_PUBLIC_API_URL + `/rents`, 
            { 
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                }
        });
    };
    const rentABike = (rent : RentInputCreate) => {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {throw new Error("No logged-in user found in local storage");}
        const token = JSON.parse(loggedInUser).token;
        fetch(process.env.NEXT_PUBLIC_API_URL + `/rents/rentAbike`,
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(rent)
        });
    }
    const updateRentById = async (id: number, rent: Rent) => {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {throw new Error("No logged-in user found in local storage");}
        const token = JSON.parse(loggedInUser).token;
    
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/rents/updateById/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(rent)
        });
        const updatedRent = await response.json();
        return updatedRent;
    };


    const deleteRent = (id: number) => {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {throw new Error("No logged-in user found in local storage");}
        const token = JSON.parse(loggedInUser).token;
    
        return fetch(process.env.NEXT_PUBLIC_API_URL + `/rents/byId/${id}`,
        {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
    }

    const getRentsByUserName = async () => {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {throw new Error("No logged-in user found in local storage");}
        const token = JSON.parse(loggedInUser).token;
        const name = JSON.parse(loggedInUser).name;

        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/rents/user/${name}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        return response
    };
    const RentService = {
        getAllRents,
        rentABike,
        updateRentById,
        deleteRent,
        getRentsByUserName
    };
      
    export default RentService;