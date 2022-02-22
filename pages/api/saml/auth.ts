import type { NextApiRequest, NextApiResponse } from "next";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    res.status(200).json({ name: "John Doe" });
  } else {
    res.status(405).send(`Method ${req.method} Not Allowed`);
  }
}
