import xml2js from 'xml2js';
import { promisify } from 'util';
import { inflateRaw } from 'zlib';

const inflateRawAsync = promisify(inflateRaw);

// Parse XML
const parseXML = (xml: string): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, (err: Error, result: any) => {
      if (err) {
        reject(err);
      }

      resolve(result);
    });
  });
};

// Parse SAMLRequest attributes
const extractSAMLRequestAttributes = async (samlRequest: string) => {
  const request = (await inflateRawAsync(Buffer.from(samlRequest, 'base64'))).toString();
  const result = await parseXML(request);

  const attributes = result['samlp:AuthnRequest']['$'];
  const issuer = result['samlp:AuthnRequest']['saml:Issuer'];
  return {
    id: attributes.ID,
    acsUrl: attributes.AssertionConsumerServiceURL,
    providerName: attributes.ProviderName,
    audience: issuer[0]['_'],
  };
};

export { extractSAMLRequestAttributes };
