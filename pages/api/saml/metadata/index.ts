import type { NextApiRequest, NextApiResponse } from 'next';
import saml from '@boxyhq/saml20';

import config from 'lib/env';
import type { IdPMetadata } from 'types';
import { createIdPMetadataXML } from 'utils';
import stream from 'stream';
import { promisify } from 'util';

const pipeline = promisify(stream.pipeline);

export default async function handler(req: NextApiRequest, res: NextApiResponse<IdPMetadata | string>) {
  switch (req.method) {
    case 'GET':
      return await MetadataUrl();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Metadata URL
  async function MetadataUrl() {
    const { download } = req.query as { download: any };

    const xml = await createIdPMetadataXML({
      idpEntityId: config.entityId,
      idpSsoUrl: config.ssoUrl,
      certificate: saml.stripCertHeaderAndFooter(config.publicKey),
    });

    res.setHeader('Content-type', 'text/xml');

    if (download || download === '') {
      res.setHeader('Content-Disposition', 'attachment; filename=mock-saml-metadata.xml');

      await pipeline(xml, res);
      return;
    }

    res.send(xml);
  }
}
