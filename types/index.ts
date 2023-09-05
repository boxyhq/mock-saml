export type ServiceProvider = {
  acs_url: string;
  entity_id: string;
};

export type IdentityProvider = {
  ssoUrl: string;
  entityId: string;
};

export type App = {
  id: string;
  name: string;
  description?: string | null;
  certificate?: string | null;
} & ServiceProvider;

export type IdPMetadata = {
  certificate: string;
  fingerprint?: string;
} & IdentityProvider;

export type SAMLRequest = {
  entityID: string;
  callbackUrl: string;
  signingKey: string;
};

export type AuthNRequest = {
  relayState: string;
  samlRequest: string;
};

export type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  uid: string;
  teams: [string];
};
