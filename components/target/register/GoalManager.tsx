'use client'

import React, { useState } from 'react'
import { Goal } from '@/app/target/props/goal'

interface CalendarProps {
  goals: Goal[]
}

const GoalCalendar: React.FC<CalendarProps> = ({ goals }) => {
  const [currentDate, setCurrentDate] = useState(new Date())
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
    <div>
      <div className='flex items-center justify-between mb-4'>
        <button
          className='px-4 py-2 bg-gray-300 rounded'
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.setMonth(currentDate.getMonth() - 1))
            )
          }
        >
          前月
        </button>
        <span className='text-lg font-medium'>
          {currentDate.getFullYear()}年 {currentDate.getMonth() + 1}月
        </span>
        <button
          className='px-4 py-2 bg-gray-300 rounded'
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
        {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
          <div key={day} className='text-center font-bold'>
            {day}
          </div>
        ))}
        {weeks.map((week, i) =>
          week.map((day) => (
            <div
              key={day.toISOString()}
              className='p-2 border border-gray-300 h-24 overflow-hidden rounded'
            >
              <div>{day.getDate()}</div>
              {goals
                .filter((goal) => goal.studyDays.includes(day.getDay()))
                .map((goal, index) => (
                  <div key={index} className='bg-blue-200 mt-1 p-1 rounded'>
                    {goal.goal}
                  </div>
                ))}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default GoalCalendar
