// components/TaskProgress.tsx
import { Actual } from '@/app/target/props/actual'
import { Task } from '@/app/target/props/task'
import React from 'react'

interface TaskProgressProps {
  task: Task
  actuals: Actual[]
}

const TaskProgress: React.FC<TaskProgressProps> = ({ task, actuals }) => {
  const totalStudyHours = actuals.reduce((total, actual) => {
    return actual.taskId === task.taskId ? total + actual.studyHours : total
  }, 0)

  const progress = (totalStudyHours / task.taskStudyHours) * 100

  return (
    <div className='w-full'>
      <div className='w-full bg-gray-200 rounded-full h-4 mt-2'>
        <div
          className='bg-green-600 h-4 rounded-full'
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <div className='mt-2'>予定学習時間: {task.taskStudyHours}時間</div>
      <div className='mt-2'>実際の学習時間: {totalStudyHours}時間</div>
    </div>
  )
}

export default TaskProgress
