export type ServiceProvider = {
  sp_acs_url: string;
  sp_entity_id: string;
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

// export type IdPMetadata = {
//   sso_url: string;
//   entity_id: string;
//   certificate: string;
//   fingerprint?: string;
// };
