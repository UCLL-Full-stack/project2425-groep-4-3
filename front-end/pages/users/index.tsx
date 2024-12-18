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

  const errorMerge = errorUser;


  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Users</h1>
        <section>
          <h2>User overview</h2>
          {responseUsers &&(
            <UserOverviewTable users={responseUsers}></UserOverviewTable>
          )}
        </section>
      </main>
    </>
  );
};

export default Users;
