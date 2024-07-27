import React from 'react'

import { Actual } from '@/domain/entity/actual_entity'
import { Task } from '@/domain/entity/task_entity'

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
          style={{ width: `${progress > 101 ? 100 : progress}%` }}
        ></div>
      </div>
      <div className='mt-4 text-right'>
        学習時間状況 : {totalStudyHours} / {task.taskStudyHours} 時間
      </div>
    </div>
  )
}

export default TaskProgress
