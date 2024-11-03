import React from 'react';
import { User } from '@types';

type Props = {
  users: Array<User>;
};

const UserOverviewTable: React.FC<Props> = ({ users }: Props) => {
  return (
    <>
      {users && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Age</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserOverviewTable;
