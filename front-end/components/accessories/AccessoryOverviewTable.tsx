import React from "react";
import { Accessory } from "@types";

type Props = {
  accessories: Array<Accessory>;
};

const AccessoryOverviewTable: React.FC<Props> = ({ accessories }: Props) => {
    return (
        <>
        {accessories && (
            <table className="table table-hover">
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Amount</th>
                <th scope="col">Cost</th>

                </tr>
            </thead>
            <tbody>
                {accessories.map((accessory, index) => (
                <tr key={index}>
                    <td>{accessory.name}</td>
                    <td>{accessory.amount}</td>
                    <td>{accessory.cost}</td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </>
    );
};

export default AccessoryOverviewTable;