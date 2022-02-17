import type { NextApiRequest, NextApiResponse } from 'next';
import { createCertificate, createIdPMetadataXML, createIdPSSOUrl } from '../../../../utils';
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

  // Download metadata for an app
  async function downloadMetadata() {
    const appId = '0480c44e-f200-4f72-8af0-a5a57611fd2d';

    const xml = await createIdPMetadataXML({
      idpEntityId: config.entityId,
      idpSsoUrl: createIdPSSOUrl(appId),
      certificate: await createCertificate(),
    });

    res.setHeader('Content-type', 'text/xml');
    res.setHeader('Content-Disposition', 'attachment; filename=metadata.xml');

    await pipeline(xml, res);
  }
}