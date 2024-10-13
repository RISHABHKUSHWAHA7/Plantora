import React, { useState } from 'react';
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { aptosClient } from "@/utils/aptosClient"; // Adjust the import based on your file structure

function App() {
  const { connected, account } = useWallet();
  const [formData, setFormData] = useState({
    species: '',
    latitude: 0,
    longitude: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'latitude' || name === 'longitude' ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!connected || !account) {
      alert('Please connect your wallet!');
      return;
    }

    try {
      const { species, latitude, longitude } = formData;
      const response = await aptosClient.executeTransaction({
        type: "script_function_payload",
        function: "0xc233e2fccc71ea3c6c104b46933e0b8c95e655abd423bd612524f6067c2887ef::TreePlantation::plant_tree",
        typeArguments: [],
        arguments: [species, latitude, longitude],
      });

      console.log("Transaction response:", response);
      alert('Tree planted successfully!');
    } catch (error) {
      console.error("Error planting tree:", error);
      alert('Failed to plant tree.');
    }
  };

  return (
    <>
      <Header />
      <Card>
        <CardHeader>
          <CardTitle>Plant a Tree</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Species:
                <input
                  type="text"
                  name="species"
                  value={formData.species}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Latitude:
                <input
                  type="number"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <div>
              <label>
                Longitude:
                <input
                  type="number"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
            <button type="submit">Submit</button>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default App;
