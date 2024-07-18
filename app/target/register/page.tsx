'use client'

import { useState } from 'react'

import Header from '@/components/target/Header'
import TargetCalendar from '@/components/target/register/TargetCalendar'
import TargetForm from '@/components/target/register/TargetForm'
import TaskForm from '@/components/target/register/TaskForm'
import { Target } from '@/domain/entity/target_entity'
import { Task } from '@/domain/entity/task_entity'

const TargetRegisterView: React.FC = () => {
  const [currentTarget, setCurrentTarget] = useState<Target | null>(null)
  const [currentTasks, setCurrentTasks] = useState<Task[]>([])

  const handleNewTarget = (target: Target) => {
    setCurrentTarget(target)
  }

  const handleNewTask = (tasks: Task[]) => {
    setCurrentTasks(tasks)
  }

  return (
    <main className='bg-gray-100 w-screen'>
      <Header />
      <div className='w-3/5 mx-auto p-4 bg-white mt-20'>
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
        <section className='my-2'>
          <h2 className='text-xl font-bold bg-red-100 rounded-sm px-4 py-2'>
            スケジュール
          </h2>
          <div className='bg-white p-2'>
            <TargetCalendar
              initialTarget={currentTarget}
              initialTasks={currentTasks}
            />
          </div>
        </section>
      </div>
    </main>
  )
}

export default TargetRegisterView
