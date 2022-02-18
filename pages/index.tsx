import type { NextPage } from 'next'
import { GetServerSideProps } from 'next';
import { IdPMetadata } from '../types'
import config from '../lib/env';
import {createCertificate} from '../utils'
import React from 'react';
import Link from 'next/link'

export const getServerSideProps: GetServerSideProps = async () => {
  const metadata: IdPMetadata = {
    ssoUrl: config.ssoUrl,
    entityId: config.entityId,
    certificate: await createCertificate(),
  }

  return {
    props: {
      metadata
    },
  };
};

const Home: React.FC<{metadata: IdPMetadata}> = ({ metadata }) => {
  return (
    <div>
      <strong>Mock IdP Metadata</strong>
      <p>SSO URL: {metadata.ssoUrl}</p>
      <p>Entity ID: {metadata.entityId}</p>
      <p>Certificate: {metadata.certificate}</p>
      <br></br>
      <p><Link href="/api/saml/metadata/download">Download Metadata</Link></p>
    </div>
  )
}

export default Home
