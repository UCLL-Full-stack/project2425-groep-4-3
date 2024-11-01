const getAllAccessories = async () => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/accessories`, 
        { 
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
    };

const getAccessoryById = async (accessoryId: string) =>{
    return fetch(process.env.NEXT_PUBLIC_API_URL + `/accessories/${accessoryId}`, 
    { 
        method: "GET",
        headers:{
        "Content-Type": "application/json",
        }
    });
};

const AccessoryService = {
    getAllAccessories,
    getAccessoryById
};

export default AccessoryService;