import BikeService from "@services/BikeService";
import { size } from "@types";
import React, { useState } from "react";

const AddBikeForm: React.FC = () => {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [location, setLocation] = useState('');
    const [size, setSize] = useState<size>('M');
    const [cost, setCost] = useState(0);
    const [brandError, setBrandError] = useState<string | null>(null);
    const [modelError, setModelError] = useState<string | null>(null);
    const [locationError, setLocationError] = useState<string | null>(null);
    const [sizeError, setSizeError] = useState<string | null>(null);
    const [costError, setCostError] = useState<string | null>(null);
    const [valid, setValid] = useState(true);
    const [generalError, setGeneralError] = useState<string | null>(null);

    const validateFields = () => {
        setValid(true);
        if (!brand) {
            setBrandError('Brand is required');
            setValid(false);
        } else {
            setBrandError(null);
        }

        if (!model) {
            setModelError('Model is required');
            setValid(false);
        } else {
            setModelError(null);
        }

        if (!location) {
            setLocationError('Location is required');
            setValid(false);
        } else {
            setLocationError(null);
        }

        if (!['S', 'M', 'L', 'XL'].includes(size)) {
            setSizeError('Size must be S, M, L, or XL');
            setValid(false);
        } else {
            setSizeError(null);
        }

        if (cost <= 0) {
            setCostError('Cost must be a positive number');
            setValid(false);
        } else {
            setCostError(null);
        }
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        validateFields();

        if (valid) {
            const bike = { brand, model, location, size, cost };

            try {
                const response = await BikeService.createBike(bike);
                if (response.ok) {
                    console.log('Form submitted successfully');
                } else {
                    setGeneralError('Error submitting form');
                }
            } catch (error) {
                setGeneralError('Error submitting form');
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold mb-6 text-center">Bike Details</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Brand:</label>
                        <input
                            type="text"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {brandError && <div className="text-red-500 text-sm mt-1">{brandError}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Model:</label>
                        <input
                            type="text"
                            value={model}
                            onChange={(e) => setModel(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {modelError && <div className="text-red-500 text-sm mt-1">{modelError}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Location:</label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {locationError && <div className="text-red-500 text-sm mt-1">{locationError}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Size:</label>
                        <select
                            value={size}
                            onChange={(e) => setSize(e.target.value as size)}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                        {sizeError && <div className="text-red-500 text-sm mt-1">{sizeError}</div>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">Cost:</label>
                        <input
                            type="number"
                            value={cost}
                            onChange={(e) => setCost(Number(e.target.value))}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {costError && <div className="text-red-500 text-sm mt-1">{costError}</div>}
                    </div>
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBikeForm;
