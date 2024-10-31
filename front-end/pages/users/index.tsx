import Header from '@components/header';
import { User } from '@types';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import UserService from '@services/UserService';
import UserOverviewTable from '@components/users/UserOverviewTable';


const Users: React.FC = () => {
    const [users,setUsers]= useState<Array<User>>();
    
    const getUsers =async () => {
        const res = await UserService.getAllUsers();
        const userList = await res.json();
        setUsers(userList)
    }
    useEffect(()=>{
        getUsers()
    },[])
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
          {users &&(
            <UserOverviewTable users={users}></UserOverviewTable>
          )}
        </section>
      </main>
    </>
  );
};

export default Users;
