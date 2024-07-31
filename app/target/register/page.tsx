'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import Header from '@/components/target/Header'
// import TargetCalendar from '@/components/target/register/TargetCalendar'
import TargetForm from '@/components/target/register/TargetForm'
import TaskForm from '@/components/target/register/TaskForm'
import { Target } from '@/domain/entity/target_entity'
import { Task } from '@/domain/entity/task_entity'
import { ITargetRepository } from '@/feature/infrastructure/repository/target_repository'
import { ITaskRepository } from '@/feature/infrastructure/repository/task_repository'
import { RegisterTargetAndTaskUseCase } from '@/use_case/register_target_and_task_use_case/register_target_and_task_use_case'
import { RegisterTargetUseCase } from '@/use_case/register_target_and_task_use_case/register_target_use_case/register_target_use_case'
import { RegisterTaskUseCase } from '@/use_case/register_target_and_task_use_case/register_task_use_case/register_task_use_case'

const TargetRegisterView: React.FC = () => {
  const router = useRouter()
  const [currentTarget, setCurrentTarget] = useState<Target | null>(null)
  const [currentTasks, setCurrentTasks] = useState<Task[]>([])

  const handleNewTarget = (target: Target) => {
    setCurrentTarget(target)
  }

  const handleNewTask = (tasks: Task[]) => {
    setCurrentTasks(tasks)
  }

  const onClickRegisterBtn = async () => {
    if (!currentTarget || currentTasks.length == 0) return

    try {
      const targetRepository = new ITargetRepository()
      const registerTargetUseCase = new RegisterTargetUseCase({
        targetRepository: targetRepository,
      })

      const taskRepository = new ITaskRepository()
      const registerTaskUseCase = new RegisterTaskUseCase({
        taskRepository: taskRepository,
      })

      const result = await new RegisterTargetAndTaskUseCase({
        registerTargetUseCase: registerTargetUseCase,
        registerTaskUseCase: registerTaskUseCase,
      }).execute({
        target: currentTarget,
        tasks: currentTasks,
      })
      if (result.result) {
        router.back()
      }
    } catch (error) {
      console.error('Failed to register target and tasks:', error)
      alert('登録に失敗しました')
    }
  }

  return (
    <main className='bg-gray-100 w-screen'>
      <Header />
      <div className='w-3/5 mx-auto p-4 bg-white mt-20 pb-10'>
        <h1 className='text-3xl font-bold mb-4'>目標とタスク登録</h1>
        <section className='my-2'>
          <h2 className='text-xl font-bold bg-red-100 rounded-sm px-4 py-2'>
            目標管理
          </h2>
          <div className='bg-white p-2'>
            <TargetForm onNewTarget={handleNewTarget} />
          </div>
        </section>
        <section className='my-2'>
          <h2 className='text-xl font-bold bg-red-100 rounded-sm px-4 py-2'>
            タスク管理
          </h2>
          <div className='bg-white p-2'>
            <TaskForm onNewTask={handleNewTask} />
          </div>
        </section>
        {/* <section className='my-2'>
          <h2 className='text-xl font-bold bg-red-100 rounded-sm px-4 py-2'>
            スケジュール
          </h2>
          <div className='bg-white p-2'>
            <TargetCalendar
              initialTarget={currentTarget}
              initialTasks={currentTasks}
            />
          </div>
        </section> */}
        <section className='flex items-center justify-center mt-4'>
          <button
            className='font-bold w-1/2 py-4 bg-green-500 text-white rounded disabled:bg-gray-400'
            onClick={() => onClickRegisterBtn()}
            disabled={!currentTarget || currentTasks.length == 0}
          >
            新規目標・タスク登録
          </button>
        </section>
      </div>
    </main>
  )
}

export default TargetRegisterView
