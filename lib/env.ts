const appUrl = process.env.APP_URL || 'http://localhost:4000';
const entityId = process.env.ENTITY_ID || 'https://saml.example.com/entityid';
const ssoUrl = `${appUrl}/api/saml/sso`;

const config = {
  appUrl,
  entityId,
  ssoUrl,
};

export default config;
