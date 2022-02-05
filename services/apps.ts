import { PrismaClient } from '@prisma/client';
import type { App } from '../types';

const prisma = new PrismaClient();

const create = async function(name: string, description: string, acsUrl: string, entityId: string): Promise<App> {
  const body = {
    name, 
    description, 
    acs_url: acsUrl,
    entity_id: entityId,
  }

  return await prisma.app.create({ data: body });
}

const getAll = async function(): Promise<App[]> {
  return await prisma.app.findMany();
}

const getById = async function(id: string): Promise<App | null> {
  return await prisma.app.findUnique({
    where: {
      id,
    },
  });
}

export {
  create,
  getAll,
  getById,
}