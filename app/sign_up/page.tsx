'use client'

import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Modal from '@/components/utils/modal/Modal'
import { IAuthRepository } from '@/feature/infrastructure/repository/auth_repository'
import { IUserRepository } from '@/feature/infrastructure/repository/user_repository'
import { RegisterUserUseCase } from '@/use_case/sign_up_with_email_use_case/register_user_use_case/register_user_use_case'
import { SendEmailVerificationUseCase } from '@/use_case/sign_up_with_email_use_case/send_email_verification_use_case/send_email_verification_use_case'
import { SignUpUseCase } from '@/use_case/sign_up_with_email_use_case/sign_up_use_case/sign_up_use_case'
import { SignUpWithEmailUseCase } from '@/use_case/sign_up_with_email_use_case/sign_up_with_email_use_case'

interface SignUpWithEmailFormInputs {
  username: string
  email: string
  password: string
}

const SignUpWithEmailPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpWithEmailFormInputs>()
  const router = useRouter()
  const [isOpen, setIsOpen] = React.useState(false)
  const [message, setMessage] = React.useState<String>('')

  const onSubmit: SubmitHandler<SignUpWithEmailFormInputs> = async (data) => {
    const authRepository = new IAuthRepository()
    const userRepository = new IUserRepository()

    const signUpUseCase = new SignUpUseCase({
      authRepository: authRepository,
    })
    const registerUserUseCase = new RegisterUserUseCase({
      userRepository: userRepository,
    })
    const sendEmailVerificationUseCase = new SendEmailVerificationUseCase({
      authRepository: authRepository,
    })
    try {
      const result = await new SignUpWithEmailUseCase({
        signUpUseCase: signUpUseCase,
        registerUserUseCase: registerUserUseCase,
        sendEmailVerificationUseCase: sendEmailVerificationUseCase,
      }).execute({
        username: data.username,
        email: data.email,
        password: data.password,
      })
      if (result != null) {
        router.push('/target')
      }
    } catch (e: any) {
      setIsOpen(true)
      if (e instanceof Error) {
        setMessage(e.message)
      } else {
        setMessage('エラーが発生しました')
      }
    }
  }

  return (
    <div className='min-h-screen w-screen flex items-center justify-center bg-gray-100'>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={message}
      />
      <div className='lg:w-1/4 bg-white px-6 py-4 rounded shadow-md max-w-md lg:mx-auto space-y-4'>
        <h1 className='text-2xl font-bold text-center'>新規登録画面</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
          <section className='space-y-2'>
            <section>
              <label className='block text-gray-700'>ユーザ名</label>
              <input
                type='text'
                {...register('username', {
                  required: 'ユーザ名を入力してください',
                  maxLength: {
                    value: 50,
                    message: '50文字以内で入力してください',
                  },
                })}
                className='mt-1 block w-full px-2 py-2 border rounded-sm shadow-sm'
              />
              {errors.username && (
                <p className='text-sm text-red-500 mt-1 mx-2'>
                  {errors.username.message}
                </p>
              )}
            </section>
            <section>
              <label className='block text-gray-700'>メールアドレス</label>
              <input
                type='text'
                {...register('email', {
                  required: 'メールアドレスを入力してください',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: '有効なメールアドレスを入力してください',
                  },
                  maxLength: {
                    value: 50,
                    message: '50文字以内で入力してください',
                  },
                })}
                className='mt-1 block w-full px-2 py-2 border rounded-sm shadow-sm'
              />
              {errors.email && (
                <p className='text-sm text-red-500 mt-1 mx-2'>
                  {errors.email.message}
                </p>
              )}
            </section>
            <section>
              <label className='block text-gray-700'>パスワード</label>
              <input
                type='password'
                {...register('password', {
                  required: 'パスワードを入力してください',
                  minLength: {
                    value: 8,
                    message: '8文字以上で入力してください',
                  },
                  maxLength: {
                    value: 50,
                    message: '50文字以内で入力してください',
                  },
                  validate: {
                    combination: (value) =>
                      /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]+$/.test(value) ||
                      '英数字と1文字以上の大文字を含めてください',
                  },
                })}
                className='mt-1 block w-full px-2 py-2 border rounded-sm shadow-sm'
              />
              {errors.password && (
                <p className='text-sm text-red-500 mt-1 mx-2'>
                  {errors.password.message}
                </p>
              )}
            </section>
          </section>
          <section className='space-y-4'>
            <button
              type='submit'
              className='w-full text-white font-bold py-2 rounded-sm bg-indigo-500 hover:bg-indigo-600'
            >
              新規登録
            </button>
            <div className='text-center'>
              <NextLink href='/sign_in'>
                <p className='text-indigo-500 hover:underline'>
                  アカウントをお持ちの方はこちらから
                </p>
              </NextLink>
            </div>
          </section>
        </form>
      </div>
    </div>
  )
}

export default SignUpWithEmailPage
