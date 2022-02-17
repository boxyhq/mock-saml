import type { NextApiRequest, NextApiResponse } from 'next';
import { createCertificate, createIdPMetadataXML } from '../../../utils';
import { IdPMetadata } from '../../../types';

const idpEntityId = 'http://saml.example.com';
const baseUrl = 'http://localhost:4000'; // TODO: Read from .env

// https://boxyhqdemo.onelogin.com/trust/saml2/http-post/sso/a810f17d-48a8-4ac2-ae0f-253c823b272c
// https://dev-8924093.okta.com/app/dev-8924093_jacksondemo_1/exk3u9pl6jx4P9AE15d7/sso/saml
// https://accounts.google.com/o/saml2/idp?idpid=C02frd9s1

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IdPMetadata>
) {

  switch (req.method) {
    case 'GET':
      return await getMetadata();
    case 'POST':
      return await downloadMetadata();
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
      sso_url: `${baseUrl}/saml2/app/${appId}`,
      entity_id: idpEntityId,
    }

    return res.json(metadata);
  }

  // Download metadata for an app
  async function downloadMetadata() {
    const appId = '0480c44e-f200-4f72-8af0-a5a57611fd2d';

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
