import type { GetServerSideProps } from 'next';
import React from "react";
import { AuthNRequest } from '../../types'
import { extractSAMLRequestAttributes } from '../../utils'

export const getServerSideProps: GetServerSideProps = async ({query, params}) => {
  const relayState = query.RelayState as string;
  const samlRequest = query.SAMLRequest as string;  

  const attributes = await extractSAMLRequestAttributes(samlRequest);

  console.log(attributes)

  return {
    props: {
      relayState,
      samlRequest,
    },
  }
}

const ProcessRequest: React.FC<AuthNRequest> = ({relayState, samlRequest}) => {
  return (
    <div>Process Request</div>
  );
}

export default ProcessRequest;