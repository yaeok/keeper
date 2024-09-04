// CombinedEditForm.tsx
import React from 'react'
import { useFieldArray, useForm } from 'react-hook-form'

import { Target } from '@/domain/entity/target_entity'
import { Task } from '@/domain/entity/task_entity'
import { Constants } from '@/utils/constants'

interface CombinedEditFormValues {
  target: Target
  tasks: Task[]
}

interface CombinedEditFormProps {
  target: Target
  tasks: Task[]
  onUpdate: (updateData: CombinedEditFormValues) => void
}

const CombinedEditForm: React.FC<CombinedEditFormProps> = ({
  target,
  tasks,
  onUpdate,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CombinedEditFormValues>({
    defaultValues: {
      target,
      tasks,
    },
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'tasks',
  })

  const onSubmit = handleSubmit((data: CombinedEditFormValues) => {
    const updTasks = data.tasks.map((task, index) => {
      return new Task({
        taskId: task.taskId,
        task: task.task,
        content: task.content,
        priority: index + 1,
        taskStudyHours: Number(task.taskStudyHours),
        targetId: task.targetId,
        createdAt: task.createdAt,
        updatedAt: task.updatedAt,
        deletedAt: task.deletedAt,
      })
    })
    const updateData = {
      target: data.target,
      tasks: updTasks,
    }
    onUpdate(updateData)
  })

  return (
    <form onSubmit={onSubmit} className='space-y-4'>
      <div className='py-1'>
        <label className='block font-medium text-md  border-b-red-400 border-b-2 mb-4'>
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
        <label className='block font-medium text-md  border-b-red-400 border-b-2 mb-4'>
          学習日
        </label>
        <div className='p-4 grid grid-cols-7 gap-2'>
          {Constants.DAYS_OF_WEEK.map((day, index) => (
            <label key={index} className='flex items-center space-x-2'>
              <input
                type='checkbox'
                value={index}
                {...register(`target.studyDays`)}
                defaultChecked={target.studyDays?.includes(index)}
                className='hidden peer'
              />
              <span className='w-4 h-4 inline-block border border-gray-400 rounded-full cursor-pointer peer-checked:bg-indigo-500 peer-checked:border-indigo-500' />
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
                  <label className='block font-medium text-md  border-b-red-400 border-b-2 mb-4'>
                    タスク
                  </label>
                  <input
                    {...register(`tasks.${index}.task`, {
                      required: 'タスクは必須です',
                    })}
                    className='p-2 border border-gray-300 rounded w-full'
                  />
                  {errors.tasks?.[index]?.task && (
                    <p className='text-red-500 text-sm'>
                      {errors.tasks?.[index]?.task?.message}
                    </p>
                  )}
                </div>
                <div className='w-2/5'>
                  <label className='block font-medium text-md  border-b-red-400 border-b-2 mb-4'>
                    勉強時間 (時間)
                  </label>
                  <input
                    type='number'
                    {...register(`tasks.${index}.taskStudyHours`, {
                      required: '勉強時間は必須です',
                      min: {
                        value: 1,
                        message: '1以上で登録してください',
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
                <label className='block font-medium text-md  border-b-red-400 border-b-2 mb-4'>
                  内容
                </label>
                <textarea
                  {...register(`tasks.${index}.content`, {
                    required: '内容は必須です',
                  })}
                  className='p-2 border border-gray-300 rounded w-full'
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
          className='px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700'
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
