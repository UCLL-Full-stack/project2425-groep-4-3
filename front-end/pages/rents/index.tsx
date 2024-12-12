import Header from '@components/header';
import { Accessory, Rent } from '@types';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import RentService from '@services/RentService';
import RentOverviewTable from '@components/rents/RentOverviewTable';
import AccessoryOverviewTable from '@components/accessories/AccessoryOverviewTable';
import AccessoryService from '@services/AccessoryService';

const Rents: React.FC = () => {
  const [rents, setRents] = useState<Array<Rent>>();
  const [accessories, setAccessories] = useState<Array<Accessory>>();
  const [error, setError] = useState<string>();

  const getaccessories = async () => {
    setError("");
    const response = await AccessoryService.getAllAccessories();
    if (!response.ok) {
      if (response.status === 401) {
        setError("You are not authorized.");
      } else {
        setError(response.statusText);
      }
    } else {
      const accessories = await response.json();
      setAccessories(accessories);
    }
  };

  const getrents = async () => {
    setError("");
    const response = await RentService.getAllRents();
    if (!response.ok) {
      if (response.status === 401) {
        setError("You are not authorized.");
      } else {
        setError(response.statusText);
      }
    } else {
      const rents = await response.json();
      setRents(rents);
    }
  };

  useEffect(() => {
    getrents();
    getaccessories();
  }, []);

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
          {rents ? (
            <RentOverviewTable rents={rents} />
          ) : (
            <p className="text-red-500">Error loading rents: {error}</p>
          )}

          <h2 className="text-2xl font-semibold mt-12 mb-4">Accessories</h2>
          {accessories ? (
            <AccessoryOverviewTable accessories={accessories} />
          ) : (
            <p className="text-red-500">Error loading accessories: {error}</p>
          )}
        </section>
      </main>
    </>
  );
};

export default Rents;
