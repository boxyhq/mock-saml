const appUrl = process.env.APP_URL || 'http://localhost:4000';
const entityId = process.env.ENTITY_ID || 'http://saml.example.com';
const ssoUrl = `${appUrl}/api/saml/sso`;

export default {
  appUrl,
  entityId,
  ssoUrl,
};
