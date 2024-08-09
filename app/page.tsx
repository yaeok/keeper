import Head from 'next/head'
import Image from 'next/image'

import Features from '@/components/home/Feature'
import Header from '@/components/home/Header'
import Signup from '@/components/home/SignUp'
import SignUpButton from '@/components/home/SignUpButton'
import Testimonials from '@/components/home/Testimonials'

const LandingPage: React.FC = () => {
  return (
    <div className='w-screen'>
      <Head>
        <title>KeePer - 資格取得のモチベーション維持</title>
        <meta
          name='description'
          content='KeePerは、資格取得のモチベーションを維持するためのサービスです。'
        />
      </Head>

      <Header />

      <main className='flex flex-col items-center justify-center min-h-screen py-8 mt-16'>
        <section className='text-4xl font-bold text-center text-black my-10'>
          <p>KeePerへようこそ！</p>
          <br />
          <p>モチベーションを高め、目標達成しよう！</p>
        </section>

        <p className='text-center text-lg text-black my-4'>
          資格取得や個人開発のモチベーションを維持し、目標達成をサポートします。
        </p>

        <SignUpButton title='登録してはじめる'></SignUpButton>

        <div className='flex flex-wrap items-center justify-around max-w-4xl mt-10'>
          <a
            href='#features'
            className='w-80 p-6 m-4 text-left border border-white rounded-xl hover:text-primary-dark hover:border-primary-dark bg-white shadow-lg'
          >
            <h2 className='text-2xl font-bold text-primary'>
              サービス概要 &rarr;
            </h2>
            <p className='mt-4 text-primary'>
              KeePerの機能や特徴をご紹介します。
            </p>
          </a>

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

      <footer className='flex items-center justify-center w-full h-16 border-t  text-black'>
        <a
          className='flex items-center justify-center'
          href='https://yourcompany.com'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <span className='h-4 ml-2'>
            <Image src='/vercel.svg' alt='Vercel Logo' width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}

export default LandingPage
