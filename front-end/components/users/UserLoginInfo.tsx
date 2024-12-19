import React from 'react';

const UserLoginInfo: React.FC = () => {
  const data = [
    { name: 'Niels', password: 'Niels123', role: 'Admin' },
    { name: 'Sander', password: 'Sander123', role: 'Owner' },
    { name: 'Remco', password: 'Remco123', role: 'Renter' },
    { name: 'Wout', password: 'Wout123', role: 'Renter' },
  ];

  return (
    <div className="max-w-lg mx-auto mt-6">
      <table className="w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Name</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Password</th>
            <th className="py-3 px-4 text-left text-sm font-medium text-gray-600">Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="py-3 px-4 text-sm text-gray-800">{row.name}</td>
              <td className="py-3 px-4 text-sm text-gray-800">{row.password}</td>
              <td className="py-3 px-4 text-sm text-gray-800">{row.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserLoginInfo;
