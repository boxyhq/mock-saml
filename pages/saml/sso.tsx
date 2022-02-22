import type { GetServerSideProps } from 'next';
import React from 'react';
import { AuthNRequest } from '../../types';
import { extractSAMLRequestAttributes, createResponseForm } from '../../utils';

const ProcessRequest: React.FC<AuthNRequest> = ({ relayState, samlRequest }) => {
  return <div>Processing request</div>;
};

export default ProcessRequest;
