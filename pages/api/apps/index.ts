import { promises as fs } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
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

    const certificateFilePath = path.join('data', 'x509cert.txt');
    const certificate = await fs.readFile(certificateFilePath, 'utf8');

    return res
      .status(200)
      .json(metadata.create(acs_url, entity_id, certificate));
  }

  async function downloadMetadata(req: NextApiRequest) {}
}
