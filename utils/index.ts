// @ts-ignore
import { promises as fs } from 'fs';
import path from 'path';
import xml2js from 'xml2js';
import { User } from '../types';
import {promisify} from 'util';
import zlib from 'zlib';
import xmlbuilder from 'xmlbuilder';

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

// Create SAMLResponse
const createSAMLResponse = async (): Promise<string> => {
  const idpIdentityId = 'urn:dev-tyj7qyzz.auth0.com';
  const audience = 'https://saml.boxyhq.com';
  const acsUrl = 'http://localhost:3000/sso/acs';

  const user: User = {
    id: '1',
    email: 'kiran@boxyhq.com',
    firstName: 'Kiran',
    lastName: 'K',
  }

  const nodes = {
    'samlp:Response':{
      '@xmlns:samlp': 'urn:oasis:names:tc:SAML:2.0:protocol',
      '@ID': '_dde944f3d9cb96238b0c',
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
        '@ID': '_bsyl9FgHslMWbBp2tFgM0FBJqWNTd3xd',
        '@IssueInstant': '2022-02-18T06:24:29.856Z',
        'saml:Issuer': {
          '#text': idpIdentityId,
        },
        'saml:Subject': {
          'saml:NameID': {
            '@Format': 'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified',
            '#text': 'google-oauth2|108149256146623609101',
          },
          'saml:SubjectConfirmation': {
            '@Method': 'urn:oasis:names:tc:SAML:2.0:cm:bearer',
            'saml:SubjectConfirmationData': {
              '@NotOnOrAfter': '2022-02-18T07:24:29.856Z',
              '@Recipient': acsUrl,
              '@InResponseTo': '_e427c05d2462c8c2550e'
            }
          }
        },
        'saml:Conditions': {
          '@NotBefore': '2022-02-18T06:24:29.856Z',
          '@NotOnOrAfter': '2022-02-18T07:24:29.856Z',
          'saml:AudienceRestriction': {
            'saml:Audience': {
              '#text': audience,
            }
          }
        },
        'saml:AuthnStatement': {
          '@AuthnInstant': '2022-02-18T06:24:29.856Z',
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
          'saml:Attribute': {
            '@Name': 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
            '@NameFormat': 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
            'saml:AttributeValue': {
              '@xsi:type': 'xs:string',
              '#text': user.email,
            }
          },

          // @ts-ignore
          'saml:Attribute': {
            '@Name': 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress',
            '@NameFormat': 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri',
            'saml:AttributeValue': {
              '@xsi:type': 'xs:string',
              '#text': user.id
            }
          },
        }
      }
    }
  }

  return xmlbuilder.create(nodes).end({ pretty: true});
};

export const createResponseForm = (relayState: string, samlResponse: string, acsUrl: string) => {
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
    '<input type="hidden" name="SAMLResponse" value="' + samlResponse + '"/>',
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
  createSAMLResponse,
  createCertificate,
  extractCert,
};