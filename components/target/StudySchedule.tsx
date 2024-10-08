import { eachDayOfInterval, endOfWeek, format, startOfWeek } from 'date-fns'
import { ja } from 'date-fns/locale'
import React from 'react'

import { Actual } from '@/domain/entity/actual_entity'
import { Constants } from '@/utils/constants'

interface StudyScheduleProps {
  actuals: Actual[]
}

const getCurrentWeek = () => {
  const today = new Date()
  const start = startOfWeek(today, { weekStartsOn: 0 }) // 日本では週の始まりを月曜日に設定
  const end = endOfWeek(today, { weekStartsOn: 0 })
  return eachDayOfInterval({ start, end })
}

const StudySchedule: React.FC<StudyScheduleProps> = ({ actuals }) => {
  const weekDays = getCurrentWeek()

  // 日付ごとの学習時間を計算
  const dailyHours = weekDays.map((day) => {
    const dayStr = format(day, 'yyyy-MM-dd')
    const totalHours = actuals
      .filter((actual) => format(actual.studyDate, 'yyyy-MM-dd') === dayStr)
      .reduce((sum, current) => sum + current.studyHours, 0)
    return totalHours
  })

  return (
    <section className='p-6 bg-white shadow-md rounded-sm flex items-center justify-center'>
      <table className='w-full text-center bg-white'>
        <thead>
          <tr>
            {Constants.DAYS_OF_WEEK.map((day, index) => (
              <th key={index} className='py-2'>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {weekDays.map((day, index) => (
              <td key={index} className='py-2'>
                {format(day, 'MM/dd', { locale: ja })}
              </td>
            ))}
          </tr>
          <tr>
            {dailyHours.map((hours, index) => (
              <td key={index} className='py-2'>
                {hours}h
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </section>
  )
}

export default StudySchedule
