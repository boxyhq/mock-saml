import { GetStaticProps } from 'next';
import Head from 'next/head';
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
  return (
    <div className='h-full'>
      <Head>
        <title>Mock SAML IdP - Metadata</title>
      </Head>
      <div className='w-4/5 lg:w-3/5 mx-auto relative top-20 bg-blue-50 p-10 rounded-xl grid gap-6 grid-cols-3 shadow-lg shadow-blueGray-50 text-[#145698]'>
        <p className='font-extrabold'>SSO URL</p>
        <p className='col-span-2'>{metadata.ssoUrl}</p>
        <p className='font-extrabold'>Entity ID</p>
        <p className='col-span-2'>{metadata.entityId}</p>
        <p className='font-extrabold'>Certificate</p>
        <p className='min-w-0 col-span-2 overflow-auto text-sm'>{metadata.certificate}</p>
        <br></br>
        <p>
          <Link href='/api/saml/metadata/download'>Download Metadata</Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
