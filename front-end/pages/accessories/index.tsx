import AccessoryOverviewTable from '@components/accessories/AccessoryOverviewTable';
import Header from '@components/header';
import AccessoryService from '@services/AccessoryService';
import { Accessory } from '@types';
import Head from 'next/head';
import { useEffect, useState } from 'react';


const Accessories: React.FC = () => {
    const [accessories,setAccessories]= useState<Array<Accessory>>();
    
    const getaccessories =async () => {
        const res = await AccessoryService.getAllAccessories();
        const accessoryList = await res.json();
        setAccessories(accessoryList)
    }
    useEffect(()=>{
        getaccessories()
    },[])
  return (
    <>
      <Head>
        <title>Accessories</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Accessories</h1>
        <section>
          <h2>Accessory overview</h2>
          {accessories &&(
            <AccessoryOverviewTable accessories={accessories}></AccessoryOverviewTable>
          )}
        </section>
      </main>
    </>
  );
};

export default Accessories;
