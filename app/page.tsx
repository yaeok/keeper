import Image from 'next/image'
import NextLink from 'next/link'

import Features from '@/components/home/Feature'
import Header from '@/components/home/Header'
import Signup from '@/components/home/SignUp'
import SignUpButton from '@/components/home/SignUpButton'
import Testimonials from '@/components/home/Testimonials'

const LandingPage: React.FC = () => {
  return (
    <div className='w-screen'>
      <Header />

      <main className='flex flex-col items-center justify-center min-h-screen py-8 mt-16'>
        <section className='flex flex-col space-y-8 items-center my-10'>
          <p className='text-4xl font-bold'>KeePer</p>
          <p className='text-2xl font-semibold'>
            KeePerは、目標に向かってモチベーションを維持するためのサービスです。
          </p>
          <div>
            <p className='text-center text-lg text-black'>
              資格取得や個人開発といった目標に向けて、タスクを細分化し、
            </p>
            <p className='text-center text-lg text-black'>
              達成度を可視化することで、モチベーション管理と目標達成をサポートします。
            </p>
          </div>
        </section>

        <SignUpButton title='登録してはじめる'></SignUpButton>

        <div className='flex flex-wrap items-center justify-around max-w-4xl mt-10'>
          <NextLink
            href='#features'
            className='w-80 p-6 m-4 text-left border border-white rounded-xl hover:text-primary-dark hover:border-primary-dark bg-white shadow-lg'
          >
            <h2 className='text-2xl font-bold text-primary'>
              サービス概要 &rarr;
            </h2>
            <p className='mt-4 text-primary'>
              KeePerの機能や特徴をご紹介します。
            </p>
          </NextLink>

          <a
            href='#testimonials'
            className='w-80 p-6 m-4 text-left border border-white rounded-xl hover:text-primary-dark hover:border-primary-dark bg-white shadow-lg'
          >
            <h2 className='text-2xl font-bold text-primary'>
              利用者の声 &rarr;
            </h2>
            <p className='mt-4 text-primary'>
              KeePerを利用した方々の声をご覧ください。
            </p>
          </a>

          <a
            href='#signup'
            className='w-80 p-6 m-4 text-left border border-white rounded-xl hover:text-primary-dark hover:border-primary-dark bg-white shadow-lg'
          >
            <h2 className='text-2xl font-bold text-primary'>登録 &rarr;</h2>
            <p className='mt-4 text-primary'>
              今すぐ登録して資格取得の旅を始めましょう。
            </p>
          </a>
        </div>

        <Features />
        <Testimonials />
        <Signup />
      </main>

      <footer className='w-full h-16 border-t text-black flex items-center justify-center'>
        <p className='flex items-center justify-center'>Created By</p>
      </footer>
    </div>
  )
}

export default LandingPage
