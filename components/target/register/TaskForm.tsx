'use client'

import React from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'

import { Task } from '@/domain/entity/task_entity'

interface TaskFormProps {
  onNewTask: (tasks: Task[]) => void
}

const TaskForm: React.FC<TaskFormProps> = ({ onNewTask }) => {
  const { register, control, handleSubmit } = useForm<{ tasks: Task[] }>({
    defaultValues: {
      tasks: [{ task: '', content: '', priority: 0, taskStudyHours: 0 }],
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tasks',
  })

  const onSubmit: SubmitHandler<{ tasks: Task[] }> = (data) => {
    onNewTask(data.tasks)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <section className='flex flex-row space-x-2 items-center w-full justify-end'>
        <button
          type='button'
          onClick={() =>
            append({
              taskId: '',
              task: '',
              content: '',
              priority: 0,
              taskStudyHours: 0,
              targetId: '',
              createdAt: new Date(),
              updatedAt: new Date(),
              deletedAt: null,
            })
          }
          className='px-4 py-2 bg-blue-500 text-white rounded'
        >
          + タスクを追加
        </button>
        <button
          type='submit'
          className='px-4 py-2 bg-green-500 text-white rounded'
        >
          登録
        </button>
      </section>
      {fields.map((item, index) => (
        <div key={item.id} className='space-y-2'>
          <div className='flex flex-row space-x-2 items-center'>
            {/* {index > 0 && (
              <button
                type='button'
                onClick={() => remove(index)}
                className='flex items-center justify-center w-8 h-8 bg-red-500 text-white rounded-full'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-4 w-4'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            )} */}
            <div className='flex flex-col w-full space-y-2'>
              <section className='flex flex-row space-x-2 items-end'>
                {/* <div className='w-1/5'>
                  <label className='block font-medium'>優先順位</label>
                  <input
                    type='number'
                    {...register(`tasks.${index}.priority`, {
                      required: true,
                    })}
                    className='mt-1 p-2 border border-gray-300 rounded w-full'
                  />
                </div> */}
                <div className='w-4/5'>
                  <label className='block font-medium'>タスク</label>
                  <input
                    {...register(`tasks.${index}.task`, { required: true })}
                    className='mt-1 p-2 border border-gray-300 rounded w-full'
                  />
                </div>
                <div className='w-1/5'>
                  <label className='block font-medium'>勉強時間 (時間)</label>
                  <input
                    type='number'
                    {...register(`tasks.${index}.taskStudyHours`, {
                      required: true,
                    })}
                    className='mt-1 p-2 border border-gray-300 rounded w-full'
                  />
                </div>
              </section>
              <section>
                <label className='block font-medium'>内容</label>
                <textarea
                  {...register(`tasks.${index}.content`, { required: true })}
                  className='mt-1 p-2 border border-gray-300 rounded w-full'
                />
              </section>
            </div>
          </div>
        </div>
      ))}
    </form>
  )
}

export default TaskForm
