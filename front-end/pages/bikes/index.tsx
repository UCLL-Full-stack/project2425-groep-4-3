import Header from '@components/header';
import { Bike } from '@types';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import BikeService from '@services/BikeService';
import BikeOverviewTable from '@components/bikes/BikeOverviewTable';

const Bikes: React.FC = () => {
    const [bikes,setBikes]= useState<Array<Bike>>();
    
    const getbikes =async () => {
        const res = await BikeService.getAllBikes();
        const bikesList = await res.json();
        setBikes(bikesList)
    }
    useEffect(()=>{
        getbikes()
    },[])
  return (
    <>
      <Head>
        <title>Bikes</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Bikes</h1>
        <section>
          <h2>Bikes overview</h2>
          {bikes &&(
            <BikeOverviewTable bikes={bikes}></BikeOverviewTable>
          )}
        </section>
      </main>
    </>
  );
};

export default Bikes;
