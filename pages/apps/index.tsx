import axios from 'axios';
import type { NextPage } from 'next';
import { ChangeEvent, FormEvent, useState } from 'react';

// const a = new URLSearchParams({
//   sp_acs_url: 'http://localhost:3000/apps',
//   sp_entity_id: 'https://saml.boxyhq.com',
// }).toString();

// console.log(a);

const Apps: NextPage = () => {
  const [formData, setFormData] = useState({
    sp_acs_url: null,
    sp_entity_id: null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  }

  const createApp = async (e: FormEvent) => {
    e.preventDefault();

    const app = await axios.post('/api/apps', {
      ...formData
    });
  };

  return (
    <div>
      <form onSubmit={createApp} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-sm mb-2">
            ACS URL
            <input type="text" name="sp_acs_url" onChange={handleInputChange} required className="border rounded w-full py-2 px-3" placeholder="ACS URL"  />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2">
            Entity ID
            <input type="text" name="sp_entity_id" onChange={handleInputChange} required className="border rounded w-full py-2 px-3" placeholder="Entity ID"  />
          </label>
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Build IdP Metadata</button>
      </form>
    </div>
  );
};

export default Apps;
