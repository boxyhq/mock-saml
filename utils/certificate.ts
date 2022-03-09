import { asn1, pki, util } from 'node-forge';

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

const stripCertHeaderAndFooter = (cert: string): string => {
  cert = cert.replace(/-+BEGIN CERTIFICATE-+\r?\n?/, '');
  cert = cert.replace(/-+END CERTIFICATE-+\r?\n?/, '');
  cert = cert.replace(/\r\n/g, '\n');

  return cert;
};

const certToPEM = (certificate: string) => {
  if (certificate.indexOf('BEGIN CERTIFICATE') === -1 && certificate.indexOf('END CERTIFICATE') === -1) {
    certificate = certificate.match(/.{1,64}/g)!.join('\n');
    certificate = '-----BEGIN CERTIFICATE-----\n' + certificate;
    certificate = certificate + '\n-----END CERTIFICATE-----\n';
  }

  return certificate;
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
  certToPEM,
};
