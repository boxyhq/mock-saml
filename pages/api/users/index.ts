import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

type User = {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
};

const createUser = async (body: Omit<User, 'id'>): Promise<User> => {
  return await prisma.user.create({ data: body });
};

const fetchAllUsers = async (): Promise<User[]> => {
  return await prisma.user.findMany();
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | User[]>
) {
  const { method } = req;

  if (method === 'GET') {
    const users = await fetchAllUsers();

    return res.status(200).json(users);
  }

  if (method === 'POST') {
    const { first_name, last_name, email } = req.body;

    const user = await createUser({ first_name, last_name, email });

    return res.status(200).json(user);
  }
}
