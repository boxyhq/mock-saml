import { promises as fs } from 'fs';
import { asn1, pki, util } from 'node-forge';
import path from 'path';

const fetchPublicKey = async (): Promise<string> => {
  return await fs.readFile(path.join('data', 'public.crt'), 'ascii');
};

const fetchPrivateKey = async (): Promise<string> => {
  return await fs.readFile(path.join('data', 'key.pem'), 'ascii');
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

function GetKeyInfo(this: any, x509Certificate: string, signatureConfig: any = {}) {
  x509Certificate = stripCertHeaderAndFooter(x509Certificate);

  this.getKeyInfo = () => {
    const prefix = signatureConfig.prefix ? `${signatureConfig.prefix}:` : '';
    return `<${prefix}X509Data><${prefix}X509Certificate>${x509Certificate}</${prefix}X509Certificate></${prefix}X509Data>`;
  };

  this.getKey = () => {
    return getPublicKeyPemFromCertificate(x509Certificate).toString();
  };
}

export {
  fetchPublicKey,
  fetchPrivateKey,
  stripCertHeaderAndFooter,
  getPublicKeyPemFromCertificate,
  GetKeyInfo,
};
