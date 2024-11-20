import React, { useEffect, useState } from 'react';
import { Rent } from '@types';

type Props = {
  rents: Array<Rent>;
};

const RentOverviewTable: React.FC<Props> = ({ rents }: Props) => {
  
  const handleButtonClick = (rent: Rent) => {
    rent.returned = true;
  };
  useEffect(() => {
    
  }, [rents]);
  return (
    <>
      {
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Start</th>
              <th scope="col">Cost</th>
              <th scope="col">Bike</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {rents.map((rent, index) => (
              <tr key={index}>
                <td>{(new Date(rent.startDate)).toLocaleTimeString()}</td>
                <td>{rent.cost}</td>
                <td>{rent.bike ? rent.bike.brand + " " + rent.bike.model : ""}</td>
                <td><button onClick={() => handleButtonClick(rent)}
                  className="btn btn-primary"
                >
                  Return bike
                </button></td>

              </tr>
            ))}
          </tbody>
        </table>
      }
    </>
  );
};

export default RentOverviewTable;
