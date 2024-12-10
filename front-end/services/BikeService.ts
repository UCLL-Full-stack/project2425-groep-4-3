const getAllBikes = async () => {

    const loggedInUser = localStorage.getItem("loggedInUser");
  
    if (!loggedInUser) {
        throw new Error("No logged-in user found in session storage");
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
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/bikes/${bikeId}`, 
    { 
        method: "GET",
        headers:{
        "Content-Type": "application/json",
        }
    });
};
  
const BikeService = {
    getAllBikes,
    getBikeById
};
  
export default BikeService;