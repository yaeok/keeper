'use client'

import { useState } from 'react'

import TargetCalendar from '@/components/target/register/TargetCalendar'
import TargetForm from '@/components/target/register/TargetForm'
import TaskForm from '@/components/target/register/TaskForm'

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
    <div className='bg-gray-100 w-screen'>
      <div className='w-2/3 mx-auto p-4 bg-white'>
        <h1 className='text-2xl font-bold mb-4'>目標とタスクの管理</h1>
        <section className='my-2'>
          <h2 className='text-md font-normal bg-red-200 rounded-sm p-2'>
            目標管理
          </h2>
          <div className='bg-white p-2'>
            <TargetForm onNewTarget={handleNewTarget} />
          </div>
        </section>
        <section className='my-2'>
          <h2 className='text-md font-normal bg-red-200 rounded-sm p-2'>
            タスク管理
          </h2>
          <div className='bg-white p-2'>
            <TaskForm onNewTask={handleNewTask} />
          </div>
        </section>
        <section className='my-2'>
          <h2 className='text-md font-normal bg-red-200 rounded-sm p-2'>
            カレンダー
          </h2>
          <div className='bg-white p-2'>
            <TargetCalendar
              initialTarget={currentTarget}
              initialTasks={currentTasks}
            />
          </div>
        </section>
      </div>
    </div>
  )
}

export default TargetRegisterView
