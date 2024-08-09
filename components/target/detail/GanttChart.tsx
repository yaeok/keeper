import { eachDayOfInterval, format, isSameDay } from 'date-fns';
import React from 'react';

import { Actual } from '@/domain/entity/actual_entity';
import { Target } from '@/domain/entity/target_entity';
import { Task } from '@/domain/entity/task_entity';

interface GanttChartProps {
  target: Target
  tasks: Task[]
  actuals: Actual[]
}

const GanttChart: React.FC<GanttChartProps> = ({ target, tasks, actuals }) => {
  const startDate = new Date(target.startDate)
  const endDate = new Date(target.endDate)
  const allDays = eachDayOfInterval({ start: startDate, end: endDate })

  const isActiveDay = (day: Date, taskId: string) => {
    return actuals.some(
      (actual) => actual.taskId === taskId && isSameDay(day, actual.studyDate)
    )
  }

  // 帰り値の型をDateに指定
  const actualStartDate = (args: {
    taskId: String
    actuals: Actual[]
  }): String => {
    // taskIdが紐づくactualを配列で取得
    const actual = args.actuals.filter(
      (actual) => actual.taskId === args.taskId
    )
    // actualのstudyDateを日付順に並び替え
    const sortedActual = actual.sort((a, b) => {
      return a.studyDate.getTime() - b.studyDate.getTime()
    })
    if (sortedActual.length === 0) {
      return '-'
    }
    return format(sortedActual[0].studyDate, 'yyyy/MM/dd')
  }

  const actualEndDate = (args: {
    taskId: String
    actuals: Actual[]
  }): String => {
    const actual = args.actuals.filter(
      (actual) => actual.taskId === args.taskId
    )
    const sortedActual = actual.sort((a, b) => {
      return b.studyDate.getTime() - a.studyDate.getTime()
    })
    if (sortedActual.length === 0) {
      return '-'
    }
    return format(sortedActual[0].studyDate, 'yyyy/MM/dd')
  }

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
              <td className='px-2 py-1 border text-center'>{`${task.taskStudyHours}h`}</td>
              <td className='px-2 py-1 border'>
                {actualStartDate({ taskId: task.taskId, actuals: actuals })}
              </td>
              <td className='px-2 py-1 border'>
                {actualEndDate({ taskId: task.taskId, actuals: actuals })}
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
