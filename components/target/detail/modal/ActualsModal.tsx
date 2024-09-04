import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Task } from '@/domain/entity/task_entity'

interface ActualFormValues {
  studyDate: Date
  studyHours: number
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
    watch,
    formState: { errors },
  } = useForm<ActualFormValues>({
    defaultValues: {
      studyDate: new Date(),
      studyHours: 0,
      description: '',
    },
  })

  const [taskSearch, setTaskSearch] = useState('')

  const handleFormSubmit = async (data: ActualFormValues) => {
    onSubmit(data)
    reset()
    onClose()
  }
  const studyHours = watch('studyHours')

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
        <div className='relative p-6 bg-white w-3/4 md:w-1/2 m-auto flex-col flex rounded-lg shadow-lg z-10'>
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
                {...register('studyDate', { required: '日付は必須です' })}
                className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
              />
              {errors.studyDate && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.studyDate.message}
                </p>
              )}
            </section>
            <section>
              <label className='text-lg font-semibold block  border-b-red-400 border-b-2 mb-4'>
                勉強時間
              </label>
              <label>
                勉強時間: {studyHours} 時間
                <input
                  type='range'
                  {...register('studyHours', {
                    valueAsNumber: true, // 入力値を数値として取得
                  })}
                  min='0'
                  max='12'
                  className='w-full'
                />
              </label>
              {errors.studyHours && (
                <p className='text-red-500'>{errors.studyHours.message}</p>
              )}
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
                className='px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600'
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
