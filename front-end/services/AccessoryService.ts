const getAllAccessories = async () => {

    const loggedInUser = localStorage.getItem("loggedInUser");
  
    if (!loggedInUser) {
        throw new Error("No logged-in user found in session storage");
    }

    const token = JSON.parse(loggedInUser).token;

    return fetch(process.env.NEXT_PUBLIC_API_URL + `/accessories`, 
        { 
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
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