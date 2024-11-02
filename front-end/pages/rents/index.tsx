import Header from '@components/header';
import { Rent } from '@types';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import RentService from '@services/RentService';
import RentOverviewTable from '@components/rents/RentOverviewTable';

const Rents: React.FC = () => {
    const [rents,setRents]= useState<Array<Rent>>();
    
    const getrents =async () => {
        const res = await RentService.getAllRents();
        const rentsList = await res.json();
        setRents(rentsList)
    }
    useEffect(()=>{
        getrents()
    },[])
  return (
    <>
      <Head>
        <title>Rents</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Rents</h1>
        <section>
          <h2>Rents overview</h2>
          {rents &&(
            <RentOverviewTable rents={rents}></RentOverviewTable>
          )}
        </section>
      </main>
    </>
  );
};

export default Rents;
