import * as xmlbuilder2 from 'xmlbuilder2';
import type { IdPMetadata } from '../types';

export const create = (
  acsUrl: string,
  entityId: string,
  certificate: string
): IdPMetadata => {
  const xml = xmlbuilder2.create();

  return {
    sso_url: 'string',
    entity_id: 'string',
    certificate: 'string',
  };
};
