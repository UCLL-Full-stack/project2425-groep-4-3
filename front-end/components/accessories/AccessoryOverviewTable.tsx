import React, { useState } from "react";
import { Accessory } from "@types";

type Props = {
  accessories: Array<Accessory>;
};

const AccessoryOverviewTable: React.FC<Props> = ({ accessories }: Props) => {
  
  const [selectedAccessories, setSelectedAccessories] = useState<Accessory[]>([]);
  
  
  const addButton = (accessory: Accessory) => {
    setSelectedAccessories((prevAccessories) => [...prevAccessories, accessory]);
  };

  const isAccessorySeleced = (accessoryId?: number ) => {
    return selectedAccessories.some(accessory => accessory.accessoryId === accessoryId);
  };
 
  
  return (
    <>
      {accessories && (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th scope="col" className="py-3 px-4 text-left text-sm font-medium text-gray-600">Name</th>
              <th scope="col" className="py-3 px-4 text-left text-sm font-medium text-gray-600">Amount</th>
              <th scope="col" className="py-3 px-4 text-left text-sm font-medium text-gray-600">Cost</th>
              <th scope="col" className="py-3 px-4 text-left text-sm font-medium text-gray-600">Add</th>
            </tr>
          </thead>
          <tbody>
            {accessories.map((accessory, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 border-b border-gray-200"
              >
                <td className="py-3 px-4 text-sm text-gray-800">{accessory.name}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{accessory.amount}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{accessory.cost}</td>
                <td>
                <button
                    className={`py-2 px-4 rounded-lg text-white font-semibold ${
                      isAccessorySeleced(accessory.accessoryId)
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
                    }`}
                    onClick={() => !isAccessorySeleced(accessory.accessoryId) && addButton(accessory)}
                    disabled={isAccessorySeleced(accessory.accessoryId)}
                  >
                    {isAccessorySeleced(accessory.accessoryId) ? 'Selected' : 'Select'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      )}
      selected accessories: {selectedAccessories.map((accessory) => accessory.name).join(", ")}
    </>
  );
};

export default AccessoryOverviewTable;
