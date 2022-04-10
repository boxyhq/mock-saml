import { asn1, pki, util } from 'node-forge';
import saml from '@boxyhq/saml20';

const fetchPublicKey = (): string => {
  return process.env.PUBLIC_KEY ? Buffer.from(process.env.PUBLIC_KEY!, 'base64').toString('ascii') : '';
};

const fetchPrivateKey = (): string => {
  return process.env.PRIVATE_KEY ? Buffer.from(process.env.PRIVATE_KEY!, 'base64').toString('ascii') : '';
};

const getPublicKeyPemFromCertificate = (x509Certificate: string) => {
  const certDerBytes = util.decode64(x509Certificate);
  const obj = asn1.fromDer(certDerBytes);
  const cert = pki.certificateFromAsn1(obj);

  return pki.publicKeyToPem(cert.publicKey);
};

function GetKeyInfo(this: any, x509Certificate: string, signatureConfig: any = {}) {
  x509Certificate = saml.stripCertHeaderAndFooter(x509Certificate);

  this.getKeyInfo = () => {
    const prefix = signatureConfig.prefix ? `${signatureConfig.prefix}:` : '';
    return `<${prefix}X509Data><${prefix}X509Certificate>${x509Certificate}</${prefix}X509Certificate></${prefix}X509Data>`;
  };

  this.getKey = () => {
    return getPublicKeyPemFromCertificate(x509Certificate).toString();
  };
}

export { fetchPublicKey, fetchPrivateKey, getPublicKeyPemFromCertificate, GetKeyInfo };
