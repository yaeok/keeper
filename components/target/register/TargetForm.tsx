'use client'

import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { Target } from '@/domain/entity/target_entity'
import { TargetStatus } from '@/utils/target_status'

interface TargetFormProps {
  onNewTarget: (target: Target) => void
}

const TargetForm: React.FC<TargetFormProps> = ({ onNewTarget }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Target>()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [studyHoursPerDay, setStudyHoursPerDay] = useState(0)

  const onSubmit: SubmitHandler<Target> = (data: Target) => {
    if (!data.studyDays) return

    data.studyDays = data.studyDays.map(Number)
    data.studyHoursPerDay = studyHoursPerDay
  }

  const handleAddSchedule = () => {
    if (!startDate || !endDate) return
    const data: Target = {
      targetId: '',
      target: watch('target'),
      studyDays: watch('studyDays').map(Number),
      studyHoursPerDay: studyHoursPerDay,
      status: TargetStatus.ACTIVE,
      startDate: startDate,
      endDate: endDate,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
    }
    onNewTarget(data)
  }

  const watchFields = watch(['studyDays', 'target', 'startDate', 'endDate'])
  const studyDays = watchFields[0]

  // 週次の合計勉強時間を計算
  const calculateWeeklyTotalHours = (): number => {
    const daysPerWeek = studyDays ? studyDays.length : 0
    return daysPerWeek * studyHoursPerDay
  }

  // 合計勉強時間を計算（目標期間）
  const calculateTotalHours = (): number => {
    if (!startDate || !endDate) return 0
    const daysPerWeek = studyDays ? studyDays.length : 0
    const totalDays = Math.floor(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    )
    // 小数点を切り捨てて返す
    return Math.floor(daysPerWeek * studyHoursPerDay * (totalDays / 7))
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
      <section className='py-1'>
        <label className='block font-normal p-1 border-b-red-400 border-b-2'>
          目標
        </label>
        <input
          {...register('target', { required: '目標は必須項目です' })}
          className='mt-4 p-2 border border-gray-300 rounded w-full'
        />
        {errors.target && (
          <p className='text-red-500 text-xs mt-1'>{errors.target.message}</p>
        )}
      </section>
      <section className='py-1'>
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
                {...register('studyDays', { required: '勉強日は必須項目です' })}
              />
              <span className='w-4 h-4 inline-block border border-gray-400 rounded-full cursor-pointer peer-checked:bg-blue-500 peer-checked:border-blue-500' />
              <span>
                {['日', '月', '火', '水', '木', '金', '土'][Number(day)]}
              </span>
            </label>
          ))}
        </div>
        {errors.studyDays && (
          <p className='text-red-500 text-xs mt-1'>
            {errors.studyDays.message}
          </p>
        )}
      </section>
      <section className='py-1'>
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
      <section className='flex flex-row space-x-4 py-2'>
        <label className='w-full block font-normal p-1 border-b-red-400 border-b-2'>
          合計勉強時間（週）: {calculateWeeklyTotalHours()} 時間
        </label>
        <label className='w-full block font-normal p-1 border-b-red-400 border-b-2'>
          合計勉強時間: {calculateTotalHours()} 時間
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
            {...register('startDate', { required: '目標開始日は必須項目です' })}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setStartDate(e.target.value)
            }
            className='mt-4 p-2 border border-gray-300 rounded w-full'
          />
          {errors.startDate && (
            <p className='text-red-500 text-xs mt-1'>
              {errors.startDate.message}
            </p>
          )}
        </div>
        <div className='w-1/2'>
          <label className='block font-normal p-1 border-b-red-400 border-b-2'>
            目標終了日
          </label>
          <input
            type='date'
            value={endDate}
            {...register('endDate', { required: '目標終了日は必須項目です' })}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEndDate(e.target.value)
            }
            className='mt-4 p-2 border border-gray-300 rounded w-full'
          />
          {errors.endDate && (
            <p className='text-red-500 text-xs mt-1'>
              {errors.endDate.message}
            </p>
          )}
        </div>
      </section>

      <section className='py-2'>
        <button
          className='px-4 py-2 bg-gray-300 rounded'
          onClick={handleAddSchedule}
        >
          スケジュールに反映する
        </button>
      </section>
    </form>
  )
}

export default TargetForm
