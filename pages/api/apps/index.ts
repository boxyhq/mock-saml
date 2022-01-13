import type { NextApiRequest, NextApiResponse } from 'next';
import { apps, metadata } from '../../../services';
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
      sp_acs_url,
      sp_entity_id,
      name = 'My App',
      description = null,
    } = req.body;

    const certificate = 'certificate';

    const app = await apps.create({
      sp_acs_url,
      sp_entity_id,
      name,
      description,
      certificate,
    });

    const idPMetadata = metadata.create(sp_acs_url, sp_entity_id, certificate);

    return res.status(200).json(idPMetadata);

    //return res.status(200).json(app);
  }
}
