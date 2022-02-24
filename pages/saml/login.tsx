import Head from 'next/head';
import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const { id, audience, acsUrl, providerName, relayState } = router.query;
  const [email, setEmail] = useState('jackson');

  // Set focus to email input on load
  const emailInp = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (emailInp.current) {
      emailInp.current.focus();
      emailInp.current.select();
    }
  }, []);

  const handleChange = (e: FormEvent<HTMLInputElement>): void => {
    setEmail(e.currentTarget.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(`/api/saml/auth`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: `${email}@example.com`, id, audience, acsUrl, providerName, relayState }),
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
      <div className='w-[465px] max-w-[90%] mx-auto relative top-20  p-10 rounded-xl shadow-lg shadow-blue-50 text-[#145698]'>
        <h2 className='text-3xl font-bold text-center mb-3'>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email' className='block mb-2'>
              Email
            </label>
            <input
              id='email'
              ref={emailInp}
              autoComplete='off'
              type='text'
              placeholder='jackson'
              value={email}
              onChange={handleChange}
              className='w-[65%] input'
              title='please provide a mock example.com email address'
            />
            <span className='ml-2 w-1/4'>@example.com</span>
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
          <button type='submit' className='button mt-8 w-full'>
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
