export type ServiceProvider = {
  acs_url: string;
  entity_id: string;
};

export type IdentityProvider = {
  sso_url: string;
  entity_id: string;
};

export type App = {
  id: string;
  name: string;
  description?: string | null;
  certificate: string;
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
  RelayState: string;
  SAMLRequest: SAMLRequest;
};
