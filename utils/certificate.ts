import { promises as fs } from 'fs';
import path from 'path';

const fetchPublicKey = async (): Promise<string> => {
  return await fs.readFile(path.join('data', 'idp-public.key'), 'ascii');
};

const fetchPrivateKey = async (): Promise<string> => {
  return await fs.readFile(path.join('data', 'idp-private.key'), 'ascii');
}

const stripCertHeaderAndFooter = (cert: string): string => {
  cert = cert.replace(/-+BEGIN CERTIFICATE-+\r?\n?/, '');
  cert = cert.replace(/-+END CERTIFICATE-+\r?\n?/, '');
  cert = cert.replace(/\r\n/g, '\n');

  return cert;
};

export {
  fetchPublicKey,
  fetchPrivateKey,
  stripCertHeaderAndFooter,
}