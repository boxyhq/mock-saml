import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react';
import config from '../lib/env';
import { IdPMetadata } from '../types';

const Home: React.FC<{ metadata: IdPMetadata }> = ({ metadata }) => {
  const { ssoUrl, entityId, certificate } = metadata;

  return (
    <div className='flex min-h-full items-center justify-center'>
      <div className='flex w-full max-w-4xl flex-col px-3'>
        <h1 className='mb-20 text-center text-2xl font-extrabold text-gray-900'>
          A free SAML 2.0 Identity Provider for testing SAML SSO integrations.
        </h1>
        <div className='space-y-4'>
          <div className='flex justify-between'>
            <Link href='/api/saml/metadata/download'>
              <a className='btn btn-active btn-primary'>
                <svg
                  className='mr-1 inline-block h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden
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
            <Link href='/saml/login'>
              <a className='btn btn-outline btn-primary'>Test IdP Login</a>
            </Link>
          </div>
          <div className='border-2 p-3'>
            <h2 className='mb-5 text-center text-2xl font-bold text-gray-900'>Mock SAML Metadata</h2>
            <div className='grid grid-cols-2 gap-y-5 gap-x-5'>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text font-bold'>SSO URL</span>
                </label>
                <input type='text' defaultValue={ssoUrl} className='input input-bordered' disabled />
              </div>
              <div className='form-control'>
                <label className='label'>
                  <span className='label-text font-bold'>Entity ID</span>
                </label>
                <input type='text' defaultValue={entityId} className='input input-bordered' disabled />
              </div>
              <div className='form-control col-span-2 w-full'>
                <label className='label'>
                  <span className='label-text font-bold'>Certificate</span>
                </label>
                <textarea
                  className='textarea textarea-bordered h-48'
                  defaultValue={certificate}
                  disabled></textarea>
              </div>
            </div>
          </div>
          <div className='alert alert-error'>
            <div>
              <span className='text-white'>Caution: Not for production use.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
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

export default Home;
