import { fetchPrivateKey, fetchPublicKey } from 'utils';

const appUrl = process.env.APP_URL || 'http://localhost:5175';
const entityId = process.env.ENTITY_ID || 'https://saml.example.com/entityid';
const privateKey = fetchPrivateKey();
const publicKey = fetchPublicKey();

const config = {
  appUrl,
  entityId,
  privateKey,
  publicKey,
};

export default config;
