'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import NextLink from 'next/link'
import { IAuthRepository } from '@/feature/infrastructure/repository/auth_repository'
import { SignInWithEmailUseCase } from '@/use_case/sign_in/sign_in_with_email_use_case'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const authRepository = new IAuthRepository()
    try {
      const result = await new SignInWithEmailUseCase(authRepository).execute({
        email,
        password,
      })
      if (result != null) {
        router.push('/target')
      }
    } catch (e) {
      if (e instanceof String) {
        alert(e)
      } else {
        alert('エラーが発生しました')
      }
    } finally {
      // 初期化
      setEmail('')
      setPassword('')
    }
  }

  return (
    <div className='min-h-screen w-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>ログイン画面</h1>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-gray-700'>Email</label>
            <input
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 block w-full px-4 py-2 border rounded-sm shadow-sm focus:ring focus:ring-opacity-50'
              placeholder='Enter your email'
              required
            />
          </div>
          <div>
            <label className='block text-gray-700'>Password</label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mt-1 block w-full px-4 py-2 border rounded-sm shadow-sm focus:ring focus:ring-opacity-50'
              placeholder='Enter your password'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded-sm hover:bg-blue-600 transition duration-300'
          >
            ログイン
          </button>
          <div className='mt-6 text-center'>
            <NextLink href='/sign_up'>
              <p className='text-blue-500 hover:underline'>
                アカウントをお持ちでない方はこちらから
              </p>
            </NextLink>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
