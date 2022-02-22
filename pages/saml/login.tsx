import Head from 'next/head';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/router';

export default function Login() {
  const router = useRouter();
  const { id, audience, acsUrl, providerName, relayState } = router.query;
  const [email, setEmail] = useState('@example.com');

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
      body: JSON.stringify({ email, id, audience, acsUrl, providerName, relayState }),
    });
    if (response.ok) {
      document.write(await response.text());
    } else {
      document.write('Error in getting SAML response');
    }
  };

  return (
    <div className='h-full'>
      <Head>
        <title>Mock SAML IdP - Login</title>
      </Head>
      <div className='w-[465px] max-w-[90%] mx-auto relative top-20 bg-blue-50 p-10 rounded-xl shadow-md shadow-blueGray-50 text-[#145698]'>
        <h2 className='text-3xl font-bold text-center mb-3'>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor='email' className='block mb-2'>
              Email
            </label>
            <input
              id='email'
              autoComplete='off'
              type='email'
              placeholder='username@example.com'
              value={email}
              onChange={handleChange}
              pattern='.+@example\.com'
              className='w-full input'
              title='please provide a mock example.com email address'
            />
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
