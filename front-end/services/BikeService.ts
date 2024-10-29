const getAllBikes = async () => {
return fetch(process.env.NEXT_PUBLIC_API_URL + `/bikes`, 
    { 
        method: "GET",
        headers: {
            "Content-Type": "application/json",
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