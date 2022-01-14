import type { NextApiRequest, NextApiResponse } from 'next';
import { User } from '../../../types';
import {
  createSAMLResponseXML,
  extractSAMLRequestAttributes,
} from '../../../utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'POST') {
    return await response(req);
  }

  if (req.method === 'GET') {
    const user: User = {
      id: '1',
      email: 'kiran@demo.com',
      firstName: 'Kiran',
      lastName: 'K',
    };

    return res.status(200).json(await createSAMLResponseXML(user));
  }

  async function response(req: NextApiRequest) {
    const { RelayState, SAMLRequest } = req.query;

    const attributes = await extractSAMLRequestAttributes(SAMLRequest);

    return res.status(200).json(attributes);
  }
}
