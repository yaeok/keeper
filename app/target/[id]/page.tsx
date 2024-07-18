'use client'
import React from 'react'

import GoalSummary from '@/components/target/detail/GoalSummary'
import TaskList from '@/components/target/detail/TaskList'
import Header from '@/components/target/Header'
import { Actual } from '@/domain/entity/actual_entity'
import { Target } from '@/domain/entity/target_entity'
import { Task } from '@/domain/entity/task_entity'
import { TargetStatus } from '@/utils/target_status'
import TaskCalendar from '@/components/target/detail/TaskCalendar'

const Dashboard: React.FC = () => {
  const target: Target = {
    targetId: '1',
    target: 'AWS資格取得',
    studyDays: [1, 2, 3, 4, 5], // 平日
    studyHoursPerDay: 2,
    status: TargetStatus.ACTIVE,
    startDate: '2024-07-16',
    endDate: '2024-09-16',
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  }

  const tasks: Task[] = [
    {
      taskId: '1',
      task: '課題1',
      content: 'AWSの基本知識を学ぶ',
      priority: 1,
      taskStudyHours: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      taskId: '2',
      task: '課題2',
      content: 'AWSのサービスを理解する',
      priority: 2,
      taskStudyHours: 20,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ]

  const actuals: Actual[] = [
    {
      actualId: '1',
      date: '2024-07-17',
      studyHours: 2,
      taskId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
    {
      actualId: '2',
      date: '2024-07-18',
      studyHours: 1.5,
      taskId: '2',
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    },
  ]

  const progress = 60 // 仮の進捗率

  return (
    <main className='min-h-screen w-screen bg-gray-50'>
      <Header />
      <div className='w-3/5 mx-auto mt-20 bg-gray-50 p-4'>
        <h2 className='text-3xl font-bold border-b-red-400 border-b-2 my-4'>
          {target.target}
        </h2>

        <section className='mt-4'>
          <h2 className='text-xl font-bold'>進捗</h2>
          <GoalSummary target={target} actuals={actuals} />
        </section>
        <section className='mt-4'>
          <h2 className='text-xl font-bold'>タスク一覧</h2>
          <TaskList tasks={tasks} actuals={actuals} />
        </section>
        <section className='mt-4'>
          <h2 className='text-xl font-bold'>スケジュール</h2>
          <TaskCalendar actuals={actuals} />
        </section>
      </div>
    </main>
  )
}

export default Dashboard
