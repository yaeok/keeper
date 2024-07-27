import React from 'react'
import { startOfWeek, endOfWeek, eachDayOfInterval, format } from 'date-fns'
import { ja } from 'date-fns/locale'
import { Constants } from '@/utils/constants'

const getCurrentWeek = () => {
  const today = new Date()
  const start = startOfWeek(today, { weekStartsOn: 0 }) // 週の始まりを日曜日に設定
  const end = endOfWeek(today, { weekStartsOn: 0 })
  return eachDayOfInterval({ start, end })
}

const StudySchedule = () => {
  const weekDays = getCurrentWeek()
  const studyHours = [2, 1.5, 0, 3, 2, 1, 2.5] // 仮の学習時間データ

  return (
    <section className='mb-4 p-6 bg-white shadow rounded-sm flex items-center justify-center'>
      <table className='w-full text-center bg-white'>
        <thead>
          <tr>
            {Constants.DAYS_OF_WEEK.map((day, index) => (
              <th key={index} className='py-2 w-24'>
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {weekDays.map((day, index) => (
              <td key={index} className='py-2 w-24'>
                {format(day, 'MM/dd', { locale: ja })}
              </td>
            ))}
          </tr>
          <tr>
            {studyHours.map((hours, index) => (
              <td key={index} className='py-2 w-24'>
                {hours} 時間
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </section>
  )
}

export default StudySchedule
