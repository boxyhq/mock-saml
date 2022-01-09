import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

type ServiceProvider = {
  sp_acs_url: string;
  sp_entity_id: string;
};

type IdentityProvider = {
  idp_sso_url: string;
  idp_entity_id: string;
};

type App = {
  id: string;
  name: string;
  description?: string;
  certificate: string;
} & ServiceProvider;

const createApp = async (body: Omit<App, 'id'>): Promise<App> => {
  return await prisma.app.create({ data: body });
};

const getAllApps = async (): Promise<App[]> => {
  return await prisma.app.findMany();
};

const getAppById = async (id: string): Promise<App> => {
  return await prisma.app.findUnique({
    where: {
      id,
    },
  });
};

const createKeyPairs = (): any => {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<App | App[]>
) {
  const { method } = req;

  //   if (method === 'GET') {
  //     const apps = await getAllApps();

  //     return res.status(200).json(apps);
  //   }

  if (method === 'GET') {
    const app = await getAppById('287f8e3d-234c-425c-bac3-cc68878582f5');

    return res.status(200).json(app);
  }

  if (method === 'POST') {
    const { name, sp_acs_url, sp_entity_id, description = null } = req.body;
    const certificate = 'certificate';

    const app = await createApp({
      name,
      description,
      certificate,
      sp_acs_url,
      sp_entity_id,
    });

    return res.status(200).json(app);
  }
}
