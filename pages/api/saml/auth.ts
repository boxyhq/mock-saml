import { createHash } from 'crypto';
import config from 'lib/env';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { User } from 'types';
import { createResponseXML, signResponseXML } from 'utils';
import saml from '@boxyhq/saml20';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, uid, firstName, lastName, teams, organisationId, audience, acsUrl, id, relayState } = req.body;

    if (!email.endsWith('@immersivelabs.com') && !email.endsWith('@immersivelabs.org')) {
      res.status(403).send(`${email} denied access`);
    }

    const userId = createHash('sha256').update(email).digest('hex');
    const userName = email.split('@')[0];

    const user: User = {
      id: userId,
      email,
      firstName,
      lastName,
      uid,
      organisationId,
      teams: teams.split(',')
    };

    const xml = await createResponseXML({
      idpIdentityId: config.entityId,
      audience,
      acsUrl,
      samlReqId: id,
      user: user,
    });

    const xmlSigned = await signResponseXML(xml, config.privateKey, config.publicKey);
    const encodedSamlResponse = Buffer.from(xmlSigned).toString('base64');
    const html = saml.createPostForm(acsUrl, [
      {
        name: 'RelayState',
        value: relayState,
      },
      {
        name: 'SAMLResponse',
        value: encodedSamlResponse,
      },
    ]);

    res.send(html);
  } else {
    res.status(405).send(`Method ${req.method} Not Allowed`);
  }
}
