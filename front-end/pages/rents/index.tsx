import Header from '@components/header';
import { Accessory, Rent } from '@types';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import RentService from '@services/RentService';
import RentOverviewTable from '@components/rents/RentOverviewTable';
import AccessoryOverviewTable from '@components/accessories/AccessoryOverviewTable';
import AccessoryService from '@services/AccessoryService';
import useSWR, { mutate } from 'swr';
import useInterval from 'use-interval';

const Rents: React.FC = () => {
  const [rents, setRents] = useState<Array<Rent>>();
  const [accessories, setAccessories] = useState<Array<Accessory>>();
  const [error, setError] = useState<string>();
  const [name, setName] = useState<string>();



  const getrents = async () => {
    setError("");
    const loggedInUser = localStorage.getItem("loggedInUser");
        if (!loggedInUser) {throw new Error("No logged-in user found in local storage");}
        setName(JSON.parse(loggedInUser).name);
    // if(name != undefined){
      const response = await RentService.getRentsByUserName();
    
      if (!response.ok) {
        if (response.status === 401) {
          setError("You are not authorized.");
        } else {
          setError(response.statusText);
        }
      } else {
        const rents = await response.json();
        return rents;
      }
    console.log(rents + "rents");

  };

  const {data: responseRents, error:errorRents} = useSWR('/rents/user/{name}', getrents);


  useEffect(() => {
    getrents();    
  }, []);

  useInterval(()=> {
      mutate('/rents/user/{name}',getrents());
  },5000);

 
  const errorMerge =  errorRents || error;

  
  return (
    <>
      <Head>
        <title>Rents</title>
      </Head>
      <Header />
      <main className="flex flex-col items-center py-8">
        <h1 className="text-3xl font-semibold mb-8">Rents Overview</h1>
        
        <section className="w-full max-w-6xl p-4">
          <h2 className="text-2xl font-semibold mb-4">Rents</h2>
          {responseRents ? (
            <RentOverviewTable rents={responseRents} />
          ) : (
            <p className="text-red-500">Error loading rents: {error}</p>
          )}
        </section>
      </main>
    </>
  );
};

export default Rents;
