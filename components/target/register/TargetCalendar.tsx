'use client'

import React from 'react'

interface TargetCalendarProps {
  initialTarget: Target | null
  initialTasks: Task[]
}

const TargetCalendar: React.FC<TargetCalendarProps> = ({
  initialTarget,
  initialTasks,
}) => {
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

  const isTargetDay = (date: Date): boolean => {
    if (!initialTarget) return false
    const dayOfWeek = date.getDay()
    const strDate = date.toISOString().split('T')[0]
    const strStartDate = new Date(initialTarget.startDate)
      .toISOString()
      .split('T')[0]
    const strEndDate = new Date(initialTarget.endDate)
      .toISOString()
      .split('T')[0]
    const convertedDate = new Date(strDate)
    const startDate = new Date(strStartDate)
    const endDate = new Date(strEndDate)
    if (
      convertedDate >= startDate &&
      convertedDate <= endDate &&
      initialTarget.studyDays.includes(dayOfWeek)
    ) {
      console.log('convertedDate', convertedDate)
    }
    return (
      convertedDate >= startDate &&
      convertedDate <= endDate &&
      initialTarget.studyDays.includes(dayOfWeek)
    )
  }

  const calculateWeeklyTotalHours = (
    startDate: Date,
    endDate: Date,
    studyDays: number[],
    studyHoursPerDay: number
  ): number => {
    if (!startDate || !endDate) return 0
    const daysPerWeek = studyDays ? studyDays.length : 0
    const totalDays = Math.floor(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    )
    return daysPerWeek * studyHoursPerDay * (totalDays / 7)
  }

  const distributeTasks = (): { [key: string]: Task[] } => {
    const taskDistribution: { [key: string]: Task[] } = {}
    if (!initialTarget) return taskDistribution

    let remainingTasks = [...initialTasks]
    let currentDate = new Date(initialTarget.startDate)
    let dailyStudyHours = initialTarget.studyHoursPerDay

    while (currentDate <= new Date(initialTarget.endDate)) {
      const dayOfWeek = currentDate.getDay()
      if (initialTarget.studyDays.includes(dayOfWeek)) {
        const key = currentDate.toISOString().split('T')[0]
        taskDistribution[key] = []

        let remainingStudyHoursForDay = dailyStudyHours

        while (remainingTasks.length > 0 && remainingStudyHoursForDay > 0) {
          const task = remainingTasks[0] // 先頭のタスクを参照
          if (task) {
            const taskTime = Math.min(
              task.taskStudyHours,
              remainingStudyHoursForDay
            ) // タスクの時間とその日に学習可能な時間の小さい方を取る
            taskDistribution[key].push({ ...task, taskStudyHours: taskTime }) // タスクを分配

            remainingStudyHoursForDay -= taskTime // 残りの学習時間を減らす
            task.taskStudyHours -= taskTime // タスクの残り時間を減らす

            if (task.taskStudyHours <= 0) {
              remainingTasks.shift() // タスクが完了したら、リストから削除
            }
          }
        }
      }
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return taskDistribution
  }

  const taskDistribution = distributeTasks()
  const weeks = generateCalendar()

  return (
    <div>
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
              className={`p-1 border border-gray-300 h-28 overflow-hidden rounded-sm ${
                isTargetDay(day) ? 'bg-red-100' : ''
              }`}
            >
              <div className='px-1'>{day.getDate()}</div>
              {taskDistribution[day.toISOString().split('T')[0]]?.map(
                (task, index) => (
                  <div
                    key={index}
                    className='text-sm bg-green-500 text-white p-1 mb-1 rounded-sm'
                  >
                    {task.task} - {task.taskStudyHours}時間
                  </div>
                )
              )}
            </div>
          ))
        )}
      </section>
    </div>
  )
}

export default TargetCalendar
