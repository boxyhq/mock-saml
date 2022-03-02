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
  });

  // Set focus to email input on load
  const emailInp = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (emailInp.current) {
      emailInp.current.focus();
      emailInp.current.select();
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
        audience,
        acsUrl,
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
        <title>Mock SAML IdP - Login</title>
      </Head>
      <div className='relative top-20 mx-auto w-[465px] max-w-[90%] rounded-md border p-10 text-[#145698]'>
        <h2 className='mb-3 text-3xl font-bold text-center'>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className='flex items-end gap-x-1'>
            <div>
              <label htmlFor='username' className='block mb-2'>
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
                title='please provide a mock example.com email address'
              />
            </div>
            <select
              name='domain'
              id='domain'
              className='w-full select'
              onChange={handleChange}
              value={state.domain}>
              <option value='example.com'>@example.com</option>
              <option value='example.org'>@example.org</option>
            </select>
          </div>
          <div className='mt-5'>
            <label htmlFor='password' className='block mb-2'>
              Password <sup>(Prefilled for you)</sup>
            </label>
            <input
              id='password'
              readOnly={true}
              autoComplete='off'
              type='password'
              defaultValue='samlstrongpassword'
              className='w-full input'
            />
          </div>
          <button type='submit' className='w-full mt-8 button'>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
