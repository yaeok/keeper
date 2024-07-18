'use client'

import React from 'react'

import { Target } from '@/domain/entity/target_entity'
import { Task } from '@/domain/entity/task_entity'

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

    // 与えられた日付の曜日を取得
    const dayOfWeek = date.getDay()

    console.log('日付：', date.toISOString())
    const strDate = date.toISOString().split('T')[0]
    console.log('strDate', strDate)
    const startDate = new Date(initialTarget.startDate)
    const strStartDate = startDate.toISOString().split('T')[0]
    console.log('開始日：', strStartDate)

    if (new Date(strDate).getTime() >= new Date(strStartDate).getTime()) {
      console.log('date', new Date(strDate).getTime())
      console.log('startDate', new Date(strStartDate).getTime())
    }

    // console.log('dayOfWeek', dayOfWeek)
    // console.log('initialTarget.studyDays', initialTarget.studyDays)
    const isTarget =
      new Date(strDate).getTime() >= new Date(strStartDate).getTime()

    // // 与えられた日付、開始日、終了日を時間部分を切り捨ててISO形式の文字列に変換
    // const strDate = date.toISOString().split('T')[0]
    // const strStartDate = new Date(initialTarget.startDate)
    //   .toISOString()
    //   .split('T')[0]
    // const strEndDate = new Date(initialTarget.endDate)
    //   .toISOString()
    //   .split('T')[0]

    // // 再度、時間部分を切り捨てた日付オブジェクトを生成
    // const convertedDate = getUTCDateOnly(new Date(strDate + 'T01:00:00Z'))
    // const startDate = getUTCDateOnly(new Date(strStartDate + 'T00:00:00Z'))
    // const endDate = getUTCDateOnly(new Date(strEndDate + 'T00:00:00Z'))

    // // 日付が開始日と終了日の範囲内にあり、指定された曜日に含まれているかどうかを確認
    // const isTarget =
    //   convertedDate >= startDate &&
    //   convertedDate <= endDate &&
    //   initialTarget.studyDays.includes(dayOfWeek)

    // if (isTarget) {
    //   console.log('convertedDate', convertedDate)
    //   console.log('strStartDate', strStartDate)
    //   console.log('startDate', startDate)
    // }

    return isTarget
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
