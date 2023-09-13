import { promisify } from 'util';
import xml2js from 'xml2js';
import { inflateRaw } from 'zlib';

const inflateRawAsync = promisify(inflateRaw);

// Parse XML
const parseXML = (xml: string): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(
      xml,
      {
        tagNameProcessors: [xml2js.processors.stripPrefix],
        strict: true,
      },
      (err: Error | null, result: any) => {
        if (err) {
          reject(err);
        }

        resolve(result);
      }
    );
  });
};

// Decode the base64 string
const decodeBase64 = async (string: string, isDeflated: boolean) => {
  return isDeflated
    ? (await inflateRawAsync(Buffer.from(string, 'base64'))).toString()
    : Buffer.from(string, 'base64').toString();
};

// Parse SAMLRequest attributes
const extractSAMLRequestAttributes = async (rawRequest: string, isPost = true) => {
  const result = await parseXML(rawRequest);

  const attributes = result['AuthnRequest']['$'];
  const issuer = result['AuthnRequest']['Issuer'];

  const publicKey = result['AuthnRequest']['Signature']
    ? result['AuthnRequest']['Signature'][0]['KeyInfo'][0]['X509Data'][0]['X509Certificate'][0]
    : null;

  if (!publicKey && isPost) {
    throw new Error('Missing signature');
  }

  return {
    id: attributes.ID,
    acsUrl: attributes.AssertionConsumerServiceURL,
    providerName: attributes.ProviderName,
    audience: issuer[0]['_'] ?? issuer[0],
    publicKey,
  };
};

export { extractSAMLRequestAttributes, decodeBase64 };
