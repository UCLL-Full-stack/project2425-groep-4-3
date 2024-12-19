import Header from '@components/header';
import { User } from '@types';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import UserService from '@services/UserService';
import UserOverviewTable from '@components/users/UserOverviewTable';
import useInterval from 'use-interval';
import useSWR, { mutate } from 'swr';


const Users: React.FC = () => {
    const [users,setUsers]= useState<Array<User>>();
    
    
    
    
    const getUsers =async () => {
        const res = await UserService.getAllUsers();
        const userList = await res.json();
        return userList
    }

  const {data: responseUsers, error:errorUser} = useSWR('/users', getUsers);

  useInterval(()=> {
    mutate('/users',getUsers());
  },5000);

  const handleMakeAdmin = async (name: string) => {
    await UserService.makeAdmin(name);
    mutate('/users',getUsers());
  };

  const errorMerge = errorUser;


  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Header />
      <main className="flex flex-col items-center py-8">
        <h1 className='text-3xl font-semibold mb-8'>User overview</h1>
        <section>
          <h2 className='text-2xl font-semibold mb-4'>Users</h2>
          {errorMerge && (
            <div>{errorMerge}</div>
          )}
          {responseUsers &&(
            <UserOverviewTable users={responseUsers} onMakeAdmin={handleMakeAdmin}></UserOverviewTable>
          )}
        </section>
      </main>
    </>
  );
};

export default Users;
