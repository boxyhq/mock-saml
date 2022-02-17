import prisma from '../../lib/prisma';
import { GetServerSideProps } from 'next';
import React from 'react';
import { App } from '../../types';
import axios from 'axios';
import { IdPMetadata } from '../../types';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const app = await prisma.app.findUnique({
      where: {
        id: params?.id,
      }
    });

    const metadata = await axios.get('http://localhost:4000/api/apps/metadata');

    return {
      props: {
        app,
        metadata: metadata.data,
      },
    };
};

const ShowApp: React.FC<{app: App, metadata: IdPMetadata}> = ({app, metadata}) => {
  return (
    <div>
      <p>Id: {app.id}</p>
      <p>name: {app.name}</p>
      <p>acs_url: {app.acs_url}</p>
      <p>entity_id: {app.entity_id}</p>

      <strong>Metadata</strong>
      <p>sso_url: {metadata.sso_url}</p>
      <p>entity_id: {metadata.entity_id}</p>
      <p>certificate: {metadata.certificate}</p>
    </div>
  );
};

export default ShowApp;