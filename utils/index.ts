// @ts-ignore
import { promises as fs } from 'fs';
import path from 'path';
import xml2js from 'xml2js';
import { User } from '../types';
import {promisify} from 'util';
import zlib from 'zlib';
import xmlbuilder from 'xmlbuilder';
import crypto from 'crypto';

const inflateRawSync = promisify(zlib.inflateRawSync)

// Parse XML
const parseXML = (xml: string): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, (err: Error, result: any) => {
      if(err) {
        reject(err);
      }

      resolve(result);
    });
  });
};

// Parse SAMLRequest attributes
const extractSAMLRequestAttributes = async (samlRequest: string) => {
  // const request = await inflateRawSync(Buffer.from(samlRequest, 'base64')).toString();
  // const result = await parseXML(request);

  // const attributes = result['samlp:AuthnRequest']['$'];

  return {
    id: '123',
    acsUrl: 'https://hookb.in/NOrYqkDLnXse8mNNlDXx',
    providerName: 'BoxyHQ',
  };
};

const createIdPMetadataXML = async ({
  idpEntityId,
  idpSsoUrl,
  certificate,
}: {
  idpEntityId: string;
  idpSsoUrl: string;
  certificate: string;
}): Promise<string> => {
  const xmlPath = path.join('data', 'idp-metadata.xml');
  const xml = await fs.readFile(xmlPath, 'utf8');

  return xml
    .replace('idp_entity_id', idpEntityId)
    .replace('idp_certificate', extractCert(certificate))
    .replace(/idp_sso_url/g, idpSsoUrl);
};

const createCertificate = async () => {
  const certificateFilePath = path.join('data', 'x509cert.txt');

  return await fs.readFile(certificateFilePath, 'utf8');
};

const extractCert = (certificate: string) => {
  return certificate
    .replace('-----BEGIN CERTIFICATE-----', '')
    .replace('-----END CERTIFICATE-----', '')
    .trim();
};

const createSAMLResponseXML = async (params: {
  idpIdentityId: string,
  audience: string,
  acsUrl: string,
  user: User
}): Promise<string> => {
  const {idpIdentityId, audience, acsUrl, user} = params;

  const authDate = new Date();
  const authTimestamp = authDate.toISOString();

  authDate.setMinutes(authDate.getMinutes() - 5);
  const notBefore = authDate.toISOString();

  authDate.setMinutes(authDate.getMinutes() + 10);
  const notAfter = authDate.toISOString();

  const inResponseTo = '_dde944f3d9cb96238b0c'
  const responseId = crypto.randomBytes(10).toString('hex');

  const nodes = {
    'samlp:Response':{
      '@xmlns:samlp': 'urn:oasis:names:tc:SAML:2.0:protocol',
      '@Version': '2.0',
      '@ID': responseId,
      '@Destination': acsUrl,
      '@InResponseTo': inResponseTo,
      '@IssueInstant': authTimestamp,
      'saml:Issuer': {
        '@xmlns:saml': 'urn:oasis:names:tc:SAML:2.0:assertion',
        '#text': idpIdentityId,
      },
      'samlp:Status': {
        'samlp:StatusCode': {
          '@Value': 'urn:oasis:names:tc:SAML:2.0:status:Success'
        }
      },
      'saml:Assertion': {
        '@xmlns:saml': 'urn:oasis:names:tc:SAML:2.0:assertion',
        '@Version': '2.0',
        '@ID': responseId,
        '@IssueInstant': authTimestamp,
        'saml:Issuer': {
          '#text': idpIdentityId,
        },
        'saml:Subject': {
          'saml:NameID': {
            '@Format': 'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified',
            '#text': user.email,
          }
        },
        'saml:Conditions': {
          '@NotBefore': notBefore,
          '@NotOnOrAfter': notAfter,
          'saml:AudienceRestriction': {
            'saml:Audience': {
              '#text': audience,
            }
          }
        },
        'saml:AuthnStatement': {
          '@AuthnInstant': authTimestamp,
          '@SessionIndex': '_YIlFoNFzLMDYxdwf-T_BuimfkGa5qhKg',
          'saml:AuthnContext': {
            'saml:AuthnContextClassRef': {
              '#text': 'urn:oasis:names:tc:SAML:2.0:ac:classes:unspecified'
            }
          }
        },
        'saml:AttributeStatement': {
          '@xmlns:xs': 'http://www.w3.org/2001/XMLSchema',
          '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
          'saml:Attribute': [
            {
              '@Name': 'id',
              '@NameFormat': 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
              'saml:AttributeValue': {
                '#text': user.id,
              }
            },
            {
              '@Name': 'email',
              '@NameFormat': 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
              'saml:AttributeValue': {
                '#text': user.email,
              }
            },
            {
              '@Name': 'firstName',
              '@NameFormat': 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
              'saml:AttributeValue': {
                '#text': user.firstName,
              }
            },
            {
              '@Name': 'lastName',
              '@NameFormat': 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
              'saml:AttributeValue': {
                '#text': user.lastName,
              }
            },
          ]
        }
      }
    }
  }

  return xmlbuilder.create(nodes).end({ pretty: true});
};

// Add DigestValue
// Add X509Certificate

// Create the HTML form to submit the response
export const createResponseForm = (relayState: string, encodedSamlResponse: string, acsUrl: string) => {
  const formElements = [
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    '<meta charset="utf-8">',
    '<meta http-equiv="x-ua-compatible" content="ie=edge">',
    '</head>',
    '<body onload="document.forms[0].submit()">',
    '<noscript>',
    '<p>Note: Since your browser does not support JavaScript, you must press the Continue button once to proceed.</p>',
    '</noscript>',
    '<form method="post" action="' + encodeURI(acsUrl) + '">',
    '<input type="hidden" name="RelayState" value="' + relayState + '"/>',
    '<input type="hidden" name="SAMLResponse" value="' + encodedSamlResponse + '"/>',
    '<input type="submit" value="Continue" />',
    '</form>',
    '<script>document.forms[0].style.display="none";</script>',
    '</body>',
    '</html>',
  ];

  return formElements.join('');
};

export {
  parseXML,
  extractSAMLRequestAttributes,
  createIdPMetadataXML,
  createSAMLResponseXML,
  createCertificate,
  extractCert,
};