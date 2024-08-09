'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

import ActualsButton from '@/components/target/detail/button/ActualsButton'
import ConfirmButton from '@/components/target/detail/button/ConfirmButton'
import EditModalButton from '@/components/target/detail/button/EditModalButton'
import GanttChart from '@/components/target/detail/GanttChart'
import GoalSummary from '@/components/target/detail/GoalSummary'
import Sidebar from '@/components/target/detail/SideBar'
import TaskList from '@/components/target/detail/TaskList'
import Header from '@/components/target/Header'
import Skeleton from '@/components/utils/Skelton'
import { Actual } from '@/domain/entity/actual_entity'
import { Target } from '@/domain/entity/target_entity'
import { Task } from '@/domain/entity/task_entity'
import { IActualRepository } from '@/feature/infrastructure/repository/actual_repository'
import { ITargetRepository } from '@/feature/infrastructure/repository/target_repository'
import { ITaskRepository } from '@/feature/infrastructure/repository/task_repository'
import { GetActualsByTargetIdUseCase } from '@/use_case/get_actuals_by_target_id_use_case/get_actuals_by_target_id_use_case'
import { GetTargetByIdUseCase } from '@/use_case/get_target_by_id_use_case/get_target_by_id_use_case'
import { GetTaskByTargetIdUseCase } from '@/use_case/get_tasks_by_target_id_use_case/get_tasks_by_target_id_use_case'
import { RegisterActualUseCase } from '@/use_case/register_actual_use_case/register_actual_use_case'
import { UpdateTargetAndTaskUseCase } from '@/use_case/update_target_and_task_use_case/update_target_and_task_use_case'
import { UpdateTargetUseCase } from '@/use_case/update_target_and_task_use_case/update_target_use_case/update_target_use_case'
import { UpdateTaskUseCase } from '@/use_case/update_target_and_task_use_case/update_task_use_case/update_task_use_case'
import { UpdateTargetStatusCompletedByIdUseCase } from '@/use_case/update_target_status_completed_by_id_use_case/update_target_status_completed_use_case'

interface CombinedEditFormValues {
  target: Target
  tasks: Task[]
}

interface ActualFormValues {
  studyDate: Date
  studyHours: number
  description: string
  taskId: string
}

interface TargetDetailProps {
  params: {
    id: string
  }
}

const TargetDetailView: React.FC<TargetDetailProps> = (
  props: TargetDetailProps
) => {
  const [loading, setLoading] = React.useState(true)
  const [target, setTarget] = React.useState<Target | null>(null)
  const [tasks, setTasks] = React.useState<Task[]>([])
  const [actuals, setActuals] = React.useState<Actual[]>([])
  const router = useRouter()

  React.useEffect(() => {
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
      const sortTasks = tasks.tasks.sort((a, b) => a.priority - b.priority)
      setTasks(sortTasks)
    }

    const fetchActuals = async () => {
      const actualRepository = new IActualRepository()
      const actuals = await new GetActualsByTargetIdUseCase({
        actualRepository: actualRepository,
      }).execute({ id: props.params.id })
      setActuals(actuals.actuals)
    }

    const fetchData = async () => {
      await fetchTarget()
      await fetchTasks()
      await fetchActuals()
      setLoading(false)
    }

    fetchData()
  }, [])

  const handleAddActual = async (actualData: ActualFormValues) => {
    try {
      const newActual = new Actual({
        actualId: '',
        studyDate: new Date(actualData.studyDate),
        studyHours: Number(actualData.studyHours),
        targetId: props.params.id,
        taskId: actualData.taskId,
        ownerId: '',
        memo: actualData.description,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      })

      const actualRepository = new IActualRepository()

      const result = await new RegisterActualUseCase({
        actualRepository: actualRepository,
      }).execute({
        actual: newActual,
      })

      setActuals([...actuals, result.actual])
    } catch (error) {
      console.error('Failed to register actual:', error)
    }
  }

  const handleUpdate = async (editData: CombinedEditFormValues) => {
    try {
      const targetRepository = new ITargetRepository()
      const updateTargetUseCase = new UpdateTargetUseCase({
        targetRepository: targetRepository,
      })

      const taskRepository = new ITaskRepository()
      const updateTaskUseCase = new UpdateTaskUseCase({
        taskRepository: taskRepository,
      })

      const result = await new UpdateTargetAndTaskUseCase({
        updateTargetUseCase: updateTargetUseCase,
        updateTaskUseCase: updateTaskUseCase,
      }).execute({
        target: editData.target,
        tasks: editData.tasks,
      })
      setTarget(result.target)
      const sortTasks = result.tasks.sort((a, b) => a.priority - b.priority)
      setTasks(sortTasks)
    } catch (error) {
      console.error('Failed to update target and tasks:', error)
    }
  }

  const handleConfirm = async () => {
    try {
      const targetRepository = new ITargetRepository()
      const result = await new UpdateTargetStatusCompletedByIdUseCase({
        targetRepository: targetRepository,
      }).execute({ targetId: target!.targetId })
      if (result.result) {
        router.back()
      }
    } catch (error) {
      console.error('Failed to confirm target:', error)
      alert('完了に失敗しました')
    }
  }

  return (
    <main className='min-h-screen w-screen bg-gray-50 hidden-scrollbar'>
      <Header />
      <div className='flex'>
        <Sidebar />
        <div className='w-3/5 mx-auto mt-20 mb-10 bg-gray-50 p-4'>
          <section className='w-full flex flex-row justify-end space-x-2'>
            {loading ? (
              <Skeleton className='h-12 w-1/3' />
            ) : (
              <>
                <ActualsButton tasks={tasks} onSubmit={handleAddActual} />
                <EditModalButton
                  target={target!}
                  tasks={tasks}
                  onUpdate={handleUpdate}
                />
                <ConfirmButton onConfirm={handleConfirm} />
              </>
            )}
          </section>
          <h2 className='text-3xl font-bold border-b-red-400 border-b-2 my-4'>
            {loading ? <Skeleton className='h-12 w-full' /> : target?.target}
          </h2>

          <section className='mt-4'>
            <h2 className='text-xl'>進捗</h2>
            {loading ? (
              <Skeleton className='h-32 w-full' />
            ) : (
              <GoalSummary target={target!} actuals={actuals} />
            )}
          </section>
          <section className='mt-4'>
            <h2 className='text-xl'>ガントチャート</h2>
            {loading ? (
              <Skeleton className='h-32 w-full' />
            ) : (
              <GanttChart target={target!} tasks={tasks} actuals={actuals} />
            )}
          </section>
          <section className='mt-4'>
            <h2 className='text-xl'>タスク一覧</h2>
            {loading ? (
              <Skeleton className='h-32 w-full' />
            ) : (
              <TaskList tasks={tasks} actuals={actuals} />
            )}
          </section>
          {/* <section className='mt-4'>
          <h2 className='text-xl font-bold'>スケジュール</h2>
          {loading ? (
            <Skeleton className='h-32 w-full' />
          ) : (
            <TaskCalendar actuals={actuals} />
          )}
        </section> */}
        </div>
      </div>
    </main>
  )
}

export default TargetDetailView
