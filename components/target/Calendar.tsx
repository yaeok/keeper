import { Constants } from '@/utils/constants'
import { eachDayOfInterval, endOfMonth, startOfMonth, format } from 'date-fns'
import React from 'react'
import { Actual } from '@/domain/entity/actual_entity'
import Skeleton from '../utils/Skelton'

interface CalendarProps {
  actuals: Actual[]
  loading: boolean
}

const Calendar: React.FC<CalendarProps> = (props: CalendarProps) => {
  const currentMonth = new Date()
  const start = startOfMonth(currentMonth)
  const end = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start, end })

  // 最初の週の空白の日数を計算
  const firstDayOfWeek = start.getDay()
  const leadingDays = Array(firstDayOfWeek).fill(null)

  const calendarDays = [...leadingDays, ...days]

  // 日付をキーとして実績データをマップする
  const actualsMap = props.actuals.reduce((map, actual) => {
    console.log(actual.studyDate)
    const date = format(actual.studyDate, 'yyyy-MM-dd')
    map[date] = actual
    return map
  }, {} as Record<string, Actual>)

  const getBgColorForDay = (day: Date) => {
    const dateKey = format(day, 'yyyy-MM-dd')
    return actualsMap[dateKey] ? 'bg-green-300' : 'bg-gray-300'
  }

  return (
    <div className=''>
      <h2 className='text-xl mb-4 w-full'>学習カレンダー</h2>
      {props.loading ? (
        <>
          <Skeleton className='h-32 w-full' />
        </>
      ) : (
        <table className='w-full text-center'>
          <thead>
            <tr>
              {Constants.DAYS_OF_WEEK.map((day) => (
                <th key={day} className='py-2 justify-center'>
                  <p className='font-mono'>{day}</p>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: Math.ceil(calendarDays.length / 7) }).map(
              (_, weekIndex) => (
                <tr key={weekIndex}>
                  {calendarDays
                    .slice(weekIndex * 7, weekIndex * 7 + 7)
                    .map((day, dayIndex) => (
                      <td key={dayIndex} className='justify-center'>
                        <div
                          className={`aspect-square w-full flex items-center justify-center ${
                            day ? getBgColorForDay(day) : ''
                          } rounded`}
                        ></div>
                      </td>
                    ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Calendar
