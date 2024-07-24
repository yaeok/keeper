'use client'

import React from 'react'
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form'
import { Task } from '@/domain/entity/task_entity'

interface TaskFormProps {
  onNewTask: (tasks: Task[]) => void
}

const TaskForm: React.FC<TaskFormProps> = ({ onNewTask }) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{ tasks: Task[] }>({
    defaultValues: {
      tasks: [
        {
          taskId: '',
          task: '',
          content: '',
          priority: 0,
          taskStudyHours: 0,
          targetId: '',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ],
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
            {index > 0 && (
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
            )}
            <div className='flex flex-col w-full space-y-2'>
              <section className='flex flex-row space-x-2 items-end'>
                {/* <div className='w-1/5'>
                  <label className='block font-medium'>優先順位</label>
                  <input
                    type='number'
                    {...register(`tasks.${index}.priority`, {
                      required: '優先順位は必須です',
                      min: {
                        value: 1,
                        message: '優先順位は1以上でなければなりません',
                      },
                      max: {
                        value: 5,
                        message: '優先順位は5以下でなければなりません',
                      },
                    })}
                    className='mt-1 p-2 border border-gray-300 rounded w-full'
                  />
                  {errors.tasks?.[index]?.priority && (
                    <p className='text-red-500 text-sm'>
                      {errors.tasks?.[index]?.priority?.message}
                    </p>
                  )}
                </div> */}
                <div className='w-3/5'>
                  <label className='block font-medium'>タスク</label>
                  <input
                    {...register(`tasks.${index}.task`, {
                      required: 'タスクは必須です',
                      minLength: {
                        value: 2,
                        message: 'タスクは2文字以上でなければなりません',
                      },
                    })}
                    className='mt-1 p-2 border border-gray-300 rounded w-full'
                  />
                  {errors.tasks?.[index]?.task && (
                    <p className='text-red-500 text-sm'>
                      {errors.tasks?.[index]?.task?.message}
                    </p>
                  )}
                </div>
                <div className='w-2/5'>
                  <label className='block font-medium'>勉強時間 (時間)</label>
                  <input
                    type='number'
                    {...register(`tasks.${index}.taskStudyHours`, {
                      required: '勉強時間は必須です',
                      min: {
                        value: 1,
                        message: '1~24時間で入力してください',
                      },
                      max: {
                        value: 24,
                        message: '勉強時間は24時間以下でなければなりません',
                      },
                    })}
                    className='mt-1 p-2 border border-gray-300 rounded w-full'
                  />
                  {errors.tasks?.[index]?.taskStudyHours && (
                    <p className='text-red-500 text-sm'>
                      {errors.tasks?.[index]?.taskStudyHours?.message}
                    </p>
                  )}
                </div>
              </section>
              <section>
                <label className='block font-medium'>内容</label>
                <textarea
                  {...register(`tasks.${index}.content`, {
                    required: '内容は必須です',
                    minLength: {
                      value: 10,
                      message: '内容は10文字以上でなければなりません',
                    },
                  })}
                  className='mt-1 p-2 border border-gray-300 rounded w-full'
                />
                {errors.tasks?.[index]?.content && (
                  <p className='text-red-500 text-sm'>
                    {errors.tasks?.[index]?.content?.message}
                  </p>
                )}
              </section>
            </div>
          </div>
        </div>
      ))}
    </form>
  )
}

export default TaskForm
