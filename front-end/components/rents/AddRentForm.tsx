import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import RentService from "@services/RentService";
import BikeService from "@services/BikeService";
import classNames from "classnames";
import { Accessory, Bike, User} from "@types";
import { StatusMessage } from "@types";
import Accessories from "pages/accessories";
import AccessoryOverviewTable from "@components/accessories/AccessoryOverviewTable";

interface RentFormProps {
  onSubmit: (formData: any) => void;
  onCancel: () => void;
  selectedBike: Bike;
  accessories: Array<Accessory>;
}

const RentForm: React.FC<RentFormProps> = ({selectedBike, accessories}: RentFormProps) => {
    const [startDate, setStartDate] = useState<string>("");
    const [returned, setReturned] = useState<boolean>(true);
    const [cost, setCost] = useState<number>(0);
    const [bikeId, setBikeId] = useState<number>(0);
    const router = useRouter();

    const [startDateError, setStartDateError] = useState("");
    const [endDateError, setEndDateError] = useState("");
    const [costError, setCostError] = useState("");
    const [bikeIdError, setBikeIdError] = useState("");
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const [selectedUsername, setSelectedUsername] = useState<string>()
    const [selectedAccessories, setSelectedAccessories]= useState<number[]>([]);
    const [selectedUsernameError, setSelectedUsernameError] = useState<string>()

    const clearErrors = () => {
      setStartDateError("");
      setEndDateError("");
      setCostError("");
      setBikeIdError("");
      setStatusMessages([]);
      setSelectedUsernameError("");

    };

    

    const validate = (): boolean => {
      let result = true;
      if (!startDate || startDate.trim() === "") {
        setStartDateError("Start date cant be empty");
        result = false;
      }
      // if (!endDate || endDate.trim() === "" || endDate < startDate) {
      //   setEndDateError("End date cant be empty");
      //   result = false;
      // }
      return result;
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      console.log("fvjvbdfjvk,v sdkvskvskjvdijvsidjv ")
      

      e.preventDefault();
      clearErrors();

      if (!validate()) {
          return;
      };
      setReturned(false);

      if(selectedUsername == undefined){
        setSelectedUsernameError("username is undefined.")
        return;
      }
      const newRent = {
        startDate: new Date(startDate),
        cost: selectedBike.cost,
        returned: returned,
        bike: selectedBike,
        userName: selectedUsername,
        accessoriesIdList: selectedAccessories
      };

      const response = RentService.rentABike(newRent);

      setTimeout(() => {
        router.push("/rents");
      }, 500);
    


      // if (response.ok) {
      //   setStatusMessages([{ message: "Succes", type: "success" }]);
      //   console.log("Rent successfully created");
      // } else {
      //   setStatusMessages([{ message: "failed to add it", type: "error" }]);
      // };

    };

    const handleCancel = () => {
      // Reset form fields
      setStartDate("");
      setReturned(true);
      setCost(0);
      setBikeId(0);
      setSelectedAccessories([]);

      // Clear errors
      clearErrors();
  };
    useEffect(() => {
      const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {throw new Error("No logged-in user found in session storage");}
        setSelectedUsername(JSON.parse(loggedInUser).name);
    }, []);

    return (
      <main>
          <form onSubmit={submit} className="items-center flex flex-col bg-[aliceblue] w-6/12 mx-[25%] p-4">
              <div className="items-center flex flex-col bg-[aliceblue] w-6/12 mx-[25%] p-4">
                <label htmlFor="startDate">Start date</label>
                <input
                    className="mt-2 p-2 rounded-lg border-[solid] border-[0.1rem] border-black"
                    type="datetime-local"
                    id="startDate"
                    name="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}           
                />
                {startDateError && 
                  <div className="text-[red] mt-1">{startDateError}</div>
                }
              </div>

              <AccessoryOverviewTable accessories={accessories} />
        
              
    
              <button type="submit" className="cursor-pointer text-[white] bg-[rgb(0,128,255)] w-3/12 mt-4 p-2 rounded-lg border-[solid] border-[128,255)];"> Submit </button>
              <button type="button" className="cursor-pointer text-[white] bg-[rgb(0,128,255)] w-3/12 mt-4 p-2 rounded-lg border-[solid] border-[128,255)];" onClick={handleCancel}>Cancel </button>
          </form>
      </main>
    );
};

export default RentForm;




