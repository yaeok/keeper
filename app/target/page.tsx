'use client'

import { useRouter } from 'next/navigation'

import Calendar from '@/components/target/Calendar'
import Header from '@/components/target/Header'
import StudySchedule from '@/components/target/StudySchedule'
import TargetList from '@/components/target/TargetList'
import UserInfo from '@/components/target/UserInfo'
import { Target } from '@/domain/entity/target_entity'
import { TargetStatus } from '@/utils/target_status'

const TargetView: React.FC = () => {
  const router = useRouter()

  const targets: Target[] = [
    {
      targetId: '1',
      target: 'AWS資格取得A',
      studyDays: [1, 2, 3, 4, 5], // 平日
      studyHoursPerDay: 2,
      status: TargetStatus.ACTIVE,
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
      status: TargetStatus.ACTIVE,
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
    <main className='w-screen bg-gray-50'>
      <Header />
      <div className='flex flex-col mt-20 items-center'>
        <button
          className='bg-blue-500 text-white font-bold py-4 px-6 mt-12 rounded w-1/3'
          onClick={handleSignupClick}
        >
          新しく目標をたてる
        </button>
        <div className='flex flex-row my-12 space-x-2 w-3/4 justify-center'>
          <div className='w-3/4 p-4'>
            <UserInfo />
            <h2 className='text-xl my-6'>挑戦中の目標</h2>
            <TargetList targets={targets} />
            <h2 className='text-xl my-6'>学習状況</h2>
            <StudySchedule />
            <h2 className='text-xl my-6'>今週の学習時間</h2>
            <StudySchedule />
            <h2 className='text-xl my-6'>達成実績</h2>
            <TargetList targets={targets} />
          </div>
          <div className='w-1/4'>
            <Calendar />
          </div>
        </div>
      </div>
    </main>
  )
}

export default TargetView
