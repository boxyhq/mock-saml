import { DOMParser as Dom } from '@xmldom/xmldom';
import { promisify } from 'util';
import { certToPEM } from 'utils';
import { SignedXml, xpath as select } from 'xml-crypto';
import xml2js from 'xml2js';
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

// Decode the base64 string
const decodeBase64 = async (string: string, isDeflated: boolean) => {
  return isDeflated
    ? (await inflateRawAsync(Buffer.from(string, 'base64'))).toString()
    : Buffer.from(string, 'base64').toString();
};

// Parse SAMLRequest attributes
const extractSAMLRequestAttributes = async (rawRequest: string) => {
  const result = await parseXML(rawRequest);

  const attributes = result['samlp:AuthnRequest']['$'];
  const issuer = result['samlp:AuthnRequest']['saml:Issuer'];

  return {
    id: attributes.ID,
    acsUrl: attributes.AssertionConsumerServiceURL,
    providerName: attributes.ProviderName,
    audience: issuer[0]['_'],
    publicKey:
      result['samlp:AuthnRequest']['Signature'][0]['KeyInfo'][0]['X509Data'][0]['X509Certificate'][0],
  };
};

// Validate signature
const hasValidSignature = async (xml: string, certificate: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const doc = new Dom().parseFromString(xml);

    const signature =
      select(
        doc,
        "/*/*/*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']"
      )[0] ||
      select(
        doc,
        "/*/*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']"
      )[0] ||
      select(
        doc,
        "/*/*/*/*[local-name(.)='Signature' and namespace-uri(.)='http://www.w3.org/2000/09/xmldsig#']"
      )[0];

    const signed = new SignedXml();

    signed.keyInfoProvider = {
      getKey: function getKey(keyInfo: any) {
        return certToPEM(certificate);
      },
      getKeyInfo: function getKeyInfo(key: any) {
        return '<X509Data></X509Data>';
      },
    };

    signed.loadSignature(signature.toString());

    const response = signed.checkSignature(xml);

    return !response ? reject(false) : resolve(true);
  });
};

export { extractSAMLRequestAttributes, hasValidSignature, decodeBase64 };
