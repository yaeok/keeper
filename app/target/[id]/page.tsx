'use client'
import React, { useEffect, useState } from 'react'

import ActualsButton from '@/components/target/detail/button/ActualsButton'
import ConfirmButton from '@/components/target/detail/button/ConfirmButton'
import EditModalButton from '@/components/target/detail/button/EditModalButton'
import GoalSummary from '@/components/target/detail/GoalSummary'
import TaskCalendar from '@/components/target/detail/TaskCalendar'
import TaskList from '@/components/target/detail/TaskList'
import Header from '@/components/target/Header'
import Skeleton from '@/components/utils/skelton'
import { Actual } from '@/domain/entity/actual_entity'
import { Target } from '@/domain/entity/target_entity'
import { Task } from '@/domain/entity/task_entity'
import { ITargetRepository } from '@/feature/infrastructure/repository/target_repository'
import { ITaskRepository } from '@/feature/infrastructure/repository/task_repository'
import { GetTargetByIdUseCase } from '@/use_case/get_target_by_id_use_case/get_target_by_id_use_case'
import { GetTaskByTargetIdUseCase } from '@/use_case/get_tasks_by_target_id_use_case/get_tasks_by_target_id_use_case'

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
      const targetRepository = new ITargetRepository()
      const target = await new GetTargetByIdUseCase({
        targetRepository: targetRepository,
      }).execute({ id: props.params.id })
      setTarget(target.target)
    }

    const fetchTasks = async () => {
      const taskRepository = new ITaskRepository()
      const tasks = await new GetTaskByTargetIdUseCase({
        taskRepository: taskRepository,
      }).execute({ targetId: props.params.id })
      setTasks(tasks.tasks)
    }

    const fetchData = async () => {
      await fetchTarget()
      await fetchTasks()
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <main className='min-h-screen w-screen bg-gray-50'>
      <Header />
      <div className='w-3/5 mx-auto mt-20 bg-gray-50 p-4'>
        <section className='w-full flex flex-row justify-end space-x-2'>
          <ActualsButton tasks={tasks} targetId={props.params.id} />
          <EditModalButton target={target!} tasks={tasks} />
          <ConfirmButton />
        </section>
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
