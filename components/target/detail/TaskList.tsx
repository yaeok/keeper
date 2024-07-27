import React from 'react'

import TaskProgress from '@/components/target/detail/TaskProgress'
import { Actual } from '@/domain/entity/actual_entity'
import { Task } from '@/domain/entity/task_entity'

interface TaskListProps {
  tasks: Task[]
  actuals: Actual[]
}

const TaskList: React.FC<TaskListProps> = ({ tasks, actuals }) => {
  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task.taskId} className='mt-4 bg-white shadow-md py-6 px-4'>
            <div className='flex justify-between'>
              <span className='text-lg font-bold border-b-red-400 border-b-2'>
                {task.task}
              </span>
              <span>優先度: {task.priority}</span>
            </div>
            <div className='mt-1'>{task.content}</div>
            <TaskProgress task={task} actuals={actuals} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList
