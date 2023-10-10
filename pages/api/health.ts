import { NextApiRequest, NextApiResponse } from 'next';

import packageInfo from '../../package.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      throw new Error('Method not allowed');
    }

    res.status(200).json({
      version: packageInfo.version,
    });
  } catch (err: any) {
    const { statusCode = 503 } = err;
    res.status(statusCode).json({});
  }
}
