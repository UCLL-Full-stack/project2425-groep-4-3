import React, { useState } from "react";
import { Accessory } from "@types";

type Props = {
  accessories: Array<Accessory>;
  onAccessorySelectionChange: (selectedAccessories: Accessory[]) => void;
};

const AccessoryOverviewTable: React.FC<Props> = ({ accessories, onAccessorySelectionChange  }) => {
  
  const [selectedAccessories, setSelectedAccessories] = useState<Accessory[]>([]);
  
  
  // const addButton = (accessory: Accessory) => {
  //   setSelectedAccessories((prevAccessories) => [...prevAccessories, accessory]);
  // };

  // const addButton = (accessory: Accessory) => {
  //   setSelectedAccessories((prevAccessories) => {
  //     const updatedAccessories = [...prevAccessories, accessory];
  //     onAccessorySelectionChange(updatedAccessories);
  //     return updatedAccessories;
  //   });
  // };
  
  const isAccessorySelected = (accessory: Accessory ) => {
    return selectedAccessories.includes(accessory);
  };


  // const removeButton = (accessory: Accessory) => {
  //   setSelectedAccessories((prevAccessories) => {
  //     const updatedAccessories = prevAccessories.filter((item) => item !== accessory);
  //     onAccessorySelectionChange(updatedAccessories);
  //     return updatedAccessories;
  //   });
  // };
  
  const accessorySelection = (event: React.MouseEvent<HTMLButtonElement>, accessory: Accessory) => {
    event.preventDefault();
    setSelectedAccessories((prevAccessories) => {
      const isSelected = prevAccessories.includes(accessory);
      const updatedAccessories = isSelected
        ? prevAccessories.filter((item) => item !== accessory)
        : [...prevAccessories, accessory];
      return updatedAccessories;
    });
  };

  const handleSendSelection = () => {
    // Send the selected accessories to the parent when the button is clicked
    onAccessorySelectionChange(selectedAccessories);
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
              {/* <th scope="col" className="py-3 px-4 text-left text-sm font-medium text-gray-600">Remove</th> */}
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
                {/* <td>
                <button
                    className={`py-2 px-4 rounded-lg text-white font-semibold ${
                      isAccessorySeleced(accessory)
                        ? 'hidden'
                        : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
                    }`}
                    onClick={() => !isAccessorySeleced(accessory) && addButton(accessory)}
                    disabled={isAccessorySeleced(accessory) !==  null}
                    
                    
                  >
                    Select
                  </button>

                </td>
                <td>
                  <button
                    className={`py-2 px-4 rounded-lg text-white font-semibold ${
                      isAccessorySeleced(accessory)
                        ? 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
                        : 'hidden'
                    }`}
                    onClick={() => isAccessorySeleced(accessory) && removeButton(accessory)}

                    disabled={!isAccessorySeleced(accessory)}
                  >
                    Remove
                  </button>
                </td> */}
                <td>
                  <button
                    className={`py-2 px-4 rounded-lg text-white font-semibold ${
                      isAccessorySelected(accessory)
                        ? 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500'
                        : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
                    }`}
                    onClick={(event) => accessorySelection(event, accessory)}
                  >
                    {isAccessorySelected(accessory) ? 'Remove' : 'Select'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        
        
      )}

      <div className="mt-4">
        <button
          onClick={handleSendSelection}
          className="py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </div>

      
    </>
  );
};

export default AccessoryOverviewTable;
