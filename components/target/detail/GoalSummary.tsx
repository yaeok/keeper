import React from 'react'

import { Actual } from '@/domain/entity/actual_entity'
import { Target } from '@/domain/entity/target_entity'
import Skeleton from '@/components/utils/skelton'

interface GoalSummaryProps {
  target: Target
  actuals: Actual[]
}

const GoalSummary: React.FC<GoalSummaryProps> = (props: GoalSummaryProps) => {
  const progress = Math.round(
    (props.actuals.reduce((acc, actual) => acc + actual.studyHours, 0) /
      (props.target.studyHoursPerDay * props.target.studyDays.length)) *
      100
  )
  return (
    <div>
      <div className='mt-2 bg-white shadow-md py-6 px-4'>
        <div className='flex justify-between'>
          <span>進捗: {progress}%</span>
          <span>取得予定日: {props.target.endDate}</span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-4 mt-2'>
          <div
            className='bg-blue-600 h-4 rounded-full'
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className='mt-2'>
          合計学習時間:{' '}
          {props.target.studyHoursPerDay * props.target.studyDays.length}
          時間
        </div>
      </div>
    </div>
  )
}

export default GoalSummary
