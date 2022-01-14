import type { NextPage } from 'next';
import { useEffect, useRef, useState } from "react";

export async function getServerSideProps(context: any) {
  const {RelayState, SAMLRequest} = context.query;

  return {
    props: {
      RelayState: RelayState,
      SAMLRequest: SAMLRequest
    },
  }
}

// const createSAMLResponse = ({RelayState, SAMLRequest}: Prop) => {
//   const url = new URL('http://28a2-103-153-104-43.ngrok.io/sso/acs');

//   url.searchParams.append('RelayState', RelayState);
//   url.searchParams.append('SAMLResponse', 'SAMLResponse');

//   return url.href;
// }

const SAML: NextPage = (prop) => {
  const [] = useState();
  const formRef = useRef(null);

  useEffect(() => {
    // @ts-ignore
    formRef?.current?.submit();
  }, []);

  return (
    <div>
        <form action="http://28a2-103-153-104-43.ngrok.io/sso/acs" method="POST" ref={formRef}>

        </form>
    </div>
  );
};

export default SAML;