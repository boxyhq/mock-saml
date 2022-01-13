import { PrismaClient } from '@prisma/client';
import type { App } from '../types';

const prisma = new PrismaClient();

export async function create(body: Omit<App, 'id'>): Promise<App> {
  return await prisma.app.create({ data: body });
}

export async function getAll(): Promise<App[]> {
  return await prisma.app.findMany();
}

export async function getById(id: string): Promise<App | null> {
  return await prisma.app.findUnique({
    where: {
      id,
    },
  });
}
