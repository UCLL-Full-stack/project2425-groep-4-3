import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import RentService from "@services/RentService";
import BikeService from "@services/BikeService";
import classNames from "classnames";
import { Accessory, Bike, User} from "@types";
import { StatusMessage } from "@types";
// import Accessories from "pages/accessories";
import AccessoryOverviewTable from "@components/accessories/AccessoryOverviewTable";

interface RentFormProps {
  onCancel: () => void;
  selectedBike: Bike;
  accessories: Array<Accessory>;
}

const RentForm: React.FC<RentFormProps> = ({selectedBike, accessories,onCancel}: RentFormProps) => {
    const [startDate, setStartDate] = useState<string>("");
    const [returned, setReturned] = useState<boolean>(true);
    const [cost, setCost] = useState<number>(0);
    const [bikeId, setBikeId] = useState<number>(0);
    const [startDateError, setStartDateError] = useState("");
    const [endDateError, setEndDateError] = useState("");
    const [costError, setCostError] = useState("");
    const [bikeIdError, setBikeIdError] = useState("");
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
    const [selectedUsername, setSelectedUsername] = useState<string>()
    const [selectedAccessories, setSelectedAccessories] = useState<Accessory[]>([]);
    const [selectedUsernameError, setSelectedUsernameError] = useState<string>()
    const router = useRouter();

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
      } else if (new Date(startDate) < new Date()) {
        setStartDateError("Start date cant be in the past");
        result = false;
      }
      return result;
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      

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
  
      // console.log(selectedAccessories)
      const newRent = {
        startDate: new Date(startDate),
        cost: selectedBike.cost,
        returned: returned,
        bike: selectedBike,
        name: selectedUsername,
        accessoriesIdList: selectedAccessories
          .map((accessory) =>  accessory.id)
          .filter((id): id is number => id !== undefined),
      };
      // console.log(newRent)
      RentService.rentABike(newRent);

      setTimeout(() => {
        router.push("/rents");
      }, 1000);
    


      // if (response.ok) {
      //   setStatusMessages([{ message: "Succes", type: "success" }]);
      //   console.log("Rent successfully created");
      // } else {
      //   setStatusMessages([{ message: "failed to add it", type: "error" }]);
      // };

    };

    
    useEffect(() => {
      const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {throw new Error("No logged-in user found in local storage");}
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
              <AccessoryOverviewTable accessories={accessories} onAccessorySelectionChange={setSelectedAccessories}/>

              <button type="submit" className="cursor-pointer text-[white] bg-[rgb(0,128,255)] w-3/12 mt-4 p-2 rounded-lg border-[solid] border-[128,255)];"> Submit </button>
              <button type="button" className="cursor-pointer text-[white] bg-[rgb(0,128,255)] w-3/12 mt-4 p-2 rounded-lg border-[solid] border-[128,255)];" onClick={onCancel}>Cancel </button>
          </form>
      </main>
    );
};

export default RentForm;




