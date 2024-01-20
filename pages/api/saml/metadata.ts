import type { NextApiRequest, NextApiResponse } from 'next';
import saml from '@boxyhq/saml20';

import config from 'lib/env';
import type { IdPMetadata } from 'types';
import { createIdPMetadataXML } from 'utils';
import stream from 'stream';
import { promisify } from 'util';
import { getEntityId } from 'lib/entity-id';

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

    const filename = 'mock-saml-metadata' + (req.query.org ? `-${req.query.org}` : '') + '.xml';

    const xml = await createIdPMetadataXML({
      idpEntityId: getEntityId(config.entityId, req.query.org as any),
      idpSsoUrl: config.ssoUrl,
      certificate: saml.stripCertHeaderAndFooter(config.publicKey),
    });

    res.setHeader('Content-type', 'text/xml');

    if (download || download === '') {
      res.setHeader('Content-Disposition', `attachment; filename=${filename}`);

      await pipeline(xml, res);
      return;
    }

    res.send(xml);
  }
}
