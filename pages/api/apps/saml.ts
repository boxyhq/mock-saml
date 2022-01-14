import type { NextApiRequest, NextApiResponse } from 'next';
import xml2js from 'xml2js';

const parseXML = (xml: string): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, (err: Error, result: any) => {
      resolve(result);
    });
  });
};

const extractSAMLRequestAttribute = async (SAMLRequest: string | string[]) => {
  // @ts-ignore
  const result = await parseXML(Buffer.from(SAMLRequest, 'base64').toString());
  const sp = result['samlp:AuthnRequest']['$'];

  return {
    ID: sp['ID'],
    IssueInstant: sp['IssueInstant'],
    AssertionConsumerServiceURL: sp['AssertionConsumerServiceURL'],
    ProviderName: sp['ProviderName'],
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'GET') {
    return await response(req);
  }

  async function response(req: NextApiRequest) {
    const { RelayState, SAMLRequest } = req.query;

    const attributes = await extractSAMLRequestAttribute(SAMLRequest);

    return res.status(200).json(attributes);
  }
}
