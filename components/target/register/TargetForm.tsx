'use client'

import React, { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

interface TargetFormProps {
  onNewTarget: (target: Target) => void
  onChange: (targets: Target) => void
}

const TargetForm: React.FC<TargetFormProps> = ({ onNewTarget, onChange }) => {
  const { register, handleSubmit, watch } = useForm<Target>()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [studyHoursPerDay, setStudyHoursPerDay] = useState(0)

  const onSubmit: SubmitHandler<Target> = (data: Target) => {
    data.studyDays = data.studyDays.map(Number)
    data.studyHoursPerDay = studyHoursPerDay
    onNewTarget(data)
  }

  const watchFields = watch(['studyDays', 'target', 'startDate', 'endDate'])
  const studyDays = watchFields[0]
  const target = watchFields[1]
  const startDateWatch = watchFields[2]
  const endDateWatch = watchFields[3]

  useEffect(() => {
    if (
      target &&
      studyDays &&
      studyHoursPerDay &&
      startDateWatch &&
      endDateWatch
    ) {
      onChange({
        target,
        studyDays,
        studyHoursPerDay,
        startDate: startDateWatch,
        endDate: endDateWatch,
      })
    }
  }, [])

  const calculateTotalHours = (): number => {
    const daysPerWeek = studyDays ? studyDays.length : 0
    return daysPerWeek * studyHoursPerDay
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <section className='py-2'>
        <label className='block font-normal p-1 border-b-red-400 border-b-2'>
          目標
        </label>
        <input
          {...register('target', { required: true })}
          className='mt-4 p-2 border border-gray-300 rounded w-full'
        />
      </section>
      <section className='py-2'>
        <label className='block font-normal p-1 border-b-red-400 border-b-2'>
          週に何回勉強しますか？
        </label>
        <div className='p-4 grid grid-cols-7 gap-2'>
          {['0', '1', '2', '3', '4', '5', '6'].map((day) => (
            <label key={day} className='flex items-center space-x-2'>
              <input
                type='checkbox'
                value={day}
                className='hidden peer'
                {...register('studyDays')}
              />
              <span className='w-4 h-4 inline-block border border-gray-400 rounded-full cursor-pointer peer-checked:bg-blue-500 peer-checked:border-blue-500' />
              <span>
                {['日', '月', '火', '水', '木', '金', '土'][Number(day)]}
              </span>
            </label>
          ))}
        </div>
      </section>
      <section className='py-2'>
        <label className='block font-normal p-1 border-b-red-400 border-b-2'>
          1日何時間勉強しますか？
        </label>
        <input
          type='range'
          min='0'
          max='12'
          value={studyHoursPerDay}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setStudyHoursPerDay(Number(e.target.value))
          }
          className='mt-6 w-full'
        />
        <div className='text-right mt-2'>{studyHoursPerDay} 時間</div>
      </section>
      <section className='my-4'>
        <label className='block font-normal p-1 border-b-red-400 border-b-2'>
          合計勉強時間（週）: {calculateTotalHours()} 時間
        </label>
      </section>
      <section className='flex flex-row space-x-4 py-2'>
        <div className='w-1/2'>
          <label className='block font-normal p-1 border-b-red-400 border-b-2'>
            目標開始日
          </label>
          <input
            type='date'
            value={startDate}
            {...register('startDate', { required: true })}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStartDate(e.target.value)
            }
            className='mt-4 p-2 border border-gray-300 rounded w-full'
          />
        </div>
        <div className='w-1/2'>
          <label className='block font-normal p-1 border-b-red-400 border-b-2'>
            目標終了日
          </label>
          <input
            type='date'
            value={endDate}
            {...register('endDate', { required: true })}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEndDate(e.target.value)
            }
            className='mt-4 p-2 border border-gray-300 rounded w-full'
          />
        </div>
      </section>
    </form>
  )
}

export default TargetForm
