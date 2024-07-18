'use client'

import { useRouter } from 'next/navigation'

import Calendar from '@/components/target/Calendar'
import Header from '@/components/target/Header'
import StudySchedule from '@/components/target/StudySchedule'
import TargetList from '@/components/target/TargetList'
import UserInfo from '@/components/target/UserInfo'
import { Target } from '@/domain/entity/target_entity'

const TargetView: React.FC = () => {
  const router = useRouter()

  const targets: Target[] = [
    {
      targetId: '1',
      target: 'AWS資格取得A',
      studyDays: [1, 2, 3, 4, 5], // 平日
      studyHoursPerDay: 2,
      startDate: '2024-07-16',
      endDate: '2024-09-16',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      targetId: '2',
      target: 'AWS資格取得B',
      studyDays: [1, 2, 3], // 平日
      studyHoursPerDay: 2,
      startDate: '2024-07-16',
      endDate: '2024-09-16',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ]

  const handleSignupClick = () => {
    router.push('/target/register')
  }
  return (
    <main className='flex flex-col items-center justify-center mt-20 w-screen bg-gray-50'>
      <Header />
      <div className='flex flex-col w-3/4 mx-auto mt-12 items-center'>
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
            <TargetList targets={targets} />
            <h2 className='text-xl my-6'>学習状況</h2>
            <StudySchedule />
            <h2 className='text-xl my-6'>今週の学習時間</h2>
            <StudySchedule />
            <h2 className='text-xl my-6'>これまでの実績</h2>
            <section className='mb-4 p-8 bg-white shadow rounded-sm'>
              <p>挑戦履歴をここに表示</p>
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
