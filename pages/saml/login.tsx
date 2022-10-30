import { GetServerSideProps } from 'next';
import { ClientMetadata } from '../../types';
import { InferGetServerSidePropsType } from 'next'

import Head from 'next/head';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import config from 'lib/env';

function Login({clientMetadata}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const router = useRouter();
  const { id, audience, acsUrl, providerName, relayState } = router.query;

  const [state, setState] = useState({
    username: clientMetadata.username,
    domain: 'example.com',
    acsUrl: clientMetadata.acsUrl,
    audience: clientMetadata.audience,
  });

  const acsUrlInp = useRef<HTMLInputElement>(null);
  const emailInp = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (acsUrl && emailInp.current) {
      emailInp.current.focus();
      emailInp.current.select();
    } else if (acsUrlInp.current) {
      acsUrlInp.current.focus();
      acsUrlInp.current.select();
    }
  }, [acsUrl]);

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = e.currentTarget;

    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { username, domain } = state;

    const response = await fetch(`/mock-saml/api/saml/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: `${username}@${domain}`,
        id,
        audience: audience || state.audience,
        acsUrl: acsUrl || state.acsUrl,
        providerName,
        relayState,
      }),
    });

    if (response.ok) {
      const newDoc = document.open('text/html', 'replace');

      newDoc.write(await response.text());
      newDoc.close();
    } else {
      document.write('Error in getting SAML response');
    }
  };

  return (
    <>
      <Head>
        <title>Mock SAML Identity Provider - Login</title>
      </Head>
      <div className='flex min-h-full items-center justify-center'>
        <div className='flex w-full max-w-xl flex-col px-3'>
          <div className='space-y-2'>
            <div className='border-2 p-4'>
              <h2 className='mb-5 text-center text-2xl font-bold text-gray-900'>SAML SSO Login</h2>
              <form onSubmit={handleSubmit}>
                <div className='grid grid-cols-2 gap-y-1 gap-x-5'>
                  {!acsUrl ? (
                    <div className='col-span-2'>
                      <div className='form-control'>
                        <label className='label'>
                          <span className='label-text font-bold'>ACS URL</span>
                        </label>
                        <input
                          type='text'
                          className='input input-bordered'
                          name='acsUrl'
                          id='acsUrl'
                          ref={acsUrlInp}
                          autoComplete='off'
                          placeholder={clientMetadata.acsUrl}
                          value={state.acsUrl}
                          onChange={handleChange}
                        />
                        <label className='label'>
                          <span className='label-text-alt'>This is where we will post the SAML Response</span>
                        </label>
                      </div>
                      <div className='form-control col-span-2'>
                        <label className='label'>
                          <span className='label-text font-bold'>Audience</span>
                        </label>
                        <input
                          type='text'
                          className='input input-bordered'
                          name='audience'
                          id='audience'
                          autoComplete='off'
                          placeholder={clientMetadata.audience}
                          value={state.audience}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  ) : null}
                  <div className='form-control'>
                    <label className='label'>
                      <span className='label-text font-bold'>Email</span>
                    </label>
                    <input
                      name='username'
                      id='username'
                      ref={emailInp}
                      autoComplete='off'
                      type='text'
                      placeholder={clientMetadata.username}
                      value={state.username}
                      onChange={handleChange}
                      className='input input-bordered'
                      title='Please provide a mock email address'
                    />
                  </div>
                  {/* <div className='form-control'>
                    <label className='label'>
                      <span className='label-text font-bold'>Domain</span>
                    </label>
                    <select
                      name='domain'
                      id='domain'
                      className='select select-bordered'
                      onChange={handleChange}
                      value={state.domain}>
                      <option value='example.com'>@example.com</option>
                      <option value='example.org'>@example.org</option>
                    </select>
                  </div> */}
                  <div className='form-control col-span-2'>
                    <label className='label'>
                      <span className='label-text font-bold'>Password</span>
                    </label>
                    <input
                      id='password'
                      autoComplete='off'
                      type='password'
                      defaultValue='samlstrongpassword'
                      className='input input-bordered'
                    />
                    <label className='label'>
                      <span className='label-text-alt'>Any password works</span>
                    </label>
                  </div>
                  <button className='btn btn-primary col-span-2 block'>Sign In</button>
                </div>
              </form>
            </div>
            <div className='alert alert-info'>
              <div>
                <span className='text-sm text-white'>
                  This is a simulated login screen, feel free to pick any username but you are restricted to
                  two domains example.com and example.org. But this should allow you to test all combinations
                  of your authentication and user modelling.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const clientMetadata: ClientMetadata = {
    acsUrl: config.acsUrl,
    audience: config.audience,
    username: config.username,
  }

  return {
    props: {
      clientMetadata 
    }
  };
};

export default Login