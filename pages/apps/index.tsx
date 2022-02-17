import axios from 'axios';
import type { NextPage } from 'next';
import { ChangeEvent, FormEvent, useState } from 'react';
import Router from 'next/router';

const Apps: NextPage = () => {
  const [formData, setFormData] = useState({
    name: null,
    acs_url: null,
    entity_id: null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  }

  const createApp = async (e: FormEvent) => {
    e.preventDefault();

    const { data: app } = await axios.post('/api/apps', {
      ...formData
    });

    await Router.push(`/apps/${app.id}`);
  };

  return (
    <div>
      <form onSubmit={createApp} className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <div className="mb-4">
          <label className="block mb-2 text-sm">
            App Name
            <input type="text" name="name" onChange={handleInputChange} required className="w-full px-3 py-2 border rounded" placeholder="App Name"  />
          </label>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm">
            ACS URL
            <input type="text" name="acs_url" onChange={handleInputChange} required className="w-full px-3 py-2 border rounded" placeholder="ACS URL"  />
          </label>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm">
            Entity ID
            <input type="text" name="entity_id" onChange={handleInputChange} required className="w-full px-3 py-2 border rounded" placeholder="Entity ID"  />
          </label>
        </div>

        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">Create App</button>
      </form>
    </div>
  );
};

export default Apps;
