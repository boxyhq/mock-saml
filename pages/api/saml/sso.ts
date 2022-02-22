import type { NextApiRequest, NextApiResponse } from 'next';
import { extractSAMLRequestAttributes } from 'utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  switch (req.method) {
    case 'GET':
      return await processSAMLRequest();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function processSAMLRequest() {
    const relayState = <string>req.query.RelayState;
    const samlRequest = <string>req.query.SAMLRequest;
    try {
      const { id, audience, acsUrl, providerName } = await extractSAMLRequestAttributes(samlRequest);
      const params = new URLSearchParams({ id, audience, acsUrl, providerName, relayState });
      res.redirect(302, `/saml/login?${params.toString()}`);
    } catch (err) {
      console.error(err);
      res.status(500).send(`Error parsing SAML request`);
    }

    // const audience = config.entityId;
  }
}
