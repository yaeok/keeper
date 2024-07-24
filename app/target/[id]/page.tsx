'use client'
import React, { useEffect, useState } from 'react'

import GoalSummary from '@/components/target/detail/GoalSummary'
import TaskCalendar from '@/components/target/detail/TaskCalendar'
import TaskList from '@/components/target/detail/TaskList'
import Header from '@/components/target/Header'
import Skeleton from '@/components/utils/skelton'
import { Actual } from '@/domain/entity/actual_entity'
import { Target } from '@/domain/entity/target_entity'
import { Task } from '@/domain/entity/task_entity'
import { TargetStatus } from '@/utils/target_status'

interface TargetDetailProps {
  params: {
    id: string
  }
}

const TargetDetailView: React.FC<TargetDetailProps> = (
  props: TargetDetailProps
) => {
  const [loading, setLoading] = useState(true)
  const [target, setTarget] = useState<Target | null>(null)
  const [tasks, setTasks] = useState<Task[]>([])
  const [actuals, setActuals] = useState<Actual[]>([])

  useEffect(() => {
    // データを取得するための擬似的なAPIコール
    setTimeout(() => {
      const fetchedTarget: Target = {
        targetId: '1',
        target: 'AWS資格取得',
        studyDays: [1, 2, 3, 4, 5], // 平日
        studyHoursPerDay: 2,
        status: TargetStatus.ACTIVE,
        startDate: '2024-07-16',
        endDate: '2024-09-16',
        ownerId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }

      const fetchedTasks: Task[] = [
        {
          taskId: '1',
          task: '課題1',
          content: 'AWSの基本知識を学ぶ',
          priority: 1,
          taskStudyHours: 10,
          targetId: '1',
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
          targetId: '1',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ]

      const fetchedActuals: Actual[] = [
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

      setTarget(fetchedTarget)
      setTasks(fetchedTasks)
      setActuals(fetchedActuals)
      setLoading(false)
    }, 2000)
  }, [])

  const progress = 60 // 仮の進捗率

  return (
    <main className='min-h-screen w-screen bg-gray-50'>
      <Header />
      <div className='w-3/5 mx-auto mt-20 bg-gray-50 p-4'>
        <h2 className='text-3xl font-bold border-b-red-400 border-b-2 my-4'>
          {loading ? <Skeleton className='h-12 w-full' /> : target?.target}
        </h2>

        <section className='mt-4'>
          <h2 className='text-xl font-bold'>進捗</h2>
          {loading ? (
            <Skeleton className='h-32 w-full' />
          ) : (
            <GoalSummary target={target!} actuals={actuals} />
          )}
        </section>
        <section className='mt-4'>
          <h2 className='text-xl font-bold'>タスク一覧</h2>
          {loading ? (
            <Skeleton className='h-32 w-full' />
          ) : (
            <TaskList tasks={tasks} actuals={actuals} />
          )}
        </section>
        <section className='mt-4'>
          <h2 className='text-xl font-bold'>スケジュール</h2>
          {loading ? (
            <Skeleton className='h-32 w-full' />
          ) : (
            <TaskCalendar actuals={actuals} />
          )}
        </section>
      </div>
    </main>
  )
}

export default TargetDetailView
