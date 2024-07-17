// components/GoalSummary.tsx
import { Target } from '@/app/target/props/target'
import React from 'react'

interface GoalSummaryProps {
  target: Target
  progress: number // 0 to 100
}

const GoalSummary: React.FC<GoalSummaryProps> = ({ target, progress }) => {
  return (
    <section className='mt-4'>
      <h2 className='text-xl font-bold'>全体進捗</h2>
      <div className='mt-2 bg-white shadow-md p-4'>
        <div className='flex justify-between'>
          <span>進捗: {progress}%</span>
          <span>取得予定日: {target.endDate}</span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-4 mt-2'>
          <div
            className='bg-blue-600 h-4 rounded-full'
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className='mt-2'>
          合計学習時間: {target.studyHoursPerDay * target.studyDays.length}時間
        </div>
      </div>
    </section>
  )
}

export default GoalSummary
