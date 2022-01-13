import * as xmlbuilder from 'xmlbuilder';
import type { IdPMetadata } from '../types';

const baseUrl = 'http://localhost:3000/saml';

export const create = (
  acs_url: string,
  entity_id: string,
  certificate: string
): IdPMetadata => {
  const params = new URLSearchParams({
    acs_url,
    entity_id,
  }).toString();

  return {
    sso_url: `${baseUrl}?${params}`,
    entity_id: `${baseUrl}?${params}`,
    certificate: certificate,
  };
};

const formatCert = (certificate: string) => {
  return certificate
    .replace('-----BEGIN CERTIFICATE-----', '')
    .replace('-----END CERTIFICATE-----', '')
    .trim();
};

export const createXML = async (
  acs_url: string,
  entity_id: string,
  certificate: string
) => {
  const metadata = create(acs_url, entity_id, certificate);

  const data = {
    'md:EntityDescriptor': {
      '@xmlns:md': 'urn:oasis:names:tc:SAML:2.0:metadata',
      '@entityID': `${metadata.entity_id}`,
      '@validUntil': '2026-06-22T18:39:53.000Z',
      'md:IDPSSODescriptor': {
        '@WantAuthnRequestsSigned': 'false',
        '@protocolSupportEnumeration': 'urn:oasis:names:tc:SAML:2.0:protocol',
        'md:KeyDescriptor': {
          '@use': 'signing',
          'ds:KeyInfo': {
            '@xmlns:ds': 'http://www.w3.org/2000/09/xmldsig#',
          },
          'ds:X509Data': {
            'ds:X509Certificate': {
              '#text': `${formatCert(certificate)}`,
            },
          },
        },
        'md:NameIDFormat': {
          '#text': 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
        },
        'md:SingleSignOnService': {
          '@Binding': 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
          '@Location': `${metadata.sso_url}`,
        },
      },
    },
  };

  return xmlbuilder.create(data).end({ pretty: true });
};
