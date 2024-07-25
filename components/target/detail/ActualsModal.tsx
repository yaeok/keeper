import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Actual } from '@/domain/entity/actual_entity'
import { Task } from '@/domain/entity/task_entity'
import { IActualRepository } from '@/feature/infrastructure/repository/actual_repository'
import { RegisterActualUseCase } from '@/use_case/register_actual_use_case/register_actual_use_case'

interface ActualFormValues {
  date: string
  hours: number
  description: string
  taskId: string
}

interface ActualsModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: ActualFormValues) => void
  tasks: Task[]
}

const ActualsModal: React.FC<ActualsModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  tasks,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ActualFormValues>()

  const [taskSearch, setTaskSearch] = useState('')

  const handleFormSubmit = async (data: ActualFormValues) => {
    const newActual = new Actual({
      actualId: '',
      date: data.date,
      studyHours: data.hours,
      taskId: data.taskId,
      memo: data.description,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    })

    const actualRepository = new IActualRepository()

    const result = await new RegisterActualUseCase({
      actualRepository: actualRepository,
    }).execute({
      actual: newActual,
    })

    if (result.result) {
      onSubmit(data)
      reset()
      onClose()
    } else {
      console.error('Failed to register actual')
    }
  }

  const filteredTasks = tasks.filter((task) =>
    task.task.toLowerCase().includes(taskSearch.toLowerCase())
  )

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50'>
      <div
        className='fixed inset-0 bg-black opacity-50 filter grayscale'
        style={{ touchAction: 'none', overflow: 'hidden' }}
      ></div>
      <div className='flex items-center justify-center min-h-screen'>
        <div className='relative p-8 bg-white w-full max-w-2xl m-auto flex-col flex rounded-lg shadow-lg z-10'>
          <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-4'>
            <div>
              <label htmlFor='taskId' className='text-lg font-semibold'>
                タスク
              </label>
              <input
                type='text'
                placeholder='タスクを検索'
                value={taskSearch}
                onChange={(e) => setTaskSearch(e.target.value)}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              />
              <select
                id='taskId'
                {...register('taskId', { required: 'タスクは必須です' })}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              >
                {filteredTasks.map((task) => (
                  <option key={task.taskId} value={task.taskId}>
                    {task.task}
                  </option>
                ))}
              </select>
              {errors.taskId && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.taskId.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor='date' className='text-lg font-semibold'>
                日付
              </label>
              <input
                type='date'
                id='date'
                {...register('date', { required: '日付は必須です' })}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              />
              {errors.date && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.date.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor='hours' className='text-lg font-semibold'>
                時間
              </label>
              <input
                type='number'
                id='hours'
                min='0'
                step='0.1'
                {...register('hours', {
                  required: '時間は必須です',
                  min: { value: 0, message: '時間は0以上でなければなりません' },
                })}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              />
              {errors.hours && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.hours.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor='description' className='text-lg font-semibold'>
                詳細
              </label>
              <textarea
                id='description'
                {...register('description', {
                  required: '詳細は必須です',
                  maxLength: {
                    value: 500,
                    message: '詳細は500文字以内で入力してください',
                  },
                })}
                className='mt-1 block w-full h-32 px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 resize-y'
              />
              {errors.description && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className='flex justify-between space-x-4'>
              <button
                type='button'
                onClick={onClose}
                className='px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600'
              >
                キャンセル
              </button>
              <button
                type='submit'
                className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
              >
                登録
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ActualsModal
