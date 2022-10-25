import type { NextApiRequest, NextApiResponse } from 'next';
import saml from '@boxyhq/saml20';

import config from 'lib/env';
import type { IdPMetadata } from 'types';
import { createIdPMetadataXML } from 'utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse<IdPMetadata | string>) {
  switch (req.method) {
    case 'GET':
      return await MetadataUrl();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Metadata URL
  async function MetadataUrl() {
    const xml = await createIdPMetadataXML({
      idpEntityId: config.entityId,
      idpSsoUrl: config.ssoUrl,
      certificate: saml.stripCertHeaderAndFooter(config.publicKey),
    });

    res.setHeader('Content-type', 'text/xml');
    res.send(xml);
  }
}
