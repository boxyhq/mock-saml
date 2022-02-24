import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import config from '../lib/env';
import { IdPMetadata } from '../types';
import { fetchPublicKey } from '../utils';

export const getStaticProps: GetStaticProps = async () => {
  const metadata: IdPMetadata = {
    ssoUrl: config.ssoUrl,
    entityId: config.entityId,
    certificate: await fetchPublicKey(),
  };

  return {
    props: {
      metadata,
    },
  };
};

const Home: React.FC<{ metadata: IdPMetadata }> = ({ metadata }) => {
  const { ssoUrl, entityId, certificate } = metadata;

  return (
    <section className='text-gray-600 body-font'>
      <div className='container px-5 py-24 mx-auto'>
        <div className='flex flex-col w-full mb-12 text-center'>
          <h1 className='mb-4 text-2xl font-medium text-gray-900 sm:text-3xl title-font'>
            Mock SAML Metadata
          </h1>
          <p className='mx-auto text-base leading-relaxed lg:w-2/3'>
            Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical gentrify, subway tile poke
            farm-to-table. Franzen you probably haven't heard of them man bun deep.
          </p>
        </div>
        <div className='flex items-end w-full px-8 mx-auto space-y-4 lg:w-2/3 sm:space-x-4 sm:space-y-0 sm:px-0'>
          <div className='relative mr-4 lg:w-full'>
            <label className='text-sm leading-7 text-gray-600'>SSO URL</label>
            <input
              type='text'
              defaultValue={ssoUrl}
              className='w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500'
            />
          </div>
          <div className='relative mr-4 lg:w-full'>
            <label className='text-sm leading-7 text-gray-600'>Entity ID</label>
            <input
              type='text'
              defaultValue={entityId}
              className='w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500'
            />
          </div>
        </div>
        <div className='flex items-end w-full px-8 mx-auto mt-5 space-y-4 lg:w-2/3 sm:space-x-4 sm:space-y-0 sm:px-0'>
          <div className='relative lg:w-full'>
            <label className='text-sm leading-7 text-gray-600'>Certificate</label>
            <textarea
              rows='5'
              defaultValue={certificate}
              className='w-full px-3 py-1 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out bg-gray-100 bg-opacity-50 border border-gray-300 rounded outline-none focus:ring-2 focus:ring-indigo-200 focus:bg-transparent focus:border-indigo-500'></textarea>
          </div>
        </div>
        <div className='flex items-end w-full px-8 mx-auto mt-5 space-y-4 lg:w-2/3 sm:space-x-4 sm:space-y-0 sm:px-0'>
          <Link href='/api/saml/metadata/download'>
            <a className='inline-flex px-6 py-2 text-white bg-indigo-500 border-0 rounded focus:outline-none hover:bg-indigo-600'>
              Download Metadata
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
