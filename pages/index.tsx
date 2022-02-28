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
          <h1 className='mb-4 text-2xl font-medium text-gray-900 title-font sm:text-3xl'>
            Mock SAML Metadata
          </h1>
          <p className='mx-auto text-lg font-medium leading-relaxed lg:w-2/3'>
            A mock SAML 2.0 Identity Provider for development and testing SAML SSO integrations.
          </p>
          <p>
            <b>Please do not use this in production.</b>
          </p>
        </div>
        <div className='flex items-end w-full px-8 mx-auto space-y-4 sm:space-x-4 sm:space-y-0 sm:px-0 lg:w-2/3'>
          <div className='relative mr-4 lg:w-full'>
            <label className='text-sm leading-7 text-gray-600'>SSO URL</label>
            <input readOnly type='text' defaultValue={ssoUrl} className='w-full input' />
          </div>
          <div className='relative mr-4 lg:w-full'>
            <label className='text-sm leading-7 text-gray-600'>Entity ID</label>
            <input readOnly type='text' defaultValue={entityId} className='w-full input' />
          </div>
        </div>
        <div className='flex items-end w-full px-8 mx-auto mt-5 space-y-4 sm:space-x-4 sm:space-y-0 sm:px-0 lg:w-2/3'>
          <div className='relative lg:w-full'>
            <label className='text-sm leading-7 text-gray-600'>Certificate</label>
            <textarea readOnly rows={5} defaultValue={certificate} className='w-full input'></textarea>
          </div>
        </div>
        <div className='flex items-end w-full px-8 mx-auto mt-5 space-y-4 sm:space-x-4 sm:space-y-0 sm:px-0 lg:w-2/3'>
          <Link href='/api/saml/metadata/download'>
            <a className='button'>Download Metadata</a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
