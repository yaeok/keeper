import React from 'react'

import { Actual } from '@/domain/entity/actual_entity'
import { Target } from '@/domain/entity/target_entity'

interface GoalSummaryProps {
  target: Target
  actuals: Actual[]
}

const GoalSummary: React.FC<GoalSummaryProps> = (props: GoalSummaryProps) => {
  // 合計勉強時間を計算（目標期間）
  const calculateTotalHours = (target: Target): number => {
    if (!target.startDate || !target.endDate) return 0
    const daysPerWeek = target.studyDays ? target.studyDays.length : 0
    const totalDays = Math.floor(
      (new Date(target.endDate).getTime() -
        new Date(target.startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    )
    // 小数点を切り捨てて返す
    return Math.floor(daysPerWeek * target.studyHoursPerDay * (totalDays / 7))
  }

  const progress = Math.round(
    (props.actuals.reduce((acc, actual) => acc + actual.studyHours, 0) /
      calculateTotalHours(props.target)) *
      100
  )
  return (
    <div className='mt-2 bg-white shadow-md py-6 px-4'>
      <div className='flex justify-between'>
        <span>進捗: {progress}%</span>
        <span>取得予定日: {props.target.endDate}</span>
      </div>
      <div className='w-full bg-gray-200 rounded-full h-4 mt-2'>
        <div
          className='bg-indigo-600 h-4 rounded-full'
          style={{ width: `${progress > 101 ? 100 : progress}%` }}
        ></div>
      </div>
      <div className='mt-2'>
        合計学習時間: {calculateTotalHours(props.target)}
        時間
      </div>
    </div>
  )
}

export default GoalSummary
