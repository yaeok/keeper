import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  parseISO,
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

  return (
    <div className='flex flex-col gap-2 overflow-x-auto'>
      <div className='min-w-max'>
        <div className='grid grid-flow-col auto-cols-auto gap-1 p-2 bg-white'>
          <strong>Title</strong>
          <strong>Content</strong>
          <strong>Priority</strong>
          <strong>Planned Hours</strong>
          <strong>Start Date</strong>
          <strong>End Date</strong>
          {allDays.map((day, index) => (
            <strong key={index} className=''>
              {format(day, 'MM/dd')}
            </strong>
          ))}
        </div>
        {tasks.map((task) => (
          <div
            key={task.taskId}
            className='grid grid-flow-col auto-cols-auto gap-1 p-2 bg-white'
          >
            <span>{task.task}</span>
            <span>{task.content}</span>
            <span>{task.priority}</span>
            <span>{`${task.taskStudyHours}h`}</span>
            <span>{format(task.createdAt, 'MM/dd/yyyy')}</span>
            <span>{format(task.updatedAt, 'MM/dd/yyyy')}</span>
            {allDays.map((day, index) => (
              <div
                key={index}
                className={`h-4 w-4 ${
                  isActiveDay(day, task.taskId) ? 'bg-green-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default GanttChart
