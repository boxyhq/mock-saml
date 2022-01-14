import type { IdPMetadata } from '../types';

const baseUrl = 'http://localhost:3000/saml';

export const create = (
  acs_url: string,
  entity_id: string,
  certificate: string
): IdPMetadata => {
  const params = new URLSearchParams({
    acs_url,
    entity_id,
  }).toString();

  return {
    sso_url: `${baseUrl}?${params}`,
    entity_id: `${baseUrl}?${params}`,
    certificate: certificate,
  };
};
