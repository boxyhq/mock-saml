import type { NextApiRequest, NextApiResponse } from 'next';
import { metadata } from '../../../services';
import type { App, IdPMetadata } from '../../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<App | App[] | IdPMetadata | null>
) {
  if (req.method === 'POST') {
    return await create(req);
  }

  async function create(req: NextApiRequest) {
    const {
      acs_url,
      entity_id,
      name = 'My App',
      description = null,
    } = req.body;

    const certificate = 'EwZHb29nbGUxGDAWBgNVBAsTD0dv';

    return res
      .status(200)
      .json(metadata.create(acs_url, entity_id, certificate));

    // const app = await apps.create({
    //   acs_url,
    //   entity_id,
    //   name,
    //   description,
    //   certificate,
    // });

    // return res.status(200).json(app);
  }
}
