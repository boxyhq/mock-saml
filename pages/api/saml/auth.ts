import { createHash } from 'crypto';
import config from 'lib/env';
import type { NextApiRequest, NextApiResponse } from 'next';
import type { User } from 'types';
import saml from '@boxyhq/saml20';
import { getEntityId } from 'lib/entity-id';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, audience, acsUrl, id, relayState } = req.body;

    if (!email.endsWith('@example.com') && !email.endsWith('@example.org')) {
      res.status(403).send(`${email} denied access`);
    }

    const userId = createHash('sha256').update(email).digest('hex');
    const userName = email.split('@')[0];

    const user: User = {
      id: userId,
      email,
      firstName: userName,
      lastName: userName,
    };

    const xmlSigned = await saml.createSAMLResponse({
      issuer: getEntityId(config.entityId, req.query.namespace as any),
      audience,
      acsUrl,
      requestId: id,
      claims: {
        email: user.email,
        raw: user,
      },
      privateKey: config.privateKey,
      publicKey: config.publicKey,
    });

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
