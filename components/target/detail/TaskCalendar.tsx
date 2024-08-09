'use client'

import React from 'react'

import { Actual } from '@/domain/entity/actual_entity'

interface TaskCalendarProps {
  actuals: Actual[]
}

const TaskCalendar: React.FC<TaskCalendarProps> = (
  props: TaskCalendarProps
) => {
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

  const weeks = generateCalendar()

  return (
    <div className='mt-4 p-4 bg-white rounded-sm shadow-md'>
      <section className='flex items-start mb-4'>
        <button
          className='px-4 py-2 bg-gray-300 rounded text-sm'
          onClick={() => setCurrentDate(new Date())}
        >
          今日
        </button>
      </section>
      <section className='flex items-center justify-between mb-4'>
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
      </section>
      <section className='grid grid-cols-7 gap-2'>
        {['日', '月', '火', '水', '木', '金', '土'].map((day: string) => (
          <div key={day} className='text-center font-bold'>
            {day}
          </div>
        ))}
        {weeks.map((week) =>
          week.map((day) => (
            <div
              key={day.toISOString()}
              className='p-1 border border-gray-300 h-28 overflow-hidden rounded-sm'
            >
              <div className='px-1'>{day.getDate()}</div>
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default TaskCalendar
