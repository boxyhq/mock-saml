import type { NextApiRequest, NextApiResponse } from 'next';
import type { User } from 'types';
import {
  createResponseForm,
  createResponseXML,
  fetchPrivateKey,
  fetchPublicKey,
  signResponseXML,
} from 'utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    console.log(req.body);
    const email = req.body.email;
    if (!email.endsWith('@example.com')) {
      res.status(403).send(`${email} denied access`);
    }
    const id = email.replace('@example.com', '');
    const user: User = {
      id,
      email,
      firstName: id,
      lastName: id,
    };
    console.log(`🕺🏻`, user);

    const xml = await createResponseXML({
      idpIdentityId: req.body.audience,
      audience: req.body.audience,
      acsUrl: req.body.acsUrl,
      user: user,
    });

    const signingKey = await fetchPrivateKey();
    const publicKey = await fetchPublicKey();
    const xmlSigned = await signResponseXML(xml, signingKey, publicKey);
    const encodedSamlResponse = Buffer.from(xmlSigned).toString('base64');

    const html = createResponseForm(req.body.relayState, encodedSamlResponse, req.body.acsUrl);

    res.send(html);
  } else {
    res.status(405).send(`Method ${req.method} Not Allowed`);
  }
}
