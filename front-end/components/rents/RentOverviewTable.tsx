import React, { useState } from 'react';
import { Rent } from '@types';

type Props = {
  rents: Array<Rent>;
};

const RentOverviewTable: React.FC<Props> = ({ rents }: Props) => {
  const [check, setcheck] = useState<boolean>(false);
  // useEffect(() => {
  //   if (rents.length > 0) {
  //     setCheck(true);
  //   } else {
  //     setCheck(false); // Optional: Reset to false if rents are empty
  //   }
  // }, [rents]); // Only run
  return (
    <>
      {
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Start</th>
              <th scope="col">End</th>
              <th scope="col">Cost</th>
              <th scope="col">Bike</th>
            </tr>
          </thead>
          <tbody>
            {rents.map((rent, index) => (
              <tr key={index}>
                <td>{(new Date(rent.startDate)).toLocaleTimeString()}</td>
                <td>{(new Date(rent.endDate)).toLocaleTimeString()}</td>
                <td>{rent.cost}</td>
                <td>{rent.bike ? rent.bike.brand + " " + rent.bike.model : ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      }
    </>
  );
};

export default RentOverviewTable;
