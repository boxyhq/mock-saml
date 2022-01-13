import axios from 'axios';
import type { NextPage } from 'next';
import { ChangeEvent, FormEvent, useState } from 'react';

const Apps: NextPage = () => {
  const [formData, setFormData] = useState({
    acs_url: null,
    entity_id: null,
  });

  const [metadata, setMetadata] = useState({
    sso_url: null,
    entity_id: null,
    certificate: null,
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim()
    });
  }

  const createApp = async (e: FormEvent) => {
    e.preventDefault();

    const {data} = await axios.post('/api/apps', {
      ...formData
    });

    setMetadata(data);
  };

  return (
    <div>
      <form onSubmit={createApp} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-sm mb-2">
            ACS URL
            <input type="text" name="acs_url" onChange={handleInputChange} required className="border rounded w-full py-2 px-3" placeholder="ACS URL"  />
          </label>
        </div>

        <div className="mb-4">
          <label className="block text-sm mb-2">
            Entity ID
            <input type="text" name="entity_id" onChange={handleInputChange} required className="border rounded w-full py-2 px-3" placeholder="Entity ID"  />
          </label>
        </div>

        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Build IdP Metadata</button>
      </form>

      <ul className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <li className="px-2 py-2"><strong>SSO URL:</strong> <br></br> {metadata.sso_url}</li>
        <li className="px-2 py-2"><strong>Entity ID:</strong> <br></br> {metadata.entity_id}</li>
        <li className="px-2 py-2"><strong>Certificate:</strong> <br></br> {metadata.certificate}</li>
      </ul>
    </div>
  );
};

export default Apps;
