'use client'

import React from 'react'

import TargetDialog from '@/components/target/register/TargetDialog'

interface CalendarProps {
  initialTargets: Target[]
}

const TargetCalendar: React.FC<CalendarProps> = ({ initialTargets }) => {
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

  const handleAddSchedule = () => {
    console.log('handleAddSchedule')
  }

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
    <div className='px-2'>
      <section className='py-2'>
        <button
          className='px-4 py-2 bg-gray-300 rounded'
          onClick={handleAddSchedule}
        >
          スケジュールに反映する
        </button>
        <TargetDialog
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          message={dialogMessage}
        />
      </section>
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
        {['日', '月', '火', '水', '木', '金', '土'].map((day) => (
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
              {initialTargets
                .filter((target) => {
                  const dayOfWeek = day.getDay()
                  const currentDate = new Date(day)
                  const startDate = new Date(target.startDate)
                  const endDate = new Date(target.endDate)
                  return (
                    target.studyDays.includes(dayOfWeek) &&
                    currentDate >= startDate &&
                    currentDate <= endDate
                  )
                })
                .map((target, index) => (
                  <div key={index} className='bg-blue-200 mt-1 p-1 rounded'>
                    <p className='text-xs'>{target.target}</p>
                  </div>
                ))}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TargetCalendar
