import { promises as fs } from 'fs';
import type { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { metadata } from '../../../services';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'POST') {
    return await download(req);
  }

  async function download(req: NextApiRequest) {
    const { acs_url, entity_id } = req.body;

    const certificateFilePath = path.join('data', 'x509cert.txt');
    const certificate = await fs.readFile(certificateFilePath, 'utf8');

    const xml = await metadata.createXML(acs_url, entity_id, certificate);

    return res.send(xml);

    // res.setHeader('Content-type', 'text/xml');
    // res.setHeader('Content-Disposition', 'attachment; filename="text.xml"');
  }
}
