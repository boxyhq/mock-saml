import type { NextApiRequest, NextApiResponse } from 'next';
import { createCertificate } from '../../../../utils';
import { IdPMetadata } from '../../../../types';
import config from '../../../../lib/env'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IdPMetadata | string>
) {

  switch (req.method) {
    case 'GET':
      return await getMetadata();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Get metadata for an app
  async function getMetadata() {
    //const {id} = req.query;
    const appId = '0480c44e-f200-4f72-8af0-a5a57611fd2d';

    const metadata = {
      certificate: await createCertificate(),
      fingerprint: '',
      sso_url: `${config.appUrl}/saml2/app/${appId}`,
      entity_id: config.entityId,
    }

    return res.json(metadata);
  }
}