import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  startOfMonth,
} from 'date-fns'
import React from 'react'

import { Actual } from '@/domain/entity/actual_entity'
import { Task } from '@/domain/entity/task_entity'

interface GanttChartProps {
  tasks: Task[]
  actuals: Actual[]
}

const GanttChart: React.FC<GanttChartProps> = ({ tasks, actuals }) => {
  const startDate = startOfMonth(new Date())
  const endDate = endOfMonth(new Date())
  const allDays = eachDayOfInterval({ start: startDate, end: endDate })

  const isActiveDay = (day: Date, taskId: string) => {
    return actuals.some(
      (actual) => actual.taskId === taskId && isSameDay(day, actual.studyDate)
    )
  }

  const taskStartDate = tasks.map((task) => {
    const afActuals = actuals.map((actual) => {
      if (task.taskId === actual.taskId) {
        return actual
      }
    })
  })

  return (
    <div className='overflow-x-auto mt-4 bg-white shadow-md rounded-lg p-4'>
      <table className='min-w-max w-full table-auto border-collapse'>
        <thead>
          <tr className='bg-blue-300'>
            <th className='px-2 py-1 border'>順序</th>
            <th className='px-2 py-1 border'>タスク名</th>
            <th className='px-2 py-1 border'>所要時間</th>
            <th className='px-2 py-1 border'>開始日</th>
            <th className='px-2 py-1 border'>完了日</th>
            {allDays.map((day, index) => (
              <th key={index} className='px-2 py-1 border'>
                {format(day, 'MM/dd')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.taskId} className='hover:bg-gray-50'>
              <td className='px-2 py-1 border text-center'>{task.priority}</td>
              <td className='px-2 py-1 border'>{task.task}</td>
              <td className='px-2 py-1 border'>{`${task.taskStudyHours}h`}</td>
              <td className='px-2 py-1 border'>
                {format(task.createdAt, 'yyyy/MM/dd')}
              </td>
              <td className='px-2 py-1 border'>
                {format(task.updatedAt, 'yyyy/MM/dd')}
              </td>
              {allDays.map((day, index) => (
                <td
                  key={index}
                  className={`px-2 py-1 border ${
                    isActiveDay(day, task.taskId)
                      ? 'bg-green-500'
                      : 'bg-gray-100'
                  }`}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default GanttChart
