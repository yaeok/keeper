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
  targeId: string
}

const ActualsModal: React.FC<ActualsModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  tasks,
  targeId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ActualFormValues>()

  const [taskSearch, setTaskSearch] = useState('')
  const [studyHoursPerDay, setStudyHoursPerDay] = useState(0)

  const handleFormSubmit = async (data: ActualFormValues) => {
    const newActual = new Actual({
      actualId: '',
      date: data.date,
      studyHours: studyHoursPerDay,
      targetId: targeId,
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
            <section>
              <label
                htmlFor='taskId'
                className='text-lg font-semibold block  border-b-red-400 border-b-2 mb-4'
              >
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
            </section>
            <section>
              <label
                htmlFor='date'
                className='text-lg font-semibold block  border-b-red-400 border-b-2 mb-4'
              >
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
            </section>
            <section>
              <label className='text-lg font-semibold block  border-b-red-400 border-b-2 mb-4'>
                勉強時間
              </label>
              <input
                type='range'
                min='0'
                max='12'
                value={studyHoursPerDay}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setStudyHoursPerDay(Number(e.target.value))
                }
                className='w-full'
              />
              <div className='text-right mt-2'>{studyHoursPerDay} 時間</div>
            </section>
            <section>
              <label
                htmlFor='description'
                className='text-lg font-semibold block  border-b-red-400 border-b-2 mb-4'
              >
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
            </section>
            <section className='flex justify-between space-x-4'>
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
            </section>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ActualsModal
