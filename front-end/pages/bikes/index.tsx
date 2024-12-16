import Header from '@components/header';
import { Accessory, Bike, Rent, User } from '@types';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import BikeService from '@services/BikeService';
import BikeOverviewTable from '@components/bikes/BikeOverviewTable';
import RentService from '@services/RentService';
import UserService from '@services/UserService';
import AccessoryService from '@services/AccessoryService';
import AddBikeForm from '@components/bikes/AddBikeForm';

const Bikes: React.FC = () => {
  
  const [bikes, setBikes] = useState<Array<Bike>>();
  const [rents, setRents] = useState<Array<Rent>>();
  const [error, setError] = useState<string>();
  const [accessories, setAccessories] = useState<Array<Accessory>>();
  const [formVisible, setFormVisible] = useState(false);

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

  const getbikes = async () => {
    setError("");
    const response = await BikeService.getAllBikes();
    if (!response.ok) {
      if (response.status === 401) {
        setError("You are not authorized.");
      } else {
        setError(response.statusText);
      }
    } else {
      const bikes = await response.json();
      setBikes(bikes);
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
    getbikes();
    getrents();
    getaccessories();
  }, []);

  const toggleForm = () => {
    setFormVisible(!formVisible);
  };
  return (
    <>
      <Head>
        <title>Bikes</title>
      </Head>
      <Header />
      <main className="flex flex-col items-center py-8">
        <h1 className="text-3xl font-semibold mb-8">Bikes Overview</h1>
        <section className="w-full max-w-7xl px-4">
          <h2 className="text-2xl font-semibold mb-4">Bikes Overview</h2>
        
          {bikes && rents && accessories ? (
            <BikeOverviewTable bikes={bikes} rents={rents} accessories={accessories} />
          ) : (
            <p className="text-red-500">Error loading data: {error}</p>
          )}

          <div className="flex justify-center my-6">
            <button 
              onClick={toggleForm} 
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              {formVisible ? 'Hide Form' : 'Add New Bike'}
            </button>
          </div>

          {formVisible && (
            <div className="my-4">
              <AddBikeForm />
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default Bikes;
