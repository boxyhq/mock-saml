import type { NextApiRequest, NextApiResponse } from 'next';
import { createResponseForm, createResponseXML } from 'utils';
import { User } from 'types';
import config from '../../../lib/env'
import { signResponseXML } from 'utils/response';
import { fetchPrivateKey, fetchPublicKey } from 'utils/certificate';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {

  switch (req.method) {
    case 'GET':
      return await processSAMLRequest();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  async function processSAMLRequest() {
    const relayState = <string>req.query.RelayState;
    const samlRequest = <string>req.query.SAMLRequest;

    const idpIdentityId = config.entityId;
    const audience = config.entityId;
    const acsUrl = 'http://localhost:3000/sso/acs'; // TODO: Fetch acsUrl from SAMLRequest

    const user: User = {
      id: '1',
      email: 'kiran@boxyhq.com',
      firstName: 'Kiran',
      lastName: 'K',
    };

    const xml = await createResponseXML({
      idpIdentityId: idpIdentityId,
      audience: audience,
      acsUrl: acsUrl,
      user: user,
    });

    const signingKey = await fetchPrivateKey();
    const publicKey = await fetchPublicKey();
    const xmlSigned = await signResponseXML(xml, signingKey, publicKey);

    const encodedSamlResponse =  Buffer.from(xmlSigned).toString('base64');

    const html = createResponseForm(relayState, encodedSamlResponse, acsUrl);

    res.send(html);
  }
}