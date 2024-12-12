import { Rent } from "@types";

    const getAllRents = async () => {

        const loggedInUser = localStorage.getItem("loggedInUser");
  
        if (!loggedInUser) {
            throw new Error("No logged-in user found in session storage");
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
    const rentABike = (rent : Rent) => {
        console.log(rent)
        fetch(process.env.NEXT_PUBLIC_API_URL + `/rents/rentAbike`,
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify(rent)
        });
    }
    const updateRentById = async (id: number, rent: Rent) => {
        const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {throw new Error("No logged-in user found in session storage");}
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
        if (!loggedInUser) {throw new Error("No logged-in user found in session storage");}
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
    const RentService = {
        getAllRents,
        rentABike,
        updateRentById,
        deleteRent
    };
      
    export default RentService;