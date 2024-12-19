import { Bike } from "@types";

const getAllBikes = async () => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {
        throw new Error("No logged-in user found in local storage");
    }
    const token = JSON.parse(loggedInUser).token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/bikes`, 
    { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
};
  
const getBikeById = async (bikeId: string) =>{
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {throw new Error("No logged-in user found in local storage");}
    const token = JSON.parse(loggedInUser).token;
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/bikes/${bikeId}`, 
    { 
        method: "GET",
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        }
    });
};

const createBike= async (bike: Bike) =>{
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (!loggedInUser) {throw new Error("No logged-in user found in local storage");}
    const token = JSON.parse(loggedInUser).token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/bikes`,
        {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(bike)
        }
    )
}
  
const BikeService = {
    getAllBikes,
    getBikeById,
    createBike
};
  
export default BikeService;