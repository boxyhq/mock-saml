import Link from 'next/link';

export default function Header() {
  return (
    <header className='body-font text-gray-600'>
      <div className='container mx-auto flex flex-col flex-wrap items-center p-5 md:flex-row'>
        <Link href='/'>
          <a className='title-font flex items-center font-medium text-gray-900 md:mb-0'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              className='h-10 w-10 rounded-full bg-indigo-500 p-2 text-white'
              viewBox='0 0 24 24'>
              <path d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' />
            </svg>
            <span className='ml-3 text-2xl'>Mock SAML</span>
          </a>
        </Link>
        <nav className='mt-2 flex flex-col flex-wrap items-center text-base md:ml-auto md:mt-0 md:items-end'>
          <span className='ml-2 text-sm text-gray-500 '>
            Made with <span className='text-[#e25555]'>&#9829;</span>
            <a
              href='https://boxyhq.com/'
              className='ml-1 text-gray-600'
              rel='noopener noreferrer'
              target='_blank'>
              <strong>BoxyHQ</strong>
            </a>
          </span>
          <a
            className='leading-5 underline hover:text-gray-900'
            href='https://github.com/boxyhq/jackson'
            rel='noopener noreferrer'
            target='_blank'>
            Integrate SAML with a few lines of code
          </a>
        </nav>
      </div>
    </header>
  );
}
