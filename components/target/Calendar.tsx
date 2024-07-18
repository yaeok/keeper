import { eachDayOfInterval, endOfMonth, startOfMonth } from 'date-fns'
import React from 'react'

const Calendar = () => {
  const currentMonth = new Date()
  const start = startOfMonth(currentMonth)
  const end = endOfMonth(currentMonth)
  const days = eachDayOfInterval({ start, end })

  // 曜日の配列を日曜日から始まるように修正
  const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土']

  // 最初の週の空白の日数を計算
  const firstDayOfWeek = start.getDay()
  const leadingDays = Array(firstDayOfWeek).fill(null)

  const calendarDays = [...leadingDays, ...days]

  return (
    <div className=''>
      <h2 className='text-lg mb-4 w-full'>学習カレンダー</h2>
      <table className='w-full text-center'>
        <thead>
          <tr>
            {daysOfWeek.map((day) => (
              <th key={day} className='py-2 justify-center'>
                {day}
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
                        className={`aspect-square w-fullflex items-center justify-center ${
                          day ? 'bg-gray-300' : ''
                        } rounded`}
                      ></div>
                    </td>
                  ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Calendar
