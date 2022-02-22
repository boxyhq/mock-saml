import { User } from '../types';
import xmlbuilder from 'xmlbuilder';
import crypto from 'crypto';
import { SignedXml, FileKeyInfo } from 'xml-crypto';
import { pki, util, asn1 } from 'node-forge';

const createResponseXML = async (params: {
  idpIdentityId: string;
  audience: string;
  acsUrl: string;
  user: User;
}): Promise<string> => {
  const { idpIdentityId, audience, acsUrl, user } = params;

  const authDate = new Date();
  const authTimestamp = authDate.toISOString();

  authDate.setMinutes(authDate.getMinutes() - 5);
  const notBefore = authDate.toISOString();

  authDate.setMinutes(authDate.getMinutes() + 10);
  const notAfter = authDate.toISOString();

  const inResponseTo = '_1234';
  const responseId = crypto.randomBytes(10).toString('hex');

  const attributeStatement = {
    '@xmlns:xs': 'http://www.w3.org/2001/XMLSchema',
    '@xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    'saml:Attribute': [
      {
        '@Name': 'id',
        '@NameFormat': 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
        'saml:AttributeValue': {
          '#text': user.id,
        },
      },
      {
        '@Name': 'email',
        '@NameFormat': 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
        'saml:AttributeValue': {
          '#text': user.email,
        },
      },
      {
        '@Name': 'firstName',
        '@NameFormat': 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
        'saml:AttributeValue': {
          '#text': user.firstName,
        },
      },
      {
        '@Name': 'lastName',
        '@NameFormat': 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic',
        'saml:AttributeValue': {
          '#text': user.lastName,
        },
      },
    ],
  };

  const nodes = {
    'samlp:Response': {
      '@xmlns:samlp': 'urn:oasis:names:tc:SAML:2.0:protocol',
      '@Version': '2.0',
      '@ID': responseId,
      '@Destination': acsUrl,
      '@InResponseTo': inResponseTo,
      '@IssueInstant': authTimestamp,
      'samlp:Status': {
        'samlp:StatusCode': {
          '@Value': 'urn:oasis:names:tc:SAML:2.0:status:Success',
        },
      },
      'saml:Issuer': {
        '@xmlns:saml': 'urn:oasis:names:tc:SAML:2.0:assertion',
        '#text': idpIdentityId,
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
          },
        },
        'saml:Conditions': {
          '@NotBefore': notBefore,
          '@NotOnOrAfter': notAfter,
          'saml:AudienceRestriction': {
            'saml:Audience': {
              '#text': audience,
            },
          },
        },
        'saml:AuthnStatement': {
          '@AuthnInstant': authTimestamp,
          '@SessionIndex': '_YIlFoNFzLMDYxdwf-T_BuimfkGa5qhKg',
          'saml:AuthnContext': {
            'saml:AuthnContextClassRef': {
              '#text': 'urn:oasis:names:tc:SAML:2.0:ac:classes:unspecified',
            },
          },
        },
        'saml:AttributeStatement': attributeStatement,
      },
    },
  };

  return xmlbuilder.create(nodes).end({ pretty: true });
};

// Create the HTML form to submit the response
const createResponseForm = (relayState: string, encodedSamlResponse: string, acsUrl: string) => {
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

function getPublicKeyPemFromCertificate(x509Certificate: string) {
  const certDerBytes = util.decode64(x509Certificate);
  const obj = asn1.fromDer(certDerBytes);
  const cert = pki.certificateFromAsn1(obj);
  return pki.publicKeyToPem(cert.publicKey);
}

const stripCertHeaderAndFooter = (cert: string): string => {
  cert = cert.replace(/-+BEGIN CERTIFICATE-+\r?\n?/, '');
  cert = cert.replace(/-+END CERTIFICATE-+\r?\n?/, '');
  cert = cert.replace(/\r\n/g, '\n');
  return cert;
};

function GetKeyInfo(x509Certificate: string, signatureConfig: any = {}) {
  x509Certificate = stripCertHeaderAndFooter(x509Certificate);

  this.getKeyInfo = () => {
    const prefix = signatureConfig.prefix ? `${signatureConfig.prefix}:` : '';
    return `<${prefix}X509Data><${prefix}X509Certificate>${x509Certificate}</${prefix}X509Certificate></${prefix}X509Data>`;
  };

  this.getKey = () => {
    return getPublicKeyPemFromCertificate(x509Certificate).toString();
  };
}

const signResponseXML = async (xml: string, signingKey: any, publicKey: any): Promise<string> => {
  const sig = new SignedXml();
  const responseXPath =
    '/*[local-name(.)="Response" and namespace-uri(.)="urn:oasis:names:tc:SAML:2.0:protocol"]';
  const issuerXPath =
    '/*[local-name(.)="Issuer" and namespace-uri(.)="urn:oasis:names:tc:SAML:2.0:assertion"]';

  sig.signatureAlgorithm = 'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256';

  // @ts-ignore
  sig.keyInfoProvider = new GetKeyInfo(publicKey, {});
  sig.signingKey = signingKey;

  sig.addReference(
    responseXPath,
    ['http://www.w3.org/2000/09/xmldsig#enveloped-signature', 'http://www.w3.org/2001/10/xml-exc-c14n#'],
    'http://www.w3.org/2001/04/xmlenc#sha256'
  );

  sig.computeSignature(xml, {
    location: { reference: responseXPath + issuerXPath, action: 'after' },
  });

  return sig.getSignedXml();
};

export { createResponseXML, createResponseForm, signResponseXML };
