'use client'

import NextLink from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'

import Loading from '@/components/utils/Loading'
import Modal from '@/components/utils/modal/Modal'
import { IAuthRepository } from '@/feature/infrastructure/repository/auth_repository'
import { ConfirmEmailVerifyedUseCase } from '@/use_case/confirm_email_verifyed_use_case/confirm_email_verifyed_use_case'
import { SendEmailVerificationUseCase } from '@/use_case/send_email_verification_use_case/send_email_verification_use_case'

interface EmailVerifyedFormInputs {
  email: string
}

const EmailVerifyedPage: React.FC = () => {
  const { handleSubmit } = useForm<EmailVerifyedFormInputs>()
  const [isOpen, setIsOpen] = React.useState(false)
  const [message, setMessage] = React.useState<String>('')
  const [loading, setLoading] = React.useState<boolean>(true)

  React.useEffect(() => {
    const checkEmailVerified = async () => {
      try {
        const authRepository = new IAuthRepository()
        const response = await new ConfirmEmailVerifyedUseCase({
          authRepository: authRepository,
        }).execute()
        if (response.user.emailVerified == true) {
          setIsOpen(true)
          setMessage('既にメール認証が完了しています')
        }
      } catch (error: any) {
        setIsOpen(true)
        if (error instanceof Error) {
          setMessage(error.message)
        } else {
          setMessage('エラーが発生しました')
        }
      } finally {
        setLoading(false)
      }
    }
    checkEmailVerified()
  }, [])

  const onSubmit = async () => {
    try {
      const authRepository = new IAuthRepository()
      const response = await new SendEmailVerificationUseCase({
        authRepository: authRepository,
      }).execute()
      if (response.result) {
        setIsOpen(true)
        setMessage('確認メールを送信しました')
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
  return loading ? (
    <Loading />
  ) : (
    <div className='min-h-screen w-screen flex items-center justify-center bg-gray-100'>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={message}
      />
      <div className='lg:w-1/4 bg-white px-6 py-4 rounded shadow-md max-w-md lg:mx-auto space-y-4'>
        <h1 className='text-2xl font-bold text-center'>メール確認画面</h1>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
          <button
            type='submit'
            className='w-full text-white font-bold py-2 rounded-sm bg-indigo-500 hover:bg-indigo-600'
          >
            確認メールを再送信
          </button>
          <div className='text-center'>
            <NextLink href='/sign_in'>
              <p className='text-blue-500 hover:underline'>
                ログイン画面へ戻る
              </p>
            </NextLink>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EmailVerifyedPage
