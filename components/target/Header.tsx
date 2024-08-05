import NextLink from 'next/link'

import { IAuthRepository } from '@/feature/infrastructure/repository/auth_repository'
import { SignOutUseCase } from '@/use_case/sign_out_use_case/sign_out_use_case'

const Header = () => {
  const logout = async () => {
    const authRepository = new IAuthRepository()
    const response = await new SignOutUseCase({
      authRepository: authRepository,
    }).execute()
    if (response.result) {
      window.location.href = '/sign_in'
    }
  }
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
          <li>
            <button onClick={logout}>ログアウト</button>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header
