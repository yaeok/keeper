import NextLink from 'next/link'

const Header = () => {
  return (
    <header className='w-full bg-gray-800 text-white p-6 flex justify-between items-center fixed top-0 z-50'>
      <NextLink href='/target'>
        <h1 className='text-2xl font-bold'>KeePer</h1>
      </NextLink>
      <nav>
        <ul className='flex space-x-4'>
          <li>
            <NextLink href='/target'>
              <p className='hover:text-gray-300'>アカウント情報</p>
            </NextLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
