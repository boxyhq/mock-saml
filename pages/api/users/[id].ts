import type { NextApiRequest, NextApiResponse } from 'next';

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
};

const getUserById = async (id: number): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<User | null>
) {
  const { method } = req;

  if (method === 'GET') {
    const { id } = req.query;

    const user = await getUserById(Number(id));

    return res.status(200).json(user);
  }
}
