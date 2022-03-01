export default function Footer() {
  return (
    <footer className='text-gray-600 body-font'>
      <div className='container flex flex-col items-center px-5 py-8 mx-auto sm:flex-row'>
        <a className='flex items-center justify-center font-medium text-gray-900 title-font md:justify-start'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            className='w-10 h-10 p-2 text-white bg-indigo-500 rounded-full'
            viewBox='0 0 24 24'>
            <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
          </svg>
          <span className='ml-3 text-xl'>Mock SAML</span>
        </a>
        <p className='mt-4 text-sm text-gray-500 sm:ml-4 sm:mt-0 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:pl-4'>
          Powered by
          <a
            href='https://boxyhq.com/'
            className='ml-1 text-gray-600'
            rel='noopener noreferrer'
            target='_blank'>
            <strong>BoxyHQ</strong>
          </a>
        </p>
        <span className='inline-flex justify-center mt-4 sm:ml-auto sm:mt-0 sm:justify-start'>
          <a className='ml-3 text-gray-500'>
            <svg
              fill='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              className='w-5 h-5'
              viewBox='0 0 24 24'>
              <path d='M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' />
            </svg>
          </a>
        </span>
      </div>
    </footer>
  );
}
