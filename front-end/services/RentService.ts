import { Rent } from "@types";

    const getAllRents = async () => {
        return fetch(process.env.NEXT_PUBLIC_API_URL + `/rents`, 
            { 
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
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

    const RentService = {
        getAllRents,
        rentABike
    };
      
    export default RentService;