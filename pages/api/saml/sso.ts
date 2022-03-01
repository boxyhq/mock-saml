import type { NextApiRequest, NextApiResponse } from 'next';
import { decodeBase64, extractSAMLRequestAttributes, validateRequestSignature } from 'utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
  switch (req.method) {
    case 'GET':
      return await processSAMLRequest(req, res, false);
    case 'POST':
      return await processSAMLRequest(req, res, true);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function processSAMLRequest(req: NextApiRequest, res: NextApiResponse, isPost: boolean) {
  let samlRequest, relayState, isDeflated;

  if (isPost) {
    relayState = req.body.RelayState;
    samlRequest = req.body.SAMLRequest;
    isDeflated = false;
  } else {
    relayState = req.query.RelayState;
    samlRequest = req.query.SAMLRequest;
    isDeflated = true;
  }

  try {
    const rawRequest = await decodeBase64(samlRequest, isDeflated);

    if (!(await validateRequestSignature(rawRequest))) {
      res.status(422).send(`AuthnRequest signature validation failed.`);
    }

    const { id, audience, acsUrl, providerName } = await extractSAMLRequestAttributes(rawRequest);

    const params = new URLSearchParams({ id, audience, acsUrl, providerName, relayState });

    res.redirect(302, `/saml/login?${params.toString()}`);
  } catch (err) {
    console.error(err);

    res.status(500).send(`Error parsing SAML request`);
  }
}
