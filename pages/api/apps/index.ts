import { promises as fs } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { apps, metadata } from '../../../services';
import type { App, IdPMetadata } from '../../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<App | App[] | IdPMetadata | null>
) {

  switch (req.method) {
    case 'GET':
      return await getAllApps();
    case 'POST':
      return await createApp();
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Get all apps
  async function getAllApps() {
    const appList = await apps.getAll();

    return res.json(appList);
  }

  // Create a new app 
  async function createApp() {
    const {
      name,
      acs_url,
      entity_id,
      description = null,
    } = req.body;

    const app = await apps.create(name, description, acs_url, entity_id);

    return res.json(app);
  }
}
