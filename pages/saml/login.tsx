import Head from 'next/head';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';

export default function Login() {
  const router = useRouter();
  const { id, audience, acsUrl, providerName, relayState } = router.query;

  const [state, setState] = useState({
    username: 'jackson',
    domain: 'example.com',
    acsUrl: 'https://jackson-demo.boxyhq.com/api/oauth/saml',
    audience: 'https://saml.boxyhq.com',
  });

  const acsUrlInp = useRef<HTMLInputElement>(null);
  // Set focus to email input on load
  const emailInp = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (acsUrl && emailInp.current) {
      emailInp.current.focus();
      emailInp.current.select();
    } else if (acsUrlInp.current) {
      acsUrlInp.current.focus();
      acsUrlInp.current.select();
    }
  }, []);

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

    const response = await fetch(`/api/saml/auth`, {
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
      const newHtml = await response.text();
      const newDoc = document.open('text/html', 'replace');

      newDoc.write(newHtml);
      newDoc.close();
    } else {
      document.write('Error in getting SAML response');
    }
  };

  return (
    <div className='h-full'>
      <Head>
        <title>Mock SAML Identity Provider - Login</title>
      </Head>
      <div className='relative top-20 mx-auto w-[465px] max-w-[90%] rounded-md border p-10 text-[#145698]'>
        <h2 className='mb-3 text-center text-3xl font-bold'>Login</h2>
        <form onSubmit={handleSubmit}>
          {acsUrl ? null : (
            <div>
              <div className='mt-5'>
                <label htmlFor='acsUrl' className='mb-2 block'>
                  ACS URL <sup>(This is where we'll post the SAML Response)</sup>
                </label>
                <input
                  name='acsUrl'
                  id='acsUrl'
                  ref={acsUrlInp}
                  autoComplete='off'
                  type='text'
                  placeholder='https://jackson-demo.boxyhq.com/api/oauth/saml'
                  value={state.acsUrl}
                  onChange={handleChange}
                  className='input w-full'
                />
              </div>
              <div className='mt-5'>
                <label htmlFor='audience' className='mb-2 block'>
                  Audience
                </label>
                <input
                  name='audience'
                  id='audience'
                  autoComplete='off'
                  type='text'
                  placeholder='https://saml.boxyhq.com'
                  value={state.audience}
                  onChange={handleChange}
                  className='input w-full'
                />
              </div>
            </div>
          )}
          <div className='mt-5 flex items-end gap-x-1'>
            <div>
              <label htmlFor='username' className='mb-2 block'>
                Email
              </label>
              <input
                name='username'
                id='username'
                ref={emailInp}
                autoComplete='off'
                type='text'
                placeholder='jackson'
                value={state.username}
                onChange={handleChange}
                className='input'
                title='Please provide a mock email address'
              />
            </div>
            <select
              name='domain'
              id='domain'
              className='select w-full'
              onChange={handleChange}
              value={state.domain}>
              <option value='example.com'>@example.com</option>
              <option value='example.org'>@example.org</option>
            </select>
          </div>
          <div className='mt-5'>
            <label htmlFor='password' className='mb-2 block'>
              Password <sup>(Any password works)</sup>
            </label>
            <input
              id='password'
              autoComplete='off'
              type='password'
              defaultValue='samlstrongpassword'
              className='input w-full'
            />
          </div>
          <button type='submit' className='button mt-8 w-full'>
            Sign In
          </button>
        </form>
      </div>
      <div className='relative top-20 mx-auto w-[800px] max-w-[90%] rounded-md p-10 text-[#145698]'>
        This is a simulated login screen, feel free to pick any username but you are restricted to two domains
        example.com and example.org. But this should allow you to test all combinations of your authentication
        and user modelling.
      </div>
    </div>
  );
}
