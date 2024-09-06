import NextLink from 'next/link'

const Header: React.FC = () => {
  return (
    <header className='w-full bg-indigo-800 text-white p-6 flex justify-between items-center fixed top-0 z-50'>
      <h1 className='text-2xl font-bold'>KeePer</h1>
      <nav>
        <ul className='flex space-x-4 px-4'>
          <li>
            <NextLink href='#features'>
              <p className='font-bold hover:text-gray-300'>サービス概要</p>
            </NextLink>
          </li>
          <li>
            <NextLink href='#testimonials'>
              <p className='font-bold hover:text-gray-300'>利用者の声</p>
            </NextLink>
          </li>
          <li>
            <NextLink href='#signup'>
              <p className='font-bold hover:text-gray-300'>新規登録</p>
            </NextLink>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
