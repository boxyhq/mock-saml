const fetchPublicKey = (): string => {
  return process.env.PUBLIC_KEY ? Buffer.from(process.env.PUBLIC_KEY!, 'base64').toString('ascii') : '';
};

const fetchPrivateKey = (): string => {
  return process.env.PRIVATE_KEY ? Buffer.from(process.env.PRIVATE_KEY!, 'base64').toString('ascii') : '';
};

export { fetchPublicKey, fetchPrivateKey };
