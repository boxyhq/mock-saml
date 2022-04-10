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

export { fetchPublicKey, fetchPrivateKey, getPublicKeyPemFromCertificate };
