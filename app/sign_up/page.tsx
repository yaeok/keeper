'use client'

import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { SubmitHandler, useForm } from 'react-hook-form'

import { IAuthRepository } from '@/feature/infrastructure/repository/auth_repository'
import { IUserRepository } from '@/feature/infrastructure/repository/user_repository'
import { SignUpWithEmailUseCase } from '@/use_case/sign_up_with_email_use_case/sign_up_with_email_use_case'
import Modal from '@/components/utils/modal/Modal'
import React from 'react'

interface SignUpFormInputs {
  username: string
  email: string
  password: string
}

const SignUpView: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>()
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)

  const onSubmit: SubmitHandler<SignUpFormInputs> = async (data) => {
    const authRepository = new IAuthRepository()
    const userRepository = new IUserRepository()
    try {
      const result = await new SignUpWithEmailUseCase({
        authRepository: authRepository,
        userRepository: userRepository,
      }).execute({
        username: data.username,
        email: data.email,
        password: data.password,
      })
      if (result != null) {
        router.push('/target')
      }
    } catch (e) {
      if (e instanceof String) {
        return (
          <Modal isOpen={true} onClose={() => setIsOpen(false)} message={e} />
        )
      } else {
        return (
          <Modal
            isOpen={true}
            onClose={() => setIsOpen(false)}
            message='エラーが発生しました'
          />
        )
      }
    }
  }

  return (
    <div className='min-h-screen w-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold mb-6 text-center'>新規登録画面</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <div>
            <label className='block text-gray-700'>Username</label>
            <input
              type='text'
              {...register('username', {
                required: 'ユーザー名を入力してください',
                maxLength: {
                  value: 50,
                  message: 'ユーザー名は50文字以内で入力してください',
                },
              })}
              className='mt-1 block w-full px-4 py-2 border rounded-sm shadow-sm focus:ring focus:ring-opacity-50'
              placeholder='Enter your username'
            />
            {errors.username && (
              <p className='text-red-500 mt-1'>{errors.username.message}</p>
            )}
          </div>
          <div>
            <label className='block text-gray-700'>Email</label>
            <input
              type='email'
              {...register('email', {
                required: 'メールアドレスを入力してください',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: '有効なメールアドレスを入力してください',
                },
                maxLength: {
                  value: 50,
                  message: 'メールアドレスは50文字以内で入力してください',
                },
              })}
              className='mt-1 block w-full px-4 py-2 border rounded-sm shadow-sm focus:ring focus:ring-opacity-50'
              placeholder='Enter your email'
            />
            {errors.email && (
              <p className='text-red-500 mt-1'>{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className='block text-gray-700'>Password</label>
            <input
              type='password'
              {...register('password', {
                required: 'パスワードを入力してください',
                minLength: {
                  value: 8,
                  message: 'パスワードは8文字以上で入力してください',
                },
                maxLength: {
                  value: 50,
                  message: 'パスワードは50文字以下で入力してください',
                },
                validate: {
                  combination: (value) =>
                    /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/.test(value) ||
                    'パスワードは英数字の組み合わせかつ大文字を含めてください',
                },
              })}
              className='mt-1 block w-full px-4 py-2 border rounded-sm shadow-sm focus:ring focus:ring-opacity-50'
              placeholder='Enter your password'
            />
            {errors.password && (
              <p className='text-red-500 mt-1'>{errors.password.message}</p>
            )}
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
