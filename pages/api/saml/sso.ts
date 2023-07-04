import type { NextApiRequest, NextApiResponse } from 'next';
import { decodeBase64, extractSAMLRequestAttributes } from 'utils';
import saml from '@boxyhq/saml20';

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
    // sigAlg = req.query.SigAlg;
    // signature = req.query.Signature;

    isDeflated = true;
  }

  try {
    const rawRequest = await decodeBase64(samlRequest, isDeflated);

    const { id, audience, acsUrl, providerName, publicKey } = await extractSAMLRequestAttributes(
      rawRequest,
      isPost
    );

    if (isPost) {
      const { valid } = await saml.hasValidSignature(rawRequest, publicKey, null);
      if (!valid) {
        throw new Error('Invalid signature');
      }
    }

    const params = new URLSearchParams({ id, audience, acsUrl, providerName, relayState });

    res.redirect(302, `/saml/login?${params.toString()}`);
  } catch (err) {
    console.error(err);

    res.status(500).send(`${err}`);
  }
}
