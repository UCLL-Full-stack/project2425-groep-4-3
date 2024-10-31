    const getAllRents = async () => {
        return fetch(process.env.NEXT_PUBLIC_API_URL + `/rents`, 
            { 
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
        });
    };
    const rentABike = (bikeId: number,rentId : number) => {
        fetch(process.env.NEXT_PUBLIC_API_URL + `/rents/${bikeId}/${rentId}`,
        {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
            },
        });
    }

    const RentService = {
        getAllRents,
        rentABike
    };
      
    export default RentService;