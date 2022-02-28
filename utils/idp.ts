import xmlbuilder from 'xmlbuilder';
import { stripCertHeaderAndFooter } from './certificate';

const createIdPMetadataXML = async ({
  idpEntityId,
  idpSsoUrl,
  certificate,
}: {
  idpEntityId: string;
  idpSsoUrl: string;
  certificate: string;
}): Promise<string> => {
  certificate = stripCertHeaderAndFooter(certificate);

  const nodes = {
    EntityDescriptor: {
      '@xmlns:md': 'urn:oasis:names:tc:SAML:2.0:metadata',
      '@entityID': idpEntityId,
      '@validUntil': '2026-06-22T18:39:53.000Z',
      IDPSSODescriptor: {
        '@WantAuthnRequestsSigned': false,
        '@protocolSupportEnumeration': 'urn:oasis:names:tc:SAML:2.0:protocol',
        KeyDescriptor: {
          '@use': 'signing',
          KeyInfo: {
            '@xmlns:ds': 'http://www.w3.org/2000/09/xmldsig#',
            X509Data: {
              X509Certificate: {
                '#text': certificate,
              },
            },
          },
        },
        NameIDFormat: {
          '#text': 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
        },
        SingleSignOnService: [
          {
            '@Binding': 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect',
            '@Location': idpSsoUrl,
          },
          {
            '@Binding': 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST',
            '@Location': idpSsoUrl,
          },
        ],
      },
    },
  };

  return xmlbuilder.create(nodes, { encoding: 'UTF-8', standalone: false }).end();
};

export { createIdPMetadataXML };
