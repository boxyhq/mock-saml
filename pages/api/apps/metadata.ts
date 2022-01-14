import type { NextApiRequest, NextApiResponse } from 'next';
import { createCertificate, createIdPMetadataXML } from '../../../utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'POST') {
    return await download(req);
  }

  async function download(req: NextApiRequest) {
    const { acs_url, sp_entity_id } = req.body;

    const certificate = await createCertificate();
    const idpEntityId = 'http://localhost:4000/sso';
    const idpSsoUrl = 'http://localhost:4000/sso';

    const xml = await createIdPMetadataXML({
      idpEntityId,
      idpSsoUrl,
      certificate,
    });

    res.setHeader('Content-type', 'text/xml');
    res.setHeader('Content-Disposition', 'attachment; filename="metadata.xml"');

    return res.send(xml);
  }
}
