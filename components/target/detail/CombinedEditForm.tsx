// CombinedEditForm.tsx
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import { Target } from '@/domain/entity/target_entity'
import { Task } from '@/domain/entity/task_entity'

interface CombinedEditFormProps {
  target: Target
  tasks: Task[]
  onUpdate: (updatedTarget: Target, updatedTasks: Task[]) => void
}

const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土']

const CombinedEditForm: React.FC<CombinedEditFormProps> = ({
  target,
  tasks,
  onUpdate,
}) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<{
    target: Target
    tasks: Task[]
  }>({
    defaultValues: {
      target,
      tasks,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tasks',
  })

  React.useEffect(() => {
    setValue('target', target)
  }, [target, setValue])

  const onSubmit = handleSubmit((data) => {
    onUpdate(data.target, data.tasks)
  })

  return (
    <form onSubmit={onSubmit} className='space-y-4'>
      <div className='py-1'>
        <label className='text-lg font-semibold block  border-b-red-400 border-b-2 mb-4'>
          目標
        </label>
        <input
          {...register('target.target', { required: '目標は必須項目です' })}
          className='p-2 border border-gray-300 rounded w-full'
        />
        {errors.target?.message && (
          <p className='text-red-500 text-xs mt-1'>{errors.target.message}</p>
        )}
      </div>
      <div className='py-1'>
        <label className='text-lg font-semibold block  border-b-red-400 border-b-2 mb-4'>
          学習日
        </label>
        <div className='p-4 grid grid-cols-7 gap-2'>
          {daysOfWeek.map((day, index) => (
            <label key={index} className='flex items-center space-x-2'>
              <input
                type='checkbox'
                value={index}
                {...register(`target.studyDays`)}
                defaultChecked={target.studyDays?.includes(index)}
                className='hidden peer'
              />
              <span className='w-4 h-4 inline-block border border-gray-400 rounded-full cursor-pointer peer-checked:bg-blue-500 peer-checked:border-blue-500' />
              <span>{day}</span>
            </label>
          ))}
        </div>
      </div>
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
                  <label className='block font-medium text-lg  border-b-red-400 border-b-2 mb-4'>
                    勉強時間 (時間)
                  </label>
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
      <section className='flex justify-end space-x-4'>
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
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700'
        >
          タスクを追加
        </button>
        <button
          type='submit'
          className='px-4 py-2 bg-green-500 text-white rounded hover:bg-green-700'
        >
          更新
        </button>
      </section>
    </form>
  )
}

export default CombinedEditForm
