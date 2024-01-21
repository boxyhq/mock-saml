import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React from 'react';
import config from '../lib/env';
import { IdPMetadata } from '../types';
import { getEntityId, getSSOUrl } from 'lib/entity-id';

const Home: React.FC<{ metadata: IdPMetadata; params: any }> = ({ metadata, params }) => {
  const namespace = params.namespace;

  const { ssoUrl: appUrl, entityId, certificate } = metadata;
  const namespaceEntityId = getEntityId(entityId, namespace);
  const metadataDownloadUrl =
    '/api' + (namespace ? `/namespace/${namespace}` : '') + '/saml/metadata?download=true';
  const metadataUrl = '/api' + (namespace ? `/namespace/${namespace}` : '') + '/saml/metadata';
  const loginUrl = (namespace ? `/namespace/${namespace}` : '') + '/saml/login';
  const ssoUrl = getSSOUrl(appUrl, namespace);
  return (
    <div className='flex items-center justify-center'>
      <div className='flex w-full max-w-4xl flex-col space-y-5 px-2'>
        <h1 className='text-center text-xl font-extrabold text-gray-900 md:text-2xl'>
          A free SAML 2.0 Identity Provider for testing SAML SSO integrations.
        </h1>
        <div className='flex flex-col justify-between space-y-5 md:flex-row md:space-y-0'>
          <div className='flex flex-col space-y-5 md:flex-row md:space-x-5 md:space-y-0'>
            <Link href={metadataDownloadUrl} className='btn-primary btn-active btn'>
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
            </Link>
            <Link href={metadataUrl} className='btn-outline btn-primary btn' target='_blank'>
              Metadata URL
            </Link>
          </div>
          <Link href={loginUrl} className='btn-outline btn-primary btn'>
            Test IdP Login
          </Link>
        </div>
        <div className='border-2 p-3'>
          <h2 className='mb-5 text-center text-2xl font-bold text-gray-900'>Mock SAML Metadata</h2>
          <div className='grid grid-cols-2 gap-y-5 gap-x-5'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-bold'>SSO URL</span>
              </label>
              <input type='text' defaultValue={ssoUrl} className='input-bordered input' disabled />
            </div>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-bold'>Entity ID</span>
              </label>
              <input type='text' defaultValue={namespaceEntityId} className='input-bordered input' disabled />
            </div>
            <div className='form-control col-span-2 w-full'>
              <label className='label'>
                <span className='label-text font-bold'>Certificate</span>
              </label>
              <textarea
                className='textarea-bordered textarea h-48'
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
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const metadata: IdPMetadata = {
    ssoUrl: config.appUrl,
    entityId: config.entityId,
    certificate: config.publicKey,
  };

  return {
    props: {
      metadata,
      params: params ? params : {},
    },
  };
};

export default Home;
