import axios from 'axios';
import type { NextPage } from 'next';
import { ChangeEvent, FormEvent, useState } from 'react';

const Apps: NextPage = () => {
  const [formData, setFormData] = useState({
    name: null,
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

  const downloadMetadata = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const {data} = await axios.post('/api/apps/metadata', {
      ...formData
    });
  }

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

        <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">Build IdP Metadata</button>
      </form>

      <button type="button" className="px-3 py-2 text-white bg-red-500 rounded" onClick={downloadMetadata}>Download Metadata</button>

      <ul className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <li className="px-2 py-2"><strong>SSO URL:</strong> <br></br> {metadata.sso_url}</li>
        <li className="px-2 py-2"><strong>Entity ID:</strong> <br></br> {metadata.entity_id}</li>
        <li className="px-2 py-2"><strong>Certificate:</strong> <br></br> {metadata.certificate}</li>
      </ul>
    </div>
  );
};

export default Apps;
