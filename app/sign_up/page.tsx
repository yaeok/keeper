'use client'

import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { SignUpWithEmailUseCase } from '@/use_case/sign_up/sign_up_with_email_use_case'
import { IAuthRepository } from '@/feature/infrastructure/repository/auth_repository'
import { IUserRepository } from '@/feature/infrastructure/repository/user_repository'

const SignUpView = () => {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const authRepository = new IAuthRepository()
    const userRepository = new IUserRepository()
    try {
      const result = await new SignUpWithEmailUseCase({
        authRepository: authRepository,
        userRepository: userRepository,
      }).execute({
        username,
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
      setUsername('')
      setEmail('')
      setPassword('')
    }
  }

  return (
    <div className='min-h-screen w-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>新規登録画面</h1>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-gray-700'>Username</label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='mt-1 block w-full px-4 py-2 border rounded-sm shadow-sm focus:ring focus:ring-opacity-50'
              placeholder='Enter your username'
            />
          </div>
          <div>
            <label className='block text-gray-700'>Email</label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='mt-1 block w-full px-4 py-2 border rounded-sm shadow-sm focus:ring focus:ring-opacity-50'
              placeholder='Enter your email'
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
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 rounded-sm hover:bg-blue-600 transition duration-300'
          >
            新規登録
          </button>
          <div className='mt-6 text-center'>
            <NextLink href='/sign_in'>
              <p className='text-blue-500 hover:underline'>
                アカウントをお持ちの方はこちらから
              </p>
            </NextLink>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUpView
