import React from 'react';
import { User } from '@types';
import UserService from '@services/UserService';

type Props = {
  users: Array<User>;
  onMakeAdmin: (name: string) => void;
};

const UserOverviewTable: React.FC<Props> = ({ users, onMakeAdmin }: Props) => {
  return (
    <div className="max-w-4xl mx-auto mt-6">
      {users && (
        <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Name</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Email</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Age</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Role</th>
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="hover:bg-gray-50"
              >
                <td className="py-3 px-4 text-sm text-gray-800">{user.name}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{user.email}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{user.age}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{user.role}</td>
                <td className="py-3 px-4">
                  <button
                    className={`py-2 px-4 rounded-lg text-white font-semibold ${
                      user.role === 'Admin'
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                    }`}
                    onClick={() => user.role !== 'Admin' && onMakeAdmin(user.name)}
                    
                    disabled={user.role === 'Admin'}
                  >
                    {user.role === 'Admin' ? 'Admin' : 'Make Admin'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOverviewTable;
