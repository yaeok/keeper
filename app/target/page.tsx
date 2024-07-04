'use client'

import { useRouter } from 'next/navigation'

import Calendar from '@/components/target/Calendar'
import Header from '@/components/target/Header'
import StudySchedule from '@/components/target/StudySchedule'
import UserInfo from '@/components/target/UserInfo'

const TargetView: React.FC = () => {
  const router = useRouter()

  const handleSignupClick = () => {
    router.push('/target/register')
  }
  return (
    <main className='flex flex-col items-center justify-center mt-20 w-screen bg-gray-50'>
      <Header />
      <div className='flex flex-col w-2/3 mx-auto my-12 items-center'>
        <button
          className='bg-blue-500 text-white font-bold py-4 px-6 rounded'
          onClick={handleSignupClick}
        >
          新しく目標をたてる
        </button>
        <div className='flex flex-row mx-auto py-12'>
          <div className='w-3/4 p-4'>
            <UserInfo />
            <h2 className='text-xl my-6'>挑戦中の目標</h2>
            <section className='mb-4 p-8 bg-white shadow rounded-sm'>
              <p>挑戦中の目標をここに表示</p>
            </section>
            <h2 className='text-xl my-6'>今週の学習状況</h2>
            <StudySchedule />
            <h2 className='text-xl my-6'>これまでの目標実績</h2>
            <section className='mb-4 p-8 bg-white shadow rounded-sm'>
              <p>挑戦中の目標をここに表示</p>
            </section>
          </div>
          <div className='w-1/4 p-4'>
            <Calendar />
          </div>
        </div>
      </div>
    </main>
  )
}

export default TargetView
