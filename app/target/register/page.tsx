'use client'

import { useState } from 'react'

import TargetCalendar from '@/components/target/register/TargetCalendar'
import TargetForm from '@/components/target/register/TargetForm'

const TargetRegisterView: React.FC = () => {
  const [targets, setTargets] = useState<Target[]>([])
  const [currentTarget, setCurrentTarget] = useState<Target | null>(null)

  const handleNewTarget = (target: Target) => {
    console.log('handleNewTarget')
    console.log(target)
    setTargets([...targets, target])
  }

  const handleFormChange = (target: Target) => {
    console.log('handleFormChange')
    console.log(target)
    setCurrentTarget(target)
  }

  return (
    <div className='bg-gray-100 w-screen'>
      <div className='w-2/3 mx-auto p-4 bg-white'>
        <h1 className='text-xl font-normal mb-4'>目標とタスクの管理</h1>
        <TargetForm onNewTarget={handleNewTarget} onChange={handleFormChange} />
        <div>
          <h2 className='text-xl font-normal mt-8 mb-4'>カレンダー</h2>
          <TargetCalendar
            initialTargets={
              currentTarget ? [currentTarget, ...targets] : targets
            }
          />
        </div>
      </div>
    </div>
  )
}

export default TargetRegisterView
