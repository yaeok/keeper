'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import Calendar from '@/components/target/Calendar'
import Header from '@/components/target/Header'
import StudySchedule from '@/components/target/StudySchedule'
import TargetList from '@/components/target/TargetList'
import UserInfo from '@/components/target/UserInfo'
import { Target } from '@/domain/entity/target_entity'
import { ITargetRepository } from '@/feature/infrastructure/repository/target_repository'
import { GetRecentThreeActiveTargetsUseCase } from '@/use_case/get_recent_three_active_targets_use_case/get_recent_three_active_targets_use_case'
import { GetRecentThreeCompletedTargetsUseCase } from '@/use_case/get_recent_three_completed_targets_use_case/get_recent_three_completed_targets_use_case'
import { Actual } from '@/domain/entity/actual_entity'
import { IActualRepository } from '@/feature/infrastructure/repository/actual_repository'
import { GetActualsByUserIdForMonthlyUseCase } from '@/use_case/get_actuals_by_user_id_for_monthly_use_case/get_actuals_by_user_id_for_monthly_use_case'

const TargetView: React.FC = () => {
  const router = useRouter()
  const [loading, setLoading] = React.useState<boolean>(true)
  const [activeTargets, setActiveTargets] = React.useState<Target[]>([])
  const [completedTargets, setCompletedTargets] = React.useState<Target[]>([])
  const [actuals, setActuals] = React.useState<Actual[]>([])

  React.useEffect(() => {
    const fetchActiveTargets = async () => {
      const targetRepository = new ITargetRepository()
      // ステータスがactiveの目標を取得
      const activeResult = await new GetRecentThreeActiveTargetsUseCase({
        targetRepository: targetRepository,
      }).execute()
      setActiveTargets(activeResult.targets)
    }

    const fetchCompletedTargets = async () => {
      const targetRepository = new ITargetRepository()
      // ステータスがcompletedの目標を取得
      const completedResult = await new GetRecentThreeCompletedTargetsUseCase({
        targetRepository: targetRepository,
      }).execute()
      setCompletedTargets(completedResult.targets)
    }

    const fetchActuals = async () => {
      const actualRepository = new IActualRepository()
      const actuals = await new GetActualsByUserIdForMonthlyUseCase({
        actualRepository: actualRepository,
      }).execute()
      setActuals(actuals.actuals)
    }

    const fetchData = async () => {
      await fetchActiveTargets()
      await fetchCompletedTargets()
      await fetchActuals()
      setLoading(false)
    }

    fetchData()
  }, [])

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
        <div className='flex flex-row my-12 space-x-2 w-3/5 justify-center'>
          <div className='w-3/4 p-4'>
            <UserInfo />
            <h2 className='text-xl my-6'>挑戦中の目標</h2>
            <TargetList targets={activeTargets} loading={loading} />
            <h2 className='text-xl my-6'>学習状況</h2>
            <StudySchedule />
            <h2 className='text-xl my-6'>今週の学習時間</h2>
            <StudySchedule />
            <h2 className='text-xl my-6'>達成実績</h2>
            <TargetList targets={completedTargets} loading={loading} />
          </div>
          <div className='w-1/4'>
            <Calendar actuals={actuals} loading={loading} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default TargetView
