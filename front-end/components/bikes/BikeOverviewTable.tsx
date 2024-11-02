import React, { useState } from 'react';
import { Bike } from '@types';
import RentForm from '@components/rents/AddRentForm';

type Props = {
  bikes: Array<Bike>;
};

const BikeOverviewTable: React.FC<Props> = ({ bikes }: Props) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedBike, setSelectedBike] = useState<Bike | null>(null);

  const addButton = (bike: Bike) => {
    setSelectedBike(bike);
    setShowForm(true);
  };

  const submitForm = (formData: any) => {
    setShowForm(false); 
    setSelectedBike(null);
  };

  return (
    <>
      {bikes && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Brand</th>
              <th scope="col">Model</th>
              <th scope="col">Location</th>
              <th scope="col">Size</th>
              <th scope="col">Cost</th>
              <th scope="col">Rent</th>
            </tr>
          </thead>
          <tbody>
            {bikes.map((bike, index) => (
              <tr key={index}>
                <td>{bike.brand}</td>
                <td>{bike.model}</td>
                <td>{bike.location}</td>
                <td>{bike.size}</td>
                <td>{bike.cost}</td>
                <td>
                  <button onClick={() => addButton(bike)}>Rent</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showForm && selectedBike && (
        <RentForm
          onSubmit={submitForm}
          onCancel={() => setShowForm(false)}
          selectedBike={selectedBike}
        />
      )}
    </>
  );
};

export default BikeOverviewTable;
