'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

import { Target } from '@/domain/entity/target_entity'
import Skeleton from '@/components/utils/skelton'

interface TargetListProps {
  loading: boolean
  targets: Target[]
}

const TargetList = (props: TargetListProps) => {
  const router = useRouter()
  // 合計勉強時間を計算（目標期間）
  const calculateTotalHours = (target: Target): number => {
    if (!target.startDate || !target.endDate) return 0
    const daysPerWeek = target.studyDays ? target.studyDays.length : 0
    const totalDays = Math.floor(
      (new Date(target.endDate).getTime() -
        new Date(target.startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    )
    // 小数点を切り捨てて返す
    return Math.floor(daysPerWeek * target.studyHoursPerDay * (totalDays / 7))
  }

  const handleTransition = (targetId: string) => {
    router.push(`/target/${targetId}`)
  }

  return (
    <section className='p-4 bg-white shadow rounded-sm flex'>
      {props.loading ? (
        <Skeleton className='h-10 w-full' />
      ) : (
        <>
          {props.targets.length === 0 ? (
            <p className='text-center w-full'>データが登録されていません。</p>
          ) : (
            <ul className='flex flex-col items-start w-full'>
              {props.targets.map((target, index) => (
                <li
                  key={index}
                  className='flex flex-row bg-gray-100 shadow my-2 text-left w-full cursor-pointer'
                  onClick={() => handleTransition(target.targetId)}
                >
                  <span className='bg-primaryBlue-300 w-20 h-full'></span>
                  <div className='flex flex-col py-6 px-4 space-y-2'>
                    <span className='text-lg'>{target.target}</span>
                    <span className='text-sm px-4'>
                      学習時間：{calculateTotalHours(target)}時間
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </section>
  )
}

export default TargetList
