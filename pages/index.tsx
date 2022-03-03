import { GetStaticProps } from 'next';
import Link from 'next/link';
import React from 'react';
import config from '../lib/env';
import { IdPMetadata } from '../types';

export const getStaticProps: GetStaticProps = async () => {
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
      <div className='container mx-auto px-5 py-8'>
        <div className='mb-5 flex w-full flex-col text-center'>
          <p className='mx-auto text-lg font-medium leading-relaxed lg:w-2/3'>
            A free SAML 2.0 Identity Provider for testing SAML SSO integrations.
            <sup className='text-xl text-orange-600'>*</sup>
          </p>
          <div className='mx-auto mt-4 flex w-full justify-center px-8 lg:w-2/3'>
            <Link href='/saml/login'>
              <a className='button min-w-[14rem] py-3 text-xl tracking-wide'>Test IdP Login</a>
            </Link>
          </div>
        </div>
        <h2 className='title-font mt-9 text-center text-lg font-medium text-gray-900 sm:text-3xl'>
          Mock SAML Metadata
        </h2>
        <div className='mx-auto mt-5 flex w-full space-x-6 px-8 lg:w-2/3'>
          <div className='relative flex-1'>
            <label className='text-sm leading-7 text-gray-600'>SSO URL</label>
            <input readOnly type='text' defaultValue={ssoUrl} className='input w-full' />
          </div>
          <div className='relative flex-1'>
            <label className='text-sm leading-7 text-gray-600'>Entity ID</label>
            <input readOnly type='text' defaultValue={entityId} className='input w-full' />
          </div>
        </div>
        <div className='mx-auto mt-5 flex w-full px-8 lg:w-2/3'>
          <div className='relative w-full'>
            <label className='text-sm leading-7 text-gray-600'>Certificate</label>
            <textarea readOnly rows={5} defaultValue={certificate} className='input w-full'></textarea>
          </div>
        </div>
        <div className='mx-auto mt-5 flex w-full justify-center px-8 lg:w-2/3'>
          <Link href='/api/saml/metadata/download'>
            <a className='button-secondary'>
              <svg
                className='mr-1 inline-block h-6 w-6'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth='2'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                />
              </svg>
              Download Metadata
            </a>
          </Link>
        </div>
        <p className='mt-3 text-center text-lg text-orange-600'>* Caution: Not for production use</p>
      </div>
    </section>
  );
};

export default Home;
