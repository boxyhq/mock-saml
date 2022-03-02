import config from 'lib/env';
import type { NextApiRequest, NextApiResponse } from 'next';
import stream from 'stream';
import { IdPMetadata } from 'types';
import { promisify } from 'util';
import { createIdPMetadataXML, stripCertHeaderAndFooter } from 'utils';

const pipeline = promisify(stream.pipeline);

export default async function handler(req: NextApiRequest, res: NextApiResponse<IdPMetadata | string>) {
  switch (req.method) {
    case 'GET':
      return await downloadMetadata();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Download metadata
  async function downloadMetadata() {
    const xml = await createIdPMetadataXML({
      idpEntityId: config.entityId,
      idpSsoUrl: config.ssoUrl,
      certificate: stripCertHeaderAndFooter(config.publicKey),
    });

    res.setHeader('Content-type', 'text/xml');
    res.setHeader('Content-Disposition', 'attachment; filename=mock-saml-metadata.xml');

    await pipeline(xml, res);
  }
}
