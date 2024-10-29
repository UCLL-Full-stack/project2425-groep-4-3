import React from 'react';
import { Bike } from '@types';

type Props = {
  bikes: Array<Bike>;
//   setSelectedBike: (bike: Bike) => void
};

const BikeOverviewTable: React.FC<Props> = ({ bikes }: Props) => {
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default BikeOverviewTable;
