import type { NextApiRequest, NextApiResponse } from 'next';
import { fetchPublicKey, createIdPMetadataXML } from '../../../../utils';
import { IdPMetadata } from '../../../../types';
import stream from 'stream';
import { promisify } from 'util';
import config from '../../../../lib/env'

const pipeline = promisify(stream.pipeline);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IdPMetadata | string>
) {

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
      certificate: await fetchPublicKey(),
    });

    res.setHeader('Content-type', 'text/xml');
    res.setHeader('Content-Disposition', 'attachment; filename=mock-saml-metadata.xml');

    await pipeline(xml, res);
  }
}