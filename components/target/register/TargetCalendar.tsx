'use client'

import React from 'react'

import TargetDialog from '@/components/target/register/TargetDialog'

interface CalendarProps {
  initialTarget: Target | null
}

const TargetCalendar: React.FC<CalendarProps> = ({ initialTarget }) => {
  const [currentDate, setCurrentDate] = React.useState(new Date())

  const startOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  )
  const endOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  )
  const [openDialog, setOpenDialog] = React.useState(false)
  const [dialogMessage, setDialogMessage] = React.useState('')

  const generateCalendar = (): Date[][] => {
    const weeks: Date[][] = []
    let days: Date[] = []
    let date = new Date(startOfMonth)
    while (date.getDay() !== 0) {
      date.setDate(date.getDate() - 1)
    }
    while (date <= endOfMonth || days.length % 7 !== 0) {
      days.push(new Date(date))
      if (days.length === 7) {
        weeks.push(days)
        days = []
      }
      date.setDate(date.getDate() + 1)
    }
    return weeks
  }

  const isTargetDay = (date: Date): boolean => {
    if (!initialTarget) return false
    const dayOfWeek = date.getDay()
    const startDate = new Date(initialTarget.startDate)
    const endDate = new Date(initialTarget.endDate)

    return (
      date >= startDate &&
      date <= endDate &&
      initialTarget.studyDays.includes(dayOfWeek)
    )
  }

  const weeks = generateCalendar()

  return (
    <div className='px-2'>
      <div className='flex items-center justify-between mb-4'>
        <button
          className='px-4 py-2 bg-gray-300 rounded text-sm'
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.setMonth(currentDate.getMonth() - 1))
            )
          }
        >
          前月
        </button>
        <span className='text-xl font-normal'>
          {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
        </span>
        <button
          className='px-4 py-2 bg-gray-300 rounded text-sm'
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.setMonth(currentDate.getMonth() + 1))
            )
          }
        >
          次月
        </button>
      </div>
      <div className='grid grid-cols-7 gap-2'>
        {['日', '月', '火', '水', '木', '金', '土'].map((day: string) => (
          <div key={day} className='text-center font-bold'>
            {day}
          </div>
        ))}
        {weeks.map((week, i) =>
          week.map((day) => (
            <div
              key={day.toISOString()}
              className='p-2 border border-gray-300 h-28 overflow-hidden rounded-sm'
            >
              <div>{day.getDate()}</div>

              {isTargetDay(day) ? (
                <div className='bg-blue-200 my-1 px-2 py-1 text-sm rounded-sm'>
                  {initialTarget?.target}
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TargetCalendar
