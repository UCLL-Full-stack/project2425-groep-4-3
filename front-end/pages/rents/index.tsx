import Header from '@components/header';
import { Accessory, Rent } from '@types';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import RentService from '@services/RentService';
import RentOverviewTable from '@components/rents/RentOverviewTable';
import AccessoryOverviewTable from '@components/accessories/AccessoryOverviewTable';
import AccessoryService from '@services/AccessoryService';

const Rents: React.FC = () => {
    const [rents,setRents]= useState<Array<Rent>>();
    const [accessories,setAccessories]= useState<Array<Accessory>>();
    const [error, setError] = useState<string>();

    // const getaccessories =async () => {
    //     const res = await AccessoryService.getAllAccessories();
    //     const accessoryList = await res.json();
    //     setAccessories(accessoryList)
    // }

    const getaccessories = async () => {
        setError("");
        const response = await AccessoryService.getAllAccessories();
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
            const accessories = await response.json();
            setAccessories(accessories);
        }
    };
    
    // const getrents =async () => {
    //     const res = await RentService.getAllRents();
    //     const rentsList = await res.json();
    //     setRents(rentsList)
    // }

    const getrents = async () => {
        setError("");
        const response = await RentService.getAllRents();
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
            const rents = await response.json();
            setRents(rents);
        }
    };
    
    useEffect(()=>{
        getrents(),
        getaccessories()
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

          <h1>Accessory's</h1>
          {accessories &&(
            <AccessoryOverviewTable accessories={accessories}></AccessoryOverviewTable>
          )}
        </section>
      </main>
    </>
  );
};

export default Rents;
