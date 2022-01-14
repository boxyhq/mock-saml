import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    return await response(req);
  }

  async function response(req: NextApiRequest) {
    const { RelayState, SAMLRequest } = req.query;

    // @ts-ignore
    const samlRequest = Buffer.from(SAMLRequest, 'base64').toString();

    // @ts-ignore
    // const a = Buffer.from(SAMLRequest, 'base64');
    // const b = pako.inflateRaw(a, { to: 'string' });
    // const samlRequest = Buffer.from(SAMLRequest, 'base64').toString('hex');

    return res.status(200).json({ samlRequest });
  }
}
