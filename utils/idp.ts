import { promises as fs } from 'fs';
import path from 'path';
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
  const xmlPath = path.join('data', 'idp-metadata.xml');
  const xml = await fs.readFile(xmlPath, 'utf8');
  certificate = stripCertHeaderAndFooter(certificate);

  return xml
    .replace('idp_entity_id', idpEntityId)
    .replace('idp_certificate', certificate)
    .replace(/idp_sso_url/g, idpSsoUrl);
};

export { createIdPMetadataXML };
