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
    const fetchTarget = async () => {
      // ダミーデータ
      const dummyTarget: Target = {
        targetId: '1',
        target: '目標1',
        studyDays: [1, 3, 5],
        studyHoursPerDay: 2,
        status: TargetStatus.ACTIVE,
        startDate: '2021-09-01',
        endDate: '2021-09-30',
        ownerId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }
      setTarget(dummyTarget)
    }
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
