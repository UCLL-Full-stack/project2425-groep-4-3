import Header from '@components/header';
import { Bike, Rent, User } from '@types';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import BikeService from '@services/BikeService';
import BikeOverviewTable from '@components/bikes/BikeOverviewTable';
import RentService from '@services/RentService';
import UserService from '@services/UserService';

const Bikes: React.FC = () => {
  
  const [bikes,setBikes]= useState<Array<Bike>>();
  const [rents,setRents]= useState<Array<Rent>>();
  const [error, setError] = useState<string>();

  // const getbikes =async () => {
  //   const res = await BikeService.getAllBikes();
  //   const bikesList = await res.json();
  //   setBikes(bikesList)
  // }

  const getbikes = async () => {
    setError("");
    const response = await BikeService.getAllBikes();
    if (!response.ok) {
      if(response.status === 401) {
          setError(
            "You are not authorized."
          );
      }
      else{
        setError(response.statusText);
      }
    } 
    else {
      const bikes = await response.json();
      setBikes(bikes);
    }
  };

    const getrents =async () => {
      const res = await RentService.getAllRents();
      const rentsList = await res.json();
      setRents(rentsList)
    }
    useEffect(()=>{
        getbikes(),
        getrents()

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
          {bikes && rents &&(
            <BikeOverviewTable bikes={bikes} rents ={rents}></BikeOverviewTable>
          )}
        </section>
      </main>
    </>
  );
};

export default Bikes;
