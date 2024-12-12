import React, { useEffect, useState } from 'react';
import { Rent } from '@types';
import RentService from '@services/RentService';

type Props = {
  rents: Array<Rent>;
};

const RentOverviewTable: React.FC<Props> = ({ rents }: Props) => {
  const [updatedRents, setUpdatedRents] = useState<Array<Rent>>(rents);

  // const updateStatusRent = async (rent: Rent) => {
  //   console.log("Updating rent status for rentId:", rent.id);
  //   console.log(rent)
  //     if(!rent.id){
  //       console.error("Rent ID is missing",rent.id);
  //       return
  //     }

  //   const newRentStatus = { ...rent, retuned:true}
  //   const response = await RentService.updateRentById(rent.id,newRentStatus)
  //   setUpdatedRents((allRents) =>
  //     allRents.map((rentInRents) => (rentInRents.id === rent.id ? response : rentInRents))
  //   );
  // };

  const deleteRent = async(id: number)=>{
    console.log(id)
    if(id === undefined){
      console.error("no id given",id)
      return
    }
    await RentService.deleteRent(id);
    setUpdatedRents((allRents) => allRents.filter((rent) => rent.id !== id));
  }

  const handleDeleteClick = (id: number | undefined) => {
    if (id !== undefined) {
      deleteRent(id);
    } else {
      console.error("Invalid rent id");
    }
  };
  useEffect(() => {
    setUpdatedRents(rents)
  }, [rents]);


  return (
    <>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th scope="col" className="py-3 px-4 text-left text-sm font-medium text-gray-600">
              Start
            </th>
            <th scope="col" className="py-3 px-4 text-left text-sm font-medium text-gray-600">
              Cost
            </th>
            <th scope="col" className="py-3 px-4 text-left text-sm font-medium text-gray-600">
              Bike
            </th>
            <th scope="col" className="py-3 px-4 text-left text-sm font-medium text-gray-600"></th>
          </tr>
        </thead>
        <tbody>
          {updatedRents.map((rent, index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 border-b border-gray-200"
            >
              <td className="py-3 px-4 text-sm text-gray-800">{(new Date(rent.startDate)).toLocaleTimeString()}</td>
              <td className="py-3 px-4 text-sm text-gray-800">{rent.cost}</td>
              <td className="py-3 px-4 text-sm text-gray-800">
                {rent.bike ? rent.bike.brand + " " + rent.bike.model : ""}
              </td>
              <td className="py-3 px-4">
                <button
                  onClick={() => handleDeleteClick(rent.id)}
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Return bike
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default RentOverviewTable;
