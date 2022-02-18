import type { GetServerSideProps } from 'next';
import React from "react";
import { AuthNRequest } from '../../types'
import { extractSAMLRequestAttributes, createSAMLResponse } from '../../utils'

export const getServerSideProps: GetServerSideProps = async ({query, params}) => {
  const relayState = query.RelayState as string;
  const samlRequest = query.SAMLRequest as string;

  console.log(await createSAMLResponse())

  const attributes = await extractSAMLRequestAttributes(samlRequest);

  return {
    props: {
      relayState,
      samlRequest,
    },
  }
}

const ProcessRequest: React.FC<AuthNRequest> = ({relayState, samlRequest}) => {
  return (
    <div>Processing request</div>
  );
}

export default ProcessRequest;