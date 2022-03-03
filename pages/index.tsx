import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react';
import config from '../lib/env';
import { IdPMetadata } from '../types';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const metadata: IdPMetadata = {
    ssoUrl: config.ssoUrl,
    entityId: config.entityId,
    certificate: config.publicKey,
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
    <section className='body-font text-gray-600'>
      <div className='container mx-auto px-5 py-24'>
        <div className='mb-12 flex w-full flex-col text-center'>
          <h1 className='title-font mb-4 text-2xl font-medium text-gray-900 sm:text-3xl'>
            Mock SAML Metadata
          </h1>
          <p className='mx-auto text-lg font-medium leading-relaxed lg:w-2/3'>
            A free SAML 2.0 Identity Provider for testing SAML SSO integrations.
          </p>
          <p>
            <b>Please do not use this in production.</b>
          </p>
        </div>
        <div className='mx-auto flex w-full items-end space-y-4 px-8 sm:space-x-4 sm:space-y-0 sm:px-0 lg:w-2/3'>
          <div className='relative mr-4 lg:w-full'>
            <label className='text-sm leading-7 text-gray-600'>SSO URL</label>
            <input readOnly type='text' defaultValue={ssoUrl} className='input w-full' />
          </div>
          <div className='relative mr-4 lg:w-full'>
            <label className='text-sm leading-7 text-gray-600'>Entity ID</label>
            <input readOnly type='text' defaultValue={entityId} className='input w-full' />
          </div>
        </div>
        <div className='mx-auto mt-5 flex w-full items-end space-y-4 px-8 sm:space-x-4 sm:space-y-0 sm:px-0 lg:w-2/3'>
          <div className='relative lg:w-full'>
            <label className='text-sm leading-7 text-gray-600'>Certificate</label>
            <textarea readOnly rows={5} defaultValue={certificate} className='input w-full'></textarea>
          </div>
        </div>
        <div className='mx-auto mt-5 flex w-full items-end space-y-4 px-8 sm:space-x-4 sm:space-y-0 sm:px-0 lg:w-2/3'>
          <Link href='/api/saml/metadata/download'>
            <a className='button'>Download Metadata</a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
