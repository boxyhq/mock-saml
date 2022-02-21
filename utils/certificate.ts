import { promises as fs } from 'fs';
import path from 'path';

const fetchPublicKey = async () => {
  return await fs.readFile(path.join('data', 'idp-public.key'), 'utf8');
};

const fetchPrivateKey = async () => {
  return await fs.readFile(path.join('data', 'idp-private.key'), 'utf8');
}

const extractCert = (certificate: string) => {
  return certificate
    .replace('-----BEGIN CERTIFICATE-----', '')
    .replace('-----END CERTIFICATE-----', '')
    .trim();
};

export {
  fetchPublicKey,
  fetchPrivateKey,
  extractCert,
}