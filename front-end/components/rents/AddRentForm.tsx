import { useRouter } from "next/router";
import { useState } from "react";
import RentService from "@services/RentService";
import BikeService from "@services/BikeService";
import classNames from "classnames";
import { Bike} from "@types";
import { StatusMessage } from "@types";

interface RentFormProps {
    onSubmit: (formData: any) => void;
    onCancel: () => void;
    selectedBike: Bike;
}

const RentForm: React.FC<RentFormProps> = ({ onSubmit, onCancel, selectedBike}: RentFormProps) => {
    const [startDate, setStartDate] = useState<string>("");
    const [endDate, setEndDate] = useState<string>("");
    const [cost, setCost] = useState<number>(0);
    const [bikeId, setBikeId] = useState<number>(0);
    const router = useRouter();

    const [startDateError, setStartDateError] = useState("");
    const [endDateError, setEndDateError] = useState("");
    const [costError, setCostError] = useState("");
    const [bikeIdError, setBikeIdError] = useState("");
    const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);


    const clearErrors = () => {
      setStartDateError("");
      setEndDateError("");
      setCostError("");
      setBikeIdError("");
      setStatusMessages([]);

    };

    const validate = (): boolean => {
      let result = true;
      if (!startDate || startDate.trim() === "") {
        setStartDateError("Start date cant be empty");
        result = false;
      }
      if (!endDate || endDate.trim() === "" || endDate < startDate) {
        setEndDateError("End date cant be empty");
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

      const newRent = {
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        cost: selectedBike.cost,
        bike: selectedBike 
      };

      const response = RentService.rentABike(newRent);

      // if (response.status === 200) {
      //   setStatusMessages([{ message: "Succes", type: "success" }]);
      //   console.log("Rent successfully created");
      // } else {
      //   setStatusMessages([{ message: "failed to add it", type: "error" }]);
      // };

      onSubmit(newRent);
    };

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
        
              <div className="items-center flex flex-col bg-[aliceblue] w-6/12 mx-[25%] p-4">
                <label htmlFor="endDate">End Date</label>
                <input
                    className="mt-2 p-2 rounded-lg border-[solid] border-[0.1rem] border-black"
                    type="datetime-local"
                    id="endDate"
                    name="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
                {endDateError && 
                  <div className="text-[red] mt-1">{endDateError}</div>
                }
              </div>
    
              <button type="submit" className="cursor-pointer text-[white] bg-[rgb(0,128,255)] w-3/12 mt-4 p-2 rounded-lg border-[solid] border-[128,255)];"> Submit </button>
              <button type="button" className="cursor-pointer text-[white] bg-[rgb(0,128,255)] w-3/12 mt-4 p-2 rounded-lg border-[solid] border-[128,255)];" onClick={onCancel}>Cancel </button>
          </form>
      </main>
    );
};

export default RentForm;




