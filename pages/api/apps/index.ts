import type { NextApiRequest, NextApiResponse } from 'next';
import type { App, IdPMetadata } from '../../../types';
import prisma from '../../../lib/prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<App | App[]>
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
    const apps = await prisma.app.findMany();

    return res.json(apps);
  }

  // Create a new app
  async function createApp() {
    const {
      name,
      acs_url,
      entity_id,
      description = null,
    } = req.body;

    const app = await prisma.app.create({
      data: {
        name,
        acs_url,
        entity_id,
        description
      }
    });

    return res.json(app);
  }
}
