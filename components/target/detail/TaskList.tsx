import React from 'react'

// components/TaskList.tsx
import { Actual } from '@/app/target/props/actual'
import { Task } from '@/app/target/props/task'
import TaskProgress from '@/components/target/detail/TaskProgress'

interface TaskListProps {
  tasks: Task[]
  actuals: Actual[]
}

const TaskList: React.FC<TaskListProps> = ({ tasks, actuals }) => {
  return (
    <section className='mt-4'>
      <h2 className='text-xl font-bold'>タスク一覧</h2>
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
    </section>
  )
}

export default TaskList
