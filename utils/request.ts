import { promises as fs } from 'fs';
import path from 'path';
import xml2js from 'xml2js';
import {promisify} from 'util';
import zlib from 'zlib';

const inflateRawSync = promisify(zlib.inflateRawSync)

// Parse XML
const parseXML = (xml: string): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, (err: Error, result: any) => {
      if(err) {
        reject(err);
      }

      resolve(result);
    });
  });
};

// Parse SAMLRequest attributes
const extractSAMLRequestAttributes = async (samlRequest: string) => {
  // const request = await inflateRawSync(Buffer.from(samlRequest, 'base64')).toString();
  // const result = await parseXML(request);

  // const attributes = result['samlp:AuthnRequest']['$'];

  return {
    id: '123',
    acsUrl: 'https://hookb.in/NOrYqkDLnXse8mNNlDXx',
    providerName: 'BoxyHQ',
  };
};


export {
  extractSAMLRequestAttributes,
}