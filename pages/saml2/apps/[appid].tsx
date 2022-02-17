import type { GetServerSideProps } from 'next';
import React from "react";
import { AuthNRequest } from '../../../types'
import {extractSAMLRequestAttributes} from '../../../utils'

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

// Start a session
// Store the RelayState in the session
// Parse the SAMLRequest
// Validate the SAMLRequest
// Create SAMLResponse
// POST the SAMLResponse to ACS URL
// Remove the RelayState from the session