import React, { useState } from 'react';
import { Accessory, Bike, Rent } from '@types';
import RentForm from '@components/rents/AddRentForm';


type Props = {
  bikes: Array<Bike>;
  rents: Array<Rent>;
  accessories: Array<Accessory>;
};

const BikeOverviewTable: React.FC<Props> = ({ bikes, rents, accessories }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);

  const addButton = (bike: Bike) => {
    setSelectedBike(bike);
    setShowForm(true);
  };

  const submitForm = () => {
    setShowForm(false);
    setSelectedBike(null);
  };

  const isBikeRented = (bike: Bike): boolean => {
    return rents.some(rent => rent.bike.id === bike.id);
  };

  return (
    <>
      {bikes && (
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Brand</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Model</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Location</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Size</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Cost/day</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Rent</th>
            </tr>
          </thead>
          <tbody>
            {bikes.map((bike, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-50 ${isBikeRented(bike) ? 'bg-gray-200' : ''}`}
              >
                <td className="py-3 px-4 text-sm text-gray-800">{bike.brand}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{bike.model}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{bike.location}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{bike.size}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{bike.cost}</td>
                <td className="py-3 px-4">
                  <button
                    className={`py-2 px-4 rounded-lg text-white font-semibold ${
                      isBikeRented(bike)
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500'
                    }`}
                    onClick={() => !isBikeRented(bike) && addButton(bike)}
                    disabled={isBikeRented(bike)}
                  >
                    {isBikeRented(bike) ? 'In Use' : 'Rent'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showForm && selectedBike && accessories &&(
        <RentForm
          // onSubmit={submitForm}
          onCancel={() => setShowForm(false)}
          selectedBike={selectedBike}
          accessories={accessories}
        />
      )}
    </>
  );
};

export default BikeOverviewTable;
