import { fetchPrivateKey, fetchPublicKey } from 'utils';
require('dotenv').config;

const appUrl = process.env.APP_URL || 'http://localhost:4000';
const entityId = process.env.ENTITY_ID || 'https://saml.example.com/entityid';
const ssoUrl = `${appUrl}/api/saml/sso`;
const privateKey = fetchPrivateKey();
const publicKey = fetchPublicKey();
const acsUrl = process.env.ACS_URL || 'https://jackson-demo.boxyhq.com/api/oauth/saml';
const audience = process.env.AUDIENCE || 'https://saml.boxyhq.com';
const username = process.env.USERNAME || 'jackson';

const config = {
  appUrl,
  entityId,
  ssoUrl,
  privateKey,
  publicKey,
  acsUrl,
  audience,
  username
};

export default config;
