import React from "react";
import { Accessory } from "@types";

type Props = {
  accessories: Array<Accessory>;
};

const AccessoryOverviewTable: React.FC<Props> = ({ accessories }: Props) => {
  return (
    <>
      {accessories && (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th
                scope="col"
                className="py-3 px-4 text-left text-sm font-medium text-gray-600"
              >
                Name
              </th>
              <th
                scope="col"
                className="py-3 px-4 text-left text-sm font-medium text-gray-600"
              >
                Amount
              </th>
              <th
                scope="col"
                className="py-3 px-4 text-left text-sm font-medium text-gray-600"
              >
                Cost
              </th>
            </tr>
          </thead>
          <tbody>
            {accessories.map((accessory, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50 border-b border-gray-200"
              >
                <td className="py-3 px-4 text-sm text-gray-800">
                  {accessory.name}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  {accessory.amount}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  {accessory.cost}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default AccessoryOverviewTable;
