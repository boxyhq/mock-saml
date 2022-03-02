import { fetchPrivateKey, fetchPublicKey } from 'utils';

const appUrl = process.env.APP_URL || 'http://localhost:4000';
const entityId = process.env.ENTITY_ID || 'https://saml.example.com/entityid';
const ssoUrl = `${appUrl}/api/saml/sso`;
const privateKey = fetchPrivateKey();
const publicKey = fetchPublicKey();

const config = {
  appUrl,
  entityId,
  ssoUrl,
  privateKey,
  publicKey,
};

export default config;
