'use client'

import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'

interface Goal {
  goal: string
  studyDays: number[]
  studyHoursPerWeek: number
  startDate: string
  endDate: string
}

interface GoalFormProps {
  onNewGoal: (goal: Goal) => void
}

const GoalForm: React.FC<GoalFormProps> = ({ onNewGoal }) => {
  const { register, handleSubmit, watch } = useForm<Goal>()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  const onSubmit: SubmitHandler<Goal> = (data) => {
    data.studyDays = data.studyDays.map(Number)
    onNewGoal(data)
  }
  const watchFields = watch(['studyDays', 'studyHoursPerWeek'])
  const studyDays = watchFields[0]
  const studyHoursPerWeek = watchFields[1]

  const calculateTotalHours = (): number => {
    const daysPerWeek = studyDays ? studyDays.length : 0
    const hoursPerWeek = studyHoursPerWeek || 0
    return daysPerWeek * hoursPerWeek
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <div>
        <label className='block font-medium'>目標</label>
        <input
          {...register('goal', { required: true })}
          className='mt-1 p-2 border border-gray-300 rounded w-full'
        />
      </div>
      <div>
        <label className='block font-medium'>週に何回勉強しますか？</label>
        <div className='mt-1 grid grid-cols-7 gap-2'>
          {['0', '1', '2', '3', '4', '5', '6'].map((day) => (
            <label key={day} className='flex items-center space-x-2'>
              <input type='checkbox' value={day} {...register('studyDays')} />
              <span>
                {['日', '月', '火', '水', '木', '金', '土'][Number(day)]}
              </span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className='block font-medium'>週に何時間勉強しますか？</label>
        <input
          type='number'
          {...register('studyHoursPerWeek', { required: true })}
          className='mt-1 p-2 border border-gray-300 rounded w-full'
        />
      </div>
      <div>
        <label className='block font-medium'>
          合計勉強時間（週）: {calculateTotalHours()} 時間
        </label>
      </div>
      <section className='flex flex-row space-x-4'>
        <div className='w-1/2'>
          <label className='block font-medium'>目標開始日</label>
          <input
            type='date'
            value={startDate}
            {...register('startDate', { required: true })}
            onChange={(e) => setStartDate(e.target.value)}
            className='mt-1 p-2 border border-gray-300 rounded w-full'
          />
        </div>
        <div className='w-1/2'>
          <label className='block font-medium'>目標終了日</label>
          <input
            type='date'
            value={endDate}
            {...register('endDate', { required: true })}
            onChange={(e) => setEndDate(e.target.value)}
            className='mt-1 p-2 border border-gray-300 rounded w-full'
          />
        </div>
      </section>
      <button
        type='submit'
        className='px-4 py-2 bg-blue-500 text-white rounded'
      >
        登録
      </button>
    </form>
  )
}

export default GoalForm
